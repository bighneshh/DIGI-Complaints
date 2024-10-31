
# DIGI-Complaints

**DIGI-Complaints** is an Online Complaint Management System designed to centralize and streamline the process of managing complaints and grievances across various organizations. This platform allows users to submit complaints online, track their progress, and receive updates on the resolution status. It also enhances organizational efficiency by coordinating the complaint-solving process, reducing redundancy, and promoting transparency.

## Table of Contents

- [Introduction](#introduction)
- [Objectives](#objectives)
- [Motivation](#motivation)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Technologies Used](#technologies-used)
- [Installation Guide](#installation-guide)
- [Usage](#usage)
- [Contributors](#contributors)
- [Acknowledgements](#acknowledgements)
- [Future Scope](#future-scope)

---

## Introduction

In today’s digital era, managing customer and user complaints efficiently is crucial for organizational transparency and satisfaction. DIGI-Complaints offers a centralized digital platform where complaints from diverse categories are systematically tracked and resolved without requiring the complainant to visit any physical office. This online system enables users to submit complaints, track their status, and get real-time updates.

## Objectives

The main objectives of DIGI-Complaints are to:

- **Streamline Complaint Handling**: Facilitate easier coordination, monitoring, and resolution of complaints.
- **Enhance Transparency and Accountability**: Provide visibility into the complaint status and assign responsibility across organizational levels.
- **Optimize Resources**: Reduce operational costs and improve efficiency in handling complaints through a standardized digital approach.

## Motivation

DIGI-Complaints was developed to provide users with an efficient and transparent platform for lodging complaints and receiving resolutions without needing to navigate complex bureaucracies. The project aims to minimize corruption by creating a public forum that promotes accountability and ensures users’ complaints are resolved effectively.

## Features

- **User Registration and Authentication**: Allows multiple types of users (e.g., general users, department heads, managers, vendors, and admins) to register, log in, and manage their profiles.
- **Complaint Management**: Submit, track, and manage complaints with categorization for various issues (e.g., facility issues, service delays).
- **Role-Based Dashboards**:
  - **User Dashboard**: Submit and track complaints.
  - **Department Head Dashboard**: Approve, decline, or revert complaints.
  - **Manager Dashboard**: Manage complaints approved by department heads, categorize complaints, and set budgets.
  - **Operations Dashboard**: Issue tenders to vendors based on complaints needing funding.
  - **Vendor Dashboard**: Submit quotes, work on complaints, and submit invoices for completed work.
  - **Admin Dashboard**: Manage user verification and view feedback.
- **Data-Driven Insights**: Analyze complaint data to identify trends and recurring issues.
- **Budget Management**: Set and monitor budgets for resolving specific complaints requiring financial resources.

## System Architecture

DIGI-Complaints follows a multi-tier architecture consisting of the following modules:

1. **Frontend**: Built with React.js, ensuring a user-friendly interface for different user roles.
2. **Backend**: Powered by Flask (Python) and Node.js for processing and handling various complaint-related requests.
3. **Database**: Google Firebase is used for database management, ensuring real-time data access and secure storage of complaint and user information.
4. **APIs**: RESTful APIs allow seamless interaction between the frontend and backend, as well as data exchange between different components.

## Technologies Used

- **Frontend**: React.js, JavaScript, CSS
- **Backend**: Python (Flask), Node.js
- **Database**: Google Firebase
- **Development Tools**: Visual Studio Code, MS Word, Google Chrome

## Installation Guide

### Prerequisites

- **Hardware**: Desktop or laptop with at least 8GB RAM, 128GB SSD, and 1TB HDD.
- **Software**: VS Code, Google Chrome, Python, Node.js

### Steps to Set Up the Project

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/DIGI-Complaints.git
    cd DIGI-Complaints
    ```

2. **Backend Setup**:
    - Install [Python](https://www.python.org/downloads/) and Flask.
    - Open a terminal in the project root and run:
      ```bash
      pip install -r requirements.txt
      ```

3. **Frontend Setup**:
    - Install [Node.js](https://nodejs.org/) and npm.
    - Navigate to the frontend folder and run:
      ```bash
      npm install
      npm start
      ```

4. **Database Configuration**:
    - Set up Google Firebase and link it with the project.
    - Update Firebase configuration in the backend’s `config.py` file.

---

## Usage

DIGI-Complaints is structured to accommodate multiple user roles, each having specific functionalities and dashboard interfaces. Here’s a guide on how different roles interact with the system:

1. **User**:
   - **Registration**: New users can sign up and create a profile with basic information.
   - **Complaint Submission**: Users can create complaints by specifying a category, date, and description.
   - **Track Complaint**: Users have a dashboard to view submitted complaints, their statuses, and any updates or reverts from authorities.

2. **Department Head**:
   - **Dashboard Overview**: Upon login, department heads can view complaints specific to their department.
   - **Complaint Management**: Department heads can approve, decline, or revert complaints based on their assessment. Approved complaints are escalated to the manager.

3. **Manager**:
   - **Approval and Budgeting**: Managers receive complaints approved by department heads. If a complaint requires funding, they can allocate a budget.
   - **Complaint Resolution**: Non-funding complaints can be resolved directly by the manager.

4. **Operations**:
   - **Vendor Management**: The operations team receives budgeted complaints and can assign them to registered vendors based on category and budget.
   - **Complaint Progress**: Once a vendor completes a job, the operations team approves the bill and marks the complaint as resolved.

5. **Vendor**:
   - **View Assigned Jobs**: Vendors can see complaints assigned to them and submit quotes for work.
   - **Job Completion**: After completing a job, vendors submit their invoices for approval.

6. **Admin**:
   - **User Verification**: Admins verify new users, department heads, managers, and operations team members to prevent unauthorized access.
   - **Feedback Management**: Admins can review feedback from users and respond as necessary.


## Contributors

This project was developed by a team of contributors committed to enhancing digital complaint management and organizational transparency.

## Acknowledgements

We would like to express our gratitude to:

- Our mentors for their guidance and support throughout the project.
- Our colleagues and team members for their collaborative efforts.
- The wider open-source community for providing invaluable resources and tools.

## Future Scope

DIGI-Complaints can be expanded in several ways to further enhance its functionality:

1. **Multi-Channel Integration**: Incorporate support for multiple communication channels (e.g., email, social media) to create a more cohesive complaint management experience.
2. **AI and NLP Integration**: Employ AI-powered chatbots for initial complaint handling and inquiry responses, freeing up human resources for complex issues.
3. **Advanced Data Analytics**: Utilize data analytics and machine learning to analyze complaint patterns, identify recurring issues, and predict potential grievances.
4. **Mobile Application Development**: Extend the DIGI-Complaints platform to mobile devices to provide users with convenient access to complaint management on the go.
