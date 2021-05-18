import React, { useContext, useState } from 'react';
import { Box, Button, Container, Snackbar, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { LOGIN_USER } from '../../gql/user';
import { useMutation } from '@apollo/client';
import Alert from '@material-ui/lab/Alert';
import { decodeToken, setToken } from '../../utils/token';
import { AuthContext } from '../../context/authContext';

export default function Auth(props) {
	const { setAuth } = useContext(AuthContext);
	const [ showPassword, setShowPassword ] = useState(false);
	const [ datosLogin, setDatosLogin ] = useState({
		email: "",
		password: ""
	})
	const [ alert, setAlert ] = useState({
		status: '',
		message: '',
		open: false
	});

	const [ login ] = useMutation(LOGIN_USER);

	const handleChangeInput = (e) => {
		setDatosLogin({
			...datosLogin,
			[e.target.name]: e.target.value
		});
	};

	const openAlert = (status, message, open) => {
		setAlert({
			status,
			message,
			open
		});
	};

	const handleSave = async () => {
		if (!datosLogin.email || !datosLogin.password) {
			openAlert('error', 'Todos los campos son obligatorios', true);
			return;
		}
		try {
			const userLogin = datosLogin;
			const { data } = await login({
				variables: {
					input: userLogin
				}
			});
			const { token } = data.login;
			setToken(token);
			openAlert('success', 'Usuario logeado', true);
			const decode = decodeToken(token);
			setAuth(decode);
			props.history.push("/");
		} catch (error) {
			openAlert('error', error.message, true);
		}
	};

	return (
		<Container maxWidth="md">
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
			<Box height="90vh" display="flex" justifyContent="center" alignItems="center">
				<Box boxShadow={3} p={5}>
                    <Box my={3}>
                        <Typography variant="h5" align="center">
                            Login
                        </Typography>
                    </Box>
                    <Button variant="text" color="primary" fullWidth>
                        ¿No tienes cuenta? ¡Registrate aqui!
                    </Button>
					<form noValidate autoComplete="off">
						<Box my={2}>
							<FormControl fullWidth variant="outlined">
								<InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
								<OutlinedInput
									id="outlined-adornment-email"
									type="email"
									name="email"
									value={datosLogin.email}
									onChange={handleChangeInput}
									startAdornment={
										<InputAdornment position="start">
											<PersonOutlineIcon />
										</InputAdornment>
									}
									labelWidth={40}
								/>
							</FormControl>
						</Box>
						<Box my={2}>
							<FormControl fullWidth variant="outlined">
								<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
								<OutlinedInput
									id="outlined-adornment-password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									value={datosLogin.password}
									onChange={handleChangeInput}
									startAdornment={
										<InputAdornment position="start">
											<VpnKeyOutlinedIcon />
										</InputAdornment>
									}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => setShowPassword(!showPassword)}
												edge="end"
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
									labelWidth={70}
								/>
							</FormControl>
						</Box>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Entrar
                            </Button>
                        </Box>
					</form>
				</Box>
			</Box>
		</Container>
	);
}
