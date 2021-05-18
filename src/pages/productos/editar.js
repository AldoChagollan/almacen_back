import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Snackbar, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/client';
import { UPDATE_PRODUCT } from '../../gql/productos';

export default function EditarProducto({ producto }) {
	const [ open, setOpen ] = useState(false);
	const [ datos, setDatos ] = useState({
		name: producto.name,
		cantidad: producto.cantidad,
		precio: producto.precio
	});
	const [ alert, setAlert ] = useState({
		status: '',
		message: '',
		open: false
	});

	const [ updateProducto ] = useMutation(UPDATE_PRODUCT);

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

	const obtenerDatos = (e) => {
		setDatos({
			...datos,
			[e.target.name]: e.target.name === 'name' ? e.target.value : parseFloat(e.target.value)
		});
	};

	const saveData = async () => {
		if (!datos.name || !datos.cantidad || !datos.precio) {
			openAlert('error', 'Completa todos los campos', true);
			return;
		}
		console.log(datos, producto._id);
		try {
			const newProduct = datos;
			await updateProducto({
				variables: {
					input: newProduct,
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
			<Button color="primary" onClick={handleModal}>
				Editar
			</Button>
			<Dialog open={open} onClose={handleModal} aria-labelledby="dialog-editar-producto" fullWidth maxWidth="sm">
				<DialogTitle id="dialog-editar-producto">{'Editar producto'}</DialogTitle>
				<DialogContent>
					<form noValidate autoComplete="off">
						<Box my={2}>
							<TextField
								fullWidth
								label="producto"
								variant="outlined"
								type="text"
								name="name"
								value={datos.name}
								onChange={obtenerDatos}
							/>
						</Box>
						<Box my={2}>
							<TextField
								fullWidth
								label="cantidad"
								variant="outlined"
								type="number"
								name="cantidad"
								value={datos.cantidad}
								onChange={obtenerDatos}
							/>
						</Box>
						<Box my={2}>
							<TextField
								fullWidth
								label="precio"
								variant="outlined"
								type="number"
								name="precio"
								value={datos.precio}
								onChange={obtenerDatos}
							/>
						</Box>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleModal} color="primary">
						cancelar
					</Button>
					<Button onClick={saveData} color="primary" autoFocus>
						Guardar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
