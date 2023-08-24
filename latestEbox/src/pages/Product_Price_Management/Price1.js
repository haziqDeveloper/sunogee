// @mui
import * as React from 'react';
import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

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
} from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// components
import Page from '../../components/Page';
// sections

// ----------------------------------------------------------------------

const Customer = () => {
    const [dateValue, setDateValue] = useState(new Date());
    const [price1, setPrice1] = useState({
        free_structure: '',
        price: '',
        billing_period: '',
        price_number: '',
        product_description: '',
        date: '',
    });
    let name = '';
    let value = '';

    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setPrice1({ ...price1, [name]: value });
    };
    const onSubmit = (e) => {
        console.log("Customer Form Fields", price1)

    };

    return (
        <Page className="User Overview" title="商品・料金一覧 / 商品・料金">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card className="RoleCard">
                        <CardHeader title="商品・料金（１／２）からの続き" className="RolePageHeading" />
                        <Grid container spacing={2} className="RoleCardBody">
                            <Grid item xs={6}>

                                <Box className="BoxWidth">
                                    <FormControl fullWidth>
                                        <InputLabel id="free_structure-label">料金体系</InputLabel>
                                        <Select
                                            labelId="free_structure-label"
                                            id="free_structure"
                                            value={price1.free_structure}
                                            label="料金体系"
                                            name="free_structure"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'標準の料金体系'}>標準の料金体系</MenuItem>
                                            <MenuItem value={'標準の料金体系'}>標準の料金体系</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box className="BoxWidth">
                                    <FormControl fullWidth>
                                        <TextField label="価格"
                                            name='price'
                                            value={price1.price}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Box>
                                <Box className="BoxWidth">
                                    <div>
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label="一括"
                                            className="LabelFullWidth MaxWidth"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label="継続"
                                            className="LabelFullWidth MaxWidth"
                                        />
                                    </div>
                                </Box>

                                <Box className="BoxWidth">
                                    <FormControl fullWidth>
                                        <TextField label="請求期間"
                                            name='billing_period'
                                            value={price1.billing_period}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Box>

                                <Box>
                                    <Button variant="outlined" startIcon={<AddIcon />} className="PriceAddButton">
                                        <p>{"料金を追加"}</p>
                                    </Button>
                                </Box>

                            </Grid>

                            <Grid item xs={6}>

                                <Box className="BoxWidth">
                                    <FormControl fullWidth>
                                        <TextField label="価格番号"
                                            name="price_number"
                                            value={price1.price_number}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Box>

                                <Box className="demo-space-x BoxWidth" sx={{ mb: 4 }}>
                                    <TextField
                                        className="TextAreaWidth"
                                        value={price1.product_description}
                                        name="product_description"
                                        rows={8.2}
                                        multiline
                                        label="商品の説明"
                                        id="textarea-outlined-static"
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box className="BoxWidth">
                                    <LocalizationProvider dateAdapter={AdapterDateFns} className="DateFullWidth">
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="最終更新日時"
                                            value={dateValue}
                                            onChange={(newValue) => {
                                                setDateValue(newValue)
                                                setPrice1({ ...price1, ['date']: newValue });
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Box>

                            </Grid>

                            <Grid item container justifyContent="space-between" alignItems="center" xs={12}>
                                <Button variant="outlined" className="DeleteButton">
                                    削除
                                </Button>
                                <Button variant="contained" className="SaveButton" startIcon={<DoneIcon />} onClick={onSubmit}>
                                    保存
                                </Button>
                            </Grid>

                        </Grid>
                    </Card>
                </Grid>
            </Grid >
        </Page >
    );
};
export default Customer;
