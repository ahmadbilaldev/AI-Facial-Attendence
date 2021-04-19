from flask_restful import Resource
from flask import request, Response
from config.configDb import mydb
import traceback
from bson import json_util, ObjectId
import json
import datetime
import cv2
import numpy as np
import face_recognition
import os
import io
import pickle
import csv

attendanceCol = mydb['attendance']  # creating collection
courseCol = mydb['course']  # creating collection
model_col = mydb["model"]  # creating collection to save trained model


class Attendance(Resource):

    @staticmethod
    def post(date, course_id):
        try:
            files = request.files  # file from body of request
            reg_number = date
            course_id = ObjectId(course_id)
            today_date = str(datetime.date.today())

            # Verify Course id
            course = courseCol.find_one({"_id": course_id})
            if course is None:
                raise Exception("Course ID is invalid")

            print("len1: ")

            # preparing image
            new_encodings = []  # to save encodings
            for name, image in files.items():
                in_memory_file = io.BytesIO()
                image.save(in_memory_file)
                image = np.fromstring(in_memory_file.getvalue(), dtype=np.uint8)
                color_image_flag = 1
                image = cv2.imdecode(image, color_image_flag)

                image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

                # encodings from image
                test_encodings = face_recognition.face_encodings(image)
                if not len(test_encodings) > 0:
                    print("exception")
                    # raise Exception("no face detected")
                    return 0

                new_encodings = face_recognition.face_encodings(image)[0]

            # getting model from db

            model_data = model_col.find_one({'courseId': course_id})
            pickled_model = model_data['model']
            trained_model = pickle.loads(pickled_model)

            # compare faces using trained and new encodings
            match = face_recognition.compare_faces(trained_model, new_encodings)

            # if face is found mark attendance
            if True in match:
                current_attendance = attendanceCol.find_one({"courseId": course_id, "date": today_date})

                # mark new attendance
                if current_attendance is None:
                    new_attendance = [{reg_number: "p"}]

                    attendance_dic = {
                        "date": today_date,
                        "attendance": new_attendance,
                        "courseId": course_id,
                    }

                    attendance_id = attendanceCol.insert_one(attendance_dic).inserted_id

                    attendance_id = json.loads(json_util.dumps(attendance_id))  # convert response to json
                    attendance_id['_id'] = attendance_id['$oid']
                    return attendance_id['_id']

                # update attendance
                old_attendance = current_attendance['attendance']
                new_attendance = {reg_number: "p"}

                if new_attendance not in old_attendance:
                    old_attendance.append(new_attendance)

                    query = {"courseId": course_id, "date": today_date}
                    updated_attendance = {"$set": {"attendance": old_attendance}}
                    new_res = attendanceCol.find_one_and_update(query, updated_attendance)

                    new_res = json.loads(json_util.dumps(new_res))
                    new_res['_id'] = new_res['_id']['$oid']
                    return new_res['_id']

                raise Exception("Attendance already marked")

            raise Exception("Attendance not marked, Face not found")

        except Exception:
            return traceback.format_exc()

    @staticmethod
    def get(date, course_id):
        try:

            attendance = attendanceCol.find_one({"date": date, "courseId": ObjectId(course_id)})

            if attendance is None:
                return 'Date or Course id is invalid'

            attendance = json.loads(json_util.dumps(attendance))  # convert response to json
            attendance["_id"] = attendance["_id"]["$oid"]
            attendance["courseId"] = attendance["courseId"]["$oid"]

            return attendance

        except Exception:
            return 'Course Not Found'

    @staticmethod
    def delete(date, course_id):

        try:
            # find teacher by email.
            attendance = attendanceCol.find_one({"date": date, "courseId": ObjectId(course_id)})

            if attendance is None:
                return 'Attendance not found'

            attendance = attendanceCol.delete_one({"date": date, "courseId": ObjectId(course_id)})

            return attendance.deleted_count

        except Exception:
            return traceback.format_exc()


class CoursesAttendance(Resource):

    @staticmethod
    def get(course_id):
        try:
            courses_attendance = attendanceCol.find({"courseId": ObjectId(course_id)})  # get all courses_attendance
            courses_attendance = json.loads(json_util.dumps(courses_attendance))  # convert response to json

            for attendance in courses_attendance:
                attendance['_id'] = attendance['_id']['$oid']
                attendance["courseId"] = attendance["courseId"]["$oid"]

            print(courses_attendance)

            with open("data_attendance.csv", "w") as file:
                writer = csv.writer(file)
                for item in courses_attendance:

                    writer.writerow([f"Date: {item['date']}"])
                    arr = item['attendance']
                    for key in arr:
                        writer.writerow([list(key.keys())[0], "p", ""])
                    writer.writerow(['-------------------', "-------------------"])

            # open attendance file to read
            with open("data_attendance.csv") as fp:
                csv2 = fp.read()

            return Response(
                csv2,
                mimetype="text/csv",
                headers={"Content-disposition": "attachment; filename=data_attendance.csv"})

        except Exception:
            return traceback.format_exc()


    # @staticmethod
    # def put(course_id):
    #     try:
    #         data = request.json
    #         date = str(datetime.date.today())
    #
    #         # Verify Course id
    #         course = courseCol.find_one({"_id": ObjectId(course_id)})
    #         if course is None:
    #             return "Course ID is invalid"
    #
    #         old_attendance = attendanceCol.find({"courseId": ObjectId(course_id), "date": date})
    #
    #         attendance_dic = {
    #             "date": str(datetime.date.today()),
    #             "attendance": data["attendance"],
    #             "courseId": ObjectId(data["courseId"]),
    #         }
    #
    #         attendance_id = attendanceCol.insert_one(attendance_dic).inserted_id
    #         res = attendanceCol.find_one({"_id": attendance_id})
    #
    #         res = json.loads(json_util.dumps(res))  # convert response to json
    #         res['_id'] = res['_id']['$oid']
    #         res['courseId'] = res['courseId']['$oid']
    #
    #         return res
    #
    #     except Exception:
    #         return traceback.format_exc()


