import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home.js';
import NewClass from './pages/NewClass.js';
import Sessions from './pages/Sessions.js';

function App() {
	return (
		<>
			{/* ROUTES */}
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/newclass" component={NewClass} />
				<Route path="/sessions" component={Sessions} />
			</Switch>
		</>
	);
}

export default App;
