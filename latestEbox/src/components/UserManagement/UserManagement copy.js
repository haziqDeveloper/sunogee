/** @format */

import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, TextField, Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { set } from 'lodash';

const UserManagement = () => {
  const [dateValue, setDateValue] = useState(new Date());
  const [role, setRole] = useState({
    date: '',
    claimnumber: '',
    kinds: '',
    agency: '',
    customer: '',
    product: '',
    paymentmethod: '',
    paymentstatus: '',
  });
  const [testing, setTesting] = useState(role);

  let name = '';
  let value = '';
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setRole({ ...role, [name]: value });
  };
  //   useEffect(() => {
  //     setTesting(role);
  //   }, [role]);

  const onSubmit = (e) => {
    testing.fill(role);

    console.log('Form', role);
    console.log('testing', testing);
  };

  return (
    <div className="MarginUserButtonDiv">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box className="BoxWidth">
            <LocalizationProvider dateAdapter={AdapterDateFns} className="DateFullWidth">
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                  setRole({ ...role, ['date']: newValue });
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box className="BoxWidth">
            <FormControl fullWidth>
              <TextField label="請求番号" name="claimnumber" value={role.claimnumber} onChange={handleChange} />
            </FormControl>
          </Box>
          <Box className="BoxWidth">
            <FormControl fullWidth>
              <TextField label="種別" name="kinds" onChange={handleChange} value={role.kinds} />
            </FormControl>
          </Box>
          <Box className="BoxWidth">
            <FormControl fullWidth>
              <TextField label="代行会社" name="agency" onChange={handleChange} value={role.agency} />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className="BoxWidth">
            <FormControl fullWidth>
              <InputLabel id="customer-label">対象</InputLabel>
              <Select
                labelId="customer-label"
                id="customer"
                value={role.customer}
                label="顧客"
                name="customer"
                onChange={handleChange}
              >
                <MenuItem value={'請求（すべての請求'}>請求（すべての請求 </MenuItem>
                <MenuItem value={'請求（すべての請求）1'}>請求（すべての請求）1</MenuItem>
                <MenuItem value={'請求（すべての請求）2'}>請求（すべての請求）2</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box className="BoxWidth">
            <FormControl fullWidth>
              <InputLabel id="product-label">契約番号</InputLabel>
              <Select
                labelId="product-label"
                id="product"
                value={role.product}
                label="契約番号"
                name="product"
                onChange={handleChange}
              >
                <MenuItem value={'000001'}>000001 </MenuItem>
                <MenuItem value={'0000012'}>0000012</MenuItem>
                <MenuItem value={'0000013'}>0000013</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box className="BoxWidth">
            <FormControl fullWidth>
              <TextField label="決済方法" name="paymentmethod" onChange={handleChange} value={role.paymentmethod} />
            </FormControl>
          </Box>
          <Box className="BoxWidth">
            <FormControl fullWidth>
              <TextField label="決済状況" name="paymentstatus" onChange={handleChange} value={role.paymentstatus} />
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between" alignItems="center" xs={12} className="toggle-users-buttons">
        <Grid xs={6} className="left-button">
          <Button variant="outlined" className="UserButtonMargin" onClick={onSubmit}>
            フォーマット指定
          </Button>
          <Button variant="contained" className="right-last-btn">
            フォーマット指定
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default UserManagement;
