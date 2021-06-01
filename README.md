![banner](https://user-images.githubusercontent.com/19692245/115225089-1e5add80-a127-11eb-8585-3ef56d46a7ba.jpg)
<h4 align="center">
Complete Web App for taking online attendance using AI based Facial Recognition. Designed from scratch using React + Tailwind with Python backend. OpenCV used for Face detection and recognition.
<br>
</br>


## Setup

### 1. Install Front-end

To run the front-end:

- Clone the repository. 

- Navigate to the cloned repository and install dependencies by running: 
```sh
npm install
```
- Now, start the server
```sh
npm start
```

### 2. Install Back-end

- The project requires python 3.7. Other versions may create issues.

- Install MongoDB using their documentation and start the MongoDB server.

- Navigate to `backend/` folder and install the python dependencies:
```sh
pip install -r requirements.txt
```
- Run main.py

### 3. Connect front-end to back-end

- Note the local host url the backend server is running at (as given in the terminal output). 
Paste this url in `config/api.js` eg: 
```sh
// End point of your flask api.
export const apiEndPoint = 'http://127.0.0.1:5000/';
```



## Preview

<img width="1439" alt="1login" src="https://user-images.githubusercontent.com/19692245/120232315-c27a8d00-c26c-11eb-8d74-04dc8da8e3ab.png">

<img width="1440" alt="1home" src="https://user-images.githubusercontent.com/19692245/120232422-fd7cc080-c26c-11eb-9e28-2be85a2c81c5.png">

<img width="1439" alt="1new" src="https://user-images.githubusercontent.com/19692245/120232458-0a011900-c26d-11eb-8237-9ebd7a4dcf10.png">

<img width="1440" alt="1sessions" src="https://user-images.githubusercontent.com/19692245/120232470-0ff6fa00-c26d-11eb-88f9-7eaf50ae7079.png">

<img width="1440" alt="1 1home" src="https://user-images.githubusercontent.com/19692245/120232487-15544480-c26d-11eb-95d5-98537b43e48c.png">

<img width="1440" alt="1mark2" src="https://user-images.githubusercontent.com/19692245/120232601-53e9ff00-c26d-11eb-98b9-b845aaf6225e.png">

<img width="1440" alt="1mark3" src="https://user-images.githubusercontent.com/19692245/120233197-ad066280-c26e-11eb-94e8-e94f96bb93f2.png">


## WorkFlow

- User(Teacher) signs in.
- Teacher creates a new course by giving information, and dataset.
- Dataset includes a folder having pictures of students enrolled in the course, shot by their webcams. 
- Upon creation, the data is sent to the backend and model is trained for the given course.
- To take attendence, the teacher starts a new session of the course. 
- A unique code is generated which teacher sends out to the students.
- Students navigate to `/markattendence` page and paste the code. 
- Students are then shown a page where they allow webcam, capture a shot and mark attendence. Using the trained model, their attendance is marked.
- Teacher can download attendence reports of a course in form of csv from the sessions page. 
