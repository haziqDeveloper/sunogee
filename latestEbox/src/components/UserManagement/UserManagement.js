/** @format */

// @mui
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import DoneIcon from "@mui/icons-material/Done";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import {
	Grid,
	Card,
	CardHeader,
	TextField,
	Button,
	MenuItem,
	FormControl,
	InputLabel,
	Box,
	Select,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
} from "@mui/material";

// components
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import { UserListHead, UserMoreMenu } from "../../sections/@dashboard/user";
// mock
import USERLIST from "../../_mock/user";

// sections

// ----------------------------------------------------------------------
const TABLE_HEAD = [
	{ id: "購入日付", label: "購入日付", alignRight: false },
	{ id: "契約番号", label: "契約番号", alignRight: false },
	{ id: "契約形態", label: "契約形態", alignRight: false },
	{ id: "購入商品", label: "購入商品", alignRight: false },
	{ id: "契約開始日", label: "契約開始日", alignRight: false },
	{ id: "契約終了日", label: "契約終了日", alignRight: false },
	{ id: "決済種別", label: "決済種別", alignRight: false },
	{ id: "決済日時", label: "決済日時", alignRight: false },
	{ id: "展開", label: "展開", alignRight: false },
];
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
const UserManagement = () => {
	const [page, setPage] = useState(0);

	const [order, setOrder] = useState("asc");

	const [dateValue, setDateValue] = useState(new Date());

	const [role, setRole] = useState("");

	const [orderBy, setOrderBy] = useState("購入日付");

	const [filterName, setFilterName] = useState("");

	const [rowsPerPage, setRowsPerPage] = useState(2);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleFilterByName = (event) => {
		setFilterName(event.target.value);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

	const filteredUsers = applySortFilter(
		USERLIST,
		getComparator(order, orderBy),
		filterName,
	);

	const isUserNotFound = filteredUsers.length === 0;

	const [customer, setCustomer] = useState({
		enabledisable: "",
		billingemailaddress: "",
		billingname: "",
		postalcode: "",
		address: "",
		address2: "",
		role: "",
	});
	let name = "";
	let value = "";

	const handleChange = (e) => {
		// console.log(e);
		name = e.target.name;
		value = e.target.value;
		setCustomer({ ...customer, [name]: value });
	};
	const onSubmit = (e) => {
		console.log("Customer Form Fields", customer);
	};

	return (
		<div className="MarginUserButtonDiv">
			<Grid container spacing={2} className="FilterFieldsMainDiv">
				<Grid item xs={6} className="FilterFullDiv">
					<Box className="BoxWidth">
						<LocalizationProvider
							dateAdapter={AdapterDateFns}
							className="DateFullWidth">
							<DateTimePicker
								renderInput={(props) => <TextField {...props} />}
								label="DateTimePicker"
								value={dateValue}
								onChange={(newValue) => {
									setDateValue(newValue);
									setRole({ ...role, ["date"]: newValue });
								}}
							/>
						</LocalizationProvider>
					</Box>
					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="請求番号"
								name="claimnumber"
								value={role.claimnumber}
								onChange={handleChange}
							/>
						</FormControl>
					</Box>
					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="種別"
								name="kinds"
								onChange={handleChange}
								value={role.kinds}
							/>
						</FormControl>
					</Box>
					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="代行会社"
								name="agency"
								onChange={handleChange}
								value={role.agency}
							/>
						</FormControl>
					</Box>
				</Grid>
				<Grid item xs={6} className="FilterFullDiv">
					<Box className="BoxWidth">
						<FormControl fullWidth>
							<InputLabel id="customer-label">対象</InputLabel>
							<Select
								labelId="customer-label"
								id="customer"
								value={customer.role}
								label="顧客"
								name="customer"
								onChange={handleChange}>
								<MenuItem value={"請求（すべての請求"}>
									請求（すべての請求{" "}
								</MenuItem>
								<MenuItem value={"請求（すべての請求）1"}>
									請求（すべての請求）1
								</MenuItem>
								<MenuItem value={"請求（すべての請求）2"}>
									請求（すべての請求）2
								</MenuItem>
							</Select>
						</FormControl>
					</Box>

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<InputLabel id="enabledisable-label">請求先情報有無​</InputLabel>
							<Select
								labelId="enabledisable-label"
								id="enabledisable"
								value={customer.enabledisable}
								label="顧客有効／無効​"
								name="enabledisable"
								onChange={handleChange}>
								<MenuItem value={"有り"}>有り​</MenuItem>
								<MenuItem value={"有り2"}>有り2</MenuItem>
							</Select>
						</FormControl>
					</Box>

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="請求先メールアドレス"
								name="billingemailaddress"
								value={customer.billingemailaddress}
								placeholder="未入力時は顧客情報のメールアドレスを使用​"
								onChange={handleChange}
							/>
						</FormControl>
					</Box>

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="請求先名​"
								name="billingname"
								placeholder="未入力時は顧客情報の氏・名を使用​"
								value={customer.billingname}
								onChange={handleChange}
							/>
						</FormControl>
					</Box>

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="郵便番号​"
								name="postalcode"
								value={customer.postalcode}
								onChange={handleChange}
								placeholder="XXXXXXX​"
							/>
						</FormControl>
					</Box>
				</Grid>

				<Grid item xs={6}>
					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="住所​"
								name="address"
								value={customer.address}
								onChange={handleChange}
								placeholder="XXXXXXXXXXXXXXXXXXXX​"
							/>
						</FormControl>
					</Box>

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="住所２​"
								name="address2"
								value={customer.address2}
								onChange={handleChange}
								placeholder="XXXXXXXXXXXXXXXXXXXX​"
							/>
						</FormControl>
					</Box>

					<Box className="BoxWidth">
						<FormControl fullWidth>
							<TextField
								label="電話番号​"
								name="phonenumber"
								value={customer.phonenumber}
								onChange={handleChange}
								placeholder="+81 XXXXXXXXXXXXX​"
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
				className="RoleCardButton">
				<Button variant="outlined" className="DeleteButton">
					削除
				</Button>
				<Button
					variant="contained"
					className="SaveButton"
					startIcon={<DoneIcon />}
					onClick={onSubmit}>
					保存
				</Button>
			</Grid>
		</div>
	);
};
export default UserManagement;
