from flask_restful import Resource
from flask import request
from config.configDb import mydb
import traceback
from bson import json_util, ObjectId
import json
import datetime
from bson import json_util, ObjectId
from uuid import uuid4

attendanceCodeCol = mydb['attendanceCode']  # creating collection
courseCol = mydb['course']  # creating collection


class AttendanceCode(Resource):

    @staticmethod
    def get(id):
        try:
            today_date = str(datetime.date.today())
            course_id = id
            attendance_code = datetime.datetime.now().strftime('%Y%m-%d%H-%M%S-') + str(uuid4()) + course_id

            attendance_code_col_dic = {
                "courseID": ObjectId(course_id),
                "date": today_date,
                "attendanceCode": attendance_code
            }

            # find attendance_code to verify attendance_code with the same course ID and date already exists or not
            attendance_code_preveious = attendanceCodeCol.find_one({"date": today_date, "courseID": ObjectId(course_id)})

            # if attendance_code is not exists
            if attendance_code_preveious is None:
                attendance_code_id = attendanceCodeCol.insert_one(attendance_code_col_dic).inserted_id
                res = attendanceCodeCol.find_one({"_id": attendance_code_id})

                res = json.loads(json_util.dumps(res))  # convert response to json
                res['_id'] = res['_id']['$oid']
                res['courseID'] = res['courseID']['$oid']
                return res

            raise Exception('This attendance_code is already existed')

        except Exception:
            return traceback.format_exc()

    # validating attendance code for attendance of student
    @staticmethod
    def post():
        try:
            data = request.json
            today_date = str(datetime.date.today())
            attendance_code = data["attendanceCode"]

            # find attendance_code to verify attendance_code with the same course ID and date already exists or not
            validate_attendance = attendanceCodeCol.find_one(
                {"date": today_date, "attendanceCode": attendance_code})

            # if attendance_code is not exists
            if validate_attendance is None:
                raise Exception("Invalid course id or code has been expired")

            course = courseCol.find_one({"_id": validate_attendance["courseID"]})
            course = json.loads(json_util.dumps(course))  # convert response to json
            course["_id"] = course["_id"]["$oid"]
            course["teacherId"] = course["teacherId"]["$oid"]

            return course


        except Exception:
            return traceback.format_exc()


    @staticmethod
    def delete(id):
        try:
            # find attendance_code by course id.
            attendance_code = attendanceCodeCol.find_one({"courseID": ObjectId(id)})

            if attendance_code is None:
                raise Exception('attendance Code id is invalid')

            attendance_code = attendanceCodeCol.delete_one({"courseID": ObjectId(id)})

            return attendance_code.deleted_count

        except Exception:
            return traceback.format_exc()


