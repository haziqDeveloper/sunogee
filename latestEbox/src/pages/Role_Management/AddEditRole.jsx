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
	viewNoteDate,
	postDate,
} from "src/store/services/roleService";

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
	note: yup.string().required("Note is requierd"),
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

const AddEditRole = () => {
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

	const onSubmit = (params) => {
        console.log("NOTE",params);
		postDate(routeParams.id,{note:params.note})
		.then((r) => {console.log(r);
			toast.success("Update Note Successfully!");
			setTimeout(function () {
				navigate("/device-info");
			}, 2000);
		})
		.catch((error) => {
			console.log(error);
			toast.success(error.response.data.message);
		})
	
	};	

	useEffect(() => {
		if (routeParams.hasOwnProperty("id")) {
			setMode("edit");
			setLoading(true);
			viewNoteDate(routeParams.id).then((r) => {
				const data = r;
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
		navigate("/device-info");
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
		<Page className="User Overview" title="Device Note">
			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<CircularProgress />
				</Box>
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Card className="RoleCard">
								<CardHeader title="Note" className="RolePageHeading" />
								<Grid container spacing={2} className="RoleCardBody">
									<Grid item xs={12}>
										<Box className="BoxWidth">
											<FormControl fullWidth>
												<Controller
													name="note"
													control={control}
													rules={{ required: true }}
													render={({ field: { value, onChange } }) => (
														<TextField
															value={value}
															onChange={onChange}
															label="Note"
															placeholder="Note"
															error={Boolean(errors.name)}
															aria-describedby="validation-schema-note"
														/>
													)}
												/>
												{errors.note && (
													<FormHelperText
														sx={{ color: "error.main" }}
														id="validation-schema-note">
														{errors.note.message}
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
export default AddEditRole;
