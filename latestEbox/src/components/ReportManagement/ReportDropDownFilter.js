/** @format */

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Grid, TextField, Button } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { set } from "lodash";

const UserManagement = () => {
	const [dateValue, setDateValue] = useState(new Date());
	const [dateValue1, setDateValue1] = useState(new Date());
	const [dateValue2, setDateValue2] = useState(new Date());
	const [dateValue3, setDateValue3] = useState(new Date());
	const [dateValue4, setDateValue4] = useState(new Date());
	const [report, setReport] = useState({
		billing_date: "",
		settlement_date: "",
		settlement_amount: "",
		settlement_amount_1: "",
		scheduled_billing_date: "",
		claim_number: "",
		payment_due_date: "",
		payment_day: "",
		deposit_amount: "",
		deposit_amount_1: "",
		agency: "",
	});
	let name = "";
	let value = "";
	const handleChange = (e) => {
		name = e.target.name;
		value = e.target.value;
		setReport({ ...report, [name]: value });
	};

	const onSubmit = (e) => {
		console.log("Report Form", report);
	};

	return (
		<div className="MarginUserButtonDiv">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Box>
						<h4>決済状況</h4>
						<div className="DropDownCheck">
							<FormControlLabel
								control={<Checkbox />}
								label="決済完了"
								className="LabelFullWidth MaxWidth"
							/>
							<FormControlLabel
								control={<Checkbox />}
								label="決済未完了"
								className="LabelFullWidth MaxWidth"
							/>
							<FormControlLabel
								control={<Checkbox />}
								label="決済失敗"
								className="LabelFullWidth MaxWidth"
							/>
							<FormControlLabel
								control={<Checkbox />}
								label="決済キャンセル"
								className="LabelFullWidth MaxWidth"
							/>
							<FormControlLabel
								control={<Checkbox />}
								label="督促入金済み"
								className="LabelFullWidth MaxWidth"
							/>
							<FormControlLabel
								control={<Checkbox />}
								label="督促未入金"
								className="LabelFullWidth MaxWidth"
							/>
							<FormControlLabel
								control={<Checkbox />}
								label="貸し倒れ"
								className="LabelFullWidth MaxWidth"
							/>
						</div>
					</Box>
					<Box>
						<h4>決済方法</h4>
						<div className="DropDownCheck">
							<FormControlLabel
								control={<Checkbox />}
								label="クレジット"
								className="LabelFullWidth MaxWidth"
							/>
							<FormControlLabel
								control={<Checkbox />}
								disabled
								label="コンビニ払い"
								className="LabelFullWidth MaxWidth"
							/>
							<FormControlLabel
								control={<Checkbox />}
								disabled
								label="銀行振込"
								className="LabelFullWidth MaxWidth"
							/>
						</div>
					</Box>
				</Grid>
				<Grid item xs={6}>
					<Box className="BoxWidth">
						<LocalizationProvider
							dateAdapter={AdapterDateFns}
							className="DateFullWidth">
							<DateTimePicker
								renderInput={(props) => <TextField {...props} />}
								label="請求日"
								value={dateValue}
								onChange={(newValue) => {
									setDateValue(newValue);
									setReport({ ...report, ["billing_date"]: newValue });
								}}
							/>
						</LocalizationProvider>
					</Box>

					<Box className="BoxWidth">
						<LocalizationProvider
							dateAdapter={AdapterDateFns}
							className="DateFullWidth">
							<DateTimePicker
								renderInput={(props) => <TextField {...props} />}
								label="決済日"
								value={dateValue1}
								onChange={(newValue) => {
									setDateValue1(newValue);
									setReport({ ...report, ["settlement_date"]: newValue });
								}}
							/>
						</LocalizationProvider>
					</Box>

					<Box className=" BoxWidth Arrangediv">
						<FormControl fullWidth>
							<TextField
								label="決済金額"
								placeholder="¥0"
								name="settlement_amount"
								value={report.settlement_amount}
								onChange={handleChange}
							/>
						</FormControl>
						<h2>~</h2>
						<FormControl fullWidth>
							<TextField
								placeholder="¥100,000"
								name="settlement_amount_1"
								value={report.settlement_amount_1}
								onChange={handleChange}
							/>
						</FormControl>
					</Box>

					<Box className="BoxWidth">
						<LocalizationProvider
							dateAdapter={AdapterDateFns}
							className="DateFullWidth">
							<DateTimePicker
								renderInput={(props) => <TextField {...props} />}
								label="請求予定日"
								value={dateValue4}
								onChange={(newValue) => {
									setDateValue4(newValue);
									setReport({ ...report, ["scheduled_billing_date"]: newValue });
								}}
							/>
						</LocalizationProvider>
					</Box>
				</Grid>

				<Grid item xs={6}>
					<Box className="BoxWidth">
						<LocalizationProvider
							dateAdapter={AdapterDateFns}
							className="DateFullWidth">
							<DateTimePicker
								renderInput={(props) => <TextField {...props} />}
								label="入金期限日"
								value={dateValue2}
								onChange={(newValue) => {
									setDateValue2(newValue);
									setReport({ ...report, ["payment_due_date"]: newValue });
								}}
							/>
						</LocalizationProvider>
					</Box>

					<Box className="BoxWidth">
						<LocalizationProvider
							dateAdapter={AdapterDateFns}
							className="DateFullWidth">
							<DateTimePicker
								renderInput={(props) => <TextField {...props} />}
								label="入金日"
								value={dateValue3}
								onChange={(newValue) => {
									setDateValue3(newValue);
									setReport({ ...report, ["payment_day"]: newValue });
								}}
							/>
						</LocalizationProvider>
					</Box>

					<Box className=" BoxWidth Arrangediv">
						<FormControl fullWidth>
							<TextField
								label="入金金額"
								placeholder="¥0"
								name="deposit_amount"
								value={report.deposit_amount}
								onChange={handleChange}
							/>
						</FormControl>
						<h2>~</h2>
						<FormControl fullWidth>
							<TextField
								placeholder="¥100,000"
								name="deposit_amount_1"
								value={report.deposit_amount_1}
								onChange={handleChange}
							/>
						</FormControl>
					</Box>

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="代行会社"
								name="agency"
								value={report.agency}
								onChange={handleChange}
							/>
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
				<Button variant="outlined" className="UserButtonMargin">
					リセット
				</Button>
				<Button
					variant="outlined"
					className="right-last-btn"
					onClick={onSubmit}>
					検索
				</Button>
			</Grid>
			
		</div>
	);
};
export default UserManagement;
