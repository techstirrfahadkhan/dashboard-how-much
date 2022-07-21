import { Col, Row } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';
import authRoutes from '../../routes/authRoutes';

const Auth = () => {
	const getRoutes = routes => {
		return routes.map((prop, key) => {
			if (prop.layout === '/auth') {
				return (
					<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
					/>
				);
			} else {
				return null;
			}
		});
	};
	return (
		<Row>
			<Col>
				<Switch>
					{getRoutes(authRoutes)}
					<Redirect from='*' to='/auth/login' />
				</Switch>
			</Col>
		</Row>
	);
};
export default Auth;
