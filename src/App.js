import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import 'assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/scss/argon-dashboard-react.scss';

import AdminLayout from 'layouts/Admin.js';
import AuthLayout from 'layouts/Auth.js';
import { useSelector } from 'react-redux';

const App = ()=> {
	const { uid } = useSelector(state => state.authUser);
	return (
		<BrowserRouter>
			{uid && uid ? (
				<Switch>
					<Route
						path='/admin'
						render={props => <AdminLayout {...props} />}
					/>

					<Redirect from='/' to='/admin/index' />
				</Switch>
			) : (
				<Switch>
					<Route
						path='/auth'
						render={props => <AuthLayout {...props} />}
					/>
					<Redirect from='/' to='/auth/login' />
				</Switch>
			)}
		</BrowserRouter>
	);
}

export default App;