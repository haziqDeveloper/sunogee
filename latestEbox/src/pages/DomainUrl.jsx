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
      url:'',
      error_list:[],
    }
    handleInput = (e) => {
      this.setState({
           [e.target.name]: e.target.value
      });
    }

    async componentDidMount() {
      const resp = await axios.get('https://sunogee.xyz/ebox/api/sunogee/domain_Url');
      console.log("Original",resp.data);
      const responde = resp.data
    //   this.setState({panels:responde})
      console.log("zonlu",responde.url)
      this.setState({url:responde.url})
    }

    updatePanels = async (e) => {
        e.preventDefault();
        let param = {
            id:"1",
            url: this.state.url,
        }
        console.log("ji para,",param);
        const id = 1;
        console.log("id",id);
          const res = await axios.put(`https://sunogee.xyz/ebox/api/sunogee/domainUrl/${id}`, param);
          console.log("submit the data",res);
          if(res.data.status === 200)
        {
            toast.success("Update Domain Url is Successfully!");
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
		<Page className="User Overview" title="Domain Url">
            <Grid container spacing={2}>
					<Grid item xs={12}>
                    <Card className="RoleCard">
						<CardHeader title="Ebox Domain Url" className="RolePageHeading" />
                        <Grid container spacing={2} className="RoleCardBody">
							<Grid item xs={12}>
        
                     <form onSubmit={this.updatePanels}>
                     <Box className="BoxWidth">
                     <TextField id='outlined-basic' 
                        name="url" 
                        onChange={this.handleInput}
                        value={this.state.url}
                        label='Url' />
                     </Box>
                     <Button
						variant="contained"
					    type="submit"
						className="SaveButton"
						startIcon={<DoneIcon />}>
						Update Url
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