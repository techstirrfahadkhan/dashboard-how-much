import Home from '../pages/Home';
import Products from '../pages/product';
import {
	DashboardOutlined,
	AppstoreAddOutlined,
	ClusterOutlined,
	UsergroupAddOutlined,
	FundProjectionScreenOutlined,
} from '@ant-design/icons';
import '../assets/styles/main.css';
import ProductCategories from '../pages/productCategories';
import Services from '../pages/services';
import ServiceCategories from '../pages/serviceCategories';
import Users from '../pages/users';
import Orders from '../pages/orders';
const adminRoutes = [
	// {
	// 	path: '/dashboard',
	// 	name: 'Dashboard',
	// 	component: Home,
	// 	layout: '/admin',
	// 	icon: <DashboardOutlined style={{ fontSize: '1rem' }} />,
	// },

	{
		path: '/products',
		name: 'Products',
		component: Products,
		layout: '/admin',
		icon: <AppstoreAddOutlined style={{ fontSize: '1rem' }} />,
	},
	{
		path: '/product-categories',
		name: 'Product Categories',
		component: ProductCategories,
		layout: '/admin',
		icon: <AppstoreAddOutlined style={{ fontSize: '1rem' }} />,
	},
	{
		path: '/services',
		name: 'Services',
		component: Services,
		layout: '/admin',
		icon: <ClusterOutlined style={{ fontSize: '1rem' }} />,
	},
	{
		path: '/service-categories',
		name: 'Service Categories',
		component: ServiceCategories,
		layout: '/admin',
		icon: <ClusterOutlined style={{ fontSize: '1rem' }} />,
	},
	{
		path: '/users',
		name: 'Users',
		component: Users,
		layout: '/admin',
		icon: <UsergroupAddOutlined style={{ fontSize: '1rem' }} />,
	},
	// {
	// 	path: '/orders',
	// 	name: 'Orders',
	// 	component: Orders,
	// 	layout: '/admin',
	// 	icon: <FundProjectionScreenOutlined style={{ fontSize: '1rem' }} />,
	// },
];

export default adminRoutes;
