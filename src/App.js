import { Switch, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import './assets/styles/main.css';
import './assets/styles/responsive.css';
import Auth from './components/layout/auth';
import Admin from './components/layout/admin';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'antd/dist/antd.css';
export const client = new ApolloClient({
	uri: 'https://howmuchbackend.herokuapp.com/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<div className='App'>
			<ApolloProvider client={client}>
				<Switch>
					{0 ? <Admin /> : <Auth />}
					<Redirect from='/' to='/admin/dashboard' />
				</Switch>
			</ApolloProvider>
		</div>
	);
}

export default App;
