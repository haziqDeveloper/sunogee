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
import { getOperators } from "src/store/services/operatorService";
import { Store24Hour } from "mdi-material-ui";


const UserManagement = ({operatorData = {} , applyfilter = (data) => {}}) => {

	const defaultValues = {
		givenName:'',
		familyName:'',
		isInvalid:false,
		validStartDateFrom: '',
		validStartDateTo: '',
		expirationDateFrom: '',
		expirationDateTo: ''
	};
	const defaultDates = {
		startDate: new Date(),
		endDate: new Date(),
	};
	const [operator, setOperator] = useState({...defaultValues});
	const [dateValueExpiration, setDateValueExpiration] = useState(defaultDates);
	const [validStartDate, setValidStartDate] = useState(defaultDates);	

	let name = "";
	let value = "";
	let checked = "";

	const handleChange = (e) => {
		name = e.target.name;
		value = e.target.value;
		setOperator({ ...operator, [name]: value });
	};

	const handleChangeCheckbox = (e) => {
		name = e.target.name;
		checked = e.target.checked;
		setOperator({...operator  , [name]: checked})
	};

	const onSubmit = (e) => {
		applyfilter(operator);
	};

	const onClear = (e) => {
		setOperator({...defaultValues});
	};

	return (
		<div className="MarginUserButtonDiv">
			<Grid container spacing={2} className="FilterFieldsMainDiv">
				<Grid item xs={6} className="FilterFullDiv">

					{/* <Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="運用者ID"
								name="operator_ID"
								value={operator.operator_ID}
								onChange={handleChange}
							/>
						</FormControl>
					</Box> */}

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="氏"
								name="givenName"
								value={operator.givenName}
								onChange={handleChange}
							/>
						</FormControl>
					</Box>

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="名"
								name="familyName"
								value={operator.familyName}
								onChange={handleChange}
							/>
						</FormControl>
					</Box>

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<DoubleDates
								startDate={dateValueExpiration.startDate}
								endDate={dateValueExpiration.endDate}
								rangedate={(newValue) => {
									setOperator({
										...operator,
										expirationDateFrom:  moment(newValue.startDate).format("YYYY-MM-DD"),
										expirationDateTo:  moment(newValue.endDate).format("YYYY-MM-DD"),
									});
									setDateValueExpiration(newValue);
								}}
								name="start_date_end_date"
							/>
						</FormControl>
					</Box>

				</Grid>

				<Grid item xs={6} className="FilterFullDiv">
					<Box className="BoxWidth">
						<FormControl fullWidth>
							<InputLabel id="roll-label">役割</InputLabel>
							<Select
								disabled
								labelId="roll-label"
								id="customer"
								value={''}
								label="役割"
								name="role"
								onChange={handleChange}>
								<MenuItem defaultValue="" disabled>役割を選択...</MenuItem>
								<MenuItem value={"請求（すべての請求"}>請求（すべての請求</MenuItem>
								<MenuItem value={"請求（すべての請求) 1"}>請求（すべての請求）1</MenuItem>
								<MenuItem value={"請求（すべての請求) 2"}>請求（すべての請求）2</MenuItem>
							</Select>
						</FormControl>
					</Box>

					<Box className="BoxWidth operator_checkbox_list">
						<h2>有効／無効</h2>
						<FormControlLabel
							control={<Checkbox />}
							label="有効"
							disabled
						/>
						<FormControlLabel
							control={<Checkbox />}
							label="無効"
							name="isInvalid"
							value={operator.isInvalid}
							onChange={handleChangeCheckbox}
						/>
					</Box>

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<DoubleDates
								label="作成日"
								startDate={validStartDate.startDate}
								endDate={validStartDate.endDate}
								rangedate={(newValue) => {
									setOperator({
										...operator,
										validStartDateFrom: moment(newValue.startDate).format("YYYY-MM-DD"),
										validStartDateTo: moment(newValue.endDate).format("YYYY-MM-DD"),
									});
									setValidStartDate(newValue);
								}}
								name="start_date_end_date"
							/>
						</FormControl>
					</Box>

				</Grid>
			</Grid>
			<Grid>
				<div className="userbuttonshead">
					<div className="right-button">
						<Button variant="outlined" className="UserButtonMargin" onClick={onClear}>
							リセット
						</Button>
						<Button variant="outlined" className="right-last-btn" onClick={onSubmit}>
							検索
						</Button>
					</div>
				</div>
			</Grid>
			<Grid>
				
			</Grid>

		</div>
	);
};
export default UserManagement;