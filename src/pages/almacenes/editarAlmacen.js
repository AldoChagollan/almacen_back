import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, IconButton, Snackbar, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/client';
import EditIcon from '@material-ui/icons/Edit';
import { UPDATE_ALMACEN } from '../../gql/almacenes';

export default function EditarAlmacen({almacen}) {
	const [ open, setOpen ] = useState(false);
	const [ almacenName, setAlmacenName ] = useState(almacen.almacenName);
	const [ alert, setAlert ] = useState({
		status: '',
		message: '',
		open: false
	});

	/* const [ updateAlmacen ] = useMutation(UPDATE_ALMACEN, {
        update(cache, {data: { updateAlmacen }}) {
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
                        updateAlmacen
                    }
                }
            })
        },
    }); */

    const [ updateAlmacen ] = useMutation(UPDATE_ALMACEN);

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

	const saveData = async () => {
		if (!almacenName) {
			openAlert('error', 'Completa todos los campos', true);
			return;
		}
		try {
			await updateAlmacen({
				variables: {
					input: {
                        almacenName,
                    },
                    id: almacen._id
				}
			});
			openAlert('success', 'Almacen actualizado', true);
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
			<IconButton color="primary" onClick={handleModal}>
                <EditIcon />
			</IconButton>
			<Dialog open={open} onClose={handleModal} aria-labelledby="dialog-crear-almacen" fullWidth maxWidth="sm">
				<DialogTitle id="dialog-crear-almacen">{'Crear nuevo almacen'}</DialogTitle>
				<DialogContent>
					<form noValidate autoComplete="off">
						<Box my={2}>
							<TextField
								fullWidth
								label="Nombre Almacen"
								variant="outlined"
								type="text"
								name="name"
								value={almacenName}
								onChange={(e) => setAlmacenName(e.target.value)}
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
