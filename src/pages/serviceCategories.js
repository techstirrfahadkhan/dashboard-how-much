import {
	Row,
	Col,
	Table,
	Space,
	Modal,
	Button,
	Form,
	Input,
	Select,
	message,
	Progress,
	Spin,
	Image,
	Typography,
} from 'antd';
import { getServiceCategories } from '../graphql/query';
import {
	createServiceCategory,
	updateSeriveCategory,
	deleteServiceCategory,
} from '../graphql/mutation';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import firebase from '../firebase';

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import {
	EyeOutlined,
	EditOutlined,
	CloseCircleOutlined,
	PlusCircleOutlined,
	LoadingOutlined,
} from '@ant-design/icons';
import {
	serviceCategoryColumn,
	childServiceCategoryColumn,
} from '../components/ServiceCategoryColumns';
const ServiceCategories = () => {
	const [modal, setModal] = useState({
		detailModal: false,
		addCategoryModal: false,
		editModal: false,
		deleteModal: false,
	});
	const [selectedServiceCategory, setSelectedServiceCategory] = useState(null);
	const [category, setCategory] = useState({
		title: '',
		icon: '',
		parentId: '',
	});
	const [progress, setProgress] = useState(0);

	//! INSTACNES
	const [form] = Form.useForm();
	//! LIFE CYCLE METHODS
	useEffect(() => {
		form.setFieldsValue({
			title: category.title,
			image: category.icon,
			parentId: category.parentId,
		});
	}, [form, category]);

	//!QUERY
	const { loading, data, refetch } = useQuery(getServiceCategories, {
		variables: {
			pagination: {
				skip: 0,
				page: null,
			},
			where: {
				parentId: null,
			},
		},
	});
	let total = data?.GetAllAdminServiceCategories?.pagination?.total;
	let services = data?.GetAllAdminServiceCategories?.data;

	//! MUTATION
	const [makeCategory, { loading: addCategoryLoading }] = useMutation(
		createServiceCategory
	);
	const [
		editCategoryStatus,
		{ loading: editCategoryLoading, data: editData, error: editCategoryError },
	] = useMutation(updateSeriveCategory);
	const [deleteCategory, { loading: deleteCategoryLoading, data: deleteData }] =
		useMutation(deleteServiceCategory);

	//!METHODS
	const openDetailModal = product => {
		setSelectedServiceCategory(product);
		setModal({ ...modal, detailModal: true });
	};

	const openCreateCategoryModal = () => {
		setModal({ ...modal, addCategoryModal: true });
	};

	const handleCategoryOnChange = event => {
		if (!event.target) {
			setCategory({ ...category, parentId: event });
			return;
		}
		setCategory({
			...category,
			[event.target.name]: event.target.value,
		});
	};
	const handleFile = file => {
		if (!file) return;
		const storageRef = ref(firebase.storage(), `files/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			'state_changed',
			snapshot => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(progress);
			},
			error => {
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
					message.success('Image uploaded successfully');
					setCategory({ ...category, icon: downloadURL });
				});
			}
		);
	};

	const sendCategory = async categores => {
		// setCategory({
		// 	...category,
		// 	title: categores.title,
		// 	parentId: categores.parentId === undefined ? null : category.parentId,
		// });
		let resp = await makeCategory({
			variables: {
				data: {
					title: categores.title,
					icon: category.icon,
					parentId:
						category.parentId === '' || category.parentId === undefined
							? null
							: category.parentId,
				},
			},
		});
		if (resp?.data?.CreateServiceCategory?.status) {
			message.success('Category created successfully');
			setModal({ ...modal, addCategoryModal: false });
			refetch();
			setCategory({ ...category, title: '', icon: '', parentId: '' });
			setProgress(0);
		}
	};

	const openEditModal = categoryy => {
		setSelectedServiceCategory(categoryy);
		setCategory({
			...category,
			title: categoryy?.title,
			icon: categoryy?.icon,
			parentId: categoryy?.parentId,
		});
		setModal({ ...modal, editModal: true });
	};

	const updateTheCategory = async () => {
		if (
			selectedServiceCategory.icon !== category.icon ||
			selectedServiceCategory.title !== category.title ||
			selectedServiceCategory.parentId !== category.parentId
		) {
			let resp = await editCategoryStatus({
				variables: {
					where: {
						id: selectedServiceCategory.id,
					},
					data: {
						title: category.title,
						icon: category.icon,
						parentId: category.parentId === '' ? null : category.parentId,
					},
				},
			});
			if (resp?.data?.UpdateServiceCategory?.status) {
				setModal({ ...modal, editModal: false, detailModal: false });
				refetch();
				message.success('Category updated successfully');
			}
		}
	};
	const handleDeleteCategory = async () => {
		let resp = await deleteCategory({
			variables: {
				where: {
					id: selectedServiceCategory.id,
				},
			},
		});
		if (resp?.data?.DeleteServiceCategory?.status) {
			setModal({ ...modal, deleteModal: false });
			refetch();
			message.success('Category deleted successfully');
		}
	};

	const openDeleteModal = category => {
		setSelectedServiceCategory(category);
		setModal({ ...modal, deleteModal: true });
	};

	return (
		<Row>
			<Modal
				title='Child Category Details'
				visible={modal.detailModal}
				// onOk={handleOk}
				onCancel={() => {
					setModal({ ...modal, detailModal: false });
					setSelectedServiceCategory(null);
					form.resetFields();
				}}
				footer={null}
			>
				<Table
					pagination={false}
					size='small'
					loading={loading}
					columns={[
						...childServiceCategoryColumn,
						{
							title: 'Action',
							key: 'action',
							render: (_, record) => (
								<>
									{/* <Space
										size='middle'
										onClick={() => openDetailModal(record)}
										style={{
											cursor: 'pointer',
											color: 'green',
											marginRight: '.5rem',
										}}
									>
										<EyeOutlined />
									</Space> */}
									<Space
										size='middle'
										onClick={() => openEditModal(record)}
										style={{
											cursor: 'pointer',
											color: 'royalblue',
											marginRight: '.5rem',
											fontSize: '1rem',
										}}
									>
										<EditOutlined />
									</Space>
									<Space
										size='middle'
										onClick={() => openDeleteModal(record)}
										style={{
											cursor: 'pointer',
											color: 'tomato',
											fontSize: '1rem',
										}}
									>
										<CloseCircleOutlined />
									</Space>
								</>
							),
						},
					]}
					dataSource={selectedServiceCategory?.child?.map((item, key) => ({
						key,
						...item,
					}))}
					bordered
				/>
			</Modal>
			<Modal
				title='Child Category Details'
				visible={modal.addCategoryModal}
				onCancel={() => {
					setModal({ ...modal, addCategoryModal: false });
					form.resetFields();
					setProgress(0);
				}}
				footer={null}
			>
				<Form
					form={form}
					layout='vertical'
					style={{ position: 'relative' }}
					onFinish={sendCategory}
				>
					<div style={{ opacity: addCategoryLoading ? '.5' : 1 }}>
						<Form.Item
							label='Title'
							name='title'
							rules={[
								{ required: true, message: 'Please input category title' },
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name='icon'
							label='Upload Category Image'
							rules={[
								{
									required: category.icon === '' ? true : false,
									message: 'Please upload category image',
								},
							]}
						>
							<input
								accept='image/*'
								type='file'
								name='icon'
								onChange={e => handleFile(e.target.files[0])}
							></input>

							{progress > 0 && <Progress percent={progress} />}
						</Form.Item>
						<Form.Item
							label='Select Parent Category'
							name='paretnId'
							// rules={[{ required: true, message: 'Please input category title' }]}
						>
							<Select
								value={category.parentId}
								onChange={handleCategoryOnChange}
							>
								<Select.Option value=''>Select Category</Select.Option>
								{data?.GetAllAdminServiceCategories?.data?.map(item => (
									<Select.Option key={item.id} value={item.id}>
										{item.title}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item>
							<Button
								icon={<PlusCircleOutlined style={{ fontSize: '1rem' }} />}
								type='primary'
								size='small'
								block
								htmlType='submit'
								style={{
									// fontSize: '.9rem',
									display: 'flex',
									justifyContent: 'Center',
									alignItems: 'center',
								}}
							>
								Add Category
							</Button>
						</Form.Item>
					</div>
					{addCategoryLoading ? (
						<div
							style={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translateX(-60%)',
							}}
						>
							<Spin
								indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
							/>
						</div>
					) : null}
				</Form>
			</Modal>

			<Modal
				title='Edit Category'
				visible={modal.editModal}
				onCancel={() => {
					setModal({ ...modal, editModal: false });
					setProgress(0);
					setCategory({ ...category, title: '', icon: '', parentId: '' });
					form.resetFields();
				}}
				footer={null}
			>
				<Form
					form={form}
					layout='vertical'
					onFinish={updateTheCategory}
					style={{ position: 'relative' }}
				>
					<div style={{ opacity: addCategoryLoading ? '.5' : 1 }}>
						<Form.Item
							name='title'
							label='Category Name'
							initialValue={selectedServiceCategory?.title}
							rules={[
								{ required: true, message: 'Please input category name' },
							]}
						>
							<Input
								name='title'
								value={category.title}
								onChange={handleCategoryOnChange}
							/>
						</Form.Item>
						<Form.Item
							name='image'
							label='Upload Category Image'
							rules={[
								{
									required: category.icon === '' ? true : false,
									message: 'Please upload category image',
								},
							]}
						>
							<input
								type='file'
								name='icon'
								onChange={e => handleFile(e.target.files[0])}
							/>

							{progress > 0 && <Progress percent={progress} />}
						</Form.Item>
						<Form.Item
							name='Uploaded Image'
							label='Uplodaded Image'
							style={{ textAlign: 'center' }}
						>
							<Image width={200} src={selectedServiceCategory?.icon} />
						</Form.Item>

						<Form.Item name='parentId' label='Parent'>
							<Select
								value={category.parentId}
								onChange={handleCategoryOnChange}
							>
								<Select.Option value='' selected>
									Select Category
								</Select.Option>
								{services?.map(
									item =>
										selectedServiceCategory?.id !== item.id && (
											<Select.Option key={item.id} value={item.id}>
												{item.title}
											</Select.Option>
										)
								)}
							</Select>
						</Form.Item>
						<Form.Item>
							<Button
								icon={<EditOutlined style={{ fontSize: '1rem' }} />}
								type='primary'
								size='small'
								block
								htmlType='submit'
								loading={editCategoryLoading}
								disabled={editCategoryLoading}
								style={{
									// fontSize: '.9rem',
									display: 'flex',
									justifyContent: 'Center',
									alignItems: 'center',
								}}
							>
								Update Category
							</Button>
						</Form.Item>
					</div>
					{addCategoryLoading ? (
						<div
							style={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translateX(-60%)',
							}}
						>
							<Spin
								indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
							/>
						</div>
					) : null}
				</Form>
			</Modal>
			<Modal
				title='Delete Category'
				visible={modal.deleteModal}
				onCancel={() => {
					setModal({ ...modal, deleteModal: false });
				}}
				footer={null}
			>
				<Typography.Text className='text-center' ellipsis={true}>
					Are you sure you want to delete this{' '}
					<Typography.Text strong>
						{selectedServiceCategory?.title}
					</Typography.Text>{' '}
					category?
				</Typography.Text>

				<Row
					style={{ marginTop: '1rem' }}
					justify='end'
					loading={deleteCategoryLoading}
				>
					<Button
						icon={<CloseCircleOutlined />}
						danger
						size='small'
						onClick={handleDeleteCategory}
						disabled={deleteCategoryLoading}
						loading={deleteCategoryLoading}
					>
						Delete
					</Button>
				</Row>
			</Modal>

			<Col
				span={24}
				className='flex-end'
				style={{ marginBottom: '2rem' }}
				type='ghost'
			>
				<Button
					icon={<PlusCircleOutlined />}
					type='primary'
					size='small'
					style={{
						// fontSize: '.9rem',
						display: 'flex',
						justifyContent: 'Center',
						alignItems: 'center',
					}}
					onClick={openCreateCategoryModal}
				>
					Add Category
				</Button>
			</Col>
			<Col span={24}>
				<Table
					size='small'
					loading={loading}
					columns={[
						...serviceCategoryColumn,
						{
							title: 'Action',
							key: 'action',
							render: (_, record) => (
								<>
									<Space
										size='middle'
										onClick={() => openDetailModal(record)}
										style={{
											cursor: 'pointer',
											marginRight: '.5rem',
											fontSize: '1rem',
											color: 'green',
										}}
									>
										<EyeOutlined />
									</Space>
									<Space
										size='middle'
										onClick={() => openEditModal(record)}
										style={{
											cursor: 'pointer',
											color: 'royalblue',
											marginRight: '.5rem',
											fontSize: '1rem',
										}}
									>
										<EditOutlined />
									</Space>
									<Space
										size='middle'
										onClick={() => openDeleteModal(record)}
										style={{
											cursor: 'pointer',
											color: 'tomato',
											fontSize: '1rem',
										}}
									>
										<CloseCircleOutlined />
									</Space>
								</>
							),
						},
					]}
					dataSource={data?.GetAllAdminServiceCategories?.data?.map(
						(item, key) => ({
							key,
							...item,
						})
					)}
					bordered
					pagination={{
						pageSize: 10,
						total: total,
						onChange: async (page, pageSize) => {
							await refetch({
								pagination: {
									skip: page - 1,
									page: 10,
								},
								where: {
									parentId: null,
								},
							});
						},
					}}
				/>
			</Col>
		</Row>
	);
};

export default ServiceCategories;
