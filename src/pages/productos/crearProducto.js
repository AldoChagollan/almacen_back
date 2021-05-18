import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Snackbar, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '../../gql/productos';
import AddIcon from '@material-ui/icons/Add';

export default function CrearProducto({almacen}) {
	const [ open, setOpen ] = useState(false);
	const [ datos, setDatos ] = useState({
		name: '',
		cantidad: '',
		precio: '',
        idAlmacen: almacen._id
	});
	const [ alert, setAlert ] = useState({
		status: '',
		message: '',
		open: false
	});

    /* const [ createProducto ] = useMutation(CREATE_PRODUCT, {
        update(cache, {data: { createProducto }}) {
            const { getAlmacenesUser } = cache.readQuery({
                query: GET_ALMACENES_USER,
                variables: {user: auth.id}
            });

            cache.writeQuery({
                query: GET_ALMACENES_USER,
                variables: {user: auth.id},
                data: {
                    getAlmacenesUser: {
                        ...getAlmacenesUser,
                        createProducto
                    }
                }
            })
        },
    }); */

    const [ createProducto ] = useMutation(CREATE_PRODUCT);

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
		try {
			const newProduct = datos;
			await createProducto({
				variables: {
					input: newProduct
				}
			});
			openAlert('success', 'Producto Creado', true);
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
			<Button color="primary" size="large" variant="text" onClick={handleModal} startIcon={<AddIcon />}>
                nuevo producto
			</Button>
			<Dialog open={open} onClose={handleModal} aria-labelledby="dialog-crear-producto" fullWidth maxWidth="sm">
				<DialogTitle id="dialog-crear-producto">{'Crear nuevo producto'}</DialogTitle>
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
