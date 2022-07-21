import {
	Row,
	Col,
	Table,
	Space,
	Modal,
	List,
	Avatar,
	Typography,
	Tag,
	Divider,
	Image,
} from 'antd';
import { useQuery } from '@apollo/client';
import { EyeOutlined } from '@ant-design/icons';
//! CUSTOM-COMPONENTS
import { productColumns } from '../components/ProductColumn';
import { getProducts } from '../graphql/query';
import { useState } from 'react';

const Products = () => {
	const [modal, setModal] = useState({
		detailModal: false,
	});
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [visible, setVisible] = useState(false);

	//! QUERY
	const { loading, data, refetch } = useQuery(getProducts, {
		variables: {
			pagination: {
				limit: -1,
				cursor: null,
			},
			where: {},
		},
	});

	const openDetailModal = product => {
		setSelectedProduct(product);
		setModal({ ...modal, detailModal: true });
	};
	//! INSTANCES
	const { Paragraph } = Typography;

	return (
		<Row>
			<Modal
				title='Product Details'
				visible={modal.detailModal}
				// onOk={handleOk}
				onCancel={() => {
					setModal({ ...modal, detailModal: false });
					setSelectedProduct(null);
				}}
				footer={null}
			>
				<Divider orientation='left'>
					<Typography.Title level={4}>Product</Typography.Title>
				</Divider>
				<Row justify='center'>
					{selectedProduct?.media?.length === 0 ? (
						<Typography.Title level={4}>No Image to Show</Typography.Title>
					) : (
						<>
							<Image
								preview={{
									visible: false,
								}}
								width={200}
								height={200}
								src={selectedProduct?.media[0]?.asset}
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
									{selectedProduct?.media.map(item => (
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
						{selectedProduct?.description}
					</Paragraph>
				</Col>

				<Divider orientation='left'>
					<Typography.Title level={4}>Bids</Typography.Title>
				</Divider>
				<List
					itemLayout='horizontal'
					dataSource={selectedProduct?.bids}
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
								title={<a href='https://ant.design'>{item.user.userName}</a>}
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
						...productColumns,
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
					dataSource={data?.GetAllProducts?.data?.map((item, key) => ({
						key,
						...item,
					}))}
					bordered
				/>
			</Col>
		</Row>
	);
};

export default Products;
