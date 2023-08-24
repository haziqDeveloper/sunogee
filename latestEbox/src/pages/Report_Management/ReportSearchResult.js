/** @format */
import * as React from 'react';
import { filter } from "lodash";
import { useState, useEffect, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
// material
import {
	Grid,
	Card,
	Table,
	Button,
	TableRow,
	TableBody,
	TextField,
	TableCell,
	Container,
	TableContainer,
	TablePagination,

} from "@mui/material";
// components
import Box from '@mui/material/Box';
import MenuDown from 'mdi-material-ui/MenuDown'
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ReportDropDownFilter from "../../components/ReportManagement/ReportDropDownFilter";
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import { UserListHead, UserMoreMenu } from "../../sections/@dashboard/user";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// mock
import USERLIST from "../../_mock/user";
import Heading from "src/components/Heading";
import ReportsProgress from "src/components/ReportManagement/ReportsProgress";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';

// ----------------------------------------------------------------------
const PROGRESS_LIST = [
	{
		count: "06",
		title: "今月の請求数",
	},
	{
		count: "01",
		title: "今月の決済予定数",
	},
	{
		count: "02",
		title: "今月の決済完了数",
	},
	{
		count: "01",
		title: "今月の督促数",
	},
	{
		count: "01",
		title: "今月の決済失敗数",
	},
	{
		count: "01",
		title: "今月の返金数",
	},
];

const TABLE_HEAD = [
	{ id: "請求予定日", label: "請求予定日", alignRight: false },
	{ id: "請求番号", label: "請求番号", alignRight: false },
	{ id: "契約番号", label: "契約番号", alignRight: false },
	{ id: "請求対象期間", label: "請求対象期間", alignRight: false },
	{ id: "決済金額", label: "決済金額", alignRight: false },
	{ id: "種別 ", label: "種別 ", alignRight: false },
	{ id: "決済方法", label: "決済方法", alignRight: false },
	{ id: "代行会社", label: "代行会社", alignRight: false },
	{ id: "決済状況", label: "決済状況", alignRight: false },
	{ id: "アクション", label: "アクション", alignRight: false },
];

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
const ReportSearch = () => {

	// Add Fields
	const [inputFields, setInputFields] = useState([
		{ name: '', id: '' }
	])
	const handleFormChange = (index, event) => {
		let data = [...inputFields];
		data[index][event.target.name] = event.target.value;
		setInputFields(data);
	}
	const addFields = () => {
		let newfield = { name: '', id: '' }
		setInputFields([...inputFields, newfield])
	}
	const removeFields = (index) => {
		let data = [...inputFields];
		data.splice(index, 1)
		setInputFields(data)
	}

	// Modal
	// ** States
	const [open, setOpen] = useState(false)
	const [scroll, setScroll] = useState('paper')

	// ** Ref
	const descriptionElementRef = useRef(null)

	const handleClickOpen = scrollType => () => {
		setOpen(true)
		setScroll(scrollType)
	}
	const handleClose = () => setOpen(false)
	useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef
			if (descriptionElement !== null) {
				descriptionElement.focus()
			}
		}
	}, [open])

	const [dateValue, setDateValue] = useState(new Date());
	const [role, setRole] = useState({
		date: "",
		claimnumber: "",
		kinds: "",
		agency: "",
		customer: "",
		product: "",
		paymentmethod: "",
		paymentstatus: "",
	});
	let name = "";
	let value = "";
	const handleChange = (e) => {
		name = e.target.name;
		value = e.target.value;
		setRole({ ...role, [name]: value });
	};

	const onSubmit = (e) => {
		console.log("Form", role);
	};




	const [page, setPage] = useState(0);

	const [order, setOrder] = useState("asc");

	const [orderBy, setOrderBy] = useState("請求予定日");

	const [filterName, setFilterName] = useState("");

	const [rowsPerPage, setRowsPerPage] = useState(4);

	const [toggleform, setToggleForm] = useState(false);

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

	return (
		<Page title="Report List">
			<Container className="UserPagePadding">
				<Grid>
					<Heading title="">
						<div className="HeadingBox PaymentHistoryList">
							{PROGRESS_LIST.map((item, index) => {
								return (
									<ReportsProgress
										count={item.count}
										title={item.title}
										key={index}
									/>
								);
							})}
						</div>
					</Heading>
				</Grid>
				<Card className="user-top-card">
					<Grid className="card-header-top">
						<Button
							variant="outlined"
							endIcon={
								toggleform === true ? (
									<ArrowDropUpIcon />
								) : (
									<ArrowDropDownIcon />
								)
							}
							onClick={() => setToggleForm((prev) => !prev)}>
							フィルター指定
						</Button>
					</Grid>
					<Grid className="card-body-user">
						{toggleform === true ? <ReportDropDownFilter /> : ""}

						<div className="user-filter-btn">
							<Button variant="outlined" endIcon={<CancelIcon />}>
								日付: 2022-09-01 - 2022-09-02
							</Button>
						</div>
					</Grid>
				</Card>

				<Card>
					<Scrollbar>
						<TableContainer>
							<Table>
								<UserListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									onRequestSort={handleRequestSort}
								/>
								<TableBody>
									{filteredUsers
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row) => {
											const {
												id,
												name,
												role,
												status,
												company,
												avatarUrl,
												isVerified,
											} = row;

											return (
												<TableRow hover key={id} className="table-body">
													<TableCell align="left">2022-09-01</TableCell>
													<TableCell align="left">
														<Link
															to="/"
															className="table-link">
															000011{" "}
														</Link>
													</TableCell>
													<TableCell align="left">
														<Link
															to="/"
															className="table-link">
															000011{" "}
														</Link>
													</TableCell>
													<TableCell align="left"> 2022-09-01 - 2022-09-01</TableCell>
													<TableCell align="left">¥10,000</TableCell>
													<TableCell align="left">継続</TableCell>
													<TableCell align="left">クレジット</TableCell>
													<TableCell align="left"> Stripe</TableCell>
													<TableCell align="left">決済予定</TableCell>

													<TableCell align="right">
														<UserMoreMenu />
													</TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow style={{ height: 53 * emptyRows }}>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>

								{isUserNotFound && (
									<TableBody>
										<TableRow>
											<TableCell align="center" colSpan={6} sx={{ py: 3 }}>
												<p>User Not Found</p>
											</TableCell>
										</TableRow>
									</TableBody>
								)}
							</Table>
						</TableContainer>
					</Scrollbar>
					<div className="pagination-main-div">
						<div className="left-button">

							<FormControl>
								<Select defaultValue='' displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
									<MenuItem value=''>
										<em>エクスポート</em>
									</MenuItem>
									<MenuItem value={'請求データ出力'}>請求データ出力</MenuItem>
									<MenuItem value={'決済データ出力'}>決済データ出力</MenuItem>
									<MenuItem value={'督促データ出力'}>督促データ出力</MenuItem>
								</Select>
							</FormControl>
							
							<Button variant="outlined" onClick={handleClickOpen('body')}>
								フォーマット指定
							</Button>
						</div>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={USERLIST.length}
							rowsPerPage={rowsPerPage}
							page={page}
							labelRowsPerPage="1 - 6 件表示/全6件"
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</div>
				</Card>
				<Dialog
					open={open}
					scroll={scroll}
					onClose={handleClose}
					aria-labelledby='scroll-dialog-title'
					aria-describedby='scroll-dialog-description'
					className='MainReportModal'
				>
					<Box className='ReportModal'>
						<div className='CloseModal'>
							<DialogTitle id='scroll-dialog-title'>フォーマット指定</DialogTitle>
							<DialogActions className='ModalCross'>
								<CloseIcon onClick={handleClose} />
							</DialogActions>

						</div>
						<DialogContent dividers={scroll === 'paper'}>
							<DialogContentText id='scroll-dialog-description' tabIndex={-1}>
								<Box >

									<Grid container spacing={2}>
										<Grid item xs={6}>

											<Box className="BoxWidth">
												<FormControl fullWidth>
													<InputLabel id="file_format-label">ファイル形式</InputLabel>
													<Select
														labelId="file_format-label"
														id="file_format"
														value={role.file_format}
														label="ファイル形式"
														name="file_format"
														onChange={handleChange}>
														<MenuItem value={"CSV"}>CSV </MenuItem>
														<MenuItem value={"PDF"}>PDF</MenuItem>
													</Select>
												</FormControl>
											</Box>

											<Box className="BoxWidth">
												<FormControl fullWidth>
													<InputLabel id="line_feed_code-label">改行コード </InputLabel>
													<Select
														labelId="line_feed_code-label"
														id="line_feed_code"
														value={role.line_feed_code}
														label="改行コード "
														name="line_feed_code"
														onChange={handleChange}>
														<MenuItem value={"CRLF"}>CRLF </MenuItem>
														<MenuItem value={"CRLF"}>CRLF</MenuItem>
													</Select>
												</FormControl>
											</Box>

											<Box className="BoxWidth">
												<FormControl fullWidth>
													<InputLabel id="title_line-label">タイトル行</InputLabel>
													<Select
														labelId="title_line-label"
														id="title_line"
														value={role.title_line}
														label="タイトル行"
														name="title_line"
														onChange={handleChange}>
														<MenuItem value={"なし"}>なし </MenuItem>
														<MenuItem value={"なし"}>なし</MenuItem>
													</Select>
												</FormControl>
											</Box>

										</Grid>
										<Grid item xs={6}>
											<Box className="BoxWidth">
												<FormControl fullWidth>
													<InputLabel id="character_code-label">文字コード</InputLabel>
													<Select
														labelId="character_code-label"
														id="character_code"
														value={role.character_code}
														label="文字コード"
														name="character_code"
														onChange={handleChange}>
														<MenuItem value={"Shift_JIS"}>Shift_JIS </MenuItem>
														<MenuItem value={"Shift_JIS"}>Shift_JIS</MenuItem>
													</Select>
												</FormControl>
											</Box>

											<Box className="BoxWidth">
												<LocalizationProvider dateAdapter={AdapterDateFns} className="DateFullWidth">
													<DateTimePicker
														renderInput={(props) => <TextField {...props} />}
														label="有効期間"
														value={dateValue}
														onChange={(newValue) => {
															setDateValue(newValue)
															setUser({ ...user, ['valid_period']: newValue });
														}}
													/>
												</LocalizationProvider>
											</Box>

										</Grid>
									</Grid>
									<Grid container direction="column" xs={12} className="AddGridPadding">
										<p className='AddGridHeading'>メタデータ​</p>
										<Grid className='AddGrid'>
											{inputFields.map((input, index) => {
												return (
													<>
														<div key={index} className='AddInputDiv'>
															<Grid item xs={0.9}>
																<TextField
																	label=" 1 "
																	value={input.id}
																	onChange={event => handleFormChange(index, event)}
																	className="ReportModalAddGrid"
																/>
															</Grid>

															<Grid item xs={9.6}>
																<FormControl fullWidth className="ReportModalAddGrid">
																	<InputLabel id="select-label">選択</InputLabel>
																	<Select
																		labelId="select-label"
																		id="select"
																		value={input.name}
																		label=" 選択 "
																		name="select"
																		onChange={event => handleFormChange(index, event)}
																	>
																		<MenuItem value={"1"}>1 </MenuItem>
																		<MenuItem value={"2"}>2</MenuItem>
																	</Select>
																</FormControl>
															</Grid>
															<IconButton onClick={() => removeFields(index)} aria-label="delete" size="small" className='RomoveButton'>
																<CloseIcon fontSize="inherit" />
															</IconButton>
														</div>
													</>
												)
											})}
											<div className='bottom-button'>
												<div onClick={addFields} variant="contained" className="ReportSaveButton">
													<AddIcon /><p>メタデータ追加</p>
												</div>
											</div>
										</Grid>
									</Grid>
									<Grid container direction="column" xs={12} className="AddGridPadding">
										<Grid className='AddGrid'>
											{inputFields.map((input, index) => {
												return (
													<>
														<div key={index} className='AddInputDiv'>
															<Grid item xs={0.9}>
																<TextField
																	label=" 1 "
																	value={input.id}
																	onChange={event => handleFormChange(index, event)}
																	className="ReportModalAddGrid"
																/>
															</Grid>

															<Grid item xs={9.6}>
																<FormControl fullWidth className="ReportModalAddGrid">
																	<InputLabel id="select-label">選択</InputLabel>
																	<Select
																		labelId="select-label"
																		id="select"
																		value={input.name}
																		label=" 選択 "
																		name="select"
																		onChange={event => handleFormChange(index, event)}
																	>
																		<MenuItem value={"1"}>1 </MenuItem>
																		<MenuItem value={"2"}>2</MenuItem>
																	</Select>
																</FormControl>
															</Grid>
															<IconButton onClick={() => removeFields(index)} aria-label="delete" size="small" className='RomoveButton'>
																<CloseIcon fontSize="inherit" />
															</IconButton>
														</div>
													</>
												)
											})}
											<div className='bottom-button'>
												<div onClick={addFields} variant="contained" className="ReportSaveButton">
													<AddIcon /><p>メタデータ追加</p>
												</div>
											</div>
										</Grid>
									</Grid>
									<Grid container direction="column" xs={12} className="AddGridPadding">
										<Grid className='AddGrid'>
											{inputFields.map((input, index) => {
												return (
													<>
														<div key={index} className='AddInputDiv'>
															<Grid item xs={0.9}>
																<TextField
																	label=" 1 "
																	value={input.id}
																	onChange={event => handleFormChange(index, event)}
																	className="ReportModalAddGrid"
																/>
															</Grid>

															<Grid item xs={9.6}>
																<FormControl fullWidth className="ReportModalAddGrid">
																	<InputLabel id="select-label">選択</InputLabel>
																	<Select
																		labelId="select-label"
																		id="select"
																		value={input.name}
																		label=" 選択 "
																		name="select"
																		onChange={event => handleFormChange(index, event)}
																	>
																		<MenuItem value={"1"}>1 </MenuItem>
																		<MenuItem value={"2"}>2</MenuItem>
																	</Select>
																</FormControl>
															</Grid>
															<IconButton onClick={() => removeFields(index)} aria-label="delete" size="small" className='RomoveButton'>
																<CloseIcon fontSize="inherit" />
															</IconButton>
														</div>
													</>
												)
											})}
											<div className='bottom-button'>
												<div onClick={addFields} variant="contained" className="ReportSaveButton">
													<AddIcon /><p>メタデータ追加</p>
												</div>
											</div>
										</Grid>
									</Grid>
								</Box>
							</DialogContentText>
						</DialogContent>
						<DialogActions className="filter-submit-buttons reportpadding">
							<Button onClick={handleClose} variant="outlined" className="right-last-btn">保存</Button>
						</DialogActions>
					</Box>
				</Dialog>
			</Container>
		</Page >
	);
};
export default ReportSearch;
