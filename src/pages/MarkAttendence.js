import React, { useRef, useState } from 'react';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.js';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import { postAttendenceCode, postMarkAttendence } from '../Api/Requests.js';

	const webcamRef = useRef(null);
	const [imgSrc, setImgSrc] = useState(null);
	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImgSrc(imageSrc);
	}, [webcamRef, setImgSrc]);

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
