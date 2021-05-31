import React, { useRef, useState } from 'react';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.js';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import { postAttendenceCode, postMarkAttendence } from '../Api/Requests.js';

function MarkAttendence() {
	const webcamRef = useRef(null);
	const [imgSrc, setImgSrc] = useState(null);
	const [regNumber, setRegNumber] = useState('');
	const [attendenceCode, setAttendenceCode] = useState('');
	const [validateCode, setValidateCode] = useState({});

	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImgSrc(imageSrc);
	}, [webcamRef, setImgSrc]);

	const markAttendance = async (e) => {
		e.preventDefault();
		// creating formdata
		let data = new FormData();
		// Convert base 64 image to blob, otherwise model wont recognize
		const blob = await fetch(imgSrc).then((res) => res.blob());
		// const blob = imgSrc;
		console.log(imgSrc);
		data.append(regNumber, blob);

		try {
			const { data: res } = await postMarkAttendence(validateCode._id, regNumber, data);
			console.log(res);
			if (res == 0) {
				alert('Attendence is not marked');
			} else {
				alert('Attendence is marked');
			}
		} catch (error) {
			console.log(error);
			alert('Attendence is not marked');
		}
	};

	async function triggerValidateCode() {
		try {
			let { data } = await postAttendenceCode({ attendanceCode: attendenceCode });
			setValidateCode(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<Navbar />
			<div className="relative md:ml-64 p-1">
				<Header />
				<div className="relative bg-gradient-to-r from-gray-800 to-purple-900 md:pt-32 pb-32 pt-12 rounded-2xl">
					{/* Card */}
					<div className="flex flex-wrap">
						<div className="w-full px-10">
							<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
								<div className="flex-auto p-4">
									<div className="flex flex-wrap">
										<div className=" w-full pr-4 max-w-full flex-grow flex-auto">
											<span className="flex justify-center uppercase text-purple-800 hover:text-yellow-500 mr-0 whitespace-no-wrap text-3xl font-bold p-4 px-0">
												Mark Attendence
											</span>
										</div>
									</div>
									{validateCode._id ? null : (
										<div class="flex flex-col px-80 mt-6 mb-4">
											<label class="flex flex-col justify-center" id="code">
												<span class="text-gray-600 font-semibold">Enter Attendence Code</span>
												<input
													type="text"
													id="code"
													class="form-input mt-2 block focus:border-purple-800 rounded"
													onChange={(e) => setAttendenceCode(e.target.value)}
												/>
											</label>

											<button
												class="mt-6 flex flex-col items-center px-2 py-4 rounded text-white cursor-pointer bg-purple-800 hover:bg-yellow-500 focus:border-white"
												onClick={() => triggerValidateCode()}
											>
												<span class="font-semibold uppercase">Next</span>
											</button>
										</div>
									)}

									{/* asd */}
									{validateCode._id ? (
										<div class="flex flex-col px-80 mt-6 mb-4">
											<label class="flex flex-col justify-center">
												<span class="text-gray-600 font-semibold">Class/Course Name</span>
												<input
													type="text"
													readOnly
													class="form-input mt-2 block focus:border-purple-800 rounded"
													value={validateCode.name}
												/>
											</label>

											<label class="flex flex-col mt-6">
												<span class="text-gray-600 font-semibold">Take Photo</span>
												<span class="text-gray-600 font-light">
													Click to take picture and mark attendence. Make sure webcam is
													allowed for browser.
												</span>
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
														d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
													></path>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
													></path>
												</svg>
												<span className="mt-1 mb-2 font-semibold">Take Photo</span>
												<div className="text-center">
													<Webcam
														audio={false}
														ref={webcamRef}
														screenshotFormat="image/jpeg"
													/>
													<button onClick={capture}></button>
													{/* Show Screenshot. Which is loaded in imgSrc */}
													{imgSrc && <img src={imgSrc} />}
													{imgSrc && (
														<span className="text-center font-semibold">
															Captured Photo
														</span>
													)}
												</div>
											</label>
											<label class="flex flex-col mt-6">
												<span class="text-gray-600 font-semibold">Registration Number: </span>
												<input
													type="text"
													onChange={(e) => setRegNumber(e.target.value)}
													class="form-input mt-2 block focus:border-purple-800 rounded"
													placeholder=""
												/>
											</label>
											<button
												class="mt-6 flex flex-col items-center px-2 py-4 rounded text-white cursor-pointer bg-purple-800 hover:bg-yellow-500 focus:border-white"
												onClick={(e) => markAttendance(e)}
											>
												<span class="font-semibold uppercase">Mark Present</span>
											</button>
										</div>
									) : null}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default MarkAttendence;
