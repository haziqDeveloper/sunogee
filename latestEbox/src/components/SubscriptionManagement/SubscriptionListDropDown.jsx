/** @format */

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Grid, TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import DoubleDates from "../../pages/DoubleDate";
import moment from "moment";

const SubscriptionManagement = ({subscriptionData = {} , applyfilter = (data) => {}}) => {
    const defaultValues = {
        startDate:'',
        endDate:'',
        trialStart:'',
        trialEnd:'',
        trialDays:'',
        subscriptionCode:'',
        taxPercent:'',

        // autoPayment:true, -waste
        // usageThreshold:'',
        // status:'',
	};

    // reamining
    // customer: "",
        // plan_price: "",
        // start_date_end_date: "",
        // billing_start_date: "",
        // customer_number: "",
        // quantity: "",

	const defaultDates = {
        startDate: new Date(),
		endDate: new Date(),
	};
    const [dateValue, setDateValue] = useState(defaultDates);
	const [trialDate, setTrialDate] = useState(defaultDates);	
    const [subscription, setSubscription] = useState(defaultValues);
    let name = "";
    let value = "";

    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setSubscription({ ...subscription, [name]: value });
    };

    const onSubmit = (e) => {
        console.log("Subscription", subscription);
        applyfilter(subscription);
    };

    const onClear = (e) => {
		setSubscription({...defaultValues});
	};

    return (
        <div className="MarginUserButtonDiv">
            <Grid container spacing={2} className="FilterFieldsMainDiv">

                <Grid item xs={6} className="FilterFullDiv">

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <TextField
                                label="サービス側サブスクリプション番号"
                                name="subscriptionCode"
                                value={subscription.subscriptionCode}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <TextField
                                label="顧客​"
                                name="usageThreshold"
                                value={subscription.usageThreshold}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>
                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <TextField
                                label="プラン・料金​"
                                name="plan_price"
                                value={subscription.customer}
                                onChange={handleChange}
                                disabled
                            />
                        </FormControl>
                    </Box>

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
							<DoubleDates
                                label="開始日／終了日"
								startDate={dateValue.startDate}
								endDate={dateValue.endDate}
								rangedate={(newValue) => {
									setSubscription({
										...subscription,
										startDate:  moment(newValue.startDate).format("YYYY-MM-DD"),
										endDate:  moment(newValue.endDate).format("YYYY-MM-DD"),
									});
									setDateValue(newValue);
								}}
								name="start_date_end_date"
							/>
						</FormControl>
                    </Box>

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
							<DoubleDates
                                label="請求開始日"
								startDate={trialDate.startDate}
								endDate={trialDate.endDate}
								rangedate={(newValue) => {
									setSubscription({
										...subscription,
										trialStart:  moment(newValue.startDate).format("YYYY-MM-DD"),
										trialEnd:  moment(newValue.endDate).format("YYYY-MM-DD"),
									});
									setTrialDate(newValue);
								}}
								name="start_date_end_date"
							/>
						</FormControl>
                    </Box>

                </Grid>

                <Grid item xs={6} className="FilterFullDiv">

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <TextField
                                label="管理番号"
                                name="taxPercent"
                                value={subscription.taxPercent}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                    <Box className="BoxWidth subscription_quantity">
                        <FormControl fullWidth>
                            <TextField
                                disabled
                                label="数量"
                                name="quantity"
                                value={subscription.quantity}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <h2>合計<span>¥10,000</span></h2>
                    </Box>

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <InputLabel id="trialDays-label">無料トライアル日数</InputLabel>
                            <Select
                                labelId="trialDays-label"
                                id="trialDays"
                                value={subscription.trialDays}
                                label="請求期間"
                                name="trialDays"
                                onChange={handleChange}>
                                <MenuItem value={"20"}>20</MenuItem>
                                <MenuItem value={"21"}>21</MenuItem>
                                <MenuItem value={"22"}>22</MenuItem>
                                <MenuItem value={"23"}>23</MenuItem>
                                <MenuItem value={"24"}>24</MenuItem>
                                <MenuItem value={"25"}>25</MenuItem>
                                <MenuItem value={"26"}>26</MenuItem>
                                <MenuItem value={"27"}>27</MenuItem>
                                <MenuItem value={"28"}>28</MenuItem>
                                <MenuItem value={"29"}>29</MenuItem>
                                <MenuItem value={"30"}>30</MenuItem>
                                <MenuItem value={"32"}>31</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        xs={12}
                        className="filter-submit-buttons filter_margin">
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

                </Grid>
            </Grid>

        </div>
    );
};
export default SubscriptionManagement;
