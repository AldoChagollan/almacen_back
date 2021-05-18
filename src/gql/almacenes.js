import { gql } from '@apollo/client';

export const CREATE_ALMACEN = gql`
	mutation createAlmacen($input: CreateAlmacenInput) {
		createAlmacen(input: $input) {
			almacenName
			idUser {
                name
            }
			createdAt
		}
	}
`;

export const GET_ALMACEN = gql`
	query getAlmacen($user: String!) {
		getAlmacen(user: $user) {
            id
			almacenName
			idUser {
				id
				name
			}
		}
	}
`;

export const GET_ALMACENES = gql`
	query getAlmacenes {
		getAlmacenes {
            id
			almacenName
			idUser {
				id
				name
			}
		}
	}
`;

export const GET_ALMACENES_USER = gql`
	query getAlmacenesUser($user: String!) {
		getAlmacenesUser(user: $user) {
            _id
			almacenName
			idUser {
				id
				name
			}
			productos {
				_id
				name
				cantidad
				precio
				idAlmacen {
                    _id
					almacenName
				}
			}
		}
	}
`;

export const UPDATE_ALMACEN = gql`
	mutation updateAlmacen($input: UpdateAlmacenInput, $id: ID!) {
		updateAlmacen(id: $id, input: $input) {
			message
		}
	}
`;
export const DELETE_ALMACEN = gql`
	mutation deleteAlmacen($id: ID!) {
		deleteAlmacen(id: $id) {
			message
		}
	}
`;
