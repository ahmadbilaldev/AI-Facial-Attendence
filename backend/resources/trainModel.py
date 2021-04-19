import cv2
import numpy as np
import face_recognition
import os
from flask import request
from flask_restful import Resource
import io
from config.configDb import mydb
import pickle
from bson import json_util, ObjectId
import json
import traceback

model_col = mydb["model"]  # creating collection to save trained model

class TrainModel(Resource):

    @staticmethod
    def post(id):
        try:
            files = request.files
            all_encodings = []

            for name, image in files.items():
                in_memory_file = io.BytesIO()
                image.save(in_memory_file)
                image = np.fromstring(in_memory_file.getvalue(), dtype=np.uint8)
                color_image_flag = 1
                image = cv2.imdecode(image, color_image_flag)

                image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

                encodings = face_recognition.face_encodings(image)
                for encoding in encodings:
                    all_encodings.append(encoding)

            encodings_detected = len(all_encodings)
            res = str(encodings_detected) + 'faces detected'
            # print(res)

            # inserting model in db
            pickle_model = pickle.dumps(all_encodings)
            encodings_collections = {"model": pickle_model, "courseId": ObjectId(id)}
            res_id = model_col.insert_one(encodings_collections).inserted_id

            res_id = json.loads(json_util.dumps(res_id))  # convert response to json
            res_id['_id'] = res_id['$oid']

            if res_id is None:
                raise Exception("Model not trained")

            return res

            # getting model from db
            # data = model_col.find_one({'courseId': ObjectId(id)})
            # pickled_model = data['model']
            # trained_model = pickle.loads(pickled_model)
            # print(len(trained_model))

        except Exception:
            return traceback.format_exc()

    @staticmethod
    def delete(id):

        try:
            # find teacher by email.
            model = model_col.find_one({"courseId": ObjectId(id)})

            if model is None:
                raise Exception('Course id is invalid')

            model = model_col.delete_one({"courseId": ObjectId(id)})

            return model.deleted_count

        except Exception:
            return traceback.format_exc()