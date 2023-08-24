/** @format */

import { filter } from 'lodash';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// material
import { Card, Table, TableRow, TableBody, TableCell, Container, Row, Col, TableContainer, Grid } from '@mui/material';
// components
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import UserManagement from '../components/UserManagement/UserManagement';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { UserListHead, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import Heading from 'src/components/Heading';

import TestImage from '../assets/images/progress1.svg';
import TestImage1 from '../assets/images/progress2.svg';
import TestImage2 from '../assets/images/progress3.svg';
import TestImage3 from '../assets/images/progress4.svg';
import { styled } from '@mui/material/styles';
// ** Icons Imports
import Circle from 'mdi-material-ui/Circle';
import ChevronUp from 'mdi-material-ui/ChevronUp';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import DotsVertical from 'mdi-material-ui/DotsVertical';
import '../App.css';
import Progress from 'src/components/PaymentHistoryManagement/Progress';

const data = [
  {
    amount: '$845k',
    trendAmount: 82,
    color: 'primary',
    title: 'Google Analytics',
    icon: <ChevronUp sx={{ color: 'success.main' }} />,
  },
  {
    trendAmount: 52,
    amount: '$12.5k',
    color: 'secondary',
    title: 'Facebook Ads',
    icon: <ChevronDown sx={{ color: 'error.main' }} />,
  },
];

const series = [
  {
    name: 'Google Analytics',
    data: [155, 135, 320, 100, 150, 335, 160],
  },
  {
    name: 'Facebook Ads',
    data: [110, 235, 125, 230, 215, 115, 200],
  },
];

// ----------------------------------------------------------------------
const PROGRESS_LIST = [
  {
    img: TestImage,
    alt: 'Progress Image',
    count: '200',
    title: '今月の登録数',
  },
  {
    img: TestImage1,
    alt: 'Progress Image',
    count: '250',
    title: '非アクティブ数（60日アクセスなし）',
  },
  { img: TestImage2, alt: 'Progress Image', count: '100', title: '継続契約数' },
  { img: TestImage3, alt: 'Progress Image', count: '25000', title: '今月 サブスクリプション契約' },
];

const TABLE_HEAD = [
  { id: '日付', label: '日付', alignRight: false },
  { id: '件名', label: '件名', alignRight: false },
  { id: '既読/未読', label: '既読/未読', alignRight: false },
  { id: 'Delete', label: 'Delete', alignRight: false },
];

const TABLE_HEAD_Two = [
  { id: '日付', label: '日付', alignRight: false },
  { id: '管理番号', label: '管理番号', alignRight: false },
  { id: '件名', label: '件名', alignRight: false },
  { id: 'ログイン id', label: 'ログイン id', alignRight: false },
  { id: 'ログイン id', label: 'ログイン id', alignRight: false },
  { id: 'Delete', label: 'Delete', alignRight: false },
];

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 13,
  padding: '3px, 4px, 3px, 4px',
  border: '1px solid linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), #72E128',
  lineHeight: '18px',
  letter: '0.16px',
  color: '#72E128',
  borderRadius: '16px',
  lineHeight: 1.5,
  background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), #72E128',
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
  return order === 'desc'
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const DashboardApp = () => {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('日付');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [toggleform, setToggleForm] = useState(false);

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

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="ダッシュボード">
      <Container className="UserPagePadding">
        <Grid>
          <Heading title="お知らせ"></Heading>
        </Grid>

        <div className="dash-description">
          <p>E2からのお知らせメッセージボード</p>
        </div>

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
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, company, avatarUrl, isVerified } = row;

                    return (
                      <TableRow hover key={id} className="table-body">
                        <TableCell align="left">2022-09-01</TableCell>
                        <TableCell align="left">
                          <Link to="/" className="table-link">
                            決済手数料無料キャンペーンのお知らせ[2023年1月7日]{' '}
                          </Link>
                        </TableCell>
                        <TableCell align="left"> 来读</TableCell>
                        <TableCell align="left">
                          <DeleteOutlinedIcon style={{ color: '#FF4D49' }} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
        </Card>

        <Grid>
          <div className="HeadingBox dash-progress">
            {PROGRESS_LIST.map((item, index) => {
              return <Progress img={item.img} alt={item.alt} count={item.count} title={item.title} key={index} />;
            })}
          </div>
        </Grid>

        <Grid>
          <Heading title="お知らせ"></Heading>
        </Grid>

        <div class="dash-e2description">
          <p>E2からのお知らせメッセージボード</p>
        </div>
        <Card>
          <Scrollbar>
            <TableContainer>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD_Two}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, company, avatarUrl, isVerified } = row;

                    return (
                      <TableRow hover key={id} className="table-body">
                        <TableCell align="left">2022-09-01</TableCell>
                        <TableCell align="left">
                          <Link to="/" className="table-link">
                            000019{' '}
                          </Link>
                        </TableCell>
                        <TableCell align="left"> 支払いについて</TableCell>
                        <TableCell align="left"> h.yazaki@dti.ad.jp</TableCell>
                        <TableCell align="left">
                          {' '}
                          <BootstrapButton variant="contained">アクティブ</BootstrapButton>
                        </TableCell>
                        <TableCell align="left">
                          <DeleteOutlinedIcon style={{ color: '#FF4D49' }} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
        </Card>

      </Container>
    </Page>
  );
};
export default DashboardApp;
