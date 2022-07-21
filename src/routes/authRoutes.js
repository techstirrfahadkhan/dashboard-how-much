import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Privacy from '../pages/privacyPolicy';

const authRoutes = [
	{
		path: '/login',
		name: 'Login',
		component: SignIn,
		layout: '/auth',
	},
	{
		path: '/signup',
		name: 'Signup',
		component: SignUp,
		layout: '/auth',
	},
	{
		path: '/privacy',
		name: 'Privacy',
		component: Privacy,
		layout: '/auth',
	},
];

export default authRoutes;
