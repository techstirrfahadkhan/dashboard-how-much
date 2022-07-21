import { Tag } from 'antd';

export const serviceColumn = [
	{
		title: 'Service Owner',
		dataIndex: 'user',
		key: 'user',
		render: user => <p> {user?.userName}</p>,
	},
	{
		title: 'Title',
		dataIndex: 'title',
		key: 'title',
		// render: category => <p> {category?.title}</p>,
	},
	{
		title: 'Location',
		dataIndex: 'locationTitle',
		key: 'locationTitle',
		// render: category => <p> {category?.title}</p>,
	},
	{
		title: 'status',
		dataIndex: 'status',
		key: 'status',
		render: status => (
			<Tag color={status === 'BidOpen' ? 'green' : 'red'}>{status}</Tag>
		),
	},

	{
		title: 'Price',
		dataIndex: 'price',
		key: 'price',
		// render: category => <p> {category?.title}</p>,
	},
	{
		title: 'Total Bids',
		dataIndex: 'bids',
		key: 'bids',
		render: bids => <p> {bids.length}</p>,
	},
];

export const childServiceColumn = [
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
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
		// render: category => <p> {category?.title}</p>,
	},
];
