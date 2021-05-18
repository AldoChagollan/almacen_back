import React, { Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { deleteToken } from '../utils/token';
import CrearAlmacen from '../pages/almacenes/crearAlmacen';
import { Box } from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

export default function Navbar() {
	const classes = useStyles();
	const { auth, setAuth } = useContext(AuthContext);

	const logOut = () => {
		deleteToken();
		setAuth();
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" color="transparent">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						{!auth ? 'Tienda Online' : `Hola!, ${auth.name}`}
					</Typography>
					{!auth ? (
						<Fragment>
							<Button color="inherit" component={Link} to="/">
								Login
							</Button>
							<Button color="inherit" component={Link} to="/register">
								Regístrate
							</Button>
						</Fragment>
					) : (
						<Fragment>
							<Box mx={2}>
								<Button color="inherit" component={Link} to="/" startIcon={<AssignmentIcon />}>
									mis almacenes
								</Button>
							</Box>
							<Box mx={2}>
								<Button color="inherit" component={Link} to="/productos" startIcon={<ListAltIcon />}>
									todos los productos
								</Button>
							</Box>
							<Box mx={2}>
								<CrearAlmacen />
							</Box>
							<Button color="secondary" variant="outlined" onClick={logOut}>
								logout
							</Button>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
