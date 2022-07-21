import { Layout } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';
import adminRoutes from '../../routes/adminRoutes';
import React from 'react';
import Sidenav from './Sidenav';
const Admin = () => {
	const getRoutes = routes => {
		return routes.map((prop, key) => {
			if (prop.layout === '/admin') {
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

	const { Sider, Content } = Layout;
	return (
		<Layout>
			<Sider theme='light' className='sider-layout'>
				{' '}
				<Sidenav />
			</Sider>
			<Layout className='site-layout' style={{ marginLeft: 200 }}>
				<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
					<Switch>
						{getRoutes(adminRoutes)}
						<Redirect from='*' to='/admin/products' />
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
};
export default React.memo(Admin);
