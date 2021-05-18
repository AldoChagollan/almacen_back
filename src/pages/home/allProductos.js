import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Container, Paper, Table, TableBody  } from '@material-ui/core';
import { TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../gql/productos';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	}
});

export default function AllProductos() {
    const classes = useStyles();
	const { data, loading, startPolling, stopPolling } = useQuery(GET_PRODUCTS);

	useEffect(
		() => {
			startPolling(1000);
			return () => stopPolling();
		},
		[ startPolling, stopPolling ]
	);

	if (loading)
		return (
			<Container maxWidth="lg">
				<Box display="flex" justifyContent="center" alignItems="center" height="80vh">
					<CircularProgress />
				</Box>
			</Container>
		);

	const { getProductos } = data;

	const productos_render = getProductos.map((producto, index) => <TableRowRender key={index} producto={producto} />)

	return (
		<Container maxWidth="lg">
			<Box my={5}>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Producto</TableCell>
								<TableCell>Almacen</TableCell>
								<TableCell>Cantidad</TableCell>
								<TableCell>Precio</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>{productos_render}</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Container>
	);
}

const TableRowRender = ({producto}) => {
	return (
		<TableRow>
			<TableCell>{producto.name}</TableCell>
			<TableCell>{producto.idAlmacen.almacenName}</TableCell>
			<TableCell>{producto.cantidad}</TableCell>
			<TableCell>{producto.precio}</TableCell>
		</TableRow>
	);
};
