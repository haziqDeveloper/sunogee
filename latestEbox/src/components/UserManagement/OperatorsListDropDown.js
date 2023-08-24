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

const UserManagement = () => {
	const [operator, setOperator] = useState({
		operator_ID: "",
		mr: "",
		name: "",
		valid_periods: new Date(),
		valid_period: new Date(),
		startDate: new Date(),
		endDate : new Date(),
		roll: "",
		created_date: "",
	});
	const [testing, setTesting] = useState(operator);
	const [testing2, setTesting2] = useState();
	const [dateValue, setDateValue] = useState({
		startDate: new Date(),
		endDate: new Date(),
	});

	const rangedate = (e) => {
		console.log('hello', e);
		setTesting2(e);
	};	

	let name = "";
	let value = "";
	const handleChange = (e) => {
		name = e.target.name;
		value = e.target.value;
		setOperator({ ...operator, [name]: value });
	};

	const onSubmit = (e) => {

		// setTesting(testing);
		console.log("Operator Form", operator);
		console.log("Date Range", range);

		// console.log("Ref Array Form", testing);
	};

	useEffect(() => {
		setTesting(operator);
	}, [operator]);

	return (
		<div className="MarginUserButtonDiv">
			<Grid container spacing={2} className="FilterFieldsMainDiv">
				<Grid item xs={6} className="FilterFullDiv">

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="運用者ID"
								name="operator_ID"
								value={operator.operator_ID}
								onChange={handleChange}
							/>
						</FormControl>
					</Box>

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="氏"
								name="mr"
								value={operator.mr}
								onChange={handleChange}
							/>
						</FormControl>
					</Box>

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="名"
								name="name"
								value={operator.name}
								onChange={handleChange}
							/>
						</FormControl>
					</Box>

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<DoubleDates
								startDate={operator.startDate}
								endDate={operator.endDate}
								rangedate={(newValue) => {
									setOperator({
										...operator,
										startDate: newValue.startDate,
										endDate: newValue.endDate,
									});
									setDateValue(newValue);
								}}
								name="start_date_end_date"
							/>
						</FormControl>
					</Box>

				</Grid>

				<Grid item xs={6} className="FilterFullDiv">
					<Box className="BoxWidth">
						<FormControl fullWidth>
							<InputLabel id="roll-label">ロール</InputLabel>
							<Select
								labelId="roll-label"
								id="customer"
								value={operator.roll}
								label="ロール"
								name="roll"
								onChange={handleChange}>
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
							className=" "
						/>
						<FormControlLabel
							control={<Checkbox />}
							label="無効"
							className=" "
						/>
					</Box>

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<DoubleDates
								label="作成日"
								startDate={operator.startDate}
								endDate={operator.endDate}
								rangedate={(newValue) => {
									setOperator({
										...operator,
										startDate: newValue.startDate,
										endDate: newValue.endDate,
									});
									setDateValue(newValue);
								}}
								name="start_date_end_date"
							/>
							{/* <DoubleDates 
								value={operator.valid_periods}
								rangedate={() => {console.log('final krna ha ',)}} 
								name="valid_periods"
							/> */}
						</FormControl>
					</Box>

				</Grid>
			</Grid>
			<Grid
				container
				justifyContent="space-between"
				alignItems="center"
				xs={12}
				className="filter-submit-buttons">
				<Button variant="outlined" className="UserButtonMargin" onClick={onClear}>
					リセット
				</Button>
				<Button
					variant="outlined"
					className="right-last-btn"
					onClick={onSubmit}>
					検索
				</Button>
			</Grid>
			<Grid>
				
			</Grid>

		</div>
	);
};
export default UserManagement;