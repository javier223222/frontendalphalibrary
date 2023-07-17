import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {style,styleTwo} from "../functions/Styles"

export default function UpdateModal(props) {

  return (
    <div>
      
      <Modal

open={props.open}
        
        
      >
        <Box sx={style}>

          <Typography align="center" id="modal-modal-title" variant="h6" component="h2">
           {` Deseas eliminar ${props.name}`} 
          </Typography>
       
          <Box sx={styleTwo}>
            <Button color="secondary" variant="contained" onClick={props.handleClose}>Cerrar</Button>

           <Button color="secondary" variant="contained" type="reset" onClick={props.deleteBook}>Eliminar</Button>
          </Box>
          
        </Box>
      </Modal> 
    </div>
  );
}
