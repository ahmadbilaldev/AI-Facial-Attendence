from flask_restful import Resource
from flask import request
from config.configDb import mydb
import traceback
from bson import json_util, ObjectId
import json
import jwt

teacherCol = mydb['teacher']  # creating collection


class Teacher(Resource):
    @staticmethod
    def post():
        try:
            data = request.json
            teacher_dic = {
                "fullName": data["fullName"],
                "email": data["email"],
                "contactNumber": data["contactNumber"],
                "password": data["password"],
            }

            # find teacher to verify teacher with the same email already exists or not
            teacher = teacherCol.find_one({"email": data["email"]})

            # if teacher not exists
            if teacher is None:
                teacher_id = teacherCol.insert_one(teacher_dic).inserted_id
                res = teacherCol.find_one({"_id": teacher_id})

                res = json.loads(json_util.dumps(res))  # convert response to json
                res['_id'] = res['_id']['$oid']
                return res

            raise Exception("This email is already Registered")

        except Exception:
            return traceback.format_exc()

    @staticmethod
    def get(email, password):
        try:

            teacher = teacherCol.find_one({"email": email, "password": password}, {"password": False})

            if teacher is None:
                raise Exception('Email or Password is invalid')

            teacher = json.loads(json_util.dumps(teacher))  # convert response to json
            teacher["_id"] = teacher["_id"]["$oid"]

            token = jwt.encode(teacher, "privateKey12345")
            return token

            # return teacher

        except Exception:
            return traceback.format_exc()

    @staticmethod
    def delete(id):

        try:
            # find teacher by email.
            teacher = teacherCol.find_one({"_id": ObjectId(id)})

            if teacher is None:
                return 'Teacher id is invalid'

            teacher = teacherCol.delete_one({"_id": ObjectId(id)})

            return teacher.deleted_count

        except Exception:
            return traceback.format_exc()


class Teachers(Resource):
    @staticmethod
    def get():

        try:

            teachers = teacherCol.find()  # get all teachers
            teachers = json.loads(json_util.dumps(teachers))  # convert response to json

            for teacher in teachers:
                teacher['_id'] = teacher['_id']['$oid']

            return teachers

        except Exception:
            return traceback.format_exc()

