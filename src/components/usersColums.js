export const usersColums = [
	{
		title: 'Profile',
		dataIndex: 'avatar',
		key: 'avatar',
		render: icon => (
			<img
				src={icon}
				alt='Category Profile'
				style={{ borderRadius: '50%', width: '30px' }}
			></img>
		),
	},

	{
		title: 'User Name',
		dataIndex: 'userName',
		key: 'userName',
		// render: category => <p> {category?.title}</p>,
	},
	{
		title: 'Country',
		dataIndex: 'country',
		key: 'country',
	},
	{
		title: 'Type',
		dataIndex: 'type',
		key: 'type',
	},
];
