// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { TextField } from '@mui/material'
import notFound from '../assets/images/Imagenotfound.png';

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(10)
    },
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
        width: 250
    }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(4)
    }
}))

const FileUploaderSingle = (props) => {
    // ** State
    const [files, setFiles] = useState([])

    // ** Hook
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        multiple: false,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif']
        },
        onDrop: acceptedFiles => {
            const files = acceptedFiles.map(file => Object.assign(file));
            setFiles(files)
            props.onChange(files[0]);
        }
    })

    useEffect(() => {
  
    },[props.img])

    const handleLinkClick = event => {
        event.preventDefault()
    }
    const img = files.map(file => (
        <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} />
    ))

    const addDefaultSrc = (ev) => {
        ev.target.src = notFound
    }

    return (
        <Box {...getRootProps({ className: 'dropzone' })} sx={acceptedFiles.length ? { height: 450 } : {}}>
            <input {...getInputProps()}/>
            <Box className='ImageDiv'>
                <TextField
                    className="TextAreaWidth"
                    name="file"
                    rows={8}
                    multiline
                    label="Upload image"
                    id="textarea-outlined-static"
                    placeholder="↑Upload"
                    
                />
            </Box>
            {files.length ? img : props.img ? <img onError={addDefaultSrc} className='single-file-image' src={props.img} /> : null}
        </Box>
    )
}

export default FileUploaderSingle
