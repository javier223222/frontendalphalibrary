import { Delete } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';

import { MaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react'
import UpdateModal from './Modal';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import $ from "jquery"
const DataTableExtraviados = props => {
  let data=props.datapres?props.datapres:[];
  const [open, setOpen] = React.useState(false);
  const setOpenm=()=>setOpen(x=>!x)
  const MySwal = withReactContent(Swal)
  const [id,setId]=useState()
  const [titulonombre,setTituloNombre]=useState("")
  const savdata=(row)=>{
    setId(parseInt(row.original.id_libroextraviado))
    setTituloNombre(row.original.titulo)


  }
  const handleDeleteRow=(row)=>{
         setOpenm()
         savdata(row)
  }
  const deleteextraviado=async()=>{
    try{
      $.ajax({
        url: "https://l57ogzskej.execute-api.us-east-2.amazonaws.com/deleteextraviado",//URL AWS
        jsonp: "callback",
        method: 'DELETE',
        data : JSON.stringify({id_libroextraviado:id}),
        async: false,
        success: (respuestaSolicitud) => {
          console.log(JSON.stringify(respuestaSolicitud))
            

        }
    });
      setOpenm()
      await MySwal.fire({
        title: <strong>Eliminado correctamente</strong>,
        html: <i>El libro  fue Eliminado existosamente correctamente</i>,
        icon: 'success'
      })
    
      window.location.reload()
    }catch(e){
      setOpenm()
      MySwal.fire({
        title: <strong>Error</strong>,
        html: <i>No se puedo eliminar el libro</i>,
        icon: 'error'
      })
    }


  }
  const columns = useMemo(
    () => [
      {
        
        accessorKey: "id_libroextraviado", //simple recommended way to define a column
        header: "Número de libro extraviado",
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

  return (
    <div>
    <MaterialReactTable 
    columns={columns}
     state={{ isLoading: data? false:true }}
     data={data}
    //default
    
     enableColumnOrdering
     enableEditing
     renderRowActions={({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        
        <Tooltip arrow placement="right" title="Delete">
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    )}
     />
     <UpdateModal name={titulonombre} open={open} handleClose={setOpenm} deleteBook={deleteextraviado}></UpdateModal>
     </div>

  )
}


export default DataTableExtraviados