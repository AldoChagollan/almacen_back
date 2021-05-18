import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
	mutation createProducto($input: CreateProductoInput) {
		createProducto(input: $input) {
			_id
			name
			idAlmacen {
				almacenName
				idUser {
					name
					email
				}
			}
			cantidad
			precio
			createdAt
		}
	}
`;

export const GET_PRODUCT = gql`
	query getProducto($idProducto: String!) {
		getProducto(idProducto: $idProducto) {
			_id
			name
			idAlmacen {
				id
				almacenName
				idUser {
					id
					name
					email
				}
			}
			cantidad
			precio
			createdAt
		}
	}
`;

export const GET_PRODUCTS = gql`
	query getProductos {
		getProductos {
			_id
			name
			idAlmacen {
				_id
				almacenName
				idUser {
					id
					name
					email
				}
			}
			cantidad
			precio
			createdAt
		}
	}
`;
export const UPDATE_PRODUCT = gql`
	mutation updateProducto($input: UpdateProductoInput, $id: ID!) {
		updateProducto(id: $id, input: $input) {
			message
		}
	}
`;
export const DELETE_PRODUCT = gql`
	mutation deleteProducto($id: ID!) {
		deleteProducto(id: $id) {
			message
		}
	}
`;
