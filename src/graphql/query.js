import { gql } from '@apollo/client';
// import { client } from '../App';

export const getProducts = gql`
	query ExampleQuery(
		$pagination: PaginationInput
		$where: whereProductFiltersInput
	) {
		GetAllProducts(pagination: $pagination, where: $where) {
			status
			pagination {
				nextCursor
			}
			error
			message
			data {
				id
				title
				price
				status
				description
				locationTitle
				user {
					userName
					avatar
				}
				media {
					id
					productId
					asset
					type
					createdAt
					updatedAt
				}
				videoEnable
				bids {
					id
					productId
					userId
					amount
					user {
						userName
						id
						avatar
					}
					status
				}
			}
		}
	}
`;

export const getCategories = gql`
	query ExampleQuery(
		$where: whereProductCategoryInput
		$pagination: AdminPaginationInput
	) {
		GetAllAdminProductCategories(where: $where, pagination: $pagination) {
			status
			message
			error
			pagination {
				total
				hasNextPage
				hasPreviousPage
			}
			data {
				id
				title
				icon
				parentId
				child {
					id
					title
					icon
					parentId
					child {
						id
						title
						icon
					}
				}
			}
		}
	}
`;

export const getServiceCategories = gql`
	query ExampleQuery(
		$where: whereServiceCategoryInput
		$pagination: AdminPaginationInput
	) {
		GetAllAdminServiceCategories(where: $where, pagination: $pagination) {
			status
			message
			data {
				id
				parentId
				title
				icon
				child {
					id
					title
					icon
					child {
						id
						title
						icon
					}
				}
			}
			pagination {
				total
				hasNextPage
				hasPreviousPage
			}
			error
		}
	}
`;

export const getAllServices = gql`
	query GetAllAdminService($pagination: AdminPaginationInput) {
		GetAllAdminService(pagination: $pagination) {
			status
			message
			error
			data {
				id
				title
				description
				locationTitle
				media {
					asset
					type
				}
				price
				user {
					userName
					avatar
					phoneNumber
				}
				bids {
					id
					amount
					status
					user {
						userName
						avatar
						phoneNumber
					}
				}
				status
			}
			pagination {
				total
				hasNextPage
				hasPreviousPage
			}
		}
	}
`;

export const getAllUsers = gql`
	query GetAllUsers {
		getAllUsers {
			status
			message
			data {
				id
				email
				firstName
				lastName
				userName
				avatar
				dob
				phoneNumber
				country
				city
				type
				status
				social {
					facebook
					twitter
					pinterest
					linkedin
					instagram
				}
				website
				zipCode
				document
			}
		}
	}
`;
