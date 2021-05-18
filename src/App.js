import React, { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import Home from './pages/home/home';
import Register from './pages/Auth/Register';
import { decodeToken, getToken } from './utils/token';
import { AuthContext } from './context/authContext';
import AllProducts from './pages/home/allProductos';

function App() {
	const { auth, setAuth } = useContext(AuthContext);

	useEffect(
		() => {
			const token = getToken();
			if (token) {
				const decode = decodeToken(token);
				setAuth(decode);
			}
		},
		[ setAuth ]
	);

	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="App">
					<Navbar />
					{!auth ? (
						<Switch>
							<Route exact path="/" component={Auth} />
							<Route exact path="/register" component={Register} />
						</Switch>
					) : (
						<Fragment>
							<Switch>
								<Route exact path="/" component={Home} />
							</Switch>
							<Switch>
								<Route exact path="/productos" component={AllProducts} />
							</Switch>
						</Fragment>
					)}
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
