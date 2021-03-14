import React from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
	const webcamRef = React.useRef(null);
	const [imgSrc, setImgSrc] = React.useState(null);

	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImgSrc(imageSrc);
	}, [webcamRef, setImgSrc]);

	return (
		<>
			<Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
			<button onClick={capture}>Capture photo</button>
			{imgSrc && <img src={imgSrc} />}
		</>
	);
};

export default WebcamCapture;
