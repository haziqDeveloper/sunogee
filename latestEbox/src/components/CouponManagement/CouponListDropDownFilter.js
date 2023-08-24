/** @format */

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Grid, TextField, Button } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { set } from "lodash";

const CouponList = () => {
    const [dateValue, setDateValue] = useState(new Date());
    const [coupon, setCoupon] = useState({
        service_side_coupon_name_number: "",
        coupon_name: "",
        control_number: "",
        period: "",
        fixed_amount_fixed_rate: "",
        amount_rate: "",
        shipping: "",
        product: "",
        target_customer: "",
        specified: "",
    });
    let name = "";
    let value = "";
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setCoupon({ ...coupon, [name]: value });
    };

    const onSubmit = (e) => {
        console.log("Form", notice);
    };

    return (
        <div className="MarginUserButtonDiv">
            <Grid container spacing={2}>

                <Grid item xs={6}>

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <TextField
                                label="サービス側クーポン名番号"
                                name="service_side_coupon_name_number"
                                value={coupon.service_side_coupon_name_number}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <TextField
                                label="クーポン名"
                                name="coupon_name"
                                value={coupon.coupon_name}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                </Grid>

                <Grid item xs={6}>

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <TextField
                                label="管理番号"
                                name="control_number"
                                value={coupon.control_number}
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
                                label="期間"
                                value={dateValue}
                                onChange={(newValue) => {
                                    setDateValue(newValue);
                                    setCoupon({ ...coupon, ["period"]: newValue });
                                }}
                            />
                        </LocalizationProvider>
                    </Box>

                </Grid>

            </Grid>

            <Grid container space={2} xs={12} className="FilterBlueClass">

                <Grid item xs={5.9}>

                    <Box className="BoxWidth">

                        <FormControl fullWidth>
                            <InputLabel id="fixed_amount_fixed_rate-label">定額 / 定率</InputLabel>
                            <Select
                                labelId="fixed_amount_fixed_rate-label"
                                id="fixed_amount_fixed_rate"
                                value={coupon.fixed_amount_fixed_rate}
                                label="定額 / 定率"
                                name="fixed_amount_fixed_rate"
                                onChange={handleChange}>
                                <MenuItem value={"定額"}>定額</MenuItem>
                                <MenuItem value={"定率"}>定率</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </Grid>

                <Grid item xs={5.9}>

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <TextField
                                label="額／率"
                                name="amount_rate"
                                value={coupon.amount_rate}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                </Grid>

            </Grid>

            <Grid container space={2} xs={12} className="FilterBlueClass">

                <Grid item xs={5.9}>

                    <Box className="BoxWidth">

                        <FormControl fullWidth>
                            <InputLabel id="shipping-label">対象商品</InputLabel>
                            <Select
                                labelId="shipping-label"
                                id="shipping"
                                value={coupon.shipping}
                                label="対象商品"
                                name="shipping"
                                onChange={handleChange}>
                                <MenuItem value={"全て"}>全て</MenuItem>
                                <MenuItem value={"全て"}>全て</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </Grid>

                <Grid item xs={5.9}>

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <TextField
                                label="商品"
                                name="product"
                                value={coupon.product}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                </Grid>

            </Grid>

            <Grid container space={2} xs={12} className="FilterBlueClass">

                <Grid item xs={5.9}>

                    <Box className="BoxWidth">

                        <FormControl fullWidth>
                            <InputLabel id="target_customer-label">対象顧客</InputLabel>
                            <Select
                                labelId="target_customer-label"
                                id="target_customer"
                                value={coupon.target_customer}
                                label="対象顧客"
                                name="target_customer"
                                onChange={handleChange}>
                                <MenuItem value={"定額"}>定額</MenuItem>
                                <MenuItem value={"定率"}>定率</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </Grid>

                <Grid item xs={5.9}>

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <TextField
                                label="指定あり"
                                name="specified"
                                value={coupon.specified}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                </Grid>

            </Grid>

            <Grid>
                <div className="userbuttonshead">
                    <div className="right-button">
                        <Button variant="outlined" className="UserButtonMargin">
                            リセット
                        </Button>
                        <Button variant="outlined" className="right-last-btn" onClick={onSubmit}>
                            検索
                        </Button>
                    </div>
                </div>
            </Grid>
        </div>
    );
};
export default CouponList;