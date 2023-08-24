/** @format */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/Ebox.png";
import bgimage from "../../assets/images/auth-v1-register-mask-light.png"; // ** MUI Components
import Box from "@mui/material/Box";
import { Grid, TextField, Button , CircularProgress } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import CardContent from "@mui/material/CardContent";
import FormHelperText from "@mui/material/FormHelperText";
// Import from v2
// ** Third Party Imports
// ** Third Party Imports
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
// ** Icons Imports
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import { useDispatch, useSelector } from "react-redux";
// import axios from 'axios';
// import { login } from '../store/slices/auth';
import { login } from "../../store/slices/auth";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { Backup } from "@mui/icons-material";
import Instance from "src/store/axois";
import { useEffect } from "react";
import { postLoginAuth } from '../../store/services/roleService'

const LoginPage = () => {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [password , setPassword] = useState('');
	const [email , setEmail] = useState('');

	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup
			.string()
			.min(8, "Please enter the correct password")
			.required("password required"),
	});

	const {
		handleSubmit,
		setValue,
		control,
		formState: { errors },
	} = useForm({
		mode: "onBlur",
		resolver: yupResolver(schema),
	});

	const dispatch = useDispatch();
	// const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	// console.log('token' , token);

	const loginLoading = useSelector((state) => state.auth.loading);

	useEffect(
		(res) => {
			if (token) {
				Cookies.set("token", token);
				toast.success("Login Successfully");
				setTimeout(function () {
					navigate("/domain_url");
				}, 2000);
			}
		},
		[token],
	);
	
	const onSubmit = (params) => {
       console.log("Params",params);
       postLoginAuth(params)
	   .then((r) => {
		console.log("response", r);
		toast.success("Login Created Successfully");
		setTimeout(function () {
			navigate("/domain_url");
		}, 2000);
	})
	.catch((error) => {
		console.log("Error",error);
		toast.error(error.response.data.message);
	});
	};

	const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
		"& .MuiFormControlLabel-label": {
			fontSize: "0.875rem",
			color: theme.palette.text.secondary,
		},
	}));

	return (
		<>
			<div className="login-main text-center">
				<div className="login-container ">
					<Box className="content-center">
						<CardContent className="card-content">
							<Box
							   className="ugo-logo"
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<img src={logo} alt="Ugo Logo" />
							</Box>
							<Box className="login-content">
								<Typography variant="h5">
								 Ebox TV Welcome To The Platform！
								</Typography>
								<Typography variant="body2">
								Please Sign In To Your Account
								</Typography>
							</Box>

							<form
								noValidate
								autoComplete="off"
								onSubmit={handleSubmit(onSubmit)}>
								<FormControl fullWidth sx={{ mb: 4 }}>
									<Controller
										name="email"
										control={control}
										rules={{ required: true }}
										render={({ field: { value, onChange } }) => (
											<TextField
												autoFocus
												name="email"
												label="Email"
												onBlur={onChange}
												onChange={onChange}
												value={value}
												inputProps={{ maxLength: 50 }}
												error={Boolean(errors.email)}
												placeholder="ebox@gmail.com"
											/>
											)}
										label="email"	
									/>
									{errors.email && (
										<FormHelperText error sx={{ color: "error.main" }}>
											{/* {errors.email.message} */}
											Please Enter A Valid Email Address
										</FormHelperText>
									)}
								</FormControl>

								<FormControl fullWidth>
									<InputLabel
										htmlFor="auth-login-v2-password"
										error={Boolean(errors.password)}>
										Password
									</InputLabel>
									<Controller
										name="password"
										control={control}
										rules={{ required: true }}
										render={({ field: { value, onChange } }) => (
											<OutlinedInput
												name="password"
												onBlur={onChange}
												label="Password"
												onChange={onChange}
												value={value}
												inputProps={{ maxLength: 50 }}
												id="auth-login-v2-password"
												error={Boolean(errors.password)}
												type={showPassword ? 'text' : 'password'}
												endAdornment={
												<InputAdornment position="end">
													<IconButton
													edge="end"
													onMouseDown={(e) => e.preventDefault()}
													onClick={() => setShowPassword(!showPassword)}
													>
													{showPassword ? <EyeOutline /> : <EyeOffOutline />}
													</IconButton>
												</InputAdornment>
												}
											/>
										)} 
									/>			
									{errors.password && (
										<FormHelperText sx={{ color: "error.main" }} error id="">
											{errors.password.message}
										</FormHelperText>
									)}
								</FormControl>
								{loginLoading ? <Box sx={{ display: 'flex' , justifyContent: 'center' }}>
									<CircularProgress />
								</Box> 
								:<button
									className="submit-btn"
									disabled={loginLoading}>
									Login
								</button>}
							</form>
						</CardContent>
						{/* <FooterIllustrationsV1 /> */}
					</Box>
				</div>
				<img src={bgimage} alt="DTI bg" className="loginbg" />
			</div>
		</>
	);
};

export default LoginPage;
