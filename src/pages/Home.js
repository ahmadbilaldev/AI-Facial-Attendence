import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.js';
import { Link, useHistory } from 'react-router-dom';
import { getCourses, getAttendenceCode, deleteAttendenceCode } from '../Api/Requests';
import jwtDecode from 'jwt-decode';

function Home() {
	// States
	const [courses, setCourses] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [generatedCode, setGeneratedCode] = useState('');
	const history = useHistory();

	function validateUserLogin() {
		try {
			const token = localStorage.getItem('token');
			if (token) {
				const currentUser = jwtDecode(token);
				console.log(currentUser);
				setCurrentUser(currentUser);
				return currentUser;
			} else {
				let path = `/login`;
				history.push(path);
			}
		} catch (error) {}
	}

	const loadCourses = async (currentUser) => {
		try {
			const { data } = await getCourses(currentUser._id);
			setCourses(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	async function generateCode(courseId) {
		try {
			let { data } = await getAttendenceCode(courseId);
			setGeneratedCode(data);
			console.log(generatedCode);
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteCode(courseId) {
		try {
			await deleteAttendenceCode(courseId);
			setGeneratedCode('');
		} catch (error) {}
	}

	useEffect(() => {
		let validatedUser = validateUserLogin();
		loadCourses(validatedUser);
	}, []);
	return (
		<>
			<Navbar />
			<div className="relative md:ml-64">
				<Header />
				<div className="relative bg-purple-800 md:pt-32 pb-32 pt-12">
					<div className="w-full pr-4 mb-16 max-w-full flex-grow flex-auto">
						<span className="flex justify-center uppercase text-white hover:text-yellow-500 mr-0 whitespace-no-wrap text-3xl font-bold px-0">
							Current Classes
						</span>
						<span className="flex justify-center text-white mr-0 whitespace-no-wrap text-sm pt-2">
							Current courses will be showed here
						</span>
					</div>
					<div className="flex flex-wrap">
						{courses.map((course, index) => (
							<div className="w-full lg:w-6/12 xl:w-6/12 px-4 py-4" id={index}>
								<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
									<div className="flex-auto p-4">
										<div className="flex flex-wrap">
											<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
												<h5 className="text-gray-800 uppercase font-bold text-lg">
													{course.name}
												</h5>
												<span className="mt-4 text-sm text-grey-500">
													{course.numberOfStudents} Students
												</span>
												<p className="mt-8">
													{generatedCode.courseID === course._id ? null : (
														<button
															className="bg-purple-800 text-white uppercase rounded p-2 font-bold text-base transition duration-300 hover:bg-yellow-500"
															onClick={() => generateCode(course._id)}
														>
															Start session
														</button>
													)}
													{generatedCode.courseID === course._id ? (
														<div class="flex text-center flex-col items-center justify-center mt-6 mb-4">
															<label class="flex flex-col mt-6">
																<span class="text-gray-600 font-semibold">
																	Attendence Code
																</span>
																<span class="text-gray-600 font-light">
																	Share the code with the class. Students should paste
																	this code on the '/markattendence' page to to mark
																	attendence.
																</span>
																<input
																	type="text"
																	readOnly
																	class="form-input mt-4 text-center focus:border-purple-800 rounded"
																	value={generatedCode.attendanceCode}
																/>
															</label>

															<label class="flex flex-col items-center px-4 py-6 mt-2 rounded text-gray-600 border border-gray-500 cursor-pointer hover:text-purple-600 hover:border-purple-600">
																<svg
																	class="w-8 h-8"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		stroke-width="2"
																		d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
																	></path>
																</svg>
																<span class="mt-1 font-semibold">Copy Code</span>
															</label>
															<button
																class="mt-6 flex flex-col items-center px-2 py-4 rounded text-white cursor-pointer bg-purple-800 transition duration-300 hover:text-yellow-400 focus:border-white"
																onClick={() => deleteCode(course._id)}
															>
																<span class="font-semibold uppercase">End Session</span>
															</button>
														</div>
													) : null}
												</p>
											</div>

											<div className="relative w-auto pl-4 flex-initial">
												<div className=" p-3 text-center inline-flex items-center justify-center w-16 h-16">
													<svg
														class="w-16 h-16"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
														></path>
													</svg>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
export default Home;
