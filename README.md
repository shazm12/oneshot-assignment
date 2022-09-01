<h1 align='center'>OneShot.ai Assignment</h1>

# Client 
![image](https://user-images.githubusercontent.com/64892076/187855824-5e8a03c4-6f79-4b61-bea1-c5267b614e06.png)

The client is built using :-
1. React
2. Recharts
3. Ant Design

# Backend
The backend is built using :-
1. Node
2. Mongoose

We used **Axios** as HTTP Client to communicate with backend via frontend to get the required data.

## Usage
### Client
The client side is deployed on this [link](https://63105c2e01ad3a309a0edf00--lively-cucurucho-2064d6.netlify.app/).

### Backend
The backend is deployed on this [link](https://oneshot-api.herokuapp.com/).

The backend provides the following routes - 

For ``` /college ``` -

1. ``` /getColleges``` - Get all colleges. GET - (No req data)
2. ``` /getCollegeById ```  - Get college by ID. POST  - (id: college_id)
3. ```/getCollegeByName ``` - Get college by name. POST - (name: college_name)

For ```/student``` - 

1. ```/getStudentByCollegeId``` - Get all students by College ID. POST - (collegeId: college_id)
2. ```/getStudentByName``` - Get a student by name. POST - (name: student_name)

# Project Done By

Shamik Bera 19BCE2699
