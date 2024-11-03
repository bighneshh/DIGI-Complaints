# firebase_setup.py

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os
import json

def initialize_firebase():
    if not firebase_admin._apps:
        # Load Firebase credentials from the environment variable
        firebase_key_json = json.loads(os.getenv('FIREBASE_SERVICE_ACCOUNT_KEY'))
        cred = credentials.Certificate(firebase_key_json)

        firebase_admin.initialize_app(cred)

    db = firestore.client()
    return db
