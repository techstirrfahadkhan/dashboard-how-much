import { gql } from '@apollo/client';

export const createProductCategory = gql`
	mutation CreateProductCategory($data: ProductCategoryInput) {
		CreateProductCategory(data: $data) {
			status
			message
			data {
				id
				parentId
				title
				icon
			}
			error
		}
	}
`;

export const deleteProductCategory = gql`
	mutation DeleteProductCategory($where: whereProductCategoryInput) {
		DeleteProductCategory(where: $where) {
			status
			message
			error
			data {
				id
				parentId
				title
			}
		}
	}
`;

export const editCategory = gql`
	mutation UpdateProductCategory(
		$where: whereProductCategoryInput
		$data: ProductCategoryInput
	) {
		UpdateProductCategory(where: $where, data: $data) {
			status
			message
			error
			data {
				id
				parentId
				title
				icon
			}
		}
	}
`;

export const createServiceCategory = gql`
	mutation CreateServiceCategory($data: ServiceCategoryInput) {
		CreateServiceCategory(data: $data) {
			message
			data {
				id
				parentId
				title
				icon
			}
			error
			status
		}
	}
`;

export const updateSeriveCategory = gql`
	mutation UpdateServiceCategory(
		$where: whereServiceCategoryInput
		$data: ServiceCategoryInput
	) {
		UpdateServiceCategory(where: $where, data: $data) {
			status
			message
			error
		}
	}
`;

export const deleteServiceCategory = gql`
	mutation DeleteServiceCategory($where: whereServiceCategoryInput) {
		DeleteServiceCategory(where: $where) {
			status
			message
			error
		}
	}
`;
