// import { useState } from "react";
import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import adminRoutes from '../../routes/adminRoutes';

function Sidenav({ color }) {
	const { pathname } = useLocation();
	const page = pathname.replace('/', '');
	let active = '0';
	adminRoutes.forEach((route, index) => {
		if (route.layout + route.path === pathname) {
			active = index.toString();
		}
	});

	return (
		<>
			<div className='brand'>
				<h3 className='text-center'>How Much Dashboard</h3>
			</div>
			<hr />
			<Menu theme='light' mode='inline' defaultSelectedKeys={[active]}>
				{adminRoutes?.map((route, index) => (
					<Menu.Item key={index}>
						{' '}
						<NavLink
							to={route.layout + route.path}
							className='d-flex'
							style={{ fontSize: '.9rem' }}
						>
							<span
								className='icon child'
								style={{
									background: page === 'dashboard' ? color : '',
								}}
							>
								{route.icon}
							</span>
							<span className='label'>{route.name}</span>
						</NavLink>
					</Menu.Item>
				))}
				<p
					onClick={() => {
						localStorage.removeItem('user');
					}}
					style={{ textAlign: 'center', cursor: 'pointer', marginTop: '2rem' }}
				>
					<strong>Logout</strong>
				</p>
			</Menu>
		</>
	);
}

export default Sidenav;

// {
// 			<Menu theme='light' mode='inline'>
// 				<Menu.Item key='1'>
// 					<NavLink to='/admin/dashboard' className='d-flex'>
// 						<span
// 							className='icon child'
// 							style={{
// 								background: page === 'dashboard' ? color : '',
// 							}}
// 						>
// 							{dashboard}
// 						</span>
// 						<span className='label'>Dashboard</span>
// 					</NavLink>
// 				</Menu.Item>
// 				<Menu.Item key='2'>
// 					<NavLink to='/admin/products'>
// 						<span
// 							className='icon'
// 							style={{
// 								background: page === 'tables' ? color : '',
// 							}}
// 						>
// 							{tables}
// 						</span>
// 						<span className='label'>Products</span>
// 					</NavLink>
// 				</Menu.Item>
// 				<Menu.Item key='3'>
// 					<NavLink to='/admin/products-categories'>
// 						<span
// 							className='icon'
// 							style={{
// 								background: page === 'tables' ? color : '',
// 							}}
// 						>
// 							{tables}
// 						</span>
// 						<span className='label'>Products Categories</span>
// 					</NavLink>
// 				</Menu.Item>
// 				<Menu.Item key='4'>
// 					<NavLink to='/admin/services'>
// 						<span
// 							className='icon'
// 							style={{
// 								background: page === 'tables' ? color : '',
// 							}}
// 						>
// 							{tables}
// 						</span>
// 						<span className='label'>Services</span>
// 					</NavLink>
// 				</Menu.Item>
// 				<Menu.Item key='5'>
// 					<NavLink to='/admin/services-categories'>
// 						<span
// 							className='icon'
// 							style={{
// 								background: page === 'tables' ? color : '',
// 							}}
// 						>
// 							{tables}
// 						</span>
// 						<span className='label'>Services Categories</span>
// 					</NavLink>
// 				</Menu.Item>
// 				{/* <Menu.Item key='3'>
// 					<NavLink to='/billing'>
// 						<span
// 							className='icon'
// 							style={{
// 								background: page === 'billing' ? color : '',
// 							}}
// 						>
// 							{billing}
// 						</span>
// 						<span className='label'>Billing</span>
// 					</NavLink>
// 				</Menu.Item>
// 				<Menu.Item key='4'>
// 					<NavLink to='/rtl'>
// 						<span
// 							className='icon'
// 							style={{
// 								background: page === 'rtl' ? color : '',
// 							}}
// 						>
// 							{rtl}
// 						</span>
// 						<span className='label'>RTL</span>
// 					</NavLink>
// 				</Menu.Item>
// 				<Menu.Item className='menu-item-header' key='5'>
// 					Account Pages
// 				</Menu.Item>
// 				<Menu.Item key='6'>
// 					<NavLink to='/profile'>
// 						<span
// 							className='icon'
// 							style={{
// 								background: page === 'profile' ? color : '',
// 							}}
// 						>
// 							{profile}
// 						</span>
// 						<span className='label'>Profile</span>
// 					</NavLink>
// 				</Menu.Item>
// 				<Menu.Item key='7'>
// 					<NavLink to='/sign-in'>
// 						<span className='icon'>{signin}</span>
// 						<span className='label'>Sign In</span>
// 					</NavLink>
// 				</Menu.Item>
// 				<Menu.Item key='8'>
// 					<NavLink to='/sign-up'>
// 						<span className='icon'>{signup}</span>
// 						<span className='label'>Sign Up</span>
// 					</NavLink>
// 				</Menu.Item> */}
// 			</Menu>}
