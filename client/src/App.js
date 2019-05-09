import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';

import './App.css';

import Login from './components/auth/Login';
import Users from './components/users/Users';
import Signup from './components/auth/Signup';

function App(props) {
	const logout = () => {
		localStorage.removeItem('jwt');
		props.history.push('/login');
	};

	return (
		<div className="App">
			<nav>
				<NavLink to="/register">Sign-up</NavLink>
				<NavLink to="/login">Login</NavLink>
				<button onClick={logout}>Logout</button>
				<NavLink to="/users">Users</NavLink>
			</nav>
			<main>
				<Route path="/register" component={Signup} />
				<Route path="/login" component={Login} />
				<Route path="/users" component={Users} />
			</main>
		</div>
	);
}

export default withRouter(App);
