import React,{Component} from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import {
	Grid,
	Card,
    Box,
    Button,
	CardHeader, 
} from "@mui/material";
import Page from "../components/Page";
import TextField from '@mui/material/TextField';
import DoneIcon from "@mui/icons-material/Done";

class DomainUrl extends Component
{
    state = {
      panels:[],
      isLoaded:true,
      version:'',
      description:'',
      file:'',
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

    async componentDidMount() {
      const resp = await axios.get('https://chakraconnect.me/chakra/api/chakra/apk/version/data');
      const responde = resp.data
      this.setState({version:responde[0].version,description:responde[0].description,file:responde[0].file,})
    }

    updatePanels = async (e) => {
        e.preventDefault();
        let param = {
            id:"1",
            version: this.state.version,
            description: this.state.description,
            file: this.state.file,
        }
        console.log("ji para,",param);
        const id = 1;
        console.log("id",id);
          const res = await axios.put(`https://sunogee.xyz/ebox/api/sunogee/updateVersion/${id}`, param);
          console.log("submit the data",res);
          if(res.data.status === 200)
        {
            toast.success("Update Version is Successfully!");
        }
        else if(res.data.status === 400)
        {
               this.setState({
                   error_list:res.data.errors
               })
        }
   }
   
  
   render()
   {
    
    return(
     <>
		<Page className="User Overview" title="Update Version">
            <Grid container spacing={2}>
					<Grid item xs={12}>
                    <Card className="RoleCard">
						<CardHeader title="Chakra Update Version" className="RolePageHeading" />
                        <Grid container spacing={2} className="RoleCardBody">
							<Grid item xs={12}>
        
                     <form onSubmit={this.updatePanels}>
                     <Box className="BoxWidth">
                     <TextField id='outlined-basic' 
                        name="version" 
                        onChange={this.handleInput}
                        value={this.state.version}
                        label='Version' />
                     </Box>
                     <Box className="BoxWidth">
                     <TextField id='outlined-basic' 
                        name="description" 
                        onChange={this.handlesInput}
                        value={this.state.description}
                        label='Description' />
                     </Box>
                     <Box className="BoxWidth">
                     <input type="file"
                        id='outlined-basic' 
                        name="file" 
                        onChange={(e) => this.setState(e.target.files[0])}
                        value={this.state.file} />
                     </Box>
                     <Button
						variant="contained"
					    type="submit"
						className="SaveButton"
						startIcon={<DoneIcon />}>
						Update Version
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
export default DomainUrl;