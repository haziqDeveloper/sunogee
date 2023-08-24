/** @format */

import { filter } from "lodash";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// material
import {
	Card,
	Table,
	TableRow,
	TableBody,
	TableCell,
	Container,
	TableContainer,
	TablePagination,
	Grid,
	CircularProgress,
	Box,
} from "@mui/material";
// components
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import { UserListHead, UserMoreMenu } from "../../sections/@dashboard/user";
import {
	getProductPrices,
	deleteProductPrices,
} from "src/store/services/productPricesService";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import ProductPriceListDropDown from "./ProductPriceListDropdown";


// mock
// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: "ID", label: "ID", alignRight: false },
	{ id: "PORTAL NAME", label: "PORTAL NAME", alignRight: false },
	{ id: "PORTAL ADDRESS", label: "PORTAL ADDRESS", alignRight: false },
	{ id: "ACTION", label: "ACTION", alignRight: false },
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
const ProductPriceList = () => {

	const defaultFilter = {
		name: '',
		description: '',
		productTaxCategory: '',
		controlNumber: '',
		lineNotation: ''
	};

	const [productData, setProductData] = useState({});

	const [productList, setProductList] = useState([]);

	const [page, setPage] = useState(0);

	const [pageData, setPageData] = useState({ 
		totalElements:0,
		totalPages: 0
	});

	const [order, setOrder] = useState("asc");

	const [orderBy, setOrderBy] = useState("日付");

	const [filterName, setFilterName] = useState("");

	const [rowsPerPage, setRowsPerPage] = useState(10);

	const [toggleform, setToggleForm] = useState(false);

	const [loading, setLoading] = useState(false);

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
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productList.length) : 0;

	const filteredProducts = applySortFilter(
		productList,
		getComparator(order, orderBy),
		filterName,
	);

	const isUserNotFound = filteredProducts.length === 0;

	const handleDeleteProductPrice = (prdId) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteProductPrices(prdId).then((r) => {
					toast.success("Delete Portal Successfully");
					loadProductPrice();
				});
			}
		});
	};

	const loadProductPrice = () => {
		setLoading(true);
		getProductPrices({ page }).then((r) => 
		{
			console.log(r);
			setProductList(r);			
			if (r && r.content) {
				const products = [...r.content];
				setProductList(products);
				let clone = Object.assign({}, r);
				delete clone.content;
				setPageData(clone);
			}
			setLoading(false);
		});
	};

	useEffect(() => {
		if (productList.length == 0) {
			loadProductPrice();
		}
	}, []);

	const removeFilter = (id) => {
		const copy = {...productData};
		delete copy[id];
		setProductData(copy); 
	}

	const applyfilter = (data) => {
		const newFilter = {};
		Object.keys(defaultFilter).map((df) => {
			if(data[df] !== ''){
				newFilter[df] = data[df];
			}
		});
		setProductData(newFilter);
	}

	const convertIntoString = (pD , productData) => {
		if(pD == 'name'){
			return `名前:${productData[pD]}`;
		}else if(pD == 'description'){
			return `説明:${productData[pD]}`;
		}else if(pD == 'productTaxCategory'){
			return `物品税区分:${productData[pD]}`;
		}else if(pD == 'controlNumber'){
			return `管理番号:${productData[pD]}`;
		}else if(pD == 'unitLabel'){
			return `単位ラベル:${productData[pD]}`;
		}else if(pD == 'lineNotation'){
			return `線表記:${productData[pD]}`;
		}
	}

	useEffect(() => {
		loadProductPrice();
	}, [rowsPerPage, page , productData]);

	return (
		<Page title="Portal">
			<Container className="UserPagePadding">
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
									{!loading && filteredProducts
										.map((row) => {
											const {
												id,
												portal_name,
												portal_address,
											} = row;
											console.log("Row",row);
											return (
												<>
													<TableRow
														hover
														key={id}
														className="table-body">
														{/* <TableCell align="left">
															{item?.date ?? "N/A"}
														</TableCell> */}
														<TableCell align="left">
															{/* <Link
														to="/payment-information"
														className="table-link"> */}
															{id ?? "N/A"}
															{/* </Link> */}
														</TableCell>
														<TableCell align="left">
															{portal_name ?? "N/A"}
														</TableCell>
														<TableCell align="left">
															{portal_address ?? "N/A"}
														</TableCell>
														<TableCell align="right">
															<UserMoreMenu
																callbackDelete={() =>
																	handleDeleteProductPrice(id)
																}
																editLink={`/edit-portal/${id}`}
															/>
														</TableCell>
													</TableRow>
												</>
											);
									})}

									{loading ? (
										<TableRow style={{ height: 53 * emptyRows }}>
											<TableCell colSpan={6}>
												<Box sx={{ display: "flex", justifyContent: "center" }}>
													<CircularProgress />
												</Box>
											</TableCell>
										</TableRow>
									) : (
										productList.length == 0 && (
											<TableRow style={{ height: 53 * emptyRows }}>
												<TableCell colSpan={6} align="center">
													No data
												</TableCell>
											</TableRow>
										)
									)}
								</TableBody>

								{/* {isUserNotFound && (
									<TableBody>
										<TableRow>
											<TableCell align="center" colSpan={6} sx={{ py: 3 }}>
												<p>User Not Found</p>
											</TableCell>
										</TableRow>
									</TableBody>
								)} */}
							</Table>
						</TableContainer>
					</Scrollbar>
					<div className="pagination-main-div">
						<div className="left-button">
							{/* <Button
								variant="outlined"
								startIcon={<ArrowDownwardIcon lIcon />}
								className="UserButtonMargin">
								CSVダウンロード
							</Button> */}
							<Button
								variant="outlined"
								startIcon={<AddIcon />}
								component={Link}
								to={"/add-portal"}>
								<p>{"Add Portal"}</p>
							</Button>
						</div>
						{/* <TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={pageData.totalElements}
							rowsPerPage={rowsPerPage}
							page={page}
							labelRowsPerPage="1 - 4 件表示/全4件"
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/> */}
					</div>
				</Card>
			</Container>
		</Page>
	);
};
export default ProductPriceList;