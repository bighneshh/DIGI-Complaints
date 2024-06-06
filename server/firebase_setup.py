import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def initialize_firebase():
    if not firebase_admin._apps:
        cred = credentials.Certificate(r"digi-complaints-firebase-adminsdk-h7j9z-981ca5d31f.json") # Change the sdk path accordingly

        firebase_admin.initialize_app(cred)

    db = firestore.client()
    return db