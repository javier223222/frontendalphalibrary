import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import {style,styleTwo} from "../functions/Styles"
import { Box, Button, IconButton, Modal, TextField, Tooltip, Typography } from "@mui/material";
import $ from "jquery"
import { Delete, Edit } from '@mui/icons-material';
import { useForm } from "../hooks/useForm";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
 


//simple data example - Check out https://www.material-react-table.com/docs/examples/remote for a more complex example

export default function DataTable(props) {
  let data=props.datapres?props.datapres:[];
   const [open, setOpen] = React.useState(false);
 const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
   const [id,setId]=useState(0)
   const [name,setNameBook]=useState("")
   const [estado,setEstado]=useState(false)
   const {cantidad,onInputChange,onResetForm}=useForm({
    cantidad:0,
   })
    

     const handleDeleteRow=(row)=>{
       savdata(row)
       setEstado(1)
     }
     const savdata=(row)=>{
       setId(parseInt(row.original.id_libro))
       setNameBook(row.original.titulo)
       handleOpen()
     }
     const handleEditBook=(row)=>{
     
      savdata(row)
      setEstado(0)

     }
     const deleteBook= async ()=>{
      $.ajax({
        url: "https://ly1rnldz09.execute-api.us-east-2.amazonaws.com/eliminar",//URL AWS
        jsonp: "callback",
        method: 'POST',
        data : JSON.stringify({id_libro:id}),
        async: false,
        success: (respuestaSolicitud) => {

          console.log(JSON.stringify(respuestaSolicitud))
            
        
        }})
      const MySwal = withReactContent(Swal)
   
       onResetForm()
     
       handleClose()
      await MySwal.fire({
        title: <strong>Eliminado</strong>,
        html: <i>El libro {name} fue eliminado correctamente</i>,
        icon: 'success'
      })
        window.location.reload()

     }

     const updateDataBook= async ()=>{
      if(parseInt(cantidad)<=0){
        onResetForm()
        
        handleClose()
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: <strong>Error</strong>,
            html: <i>No se pueden guardar cantidades negativas o iguales a ceros</i>,
            icon: 'error'
          })

      }else{
        $.ajax({
          url: "https://pd06fi7i3c.execute-api.us-east-2.amazonaws.com/actulizarlibro",//URL AWS
          jsonp: "callback",
          method: 'POST',
          data : JSON.stringify({value:cantidad,id:id}),
          async: false,
          success: (respuestaSolicitud) => {
  
            console.log(JSON.stringify(respuestaSolicitud))
              
          
          }})
         onResetForm()
         const MySwal = withReactContent(Swal)
         handleClose()
         await MySwal.fire({
          title: <strong>Actualizado</strong>,
          html: <i>La cantidad de libro {name} fue actualizado  correctamente</i>,
          icon: 'success'
        })
           window.location.reload()

      }
     
     }
    
    //      let id=row.original.id
    //      axios.post("http://localhost:3001/eliminarLibros",{
    //        id:id
    //     }).then((response)=>{

    //      })
    //     console.log(row.original.id)
    // }
    // const handleDeleteRow2 = useCallback(
    //     (row) => {
    //       if (
    //         !confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
    //       ) {
    //         return;
    //       }
    //       //send api delete request here, then refetch or update local table data for re-render
          
    //     },
    //     [],
    //   );
    
   



  const columns = useMemo(
    () => [
      {
        
        accessorKey: "id_libro", //simple recommended way to define a column
        header: "Número",
        muiTableHeadCellProps: { sx: { color: "black" } }, //custom props
         Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> //optional custom cell render
      },
      {
     
       accessorKey:"titulo",
        header: "Título",
        Header: <strong style={{ color: "black" }}>Título</strong> //optional custom markup
      },
      {
     
        accessorKey:"editorial",
         header: "Editorial",
         Header: <strong style={{ color: "black" }}>Editorial</strong>  //optional custom markup
       },
       {
      
         accessorKey:"autor",
          header: "Autor",
          Header: <strong style={{ color: "black" }}>Autor</strong> //optional custom markup
        }
        ,
       {
      
         accessorKey:"genero",
          header: "Género",
          Header: <strong style={{ color: "black" }}>Género</strong>//optional custom markup
        }
        ,
       {
      
         accessorKey:"cantidad",
          header: "Cantidad",
          Header: <strong style={{ color: "black" }}>Cantidad</strong> //optional custom markup
        }
        ,
        {
       
          accessorKey:"isbn",
           header: "ISBN",
           Header:<strong style={{ color: "black" }}>ISBN (opcional)</strong> //optional custom markup
         },
    ],
    [],
  );

  return(
    <div>

<MaterialReactTable 
columns={columns}
 state={{ isLoading: data ? false:true }}
 data={data}
//default

 enableColumnOrdering
 enableEditing
 renderRowActions={({ row, table }) => (
  <Box sx={{ display: 'flex', gap: '1rem' }}>
    <Tooltip arrow placement="left" title="Edit">
      <IconButton onClick={() => handleEditBook(row)}>
        <Edit />
      </IconButton>
    </Tooltip>
    <Tooltip arrow placement="right" title="Delete">
      <IconButton color="error" onClick={() => handleDeleteRow(row)}>
        <Delete />
      </IconButton>
    </Tooltip>
  </Box>
)}
 />
   

 <Modal

open={open}
        
        
      >
        <Box sx={style}>

          <Typography align="center" id="modal-modal-title" variant="h6" component="h2">
           {estado ? ` Deseas eliminar el libro ${name}`: `Actualizar la cantidad del libro ${name}`} 
          </Typography>
          <Box align="center">
       {!estado &&   <TextField id="standard-basic" label="Ingrese la cantidad" color="secondary" name="cantidad" onChange={onInputChange} fullWidth variant="standard"  type="number"/>}
          </Box>
          <Box sx={styleTwo}>
            <Button color="secondary" variant="contained" onClick={handleClose}>Cerrar</Button>

          { estado ? <Button color="secondary" variant="contained" type="reset" onClick={deleteBook}>Eliminar</Button>:<Button color="secondary" variant="contained" type="reset" onClick={updateDataBook}>Actualizar</Button>}
          </Box>
          
        </Box>
      </Modal> 

    </div>
    );
}
