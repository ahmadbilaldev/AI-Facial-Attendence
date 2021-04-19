from flask_restful import Resource
from flask import request
from config.configDb import mydb
import traceback
from bson import json_util, ObjectId
import json

userCol = mydb['user']  # creating collection


class User(Resource):

    @staticmethod
    def post():
        try:
            data = request.json
            user_dic = {
                "fullName": data["fullName"],
                "email": data["email"],
                "contactNumber": data["contactNumber"],
                "password": data["password"],
            }

            # find user to verify user with the same email already exists or not
            user = userCol.find_one({"email": data["email"]})

            # if user is not exists
            if user is None:
                user_id = userCol.insert_one(user_dic).inserted_id
                res = userCol.find_one({"_id": user_id})

                res = json.loads(json_util.dumps(res))  # convert response to json
                res['_id'] = res['_id']['$oid']
                return res

            return 'This email is already Registered'

        except Exception:
            return traceback.format_exc()

    @staticmethod
    def get(email, password):
        try:

            # find user by email and password.
            user = userCol.find_one({"email": email, "password": password}, {"password": False})

            if user is None:
                return 'Email or Password is invalid'

            user = json.loads(json_util.dumps(user))  # convert response to json
            user["_id"] = user["_id"]["$oid"]

            return user

        except Exception:
            return 'Email or Password is invalid'

    @staticmethod
    def delete(id):
        try:
            # find user by id.
            user = userCol.find_one({"_id": ObjectId(id)})

            if user is None:
                return 'User id is invalid'

            user = userCol.delete_one({"_id": ObjectId(id)})

            return user.deleted_count

        except Exception:
            return traceback.format_exc()


class Users(Resource):

    @staticmethod
    def get():
        try:
            users = userCol.find()  # get all users
            users = json.loads(json_util.dumps(users))  # convert response to json

            for user in users:
                user['_id'] = user['_id']['$oid']

            return users

        except Exception:
            return traceback.format_exc()

