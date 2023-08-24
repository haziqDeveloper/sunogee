/** @format */

// @mui
import * as React from "react";
import { ChangeEvent, useState, useEffect } from "react";

import {
	Grid,
	Card,
	CardHeader,
	TextField,
	Button,
	MenuItem,
	FormControl,
	InputLabel,
	Radio,
	Box,
	Select,
	IconButton,
	FormHelperText,
	CircularProgress,
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment'
import { useParams, useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";
import moment from "moment";

//Api Import
import {
	postProduct,
	updatePortal,
	viewPortal,
} from "src/store/services/productPricesService";

// ** Third Party Imports
import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";

// Icon Imports
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

// components
import Page from "../../components/Page";

///Price
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import RadioGroup from '@mui/material/RadioGroup'
import { ContentSavePlus } from "mdi-material-ui";
// sections

// ----------------------------------------------------------------------
// const defaultValues = {
//     serviceSideProductNumber: "",
//     controlNumber: "",
//     name: "",
//     explanation: "",
//     label: "",
//     lineNotation: "",
// };

const schema = yup.object().shape({
	portal_name: yup.string().required("Portal Name is requierd"),
	portal_address: yup.string().required("Portal Address is required"),
});

const showErrors = (field, valueLen, min) => {
	if (valueLen === 0) {
		return `${field} field is required`;
	} else if (valueLen > 0 && valueLen < min) {
		return `${field} must be at least ${min} characters`;
	} else {
		return "";
	}
};

const AddEditProduct = () => {
	const navigate = useNavigate();
	const routeParams = useParams();
	const [loading, setLoading] = useState(false);
	const [mode, setMode] = useState("create");
	const [uploadImg, setUploadImg] = useState();
	const [updatedImg, setUpdatedImg] = useState();
	const [currencySymbol, setCurrencySymbol] = useState();


	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		mode: "onChange",
		resolver: yupResolver(schema),
	});

	const onSubmit = (paramForms) => {
		const params = paramForms;
		if (mode == "create") {
			// console.log('Product Add' , ProductAdd);
			// delete params.controlNumber;
			postProduct(params)
				.then((r) => {
					// setProduct(Object.assign(product,r));
					toast.success("Portal Created Successfully");
					setTimeout(function () {
					    navigate("/portal-list");
					}, 2000);
				})
				.catch((error) => {
					// console.log('error' , error);
					// toast.error("Product was not created");
					toast.error(error.response.data.message);
				});
		} else {
			updatePortal(routeParams.id, params)
				.then((r) => {
					console.log("success  product updated", r);
					toast.success("Portal Updated Successfully");
					setTimeout(function () {
						navigate("/portal-list");
					}, 2000);
				})
				.catch((error) => {
					toast.error(error.response.data.message);
				});
		}
	};

	useEffect(() => {
		if (routeParams.hasOwnProperty("id")) {
			setMode("edit");
			setLoading(true);
			viewPortal(routeParams.id).then((r) => {
				console.log("edit route", r.portal.id);
				const data = r.portal;
				if (data) {
					Object.keys(data).map((key) => {
						setValue(key, data[key]);
					});
				}
				setLoading(false);
			});
		}
	}, []);
	//Product
	const handleBackPage = () => {
		navigate("/portal-list");
	};

	//////////Price
	const [dateValue, setDateValue] = useState(new Date());
	const [priceObj, setPriceObj] = useState({
		pricingModel: "string",
		productId: "",
		price: "",
		currency: "",
		billingPeriod: "",
		billingDescription: "",
	});

	let name = "";
	let value = "";

	const handleChange = (e) => {
		name = e.target.name;
		value = e.target.value;
		setPriceObj({ ...priceObj, [name]: value });
		setValue(name, value);
	};


	return (
		<Page className="User Overview" title="PORTAL">
			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<CircularProgress />
				</Box>
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Card className="RoleCard">
								<CardHeader title="Portal" className="RolePageHeading" />
								<Grid container spacing={2} className="RoleCardBody">
									<Grid item xs={12}>
										<Box className="BoxWidth">
											<FormControl fullWidth>
												<Controller
													name="portal_name"
													control={control}
													rules={{ required: true }}
													render={({ field: { value, onChange } }) => (
														<TextField
															value={value}
															onChange={onChange}
															label="Portal Name"
															placeholder="Portal Name"
															error={Boolean(errors.name)}
															aria-describedby="validation-schema-portal_name"
														/>
													)}
												/>
												{errors.portal_name && (
													<FormHelperText
														sx={{ color: "error.main" }}
														id="validation-schema-portal_name">
														{errors.portal_name.message}
													</FormHelperText>
												)}
											</FormControl>
										</Box>


									<Box className="BoxWidth">
											<FormControl fullWidth>
												<Controller
													name="portal_address"
													control={control}
													rules={{ required: true }}
													render={({ field: { value, onChange } }) => (
														<TextField
															value={value}
															onChange={onChange}
															label="Portal Address"
															placeholder="Portal Address"
															error={Boolean(errors.lineNotation)}
															aria-describedby="validation-schema-portal_address"
														/>
													)}
												/>
												{errors.portal_address && (
													<FormHelperText
														sx={{ color: "error.main" }}
														id="validation-schema-portal_address">
														{errors.portal_address.message}
													</FormHelperText>
												)}
											</FormControl>
										</Box>
									</Grid>

									<Grid
									item
									container
									justifyContent="space-between"
									alignItems="center"
									xs={12}>
									<Button
										variant="outlined"
										onClick={handleBackPage}
										className="DeleteButton">
										Back
									</Button>

									<Button
										variant="contained"
										type="submit"
										className="SaveButton"
										startIcon={<DoneIcon />}>
										Submit
									</Button>
								</Grid>

								</Grid>
							</Card>
						</Grid>
					</Grid>
				</form>
			)}
		</Page>
	);
};
export default AddEditProduct;
