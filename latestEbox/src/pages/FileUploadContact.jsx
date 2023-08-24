import React from 'react'
import FileUpload from "../components/FileUpload"

function FileUploadContact()
{
    // const [uploadImg, setUploadImg] = useState();

    // const handleUpload = (e) => {
	// 	console.log("Imageestion",e);
	//      setUploadImg(e);
	// }

    return(
        <>
        	<Box className="BoxWidth ht-manage">
				<FormControl>
					<FileUpload/>
				</FormControl>
			</Box>
        </>
    )

}

export default FileUploadContact