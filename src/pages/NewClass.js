import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.js';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { postCreateCourse, postTrainModel } from '../Api/Requests';
import jwtDecode from 'jwt-decode';

function NewClass(props) {
	// States
	const [currentUser, setCurrentUser] = useState('');
	const [courseName, setCourseName] = useState('');
	const [studentNumber, setStudentNumber] = useState('');
	const [images, setImages] = useState('');
	const history = useHistory();

	const modelImages = (event) => {
		let images = [];
		for (var i = 0; i < event.target.files.length; i++) {
			images[i] = event.target.files.item(i);
		}
		images = images.filter((image) => image.name.match(/\.(jpg|jpeg|png|gif)$/));
		let message = `${images.length} valid image(s) selected`;
		alert(message);
		console.log(images[0]);
		setImages(images);
	};

	function validateUserLogin() {
		try {
			const token = localStorage.getItem('token');
			if (token) {
				const currentUser = jwtDecode(token);
				console.log(currentUser);
				setCurrentUser(currentUser);
			} else {
				let path = `/login`;
				history.push(path);
			}
		} catch (error) {
			console.log(error);
		}
	}

	const trainModel = async (courseId) => {
		// creating formdata
		let data = new FormData();
		images.map((image) => {
			data.append(image.name, image);
		});

		try {
			const { data: res } = await postTrainModel(courseId, data);
			// console.log(res);
			let path = `/`;
			history.push(path);
		} catch (error) {
			console.log(error);
		}
	};

	async function createClass(e) {
		e.preventDefault();
		let body = {
			name: courseName,
			numberOfStudents: studentNumber,
			teacherId: currentUser._id,
		};

		try {
			const { data } = await postCreateCourse(body);
			let courseId = data._id;
			console.log(data);
			await trainModel(courseId);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		validateUserLogin();
	}, []);
	return (
		<>
			<Navbar />
			<div className="relative md:ml-64 p-1">
				<Header />
				<div className="relative bg-gradient-to-r from-gray-800 to-purple-900  md:pt-32 pb-32 pt-12 rounded-2xl">
					{/* Card */}
					<div className="flex flex-wrap">
						<div className="w-full px-10">
							<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
								<div className="flex-auto p-4">
									<div className="flex flex-wrap">
										<div className=" w-full pr-4 max-w-full flex-grow flex-auto">
											<span className="flex justify-center uppercase text-purple-800 hover:text-yellow-500 mr-0 whitespace-no-wrap text-3xl font-bold p-4 px-0">
												Create a new class
											</span>
										</div>
									</div>
									<div class="flex flex-col px-80 mt-6 mb-4">
										<label class="flex flex-col justify-center">
											<span class="text-gray-600 font-semibold">Class/Course Name</span>
											<input
												type="text"
												onChange={(e) => setCourseName(e.target.value)}
												class="form-input mt-2 block focus:border-purple-800 rounded"
												placeholder="eg: CS-311 Artificial Intelligence"
											/>
										</label>
										<label class="flex flex-col mt-6">
											<span class="text-gray-600 font-semibold">
												Number of students in Class/Course
											</span>
											<input
												type="number"
												onChange={(e) => setStudentNumber(e.target.value)}
												class="form-input mt-2 block focus:border-purple-800 rounded"
												placeholder=""
											/>
										</label>

										<label class="flex flex-col mt-6">
											<span class="text-gray-600 font-semibold">Students Data</span>
											<span class="text-gray-600 font-light">
												Upload a zip file, having images of each student in seperate folders and
												their names should be the student roll numbers.
											</span>
										</label>

										<label class="flex flex-col items-center px-4 py-6 mt-2 rounded text-gray-600 border border-gray-500 cursor-pointer hover:text-purple-600 hover:border-purple-600">
											<svg
												class="w-8 h-8"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
											>
												<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
											</svg>
											<span class="mt-1 font-semibold">Choose a file</span>
											<input
												type="file"
												multiple
												class="hidden"
												onChange={(e) => modelImages(e)}
											/>
										</label>
										<button
											class="mt-6 flex flex-col items-center px-2 py-4 rounded text-white cursor-pointer bg-purple-800 hover:bg-yellow-500 focus:border-white"
											onClick={(e) => createClass(e)}
										>
											<span class="font-semibold uppercase">Save</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default NewClass;
