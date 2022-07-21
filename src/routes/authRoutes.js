import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
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
];

export default authRoutes;
