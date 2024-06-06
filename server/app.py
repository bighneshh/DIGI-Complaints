from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase_setup import initialize_firebase
import bcrypt
import base64

app = Flask(__name__)
CORS(app, resources={r"/signup": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/login/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/dashboard/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/reset-password/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/complaints/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/api/complaints/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/api/profile/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/api/feedback/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/api/verify/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/api/users/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/api/add_history/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/api/get_history/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        # Get the signup data from the request
        signup_data = request.form.to_dict()

        # Extract the photo data
        photo_data = request.files.get('photo')
        if photo_data:
            # Read the photo data and convert it to base64
            photo_content = photo_data.read()
            photo_base64 = base64.b64encode(photo_content).decode('utf-8')
            # Store the base64-encoded photo data in the signup data
            signup_data['photo'] = photo_base64

        email = signup_data.get('email')

        db = initialize_firebase()
        users_ref = db.collection('Users')
        query = users_ref.where('email', '==', email).limit(1).get()

        if len(query) > 0:
            return jsonify({'error': 'Email already exists'}), 409  

        password = signup_data.get('password')
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        signup_data['password'] = hashed_password.decode('utf-8')
        cpassword = signup_data.get('cpassword')
        hashed_password = bcrypt.hashpw(cpassword.encode('utf-8'), bcrypt.gensalt())

        signup_data['cpassword'] = hashed_password.decode('utf-8')

        doc_ref = users_ref.add(signup_data)
        doc_id = doc_ref[1].id  
        return jsonify({'message': 'User added successfully', 'doc_id': doc_id}), 200

@app.route('/login/<userType>', methods=['POST'])
def login(userType):
    if request.method == 'POST':
        login_data = request.json
        email = login_data.get('email')
        password = login_data.get('password')
        print("Login email:", email, "\npassword:", password)
        # Retrieve user from Firestore using email
        print(userType)
        db = initialize_firebase()
        users_ref = db.collection(userType+'s')
        query = users_ref.where('email', '==', email).limit(1).get()
        print(query)
        for doc in query:
            user_data = doc.to_dict()
        
            hashed_password_str = user_data.get('password')
            print("User db password:", hashed_password_str)
            hashed_password_bytes = hashed_password_str.encode('utf-8')  
            print("User db encoded password:", hashed_password_bytes)

            if bcrypt.checkpw(password.encode('utf-8'), hashed_password_bytes):
                return jsonify({'message': 'Login successful', 'typeUser':user_data.get('userType'), 'user_id': doc.id, 'email': user_data.get('email'), 'vendor_type': user_data.get('vendorCategory'), 'firstName': user_data.get('firstName')}), 200

        return jsonify({'error': 'Invalid credentials'}), 401
    
    
@app.route('/dashboard/<userType>', methods=['POST'])
def dashboardInfo(userType):
    if request.method == 'POST':
        dashboard_data = request.json
        print(dashboard_data)
        email = dashboard_data.get('email')
        print("dashboard email:", email)
        print(userType)
        
        db = initialize_firebase()
        users_ref = db.collection(userType+'s')
        query = users_ref.where(field_path='email', op_string='==', value=email).limit(1).get()
        print(query)
        for doc in query:
            user_data = doc.to_dict()
            return jsonify({'message': 'Successful', 'user_id': doc.id, 'firstName': user_data.get('firstName'), 'lastName': user_data.get('lastName'), 'userImage': user_data.get('photo')}), 200

        return jsonify({'error': 'User not logged in!'}), 401
    
    
@app.route('/reset-password/<userType>', methods=['POST'])
def reset_password(userType):
    if request.method == 'POST':
        # Extract data from the request
        uniqueid = request.json.get('uniqueid')
        secqn = request.json.get('secqn')
        secans = request.json.get('secans')
        new_password = request.json.get('password')
        cpassword = request.json.get('cpassword')

        # Validate new password and confirm password match
        if new_password != cpassword:
            return jsonify({'error': 'Passwords do not match'}), 400

        db = initialize_firebase()
        users_ref = db.collection(userType+'s')
        query = users_ref.where(field_path='uniqueId', op_string='==', value=uniqueid).limit(1).get()
        for doc in query:
            user_data = doc.to_dict()
            stored_secans = user_data.get(secqn)
            if secans != stored_secans:
                return jsonify({'error': 'Invalid security answer'}), 401
            
            hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
            new_password = hashed_password.decode('utf-8')
            doc_ref = users_ref.document(doc.id)
            doc_ref.update({'password': new_password})
            doc_ref.update({'cpassword': new_password})
            # Return success response
            return jsonify({'message': 'Password updated successfully'}), 200
        
        return jsonify({'error': 'User not found'}), 404
    
    
@app.route('/complaints/register', methods=['POST'])
def create_complaint():
    try:
        # Extract complaint data from request
        data = request.json
        date = data.get('date')
        category = data.get('category')
        description = data.get('description')
        complainant = data.get('complainant')
        forwardTo = data.get('forwardTo')

        # Create new document in Firestore collection
        db = initialize_firebase()
        if forwardTo == "principal":
            doc_ref = db.collection('complaints').add({
                'date': date,
                'category': category,
                'description': description,
                'complainant': complainant,
                'status': 'HOD Approved'
            })
        else:
            doc_ref = db.collection('complaints').add({
                'date': date,
                'category': category,
                'description': description,
                'complainant': complainant,
                'status': 'New'
            })

        # Get the ID of the added document
        doc_id = doc_ref[1].id  

        return jsonify({'message': 'Complaint submitted successfully', 'doc_id': doc_id}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/api/complaints/<complaint_id>', methods=['PUT'])
def update_complaint(complaint_id):
  try:
    data = request.json
    new_status = data.get('status')
    revert_message = data.get('revertMessage')
    budget_amount = data.get('budgetExpected')
    vendor_category = data.get('vendorCategory')
    db = initialize_firebase()
    doc_ref = db.collection('complaints').document(complaint_id)
    doc_ref.update({'status': new_status})
    complaint_doc = doc_ref.get()
    if complaint_doc.exists:
        complaint_data = complaint_doc.to_dict()
        if revert_message:
            complaint_data['revertMessage'] = revert_message
        if budget_amount:
            complaint_data['budgetExpected'] = budget_amount
        if new_status:
            complaint_data['status'] = new_status
        if vendor_category:
            complaint_data['vendorCategory'] = vendor_category
        doc_ref.set(complaint_data)
        return jsonify(complaint_data), 200
    else:
        return jsonify({'error': 'Complaint not found'}), 404

  except Exception as e:
    return jsonify({'error': str(e)}), 500

@app.route('/complaints/<status>', methods=['GET'])
def get_complaints(status):  
    db = initialize_firebase()
    try:
        if status == 'departmental':
            complaints_ref = db.collection('complaints').where('status', '==', 'New').where('category', '==', 'Department Exclusive').stream()
            complaints = [{'id': complaint.id, **complaint.to_dict()} for complaint in complaints_ref]
            return jsonify(complaints), 201
        else:
            complaints_ref = db.collection('complaints').where('status', '==', status).stream()
            complaints = [{'id': complaint.id, **complaint.to_dict()} for complaint in complaints_ref]
            return jsonify(complaints), 201
    except Exception as e:
        print(f'Error updating complaint: {e}')
        complaints_ref = db.collection('complaints').stream()
        complaints = [{'id': complaint.id, **complaint.to_dict()} for complaint in complaints_ref]
        return jsonify({'complaints': complaints, 'error': 'Failed to fetch right complaints'}), 200


@app.route('/api/profile/<userType>', methods=['GET'])
def get_profile_by_email(userType):
    db = initialize_firebase()
    try:
        email = request.args.get('email')
        if not email:
            return jsonify({'error': 'Email parameter is missing'}), 400
        
        users_ref = db.collection(userType + 's').where('email', '==', email)
        docs = users_ref.stream()
        doc = next(docs, None)  # Get the first document (or None if not found)
        if doc:
            user_data = doc.to_dict()
            return jsonify({'userdata': user_data, 'user_id': doc.id}), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# API endpoint for updating profile data
@app.route('/api/profile/<userType>', methods=['PUT'])
def update_profile(userType):
    db = initialize_firebase()
    try:
        data = request.json
        user_id = data['user_id']  # Access user_id using square brackets
        doc_ref = db.collection(userType + 's').document(user_id)
        doc_ref.update(data)
        return jsonify({'message': 'Profile updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    db = initialize_firebase()
    try:
        data = request.json
        db.collection('Feedbacks').add({'user': data['user'], 'message': data['message']})
        return jsonify({'message': 'Feedback submitted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/api/verify/users', methods=['POST'])
def get_users():
    db = initialize_firebase()
    try:
        print("ani")
        request_data = request.json
        user_types = request_data.get('userTypes', [])
        users_ref = db.collection('Users').where('userType', 'in', user_types)
        docs = users_ref.stream()
        users_data = [{"id": doc.id, **doc.to_dict()} for doc in docs]
        print("bani  ", users_data)
        return jsonify(users_data), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/api/users/<user_Type>', methods=['POST'])
def get_allusers(user_Type):
    db = initialize_firebase()
    try:
        users_ref = db.collection(user_Type+'s')
        docs = users_ref.stream()
        users_data = [{"id": doc.id, **doc.to_dict()} for doc in docs]
        print("bani  ", users_data)
        return jsonify(users_data), 200
    except Exception as e:
        print("back error: ", e)
        return jsonify({'error': str(e)}), 500


@app.route('/api/verify/move-user', methods=['POST'])
def move_user():
    db = initialize_firebase()
    try:
        data = request.json
        user_id = data.get('userId')
        to_collection = data.get('toCollection')

        user_ref = db.collection('Users').document(user_id)
        user_doc = user_ref.get()
        
        if not user_doc.exists:
            return jsonify({'error': 'User not found in source collection'}), 404

        user_data = user_doc.to_dict()

        db.collection(to_collection).document(user_id).set(user_data)

        user_ref.delete()

        return jsonify({'message': 'User moved successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/feedback/<feedback_Type>', methods=['POST'])
def get_feedback(feedback_Type):
    db = initialize_firebase()
    try:
        users_ref = db.collection(feedback_Type+'s')
        docs = users_ref.stream()
        users_data = [{"id": doc.id, **doc.to_dict()} for doc in docs]
        # print("bani  ", users_data)
        return jsonify(users_data), 200
    except Exception as e:
        print("back error: ", e)
        return jsonify({'error': str(e)}), 500



@app.route('/api/complaints/status/<complaint_id>', methods=['GET'])
def get_complaint_status(complaint_id):
    db = initialize_firebase()
    try:
        complaint_doc = db.collection('complaints').document(complaint_id).get()
        if complaint_doc.exists:
            complaint_data = complaint_doc.to_dict()
            return jsonify(complaint_data), 200
        else:
            return jsonify({'error': 'Complaint not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/complaints/<complaint_id>/quotes', methods=['POST'])
def add_quote(complaint_id):
    db = initialize_firebase()
    try:
        quote_data = request.json
        user = quote_data.get('userEmail')
        rate = quote_data.get('rate')
        message = quote_data.get('message')

        complaint_ref = db.collection('complaints').document(complaint_id)
        existing_quotes = complaint_ref.collection('quotes').where('user', '==', user).get()
        if len(existing_quotes) > 0:
            return jsonify({'error': 'User has already quoted for this complaint'}), 400

        quotes_ref = complaint_ref.collection('quotes')
        quotes_ref.add({
            'user': user,
            'rate': rate,
            'message': message
        })

        return jsonify({'message': 'Quote added successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/api/complaints/posted', methods=['GET'])
def get_vendorcomplaints():
    db = initialize_firebase()
    try:
        vendor_type = request.args.get('vendor_type')
        if not vendor_type:
            return jsonify({'error': 'Vendor type is required'}), 400

        complaints_ref = db.collection('complaints')
        query = complaints_ref.where('vendorCategory', '==', vendor_type).where('status', '==', 'Job Posted').stream()

        complaints = []
        for complaint in query:
            complaints.append({
                'id': complaint.id,
                **complaint.to_dict()
            })

        return jsonify(complaints), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/complaints/<complaint_id>/allquotes', methods=['GET'])
def get_quotes(complaint_id):
    db = initialize_firebase()
    try:
        
        quotes_ref = db.collection('complaints').document(complaint_id).collection('quotes').stream()
        quotes = [{"id": doc.id, **doc.to_dict()} for doc in quotes_ref]
        return jsonify({'quotes': quotes}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/api/complaints/<complaint_id>/assign-vendor', methods=['POST'])
def assign_vendor(complaint_id):
    try:
        db = initialize_firebase()
        complaint_ref = db.collection('complaints').document(complaint_id)
        
        selected_vendor = request.json.get('selectedVendor')
        
        if not selected_vendor:
            return jsonify({'error': 'Selected vendor is required'}), 400

        complaint_ref.update({
            'assignedVendor': selected_vendor,
            'status': 'Vendor Assigned',  
        })
        
        vendors_ref = db.collection('Vendors')
        vendor_query = vendors_ref.where('email', '==', selected_vendor).limit(1).get()
        
        for vendor_doc in vendor_query:
            vendor_ref = vendors_ref.document(vendor_doc.id)
            vendor_ref.update({
                'assignedComplaint': complaint_id
            })

        return jsonify({'message': 'Vendor assigned successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/api/complaints/vendor-assigned/<user_email>', methods=['GET'])
def get_vendor_assigned_complaints(user_email):
    db = initialize_firebase()
    try:
        
        complaints_ref = db.collection('complaints')
        query = complaints_ref.where('status', '==', 'Vendor Assigned').where('assignedVendor', '==', user_email).get()
        
        complaints = []
        for complaint in query:
            complaints.append({
                'id': complaint.id,
                **complaint.to_dict()
            })
        
        return jsonify(complaints), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/complaints/<complaint_id>/complete-job', methods=['POST'])
def complete_job(complaint_id):
    db = initialize_firebase()
    try:
        complaint_ref = db.collection('complaints').document(complaint_id)
       
        bill_amount = request.json.get('billAmount')

        complaint_ref.update({
            'status': 'Job Completed',
            'billAmount': bill_amount
        })

        return jsonify({'message': 'Complaint status updated to Job Completed'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    

@app.route('/api/complaints/<complaint_id>/resolve', methods=['PUT'])
def resolve_complaint(complaint_id):
    try:
        db = initialize_firebase()
        complaint_ref = db.collection('complaints').document(complaint_id)
        
        # Update the complaint document with the status
        complaint_ref.update({
            'status': 'Resolved',
            'billDisposed': True  # Mark the bill as disposed
        })

        return jsonify({'message': 'Complaint status updated to Resolved'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/api/complaints/<complaint_id>/withdraw', methods=['PUT'])
def withdraw_complaint(complaint_id):
    try:
        db = initialize_firebase()
        complaint_ref = db.collection('complaints').document(complaint_id)
        
        complaint_ref.update({
            'status': 'Withdrawn'
        })

        return jsonify({'message': 'Complaint Withdrawn'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/complaints/submitted', methods=['GET'])
def get_submitted_complaints():
    db = initialize_firebase()
    user_email = request.args.get('user_email')
    complaints = []
    # Query Firestore for complaints matching criteria
    complaint_ref = db.collection('complaints').where('complainant', '==', user_email).where('status', 'in', ["New", "HOD Approved", "Principal Approved", "Job Posted", "Vendor Assigned", "Job Completed"]).get()
    for doc in complaint_ref:
        complaint_data = doc.to_dict()
        complaint_data['id'] = doc.id  # Add document ID to the complaint data
        complaints.append(complaint_data)
    return jsonify(complaints)



@app.route('/complaints/reverted', methods=['GET'])
def get_reverted_complaints():
    db = initialize_firebase()
    user_email = request.args.get('user_email')
    complaints = []
    # Query Firestore for complaints matching criteria
    complaint_ref = db.collection('complaints').where('complainant', '==', user_email).where('status', 'in', ["HOD Reverted", "Principal Reverted"]).get()
    for doc in complaint_ref:
        complaint_data = doc.to_dict()
        complaint_data['id'] = doc.id  # Add document ID to the complaint data
        complaints.append(complaint_data)
    return jsonify(complaints)


@app.route('/complaints/declined', methods=['GET'])
def get_declined_complaints():
    db = initialize_firebase()
    user_email = request.args.get('user_email')
    complaints = []
    # Query Firestore for complaints matching criteria
    complaint_ref = db.collection('complaints').where('complainant', '==', user_email).where('status', 'in', ["HOD Declined", "Principal Declined"]).get()
    for doc in complaint_ref:
        complaint_data = doc.to_dict()
        complaint_data['id'] = doc.id  # Add document ID to the complaint data
        complaints.append(complaint_data)
    return jsonify(complaints)


@app.route('/complaints/resolved', methods=['GET'])
def get_resolved_complaints():
    db = initialize_firebase()
    user_email = request.args.get('user_email')
    complaints = []
    # Query Firestore for complaints matching criteria
    complaint_ref = db.collection('complaints').where('complainant', '==', user_email).where('status', 'in', ["Resolved"]).get()
    for doc in complaint_ref:
        complaint_data = doc.to_dict()
        complaint_data['id'] = doc.id  # Add document ID to the complaint data
        complaints.append(complaint_data)
    return jsonify(complaints)


@app.route('/api/add_history', methods=['POST'])
def add_complaint_history():
    db = initialize_firebase()
    data = request.json
    email = data.get('email')
    userType = data.get('userType')
    complaint_detail = {
        'id': data.get('id'),
        'date': data.get('date'),
        'category': data.get('category'),
        'action': data.get('action')
    }

    if not email:
        return jsonify({'error': 'Email is required'}), 400

    # Query Firestore to find the user document with the matching email
    user_ref = db.collection(userType+'s').where('email', '==', email).get()

    # Check if any document matches the query
    if not user_ref:
        return jsonify({'error': 'User not found'}), 404

    # Since email should be unique, we can directly access the first document
    user_doc = user_ref[0].reference

    # Add the complaint detail to the 'history' subcollection of the user document
    user_doc.collection('history').add(complaint_detail)

    return jsonify({'message': 'Complaint history added successfully'}), 200


@app.route('/api/get_history', methods=['POST'])
def get_complaint_history():
    db = initialize_firebase()
    data = request.json
    email = data.get('email')
    userType = data.get('userType')

    if not email:
        return jsonify({'error': 'Email is required'}), 400

    # Query Firestore to find the user document with the matching email
    user_ref = db.collection(userType + 's').where('email', '==', email).get()

    # Check if any document matches the query
    if not user_ref:
        return jsonify({'error': 'User not found'}), 404

    # Since email should be unique, we can directly access the first document
    user_doc = user_ref[0].reference

    # Get all complaints from the 'history' subcollection of the user document
    complaints = []
    for complaint in user_doc.collection('history').stream():
        complaints.append(complaint.to_dict())

    return jsonify(complaints), 200



if __name__ == '__main__':
    app.run(debug=True)
