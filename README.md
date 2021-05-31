![banner](https://user-images.githubusercontent.com/19692245/115225089-1e5add80-a127-11eb-8585-3ef56d46a7ba.jpg)
<h4 align="center">
Complete Web App for taking online attendance using AI based Facial Recognition.
<br>
</br>


## How To Use 

1. To run the front-end:

- Open your terminal and clone this repository. 
```sh
git clone https://github.com/ahmadbilaldev/AI-Facial-Attendance
```

- Navigate to the cloned repository and run the following command and wait until it is completed: 
```sh
npm install
```
- Now, start the server
```sh
npm start
```

## Preview

<img width="1440" alt="Screenshot 2021-04-19 at 2 09 27 PM" src="https://user-images.githubusercontent.com/19692245/115226464-b4dbce80-a128-11eb-9705-ac367494577b.png">

<img width="1440" alt="Create Class Page" src="https://user-images.githubusercontent.com/19692245/115225725-dc7e6700-a127-11eb-9052-10580f67275a.png">

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
