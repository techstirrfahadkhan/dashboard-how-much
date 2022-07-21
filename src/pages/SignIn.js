import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col, Typography, Form, Input } from 'antd';
import signinbg from '../assets/images/img-signin.jpg';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const { Title } = Typography;
const { Content } = Layout;

const SignIn = () => {
	const { setUser } = useContext(UserContext);
	const onFinish = values => {
		if (values.email === 'admin') {
			setUser({ email: 'admin' });
			return localStorage.setItem('user', JSON.stringify(values));
		}
	};

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};
	return (
		<>
			<Layout className='layout-default layout-signin'>
				<Content className='signin'>
					<Row gutter={[24, 0]} justify='space-around'>
						<Col
							xs={{ span: 24, offset: 0 }}
							lg={{ span: 6, offset: 2 }}
							md={{ span: 12 }}
						>
							<Title className='mb-15'>Sign In</Title>
							<Title className='font-regular text-muted' level={5}>
								Enter your email and password to sign in
							</Title>
							<Form
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
								layout='vertical'
								className='row-col'
							>
								<Form.Item
									className='username'
									label='Email'
									name='email'
									rules={[
										{
											required: true,
											message: 'Please input your email!',
										},
									]}
								>
									<Input placeholder='Email' />
								</Form.Item>

								<Form.Item
									className='username'
									label='Password'
									name='password'
									rules={[
										{
											required: true,
											message: 'Please input your password!',
										},
									]}
								>
									<Input placeholder='Password' />
								</Form.Item>

								<Form.Item>
									<Button
										type='primary'
										htmlType='submit'
										style={{ width: '100%' }}
									>
										SIGN IN
									</Button>
								</Form.Item>
								<p className='font-semibold text-muted'>
									Don't have an account?{' '}
									<Link to='/auth/signup' className='text-dark font-bold'>
										Sign Up
									</Link>
								</p>
							</Form>
						</Col>
						<Col
							className='sign-img'
							style={{ padding: 12 }}
							xs={{ span: 24 }}
							lg={{ span: 12 }}
							md={{ span: 12 }}
						>
							<img src={signinbg} alt='' />
						</Col>
					</Row>
				</Content>
			</Layout>
		</>
	);
};
export default SignIn;
