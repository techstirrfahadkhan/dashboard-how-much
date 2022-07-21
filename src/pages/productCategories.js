import {
	Row,
	Col,
	Table,
	Space,
	Modal,
	Form,
	Button,
	Input,
	Select,
	message,
	Progress,
	Spin,
	Typography,
	Image,
} from 'antd';
import firebase from '../firebase';

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useMutation, useQuery } from '@apollo/client';
import { getCategories } from '../graphql/query';
import { useEffect, useState } from 'react';
import {
	categoryColumns,
	childCategory,
} from '../components/ProductCategoryColumn';
import {
	createProductCategory,
	deleteProductCategory,
	editCategory,
} from '../graphql/mutation';
import {
	CloseCircleOutlined,
	EditOutlined,
	EyeOutlined,
	LoadingOutlined,
	PlusCircleOutlined,
} from '@ant-design/icons';
import React from 'react';

const ProductCategories = () => {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [progress, setProgress] = useState(0);
	const [modal, setModal] = useState({
		detailModal: false,
		createCategoryModal: false,
		deleteModal: false,
		editModal: false,
	});
	const [category, setCategory] = useState({
		title: '',
		icon: '',
		parentId: '',
	});
	// const [pagination, setPagination] = useState({
	// 	skip: 0,
	// 	page: 1,
	// });

	//! INSTANCES
	const [form] = Form.useForm();
	//! LIFE CYCLE METHODS
	useEffect(() => {
		form.setFieldsValue({
			title: category.title,
			image: category.icon,
			parentId: category.parentId,
		});
	}, [form, category]);

	//! QURIES
	const { loading, data, refetch } = useQuery(getCategories, {
		variables: {
			pagination: {
				skip: 0,
				page: 10,
			},
			where: {
				parentId: null,
			},
		},
	});
	const categoriess = data?.GetAllAdminProductCategories?.data;
	let total = data?.GetAllAdminProductCategories?.pagination?.total;
	//! MUTATIONS
	const [makeCategory, { loading: addCategoryLoading, data: newData }] =
		useMutation(createProductCategory);

	const [deleteCategory, { loading: deleteCategoryLoading, data: deleteData }] =
		useMutation(deleteProductCategory);
	const [
		editCategoryStatus,
		{ loading: editCategoryLoading, data: editData, error: editCategoryError },
	] = useMutation(editCategory);

	//! METHODS

	const openDetailModal = product => {
		setSelectedCategory(product);
		setModal({ ...modal, detailModal: true });
	};

	const openCreateCategoryModal = () => {
		setModal({ ...modal, createCategoryModal: true });
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

	const sendCategory = async () => {
		let resp = await makeCategory({
			variables: {
				data: {
					title: category.title,
					icon: category.icon,
					parentId: category.parentId === '' ? null : category.parentId,
				},
			},
		});
		if (resp?.data?.CreateProductCategory?.status) {
			message.success('Category created successfully');
			setModal({ ...modal, createCategoryModal: false });
			refetch();
			setCategory({ ...category, title: '', icon: '', parentId: '' });
			setProgress(0);
		}
	};

	const openDeleteModal = category => {
		setSelectedCategory(category);
		setModal({ ...modal, deleteModal: true });
	};

	const handleDeleteCategory = async () => {
		let resp = await deleteCategory({
			variables: {
				where: {
					id: selectedCategory.id,
				},
			},
		});
		if (resp?.data?.DeleteProductCategory?.status) {
			setModal({ ...modal, deleteModal: false });
			refetch();
			message.success('Category deleted successfully');
		}
	};

	const openEditModal = categoryy => {
		setSelectedCategory(categoryy);
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
			selectedCategory.icon !== category.icon ||
			selectedCategory.title !== category.title ||
			selectedCategory.parentId !== category.parentId
		) {
			let resp = await editCategoryStatus({
				variables: {
					where: {
						id: selectedCategory.id,
					},
					data: {
						title: category.title,
						icon: category.icon,
						parentId:
							selectedCategory.parentId === '' ? null : category.parentId,
					},
				},
			});
			if (resp?.data?.UpdateProductCategory?.status) {
				setModal({ ...modal, editModal: false, detailModal: false });
				refetch();
				message.success('Category updated successfully');
			}
		}
	};

	return (
		<Row>
			<Modal
				title='Child Category Details'
				visible={modal.detailModal}
				// onOk={handleOk}
				onCancel={() => {
					setModal({ ...modal, detailModal: false });
					setSelectedCategory(null);
				}}
				footer={null}
			>
				<Table
					pagination={false}
					size='small'
					loading={loading}
					columns={[
						...childCategory,
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
					dataSource={selectedCategory?.child?.map((item, key) => ({
						key,
						...item,
					}))}
					bordered
				/>
			</Modal>

			<Modal
				title='Provide Category Details'
				visible={modal.createCategoryModal}
				// onOk={handleOk}
				onCancel={() => {
					setModal({ ...modal, createCategoryModal: false });
					setCategory({ ...category, title: '', icon: '', parentId: '' });
					form.resetFields();
					console.log('form', form.getFieldsValue());
				}}
				footer={null}
			>
				<Form
					form={form}
					layout='vertical'
					onFinish={sendCategory}
					style={{ position: 'relative' }}
				>
					<div style={{ opacity: addCategoryLoading ? '.5' : 1 }}>
						<Form.Item
							name='title'
							label='Category Name'
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
							name='Upload Ctaegory Image'
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
							></input>

							{progress > 0 && <Progress percent={progress} />}
						</Form.Item>

						<Form.Item
							name='Select Parent Category'
							label='Select Parent Category'
						>
							<Select
								value={category.parentId}
								onChange={handleCategoryOnChange}
							>
								<Select.Option value=''>Select Category</Select.Option>
								{categoriess?.map(item => (
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
				title='Delete Category'
				visible={modal.deleteModal}
				onCancel={() => {
					setModal({ ...modal, deleteModal: false });
				}}
				footer={null}
			>
				<Typography.Text className='text-center' ellipsis={true}>
					Are you sure you want to delete this{' '}
					<Typography.Text strong>{selectedCategory?.title}</Typography.Text>{' '}
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
					>
						Delete
					</Button>
				</Row>
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
							initialValue={selectedCategory?.title}
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
							<Image width={200} src={selectedCategory?.icon} />
						</Form.Item>

						<Form.Item name='parentId' label='Parent'>
							<Select
								value={category.parentId}
								onChange={handleCategoryOnChange}
							>
								<Select.Option value='' selected>
									Select Category
								</Select.Option>
								{categoriess?.map(
									item =>
										selectedCategory?.id !== item.id && (
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

			<Col
				span={24}
				className='flex-end'
				style={{ marginBottom: '2rem' }}
				type='ghost'
			>
				<Button
					icon={<PlusCircleOutlined />}
					type='primary'
					disabled={deleteCategoryLoading}
					loading={deleteCategoryLoading}
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
						...categoryColumns,
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
											color: 'green',
											marginRight: '.5rem',
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
					dataSource={categoriess?.map((item, key) => ({
						key,
						...item,
					}))}
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
					// onChange={
					// 	async () => {
					// 		let resp = await refetch({
					// 			pagination: {
					// 				skip: page + 1,
					// 				page: 1,
					// 			},
					// 			where: {
					// 				parentId: null,
					// 			},
					// 		});
					// 		setPage(page + 1);
					// 		// console.log('resp', resp);
					// 	}
					// 	// setPagination({ ...pagination, total: pagination.total + 10 })
					// }
				/>
			</Col>
		</Row>
	);
};

export default ProductCategories;
