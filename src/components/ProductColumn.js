import { Tag } from 'antd';

export const productColumns = [
	{
		title: 'Profile',
		dataIndex: 'user',
		key: 'user',
		render: user => (
			<img
				src={user?.avatar}
				alt='Owner Profile'
				style={{ borderRadius: '50%', width: '30px' }}
			></img>
		),
	},

	{
		title: 'Product Owner',
		dataIndex: 'user',
		key: 'user',
		render: user => <p> {user?.userName}</p>,
	},

	{
		title: 'Product Title',
		dataIndex: 'title',
		key: 'title',
		// render: text => <a>{text}</a>,
	},
	{
		title: 'Location',
		dataIndex: 'locationTitle',
		key: 'locationTitle',
		// render: text => <a>{text}</a>,
	},

	{
		title: 'Bid Status',
		dataIndex: 'status',
		key: 'status',
		render: text => (
			<Tag color={text === 'BidOpen' ? 'green' : 'red'}>
				{text === 'BidOpen' ? 'Open' : 'Closed'}
			</Tag>
		),
	},
	{
		title: 'Price',
		dataIndex: 'price',
		key: 'price',
	},
	{
		title: 'Total Bids',
		dataIndex: 'bids',
		key: 'bids',
		render: bids => <p> {bids.length}</p>,
	},
	// {
	// 	title: 'Tags',
	// 	key: 'tags',
	// 	dataIndex: 'tags',
	// 	render: (_, { tags }) => (
	// 		<>
	// 			{tags.map(tag => {
	// 				let color = tag.length > 5 ? 'geekblue' : 'green';

	// 				if (tag === 'loser') {
	// 					color = 'volcano';
	// 				}

	// 				return (
	// 					<Tag color={color} key={tag}>
	// 						{tag.toUpperCase()}
	// 					</Tag>
	// 				);
	// 			})}
	// 		</>
	// 	),
	// },
];
