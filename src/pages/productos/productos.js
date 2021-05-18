import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditarProducto from './editar';
import EliminarProducto from './eliminar';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	}
});

export default function Productos({productos}) {
	const classes = useStyles();

    const productos_render = productos.map((producto, index) => <TableRowRender key={index} producto={producto} />)

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Producto</TableCell>
						<TableCell>Almacen</TableCell>
						<TableCell>Cantidad</TableCell>
						<TableCell>Precio</TableCell>
						<TableCell padding="checkbox" />
						<TableCell padding="checkbox" />
					</TableRow>
				</TableHead>
				<TableBody>{productos_render}</TableBody>
			</Table>
		</TableContainer>
	);
}

const TableRowRender = ({producto}) => {
	return (
		<TableRow>
			<TableCell>{producto.name}</TableCell>
			<TableCell>{producto.idAlmacen.almacenName}</TableCell>
			<TableCell>{producto.cantidad}</TableCell>
			<TableCell>{producto.precio}</TableCell>
			<TableCell padding="checkbox">
                <EditarProducto producto={producto} />
			</TableCell>
			<TableCell padding="checkbox">
				<EliminarProducto producto={producto} />
			</TableCell>
		</TableRow>
	);
};
