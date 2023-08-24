/** @format */

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Grid, TextField, Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";


import { set } from "lodash";

const ProductPriceListDropDown = () => {

    const defaultValues = {
        "description": "string",
        "productTaxCategory": "string",
        "controlNumber": "string",
        "unitLabel": "string",
        "lineNotation": "string"
    };
    const [dateValue2, setDateValue2] = useState(new Date());
    const [dateValue3, setDateValue3] = useState(new Date());

    const [product, setProduct] = useState({...defaultValues});
    let name = "";
    let value = "";
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setProduct({ ...product, [name]: value });
    };

    const onSubmit = (e) => {
        console.log("product", product);
    };

    const onClear = (e) => {
		setProduct({...defaultValues});
	};

    return (
        <div className="MarginUserButtonDiv">
            <Grid container spacing={2} className="FilterFieldsMainDiv">

                <Grid item xs={6} className="FilterFullDiv">

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <TextField
                                label="サービス側商品番号"
                                name="service_side_product_number"
                                value={product.service_side_product_number}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <InputLabel id="fee_structure-label">料金体系</InputLabel>
                            <Select
                                labelId="fee_structure-label"
                                id="fee_structure"
                                value={product.fee_structure}
                                label="料金体系"
                                name="fee_structure"
                                onChange={handleChange}>
                                <MenuItem value={"標準の料金体系"}>標準の料金体系</MenuItem>
                                <MenuItem value={"標準の料金体系"}>標準の料金体系</MenuItem>
                                <MenuItem value={"標準の料金体系"}>標準の料金体系</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box className="BoxWidth Arrangediv">
                        <FormControl fullWidth>
                            <TextField
                                label="価格"
                                placeholder="¥0"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <h2>~</h2>
                        <FormControl fullWidth>
                            <TextField
                                placeholder="¥100,000"
                                name="price_1"
                                value={product.price_1}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                    <Box className="BoxWidth">
                        <div className="CheckBoxDiv">
                            <FormControlLabel
                                control={<Checkbox />}
                                label="継続"
                                className="LabelFullWidth MaxWidth"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="一括"
                                className="LabelFullWidth MaxWidth"
                            />
                        </div>
                    </Box>

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <InputLabel id="billing_period-label">請求期間</InputLabel>
                            <Select
                                labelId="billing_period-label"
                                id="billing_period"
                                value={product.billing_period}
                                label="請求期間"
                                name="billing_period"
                                onChange={handleChange}>
                                <MenuItem value={"月次"}>月次</MenuItem>
                                <MenuItem value={"月次"}>月次</MenuItem>
                                <MenuItem value={"月次"}>月次</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </Grid>

                <Grid item xs={6} className="FilterFullDiv">

                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <TextField
                                label="管理番号"
                                name="control_number"
                                value={product.control_number}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>
                    <Box className="BoxWidth">
                        <FormControl fullWidth>
                            <TextField
                                label="価格番号"
                                name="price_number"
                                value={product.price_number}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                xs={12}
                className="filter-submit-buttons">
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
        </div>
    );
};
export default ProductPriceListDropDown;
