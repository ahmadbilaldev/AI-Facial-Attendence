import axios from 'axios';
import { apiEndPoint } from '../Config/api.js';

export const postCreateCourse = async (body) => {
	return await axios.post(`${apiEndPoint}/course`, body);
};

export const postTrainModel = async (courseId, body) => {
	return await axios.post(`${apiEndPoint}/trainModel/${courseId}`, body);
};

export const getCourses = async (teacherId) => {
	return await axios.get(`${apiEndPoint}/courses/${teacherId}`);
};

export const postMarkAttendence = async (courseId, regNumber, body) => {
	return await axios.post(`${apiEndPoint}/attendance/${regNumber}/${courseId}`, body);
};

export const postUserRegister = async (body) => {
	return await axios.post(`${apiEndPoint}/teacher`, body);
};

export const getUserLogin = async (body) => {
	return await axios.get(`${apiEndPoint}/teacher/${body.email}/${body.password}`);
};

export const getAttendenceCode = async (courseId) => {
	return await axios.get(`${apiEndPoint}/attendanceCode/${courseId}`);
};

export const deleteAttendenceCode = async (courseId) => {
	return await axios.delete(`${apiEndPoint}/attendanceCode/${courseId}`);
};
// Validate attendence code
export const postAttendenceCode = async (body) => {
	return await axios.post(`${apiEndPoint}/attendanceCode`, body);
};

export const getCourseAttendence = async (courseId) => {
	return await axios.get(`${apiEndPoint}/courseAttendance/${courseId}`);
};
