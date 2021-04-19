import pymongo

try:
    # Connect with mongodb
    client = pymongo.MongoClient('mongodb://127.0.0.1:27017/')
    info = client.server_info() # force connection on a request as the
                         # connect=True parameter of MongoClient seems
                         # to be useless here
    mydb = client['faceDetection']

except pymongo.errors.ServerSelectionTimeoutError as err:
    # do whatever you need
    print(err)