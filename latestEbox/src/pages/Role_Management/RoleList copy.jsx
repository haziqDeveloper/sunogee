
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

// Third Party Import
import Swal from "sweetalert2";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: "id", label: "id", alignRight: false },
	{ id: "MACID", label: "MACID", alignRight: false },
	{ id: "PORTAL NAME", label: "PORTAL NAME", alignRight: false },
	{ id: "DATE", label: "DATE", alignRight: false },
	{ id: "TIME", label: "TIME", alignRight: false },
	{ id: "DEVICE INFO", label: "DEVICE INFO", alignRight: false },
	{ id: "STATUS", label: "STATUS", alignRight: false },
	{ id: "NOTE", label: "NOTE", alignRight: false },
	{ id: "ACTION", label: "ACTION", alignRight: false },
];

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const RoleList = () => {

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

	const [portalId, setPortalId] = useState([]);
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

    //Get All Users
    const getUsersApi = () => {
        setLoading(true);
        getRoles()
            .then((r) => {
                setUsers(r.data);
                setTotalData(r);
                // console.log("mydata", r.data)
                setLoading(false);
            })
    };

    useEffect(() => {
        getUsersApi();
    }, [setUsers]);


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

	const handleChangePortal = (id,e,Rindex) =>
	{
	   const pId = e.target.value;  
	   const portId = [...portalId];
       portId[Rindex] = pId;
	   setPortalId(portId);
	   postSelectPortal({id:id,portalId:pId})
	   .then((r) => {console.log(r)})
	   .catch((error) => {console.log(error)})
	}

	const handleStatus = (e,Id) =>
	{   
		const sId = Id;
		postStatus({status:e.target.checked},sId)
		.then((r) => {
			const data = [...users]
			
			const newData = data.map(d => {
			 	if(d.id == sId){
					d.status = r.status;
				}
				return d;
			});
			setUsers(newData);
		})
		.catch((error) => {console.log("error",error);})
	}


    return (
        <>
            <Page title="Devices Info">
                <Container className="UserPagePadding">
                    <Card sx={{ mt: 5 }}>
                        <Box className="di-pdm" sx={{ p: 5, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 className='h3_tag'>Devices Info</h3>
                            <Box>
                                <TextField
                                    type="text"
                                    size='small'
                                    sx={{ mr: 6, mb: 2 }}
                                    placeholder='Search User'
                                    value={newSearch.search}
                                    onChange={(e) => handleSearchChange(e, 'search')}
                                />
                                
                            </Box>
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
                                        {!loading &&
                                            filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, Rindex) => {
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
												value={portalId[Rindex] || portalId[Rindex] == '' ? portalId[Rindex]:(portal ? portal.id : '')} 
												onChange={(e) => handleChangePortal(row.id,e,Rindex)}
												id='demo-simple-select-helper' 
												name='valid'
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
														<Switch {...label} checked={row.status==true ? true : false} onChange={(e) => handleStatus(e,id)}/>
														</div>
														</TableCell>
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
                                        {!loading && users.length == 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={7} align="center">
                                                    No data
                                                </TableCell>
                                            </TableRow>
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
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={users.length}
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
