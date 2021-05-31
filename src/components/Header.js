import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<>
			{/* Navbar */}
			<nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
				<div className="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
					{/* Brand */}
					<Link className="text-white text-sm uppercase hidden lg:inline-block font-semibold" to="/">
						{/* Dashboard */}
					</Link>
					{/* User */}
					<ul className="flex-col md:flex-row list-none items-center md:flex text-white text-sm uppercase lg:inline-block font-semibold"></ul>
				</div>
			</nav>
			{/* End Navbar */}
		</>
	);
}
