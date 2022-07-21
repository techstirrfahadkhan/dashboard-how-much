import { Tag } from 'antd';

export const categoryColumns = [
	{
		title: 'Profile',
		dataIndex: 'icon',
		key: 'icon',
		render: icon => (
			<img
				src={icon}
				alt='Category Profile'
				style={{ borderRadius: '50%', width: '30px' }}
			></img>
		),
	},

	{
		title: 'Title',
		dataIndex: 'title',
		key: 'title',
		// render: category => <p> {category?.title}</p>,
	},
	{
		title: 'Child Categories',
		dataIndex: 'child',
		key: 'child',
		render: child => <p> {child?.length}</p>,
	},
];

export const childCategory = [
	{
		title: 'Profile',
		dataIndex: 'icon',
		key: 'icon',
		render: icon => (
			<img
				src={icon}
				alt='Category Profile'
				style={{ borderRadius: '50%', width: '30px' }}
			></img>
		),
	},

	{
		title: 'Title',
		dataIndex: 'title',
		key: 'title',
		// render: category => <p> {category?.title}</p>,
	},
	// {
	// 	title: 'Child Categories',
	// 	dataIndex: 'child',
	// 	key: 'child',
	// 	render: child => <p> {child?.length}</p>,
	// },
];
