import { useState } from 'react';
import {
	Row,
	Col,
	Table,
	Space,
	Modal,
	List,
	Tag,
	Avatar,
	Divider,
	Typography,
	Image,
} from 'antd';
import { getAllServices } from '../graphql/query';
import { useQuery } from '@apollo/client';
import { EyeOutlined } from '@ant-design/icons';
import {
	serviceColumn,
	childServiceColumn,
} from '../components/ServicesColumn';
import Paragraph from 'antd/lib/skeleton/Paragraph';

const Services = () => {
	const [modal, setModal] = useState({
		detailModal: false,
	});
	const [selectedService, setSelectedService] = useState(null);
	const [visible, setVisible] = useState(false);

	const { loading, data } = useQuery(getAllServices, {
		variables: {
			pagination: {
				skip: null,
				page: null,
			},
		},
	});
	const openDetailModal = service => {
		setSelectedService(service);
		setModal({ ...modal, detailModal: true });
	};
	console.log('serviceData', data);
	return (
		<Row>
			{' '}
			<Modal
				title='Service Details'
				visible={modal.detailModal}
				// onOk={handleOk}
				onCancel={() => {
					setModal({ ...modal, detailModal: false });
					setSelectedService(null);
				}}
				footer={null}
			>
				<Row justify='center'>
					<Divider orientation='left'>
						<Typography.Title level={4}>Service Info</Typography.Title>
					</Divider>
					{selectedService?.media?.length === 0 ? (
						<Typography.Title level={4}>No Image to Show</Typography.Title>
					) : (
						<>
							<Image
								preview={{
									visible: false,
								}}
								width={200}
								height={200}
								src={selectedService?.media[0]?.asset}
								onClick={() => setVisible(true)}
							/>
							<div
								style={{
									display: 'none',
								}}
							>
								<Image.PreviewGroup
									preview={{
										visible,
										onVisibleChange: vis => setVisible(vis),
									}}
								>
									{selectedService?.media.map(item => (
										<Image src={item.asset}></Image>
									))}
								</Image.PreviewGroup>
							</div>
						</>
					)}
				</Row>
				<Col style={{ marginTop: '1rem' }}>
					<Typography.Title level={5}>Description </Typography.Title>
					<Paragraph className='text-center'>
						{selectedService?.description}
						Fahad Khan
					</Paragraph>
				</Col>
				<Divider orientation='left'>
					<Typography.Title level={4}>Bids</Typography.Title>
				</Divider>
				{console.log('selectedService', selectedService)}

				<List
					itemLayout='horizontal'
					dataSource={selectedService?.bids}
					renderItem={item => (
						<List.Item
							extra={
								<Tag
									color={
										item.status === 'Pending'
											? 'blue'
											: item.status === 'Accepted'
											? 'green'
											: 'red'
									}
								>
									{item.status}
								</Tag>
							}
						>
							<List.Item.Meta
								avatar={<Avatar src={item.user.avatar} />}
								title={<p>{item.user.userName}</p>}
								description={`${item.amount}`}
							/>
						</List.Item>
					)}
				/>
			</Modal>
			<Col span={24}>
				<Table
					size='small'
					loading={loading}
					columns={[
						...serviceColumn,
						{
							title: 'Action',
							key: 'action',
							render: (_, record) => (
								<Space
									size='middle'
									onClick={() => openDetailModal(record)}
									style={{ cursor: 'pointer' }}
								>
									<EyeOutlined />
								</Space>
							),
						},
					]}
					dataSource={data?.GetAllAdminService?.data?.map((item, key) => ({
						key,
						...item,
					}))}
					bordered
				/>
			</Col>
		</Row>
	);
};

export default Services;
