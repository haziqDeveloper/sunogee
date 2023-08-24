/** @format */

import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid, TextField, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import DoubleDates from "../../pages/DoubleDate";
import moment from "moment";
import { Store24Hour } from "mdi-material-ui";
import { getSearchFilter } from '../../store/services/roleService'


const RoleDropDown = ({roleData = {} , applyfilter = (data) => {}}) => {
    const defaultValues = {
		macId: '',
	};
	const [role, setRole] = useState({...defaultValues});
	let name = "";
	let value = "";
	let checked = "";

	const handleChange = (e) => {
		name = e.target.name;
		value = e.target.value;
		setRole({ ...role, [name]: value });
	};

	const onSubmit = () => {
		
		getSearchFilter(role.macId)
		.then((r) => {
			applyfilter(r);
	}
		)
		.catch((error) => {console.log("Error",error)})
	};

	const onClear = () => {
		setRole({...defaultValues});
		applyfilter('');
	};

	return (
		<div className="MarginUserButtonDiv">
			<Grid container spacing={2} className="FilterFieldsMainDiv">
				<Grid item xs={6} className="FilterFullDiv">

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="Mac ID"
								name="macId"
								value={role.macId}
								onChange={handleChange}
							/>
						</FormControl>
					</Box>

				</Grid>


			</Grid>
			<Grid>
				<div className="userbuttonshead">
					<div className="right-button">
						<Button variant="outlined" className="UserButtonMargin" onClick={onClear}>
						   Clear
						</Button>
						<Button variant="outlined" className="right-last-btn" onClick={onSubmit}>
							Search
						</Button>
					</div>
				</div>
			</Grid>
			<Grid>
				
			</Grid>

		</div>
	);
};
export default RoleDropDown;