import React, { useContext, useEffect } from 'react'
import { Box, CircularProgress, Container, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_ALMACENES_USER } from '../../gql/almacenes';
import { AuthContext } from '../../context/authContext';
import Productos from '../productos/productos';
import CrearProducto from '../productos/crearProducto';
import EditarAlmacen from '../almacenes/editarAlmacen';

export default function Home() {
    const { auth } = useContext(AuthContext);
    const { data, loading, startPolling, stopPolling } = useQuery(GET_ALMACENES_USER, { variables: {user: auth.id} });

    useEffect(() => {
        startPolling(1000);
        return () => stopPolling()
    }, [ startPolling, stopPolling ])
    
    if(loading) return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <CircularProgress />
            </Box>
        </Container>
    )

    const { getAlmacenesUser } = data;

    const render_almacenes = getAlmacenesUser.map((almacen, index) => <Almacenes key={index} almacen={almacen} />)

    return (
        <Container maxWidth="lg">
                <Box my={5}>
                   {render_almacenes}
                </Box>
        </Container>
    )
}

const Almacenes = ({almacen}) => {
    return (
        <Box boxShadow={3} my={5}>
            <Box p={3}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h5">
                        {almacen.almacenName}
                    </Typography>
                    <EditarAlmacen almacen={almacen} />
                </Box>
                <Box mt={3}>
                    <CrearProducto almacen={almacen} />
                    <Productos productos={almacen.productos} />
                </Box>
            </Box>
        </Box>
    )
}