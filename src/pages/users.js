import { useQuery } from '@apollo/client';
import { getAllUsers } from '../graphql/query';
import { Col, Row, Table, Space, Modal, Form, Input } from 'antd';
import { usersColums } from '../components/usersColums';
import { EyeOutlined } from '@ant-design/icons';
import { useState } from 'react';
const Users = () => {
	const [selectedUser, setSelectedUser] = useState(null);
	const [modal, setModal] = useState({
		detailModal: false,
	});
	//! QURIES
	const { data, loading, error } = useQuery(getAllUsers);

	const openDetailModal = record => {
		setSelectedUser(record);
		setModal({
			...modal,
			detailModal: true,
		});
		console.log(record);
	};

	return (
		<Row>
			<Modal
				title='User Detail'
				visible={modal.detailModal}
				// onOk={handleOk}
				onCancel={() => {
					setModal({ ...modal, detailModal: false });
					setSelectedUser(null);
				}}
				footer={null}
			>
				<Form layout='vertical'>
					<Form.Item label='Full Name'>
						<Input
							value={selectedUser?.firstName + selectedUser?.lastName}
							disabled
						/>
					</Form.Item>
					<Form.Item label='Email '>
						<Input value={selectedUser?.email} disabled />
					</Form.Item>
					<Form.Item label='Phone'>
						<Input value={selectedUser?.phoneNumber} disabled />
					</Form.Item>
					<Form.Item label='City'>
						<Input value={selectedUser?.city} disabled />
					</Form.Item>
				</Form>
			</Modal>
			<Col span='24'>
				{error ? (
					error
				) : (
					<Table
						dataSource={data?.getAllUsers?.data.map((item, key) => ({
							key,
							...item,
						}))}
						size='small'
						loading={loading}
						columns={[
							...usersColums,
							{
								title: 'Action',
								render: record => (
									<>
										<Space
											size='middle'
											onClick={() => openDetailModal(record)}
											style={{
												cursor: 'pointer',
												color: 'green',
												marginRight: '.5rem',
											}}
										>
											<EyeOutlined />
										</Space>
									</>
								),
							},
						]}
					/>
				)}
			</Col>
		</Row>
	);
};

export default Users;
