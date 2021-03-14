import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.js';
import Table from '../components/Table.js';
import { Link, useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { getCourses, getAttendenceCode, deleteAttendenceCode } from '../Api/Requests';

function Sessions() {
	const [courses, setCourses] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
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
					{/* Card */}
					<div className="flex flex-wrap">
						<div className="w-full px-10">
							<div className="relative flex flex-col min-w-0 break-words bg-white rounded rounded-b-none mb-6 xl:mb-0 shadow-lg">
								<div className="flex-auto p-4">
									<div className="flex flex-wrap">
										<div className=" w-full pr-4 max-w-full flex-grow flex-auto">
											<span className="flex justify-center uppercase text-purple-800 hover:text-yellow-500 mr-0 whitespace-no-wrap text-3xl font-bold p-4 px-0">
												Sessions
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Card */}
					<div className="flex flex-wrap">
						<div className="w-full px-10">
							<div className="relative flex flex-col min-w-0 break-words bg-white rounded rounded-t-none mb-6 xl:mb-0 shadow-lg">
								<div className="flex-auto p-4">
									<div className="flex flex-wrap">
										<div className=" w-full pr-4 max-w-full flex-grow flex-auto">
											<span className="flex justify-center uppercase text-purple-800 mr-0 whitespace-no-wrap text-3xl font-bold p-4 px-0">
												{/*Table*/}
												<Table data={courses} />
											</span>
										</div>
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
export default Sessions;
