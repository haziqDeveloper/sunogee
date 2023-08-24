import React,{Component} from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import {
	Grid,
	Card,
    Box,
    Button,
    FormControl,
	CardHeader, 
} from "@mui/material";
import Page from "../components/Page";
import TextField from '@mui/material/TextField';
import DoneIcon from "@mui/icons-material/Done";
import FileUpload from "../components/FileUpload";
import CROSS from '../assets/images/delete.png'
import { deleteFile } from "../store/services/roleService"

class ContactDetail extends Component
{
    state = {
      panels:[],
      isLoaded:true,
      email:'',
      phone:'',
      info:'',
      file:'',
      loading:false,
      error_list:[],
    }
    handleInput = (e) => {
      this.setState({
           [e.target.name]: e.target.value
      });
    }

    handlesInput = (e) => {
        this.setState({
             [e.target.name]: e.target.value
        });
    }

    handleInputs = (e) => {
        this.setState({
             [e.target.name]: e.target.value
        });
    }

    async componentDidMount() {
      const resp = await axios.get('https://sunogee.xyz/ebox/api/sunogee/contact_detail');
      console.log("Original",resp.data);
      const responde = resp.data
    //   this.setState({panels:responde})
      console.log("zonlu",responde.email)
      this.setState({email:responde.email,phone:responde.phone,info:responde.info,file:responde.file});
    }

    updatePanels = async (e) => {
        e.preventDefault();
        let param = {
            email: this.state.email,
            phone: this.state.phone,
            info: this.state.info,
            file: this.state.file,
        }
        const formData = new FormData();
        Object.keys(param).map(p => {
          formData.append(p,this.state[p]);
        })
        formData.append('_method','put');
        formData.append('id',1);
        // const formData = new FormData();
        // formData.append("file", this.state.file);
        // console.log("ji para,",param);
        const id = 1;
          const res = await axios.post(`https://sunogee.xyz/ebox/api/sunogee/contactDetail/${id}`, formData);
          console.log("submit the data",res);
          if(res.data.status === 200)
        {
            toast.success("Update Contact Detail is Successfully!");
        }
        else if(res.data.status === 400)
        {
               this.setState({
                ...this.state,
                   error_list:res.data.errors
               })
        }
  
  
        

  }

  handleUpload = (e) => {
    console.log("Imageestion",e);
    this.setState({
      ...this.state,
         file: e
  })
}

removeImage = () => {
  let params =
  {
      file: ""
  }
  const id = 1;
  deleteFile(id, params)
  .then(r => {
      console.log("R",r);
      toast.success("Delete This Image");
      window.location.reload();
  })
  .catch((error) => {console.log("Error",error)})
}


  
   render()
   {
    
    return(
     <>
		<Page className="User Overview" title="Contact Detail">
            <Grid container spacing={2}>
					<Grid item xs={12}>
                    <Card className="RoleCard">
						<CardHeader title="Ebox Contact Detail" className="RolePageHeading" />
                        <Grid container spacing={2} className="RoleCardBody">
							<Grid item xs={12}>
        
                     <form onSubmit={this.updatePanels}>
                     <Box className="BoxWidth">
                     <TextField id='outlined-basic' 
                        name="email" 
                        onChange={this.handleInput}
                        value={this.state.email}
                        label='Email' />
                     </Box>

                     <Box className="BoxWidth">
                     <TextField id='outlined-basic' 
                        name="phone" 
                        onChange={this.handleInputs}
                        value={this.state.phone}
                        label='Phone' />
                     </Box>

                     <Box className="BoxWidth">
                     <TextField id='outlined-basic' 
                        name="info" 
                        onChange={this.handlesInput}
                        value={this.state.info}
                        label='Info' />
                     </Box>

                     <Box className="BoxWidth ht-manage">
											<FormControl>
												<FileUpload img={this.state.file} onChange={this.handleUpload}/>
                        <img src={CROSS} className="crossImage" onClick={this.removeImage} alt=""/>
											</FormControl>
										</Box>

                     <Button
						variant="contained"
					    type="submit"
						className="SaveButton"
						startIcon={<DoneIcon />}>
						Update Contact
					</Button>
                    </form>
           			
									</Grid>
								</Grid>
                    </Card>            
                    </Grid>
            </Grid>            
        </Page>

      </>
       );
   }
}
export default ContactDetail;