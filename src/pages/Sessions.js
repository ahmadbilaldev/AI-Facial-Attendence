import React from 'react';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.js';
import Table from '../components/Table.js';
import { Link } from 'react-router-dom';

function Sessions() {
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
												<Table />
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
