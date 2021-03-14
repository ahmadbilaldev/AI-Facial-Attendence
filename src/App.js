import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home.js';
import NewClass from './pages/NewClass.js';
import Sessions from './pages/Sessions.js';
import MarkAttendence from './pages/MarkAttendence.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

function App() {
	return (
		<>
			{/* ROUTES */}
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/newclass" exact component={NewClass} />
				<Route path="/sessions" exact component={Sessions} />
				<Route path="/markattendence" exact component={MarkAttendence} />
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
			</Switch>
		</>
	);
}

export default App;
