
/** @format */
// React Imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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
    CircularProgress,
    TextField,
    Box,
    Button,
	FormControl,
    Grid,
    Checkbox,
    FormControlLabel
} from '@mui/material';

//Components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { UserListHead, UserMoreMenu } from "../../sections/@dashboard/user";
import Switch from '@mui/material/Switch';
// Api Services
import {
	getProductPrices,
	postSelectPortal,
	postStatus,
} from "src/store/services/productPricesService";
import { deleteRole, getRoles } from "src/store/services/roleService";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import USERLIST from "../../_mock/user";
// Third Party Import
import Swal from "sweetalert2";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import RoleDropDown from "./RoleListDropDown";
import CancelIcon from "@mui/icons-material/Cancel";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: "id", label: "id", alignRight: false },
	{ id: "MACID", label: "MACID", alignRight: false },
	{ id: "PORTAL NAME", label: "PORTAL NAME", alignRight: false },
	{ id: "DATE", label: "DATE", alignRight: false },
	{ id: "TIME", label: "TIME", alignRight: false },
	{ id: "DEVICE INFO", label: "DEVICE INFO", alignRight: false },
	{ id: "Status", label: "Status", alignRight: false },
	// { id: "EXPIRY", label: "EXPIRY", alignRight: false },
	{ id: "NOTE", label: "NOTE", alignRight: false },
	{ id: "ACTION", label: "ACTION", alignRight: false },
];

const label = { inputProps: { 'aria-label': 'Switch demo' } };

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


