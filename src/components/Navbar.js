import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavbarDataTeacher, NavbarDataStudent } from './NavbarData';

function Navbar() {
	const [currentUser, setCurrentUser] = useState({});
	function validateUserLogin() {
		try {
			const token = localStorage.getItem('token');
			if (token) {
				const currentUser = jwtDecode(token);
				setCurrentUser(currentUser);
			}
		} catch (error) {}
	}

	useEffect(() => {
		validateUserLogin();
	}, []);
	return (
		<>
			<nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 rounded">
				<div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
					{/* Brand */}
					<Link
						className="md:block text-left md:pb-2 text-purple-800 hover:text-yellow-500 mr-0 inline-block whitespace-no-wrap text-2xl uppercase font-bold p-4 px-0"
						to="/"
					>
						Attendence Portal
					</Link>
					{/* Divider */}
					<hr className="my-4 md:min-w-full bg-purple-800" />
					<div
						className={
							'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-8 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded '
						}
					>
						{/* Navigation */}

						<ul className="md:flex-col md:min-w-full flex flex-col list-none">
							{currentUser._id
								? NavbarDataTeacher.map((item, index) => (
										<li className="items-center">
											<Link
												className="text-purple-800 hover:text-yellow-500 text-lg uppercase py-3 font-bold block items-center justify-between whitespace-nowrap space-x-3"
												to={item.path}
											>
												<span>{item.icon}</span>
												<span>{item.title}</span>
											</Link>
										</li>
								  ))
								: NavbarDataStudent.map((item, index) => (
										<li className="items-center">
											<Link
												className="text-purple-800 hover:text-yellow-500 text-lg uppercase py-3 font-bold block items-center justify-between whitespace-nowrap space-x-3"
												to={item.path}
											>
												<span>{item.icon}</span>
												<span>{item.title}</span>
											</Link>
										</li>
								  ))}
							{/* {!currentUser &&
								NavbarDataStudent.map((item, index) => (
									<li className="items-center">
										<Link
											className="text-purple-800 hover:text-yellow-500 text-lg uppercase py-3 font-bold block items-center justify-between whitespace-nowrap space-x-3"
											to={item.path}
										>
											<span>{item.icon}</span>
											<span>{item.title}</span>
										</Link>
									</li>
								))} */}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
export default Navbar;
