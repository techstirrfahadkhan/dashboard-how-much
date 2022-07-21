import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import './assets/styles/main.css';
import './assets/styles/responsive.css';
import Auth from './components/layout/auth';
import Admin from './components/layout/admin';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'antd/dist/antd.css';
import { UserContext } from './context/userContext';

export const client = new ApolloClient({
	uri: 'https://howmuchbackend.herokuapp.com/graphql',
	cache: new InMemoryCache(),
});

function App() {
	const userData = JSON.parse(localStorage.getItem('user'));

	const [user, setUser] = React.useState(userData);

	return (
		<div className='App'>
			<UserContext.Provider value={{ user, setUser }}>
				<ApolloProvider client={client}>
					<Switch>
						{user?.email === 'admin' ? <Admin /> : <Auth />}
						<Redirect from='/' to='/admin/products' />
					</Switch>
				</ApolloProvider>
			</UserContext.Provider>
		</div>
	);
}

export default App;
