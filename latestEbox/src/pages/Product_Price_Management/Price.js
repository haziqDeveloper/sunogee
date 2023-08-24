// @mui
import * as React from 'react';
import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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

import FileUpload from '../../components/FileUpload'
// components
import Page from '../../components/Page';
// sections

// ----------------------------------------------------------------------

const price = () => {


    // Add Fields
    const [inputFields, setInputFields] = useState([
        { name: '', id: '' }
    ])
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }
    const addFields = () => {
        let newfield = { name: '', id: '' }
        setInputFields([...inputFields, newfield])
    }
    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }


    const [price, setPrice] = useState({
        service_side_product_number: '',
        name: '',
        explanation: '',
        line_notation: '',
        control_number: '',
        product_image: '',
        label: '',
        Attributes: { ...inputFields },
    });
    let name = '';
    let value = '';

    const handleChange = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;
        setPrice({ ...price, [name]: value });
    };
    const onSubmit = (e) => {
        console.log("Customer Form Fields", customer)
        console.log("Customer Input Fields", inputFields)

    };


    return (
        <Page className="User Overview" title="商品・料金一覧 / 商品・料金">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card className="RoleCard">
                        <CardHeader title="商品・料金" className="RolePageHeading" />
                        <Grid container spacing={2} className="RoleCardBody">
                            <Grid item xs={6}>

                                <Box className="BoxWidth">
                                    <FormControl fullWidth>
                                        <TextField label="サービス側商品番号"
                                            name='service_side_product_number'
                                            value={price.service_side_product_number}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Box>

                                <Box className="BoxWidth">
                                    <FormControl fullWidth>
                                        <TextField label="名前"
                                            name='name'
                                            value={price.name}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Box>

                                <Box className="demo-space-x BoxWidth" sx={{ mb: 4 }}>
                                    <TextField
                                        className="TextAreaWidth"
                                        value={price.explanation}
                                        name="explanation"
                                        rows={4.2}
                                        multiline
                                        label="説明"
                                        id="textarea-outlined-static"
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box className="BoxWidth">
                                    <FormControl fullWidth>
                                        <TextField label="明細行の表記"
                                            name='line_notation'
                                            value={price.line_notation}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Box>

                            </Grid>

                            <Grid item xs={6}>

                                <Box className="BoxWidth">
                                    <FormControl fullWidth>
                                        <TextField label="管理番号"
                                            name='control_number'
                                            value={price.control_number}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Box>

                                <Box className="BoxWidth ">
                                    <FormControl>
                                        <FileUpload />
                                    </FormControl>
                                </Box>

                                <Box className="BoxWidth">
                                    <FormControl fullWidth>
                                        <InputLabel id="label-label">ラベル</InputLabel>
                                        <Select
                                            labelId="label-label"
                                            id="label"
                                            value={price.label}
                                            label="ラベル"
                                            name="label"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'単位を入力'}>単位を入力</MenuItem>
                                            <MenuItem value={'単位を入力'}>単位を入力</MenuItem>
                                            <MenuItem value={'単位を入力'}>単位を入力</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>


                            </Grid>
                            <Grid container direction="column" xs={12} className="AddGridPadding">
                                <p className='AddGridHeading'>メタデータ​</p>
                                <Grid className='AddGrid'>
                                    {inputFields.map((input, index) => {
                                        return (
                                            <>
                                                <div key={index} className='AddInputDiv'>
                                                    <Grid item xs={5.5}>
                                                        <input
                                                            name='name'
                                                            placeholder='サイズ'
                                                            value={input.name}
                                                            onChange={event => handleFormChange(index, event)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={5.5}>
                                                        <input
                                                            name='id'
                                                            placeholder='XXXXXXXXXXXXX'
                                                            value={input.id}
                                                            onChange={event => handleFormChange(index, event)}
                                                        />
                                                    </Grid>
                                                    <IconButton onClick={() => removeFields(index)} aria-label="delete" size="small" className='RomoveButton'>
                                                        <CloseIcon fontSize="inherit" />
                                                    </IconButton>
                                                </div>
                                            </>
                                        )
                                    })}
                                    <div className='bottom-button'>
                                        <Button onClick={addFields} variant="contained" className="SaveButton" startIcon={<AddIcon />}>
                                            メタデータ追加
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Page>
    );
};
export default price;
