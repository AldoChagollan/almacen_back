import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT } from '../../gql/productos';

export default function EliminarProducto({ producto }) {
	const [ open, setOpen ] = useState(false);
	const [ alert, setAlert ] = useState({
		status: '',
		message: '',
		open: false
	});

	const [ deleteProducto ] = useMutation(DELETE_PRODUCT);

	const openAlert = (status, message, open) => {
		setAlert({
			status,
			message,
			open
		});
	};

	const handleModal = () => {
		setOpen(!open);
	};

	const handleDelete = async () => {
		try {
            await deleteProducto({
				variables: {
					id: producto._id
				}
			});
			openAlert('success', 'Producto actualizado', true);
			handleModal();
		} catch (error) {
			openAlert('error', error.message, true);
			handleModal();
		}
	};

	return (
		<div>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={alert.open}
				onClose={() => openAlert(alert.status, '', false)}
				autoHideDuration={2000}
			>
				<Alert onClose={() => openAlert(alert.status, '', false)} severity={alert.status}>
					{alert.message}
				</Alert>
			</Snackbar>
			<Button color="secondary" onClick={handleModal}>
				Eliminar
			</Button>
			<Dialog open={open} onClose={handleModal} aria-labelledby="dialog-eliminar-producto" fullWidth maxWidth="sm">
				<DialogTitle id="dialog-eliminar-producto">{'¿Seguro de eliminar esto?'}</DialogTitle>
				<DialogActions>
					<Button onClick={handleModal} color="primary">
						cancelar
					</Button>
					<Button onClick={handleDelete} color="primary" autoFocus>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
