/** @format */

import { filter } from "lodash";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
// material
import {
	Card,
	Table,
	TableRow,
	TableBody,
	TableCell,
	Container,
	FormHelperText,
	Radio,
	TableContainer,
	TablePagination,
	Grid,
} from "@mui/material";
import RadioGroup from '@mui/material/RadioGroup';
import { useForm, Controller } from "react-hook-form";
// components
import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import { UserListHead, UserMoreMenu } from "../../sections/@dashboard/user";
// mock
import USERLIST from "../../_mock/user";
import axios from "axios";
import { viewProduct } from "src/store/services/productPricesService";
import {
	getModules,
	getPermissions,
	postRole,
	updateRole,
	postDate,
	updateRoleModulesPermissions,
	viewNoteDate,
} from "src/store/services/roleService";
import { ro } from "date-fns/locale";
import { CodeLessThanOrEqual } from "mdi-material-ui";
import toast from "react-hot-toast";
import RoleList from "./RoleList";
import DoneIcon from "@mui/icons-material/Done";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";

// ----------------------------------------------------------------------
const schema = yup.object().shape({
	note: yup.string().required("Explanation is required"),
});

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	if (query) {
		return filter(
			array,
			(_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1,
		);
	}
	return stabilizedThis.map((el) => el[0]);
}

const AddEditRole = () => {
	const navigate = useNavigate();

	const routeParams = useParams();

	const [loading, setLoading] = useState(false);

	const [mode, setMode] = useState("create");

	const [values, setValues] = useState('false');

	const handleCheck = (event) => {
	  setValues(event.target.value);
	  console.log("Event",event.target.value);
	}


	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		mode: "onChange",
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		if (routeParams.hasOwnProperty("id")) {
			setMode("edit");
			setLoading(true);
			viewNoteDate(routeParams.id).then((r) => { 
					Object.keys(r).map((key) => {
						setValue(key, r[key]);
					});
				setLoading(false);
			});
		}
	}, []);


	const onSubmit = (params) => {
        console.log("NOTE",params);
		postDate(routeParams.id,{note:params.note,expiry:values})
		.then((r) => {console.log(r);
			toast.success("Update Note Successfully!");
			setTimeout(function () {
				navigate("/role-list");
			}, 2000);
		})
		.catch((error) => {
			console.log(error);
			toast.success(error.response.data.message);
		})
	
	};

	const handleBackPage = () =>
	{
         navigate("/role-list");
	}

	return (
		<Page title="Expiry & Note">
			<Container className="UserPagePadding">
				<Card>
				<form onSubmit={handleSubmit(onSubmit)}>	
				  <Grid className="newfield" item xs={12}>
					<h2>Expiry Date</h2>
					<Box className="BoxWidth">
						<FormControl fullWidth>
						     <RadioGroup row aria-label='one_day' name='expiry' 
							 id="expiry_date" value={values} onChange={handleCheck} defaultValue='one_day'>
                                 <FormControlLabel value='one_day' control={<Radio size='small' />} label='One Day' />
                                 <FormControlLabel value='three_month' control={<Radio />} label='Three Month' />
                                 <FormControlLabel value='six_month' control={<Radio />} label='Six Month' />
                                 <FormControlLabel value='one_year' control={<Radio />} label='One Year' />
                            </RadioGroup>
						</FormControl>
					</Box>
					<h2>Note</h2>
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
															placeholder="Please Enter A Note"
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
				</form>				
				</Card>
			</Container>
		</Page>
	);
};
export default AddEditRole;
