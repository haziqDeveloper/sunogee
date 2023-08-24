/** @format */

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Grid, TextField, Button } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { set } from "lodash";

const NoticeListDropDown = () => {
    const [dateValue, setDateValue] = useState(new Date());
    const [notice, setNotice] = useState({
        subject: "",
        date: "",
        control_number: "",
        manager: "",
    });
    let name = "";
    let value = "";
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setNotice({ ...notice, [name]: value });
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
                                label="件名"
                                name="subject"
                                value={notice.subject}
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
                                label="DateTimePicker"
                                value={dateValue}
                                onChange={(newValue) => {
                                    setDateValue(newValue);
                                    setNotice({ ...notice, ["date"]: newValue });
                                }}
                            />
                        </LocalizationProvider>
                    </Box>

                </Grid>
                <Grid item xs={6}>

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <TextField
                                label="管理番号"
                                name="control_number"
                                value={notice.control_number}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>
                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <TextField
                                label="担当者"
                                name="manager"
                                value={notice.manager}
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
export default NoticeListDropDown;