const RoleList = () => {
    const defaultFilter = {
		macid: "",
	};
    // States
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checkboxValues, setCheckboxValues] = useState([]);
    const defaultValues = {
        name: "",
        email: "",
        ip_address: "",
        search: "",
    }
    const [newSearch, setNewSearch] = useState({ ...defaultValues });

    // Pagination
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(15);
	const [portalAsign, setPortalAsign] = useState([]);
	const [totalData, setTotalData] = useState([]);
    const [filterName, setFilterName] = useState("");
	const [portalId, setPortalId] = useState([]);
    const [toggleform, setToggleForm] = useState(false);
    const [roleData, setRoleData] = useState({});
    const [originalData, setOriginalData] = useState([]);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    //Delete Feature
	const handleDeleteProductPrice = (id) => {
		Swal.fire({
			title: "Are You Sure",
			// text: "This cannot be undone.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Please Delete!",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteRole(id).then((r) => {
					toast.success("Device Delete is Successfully!");
					getUsersApi();
				});
			}
		});
	};

	// const emptyRows =
	// 	page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

	const filteredRoles = applySortFilter(
		users,
		getComparator(order, orderBy),
		filterName,
	);

	const isUserNotFound = filteredRoles.length === 0;

    //Get All Users
    const getUsersApi = () => {
        setLoading(true);
        getRoles({page:page + 1 , per_page:rowsPerPage, ...roleData })
            .then((r) => {
                console.log('api data',r);
                setUsers(r.data);
                setTotalData(r);
                setRowsPerPage(r.per_page)
                // console.log("mydata", r.data)
                setLoading(false);
            })
    };

    useEffect(() => {
        getUsersApi();
    }, [page,rowsPerPage,roleData]);


    // Check Box
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setCheckboxValues([...checkboxValues, name]);
        } else {
            console.log('remove', name, [checkboxValues.filter((item) => parseInt(item) !== parseInt(name))]);
            setCheckboxValues([...checkboxValues.filter((item) => parseInt(item) !== parseInt(name))]);
        }
    };
    const handleAllCheckboxChange = (event) => {
        const { checked } = event.target;
        console.log("Awein", event.target.checked)
        if (checked) {
            setCheckboxValues([...users.map(u => u.id)])
        } else {
            setCheckboxValues([])
        }
    };

    // Search
    const handleSearchChange = (e, name, val = null) => {
        const { value } = e.target;
        if (val) {
            setNewSearch({ ...newSearch, [name]: val[name] });
        } else {
            setNewSearch({ ...newSearch, [name]: e.target.value });

        }
    };

    const filtered = Object.keys(newSearch).some((u) => newSearch[u])
        ? users.filter((user) =>
            Object.keys(user).some(
                (k) => {
                    console.log("name")
                    if (newSearch.search) {
                        return typeof user[k] === "string" &&
                            user[k].toLowerCase().includes(newSearch.search.toLowerCase())
                    }
                    if (newSearch.name) {
                        return typeof user[k] === "string" &&
                            user[k].toLowerCase().includes(newSearch.name.toLowerCase())
                    } if (newSearch.email) {
                        return typeof user[k] === "string" &&
                            user[k].toLowerCase().includes(newSearch.email.toLowerCase())
                    } if (newSearch.ip_address) {
                        return typeof user[k] === "string" &&
                            user[k].toLowerCase().includes(newSearch.ip_address.toLowerCase())
                    }

                }

            )
        ) : users;


    // Filter
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: option => option.name
    });


	useEffect(() => {
		getProductPrices({ page }).then((r) => 
		{
			console.log(r);
			setPortalAsign(r);
		});
	}, []);

	const handleChangePortal = (id,e) =>
	{
	   const pId = e.target.value;  
	   const portId = [...portalId];
       portId[id] = pId;
       
	   setPortalId(portId);
	   postSelectPortal({id:id,portalId:pId})
	   .then((r) => {console.log(r)})
	   .catch((error) => {console.log(error)})
	}

	const handleStatus = (e,Id) =>
	{   
		const sId = Id;
		postStatus({blocked:e.target.checked},sId)
		.then((r) => {
			const data = [...users]
			const newData = data.map(d => {
			 	if(d.id == sId){
					d.blocked = r.blocked;
				}
				return d;
			});
			setUsers(newData);
		})
		.catch((error) => {console.log("error",error);})
	}

    const removeFilter = (id) => {
		const copy = { ...roleData };
		delete copy[id];
		setRoleData(copy);
	};

    const convertIntoString = (rD, roleData) => {
		if (rD == "macid") {
			return `macid:${roleData[rD]}`;
		} 
	};

	const applyfilter = (data) => {
		if(data)
		{
			setOriginalData([...users]);
			setUsers(data.data);
		}
		else
		{
			
			setUsers([...originalData]);
		}
		// setPageData(data);
		// setRowsPerPage(data.per_page);
	};


    return (
        <>
            <Page title="Devices Info">
                <Container className="UserPagePadding">
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
							Filter specification
						</Button>
					</Grid>
					<Grid className="card-body-user">
						{toggleform === true ? (
							<RoleDropDown roleData={roleData} applyfilter={applyfilter} />
						) : (
							""
						)}

						<div className="user-filter-btn">
							{filteredRoles &&
								Object.keys(roleData).map((rD) => (
									<Button
										variant="outlined"
										endIcon={<CancelIcon onClick={() => removeFilter(rD)} />}>
										{convertIntoString(rD, roleData)}
									</Button>
								))}
						</div>
						{/* <div className="userbuttonshead">
							<div className="right-button">
								<Button variant="outlined" className="UserButtonMargin">
									リセット
								</Button>
								<Button variant="outlined" className="right-last-btn">
									検索
								</Button>
							</div>
						</div> */}
					</Grid>
				</Card>
                    <Card sx={{ mt: 5 }}>
                        <Box className="di-pdm" sx={{ p: 5, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 className='h3_tag'>Devices Info</h3>
                            {/* <Box>
                                <TextField
                                    type="text"
                                    size='small'
                                    sx={{ mr: 6, mb: 2 }}
                                    placeholder='Search User'
                                    value={newSearch.search}
                                    onChange={(e) => handleSearchChange(e, 'search')}
                                />
                                
                            </Box> */}
                        </Box>

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
                                        {!loading && filteredRoles.map((row, Rindex) => {
												const portal = portalAsign.find(i => i.portal_name == row.portal_name);
												const {
                                                    id,
                                                    name,
                                                    email,
                                                    ip_address,
                                                    // created_at,
                                                } = row;
                                                return (
                                                    <>
												<TableRow hover key={id} className="table-body device-table">
													<TableCell align="left">{row.id}</TableCell>
													<TableCell align="left">
													     {row.macid}
													</TableCell>
													<TableCell align="left" className="selectMac">
													<Box className="BoxWidth">
											<FormControl fullWidth>
												<select className="asignSelectPortal"
												value={portalId[id] || portalId[id] == '' ? portalId[id]:(portal ? portal.id : '')} 
												onChange={(e) => handleChangePortal(row.id,e)}
												id='demo-simple-select-helper' 
												name='portal_id'
												labelId='demo-simple-select-helper-label'>
												<option value=''>Select Portal</option>
												{
												   portalAsign.map((item) => {
													return(
                                                       <option value={item.id}>{item.portal_name}</option>
													)
												   })	
												}	
												
												</select>
											</FormControl>
										</Box>
													</TableCell>
													<TableCell align="left">{row.date}</TableCell>
													<TableCell align="left">
													   {row.time}
													</TableCell>
													<TableCell align="left">
													   {row.deviceinfo}
													</TableCell>
													<TableCell align="left">
														<div>
														<Switch {...label} checked={row.blocked === 'true' || row.blocked == '0' ? false : true} onChange={(e) => handleStatus(e,id)}/>
														</div>
														</TableCell>
                                                    {/* <TableCell align="left">
													   {row.expiry}
													</TableCell> */}
													<TableCell align="left">
													   {row.note}
													</TableCell>
													<TableCell align="right">
															<UserMoreMenu
																callbackDelete={() =>
																	handleDeleteProductPrice(id)
																}
																editLink={`/device-info-note/${id}`}
															/>
														</TableCell>
												</TableRow>
                                                    </>
                                                )
                                            })}
                                        {loading ? (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={7}>
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <CircularProgress />
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            ""
                                        )}
                                        
								{isUserNotFound && (
									<TableBody>
										<TableRow>
											<TableCell align="center" colSpan={6} sx={{ py: 3 }}>
												<p>User Not Found</p>
											</TableCell>
										</TableRow>
									</TableBody>
								)}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div>
                        <div className="pagination-main-div">
						<div className="">
							<p>Total Value <span style={{"color":"#6660ff","fontWeight":"700"}}>"{totalData.total}"</span></p>
						</div>
                                <TablePagination
                                    rowsPerPageOptions={[15, 25, 50]}
                                    component="div"
                                    count={totalData.total}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    labelRowsPerPage="Rows per page:"
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </div>
                        </div>
                        </Scrollbar>
                    </Card>
                </Container>
            </Page>
        </>
    );
};
export default RoleList;
