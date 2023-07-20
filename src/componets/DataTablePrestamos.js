import React, {  useMemo, useState } from 'react'
import { options } from '../functions/Time';
import { MaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, Modal, TextField, Tooltip, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useForm } from '../hooks/useForm';
import {style,styleTwo} from "../functions/Styles"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';
import $ from "jquery"

const DataTablePrestamos = props => {
    let data=props.data?props.data:[];
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
   
     const [id,setId]=useState({idlibro:null,idprestamo:null,cantidad:null})
     
     const [estado,setEstado]=useState(false)

    const handleDeleteRow=(row)=>{
        savdata(row)
        setEstado(1)
      }
      const savdata=(row)=>{
        setId(x=>{
          return{
            idlibro:parseInt(row.original.id_libro),
            idprestamo:parseInt(row.original.id_prestamo)
          }
        })
        
        handleOpen()
      }
      const {fecha_final,onInputChange,onResetForm}=useForm({
        fecha_final:''
       })
       const handleEditBook=(row)=>{

        savdata(row)
        setEstado(0)

       }
       const deleteBook= async ()=>{
        $.ajax({
          url: "https://lml0z0u4ui.execute-api.us-east-2.amazonaws.com/eliminarprestamo",//URL AWS
          jsonp: "callback",
          method: 'POST',
          data:JSON.stringify({id:id.idprestamo}),
          async: false,
          success: (response) => {
            console.log(response)
           
         
          }
        })

      //  await axios.post("http://localhost:3001/eliminarprestamo",{
      //     id:id.idprestamo
      //  }).then((response)=>{
      //    console.log(response)
      //  })

      // await axios.post("http://localhost:3001/getcantidad",{
      //     id:id.idlibro
      //  }).then((response)=>{
      //    axios.post("http://localhost:3001/actualizarLibro",{
      //     value:response.data[0].cantidad+1,id:id.idlibro
      //    })
        
        
      //  })
       $.ajax({
        url: "https://u2f8wd47db.execute-api.us-east-2.amazonaws.com/getcantidad",//URL AWS
        jsonp: "callback",
        method: 'POST',
        data:JSON.stringify({id:id.idlibro}),
        async: false,
        success: (response) => {
          actualizarcantidad(response[0].cantidad+1,id.idlibro)
         
       
        }
      })


     

      onResetForm()
      const MySwal = withReactContent(Swal)
       handleClose()
       await MySwal.fire({
        title: <strong>Devuelto</strong>,
        html: <i>El prestamos fue devuelto correctamente</i>,
        icon: 'success'
      })
      window.location.reload()

      }

      const actualizarcantidad=(cantidad,id)=>{
        $.ajax({
          url: "https://pd06fi7i3c.execute-api.us-east-2.amazonaws.com/actulizarlibro",//URL AWS
          jsonp: "callback",
          method: 'POST',
          data : JSON.stringify({value:cantidad,id:id}),
          async: false,
          success: (respuestaSolicitud) => {
  
            console.log(JSON.stringify(respuestaSolicitud))
              
          
          }})
      }

      const updateDataBook= async ()=>{
        const dia=data2.find(x=>x.id_prestamo==id.idprestamo)
        console.log(dia)
        console.log(fecha_final)
        if(new Date(dia.fecha_inicio)>new Date(fecha_final)){
          handleClose()
          const MySwal = withReactContent(Swal)
          MySwal.fire({
              title: <strong>Error</strong>,
              html: <i>Necesita poner una fecha mayor a la fecha de inicio</i>,
              icon: 'error'
            })

        }else{

          try{
            $.ajax({
              url: "https://791myja6q3.execute-api.us-east-2.amazonaws.com/actulizafechadeprestamo",//URL AWS
              jsonp: "callback",
              method: 'POST',
              data:JSON.stringify({ id:id.idprestamo,
                fecha:new Date(new Date(fecha_final).setDate(new Date(fecha_final).getDate()+1))}),
              async: false,
              success: (response) => {
               console.log(response)
                  
              }
            })
          onResetForm()
          handleClose()
          const MySwal = withReactContent(Swal)
        
          await MySwal.fire({
           title: <strong>Actualizado</strong>,
           html: <i>El préstamo fue actualizado correctamente</i>,
           icon: 'success'
         })
          window.location.reload()
         
          
        }catch(e){
          handleClose()
          const MySwal = withReactContent(Swal)
          MySwal.fire({
              title: <strong>Error</strong>,
              html: <i>No se pudo actualizar el libro</i>,
              icon: 'error'
            })
        }
        }
    // //    axios.post("http://localhost:3001/actualizarLibro",{
    // //     value:parseInt(cantidad),
    // //    id:id
    // //   }).then((response)=>{
    // //    console.log(response.data)
    // //    })
    // //    onResetForm()

    // //    handleClose()
   
      }

      let data2=[...data]

    data=[...data].map(x=>{
        const inicio=new Date(x.fecha_inicio)
        const final=new Date(x.fecha_final)
        const dia =new Date()
        return {...x,fecha_inicio:inicio.toLocaleDateString("es-ES", options),fecha_final:final.toLocaleDateString("es-ES", options),estatus:dia>final?<p style={{color:"red"}}>EL Prestamo esta vencido</p>:<p>Prestamo en curso</p>}
    })
   

   
   const mesagges=(numbers)=>{
    let bearerToken="EAALST3dG2swBACaT4vYlZAZCFL8JtAnEZBVSH4mZAkL33J8tVN2OQs0n8Lj0g6UV3GtHQGjw0ieiHQ57BrUARJgOWhJZC0MkNJib1F6khJmqZCWBUAtZB9fIx2vaMW47BEQoOAl3foj639hZBIZB5gq2asSU6q3KTwg4GwfBOnXaFtbghUIboBmtP"
    let url = ' https://graph.facebook.com/v17.0/100130109828269/messages';
let data = {
  messaging_product: 'whatsapp',
  to: `52${numbers}`,
  type: 'template',
  template: {
    name:'hello_world',
    language:{ code: 'en_US' }
  }
  
};
let  postReq = {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + bearerToken,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data),
  json: true
};
fetch(url, postReq)
  .then(data => {
    return data.json()
  })
  .then(res => {
    console.log(res)
  })
  .catch(error => console.log(error));
   
   }
   

     const filtrar=async (data)=>{
      
       const filterd=data.filter(x=>x.estatus.props.children=="El Préstamo está vencido"  && x.numero_de_telefono!=1111111111)
       console.log(filterd)
       if(filterd.length !=0){
   
       filterd.forEach(element => {
        mesagges(element.numero_de_telefono)
    
       });
      
      
       }
   }
    const columns = useMemo(
        () => [
          {

            accessorKey: "id_prestamo", //simple recommended way to define a column
            header: "Número de préstamo",
            muiTableHeadCellProps: { sx: { color: "black" } }, //custom props
             Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> //optional custom cell render
          },
          {

            accessorKey: "id_libro", //simple recommended way to define a column
            header: "Número del libro",
            muiTableHeadCellProps: { sx: { color: "black" } }, //custom props
             Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> //optional custom cell render
          },
          {

           accessorKey:"titulo",
            header: "Título del libro",
            Header: <strong style={{ color: "black" }}> Título del Libro</strong> //optional custom markup
          },
          {

            accessorKey:"nombre",
             header: "Nombre del alumno",
             Header: <strong style={{ color: "black" }}>Nombre del alumno </strong>  //optional custom markup
           },
           {

             accessorKey:"apellidopaterno",
              header: "Apellido Paterno",
              Header: <strong style={{ color: "black" }}>Apellido Paterno</strong> //optional custom markup
            }
            ,
           {

             accessorKey:"apellidomaterno",
              header: "Apellido Materno",
              Header: <strong style={{ color: "black" }}>Apellido Materno</strong>//optional custom markup
            }
            ,
           {

             accessorKey:"grado",
              header: "Grado",
              Header: <strong style={{ color: "black" }}>Grado</strong> //optional custom markup
            }
            ,
            {

              accessorKey:"grupo",
               header: "Grupo",
               Header:<strong style={{ color: "black" }}>Grupo</strong> //optional custom markup
             },
             {

                accessorKey:"numero_de_telefono",
                 header: "Número de Teléfono",
                 Header:<strong style={{ color: "black" }}>Número de Teléfono</strong> //optional custom markup
               },
               {

                accessorKey:"fecha_inicio",
                 header: "Fecha Inicio ",
                 Header:<strong style={{ color: "black" }}>Fecha de Inicio</strong> //optional custom markup
               },
               {

                accessorKey:"fecha_final",
                 header: "Fecha Final",
                 Header:<strong style={{ color: "black" }}>Fecha Final</strong> //optional custom markup
               },
               {

                accessorKey:"estatus",
                 header: "Estatus",
                 Header:<strong style={{ color: "black" }}>Estatus</strong> //optional custom markup
               },
        ],
        [],
      );
      filtrar(data)

  return (
    <div>
        <MaterialReactTable columns={columns}
       enableColumnOrdering
       enableEditing
       renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip arrow placement="left" title="Edit">
            <IconButton onClick={() => handleEditBook(row)}  >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton   onClick={() => handleDeleteRow(row)}>
             <Button style={{
               fontfamily: 'Montserrat',
               backgroundColor: 'rgba(76, 36, 162, 0.65)' ,
               borderRadius: 6 ,
             }}  variant="contained">Devolver </Button>
            </IconButton>
          </Tooltip>
        </Box>
       )}
 data={data}></MaterialReactTable>
  <Modal

open={open}


      >
        <Box sx={style}>

          <Typography align="center" id="modal-modal-title" variant="h6" component="h2">
           {estado ? ` Deseas devolver el prestamo ${id.idprestamo}`: `Actualizar la fecha del Préstamo `}
          </Typography>
          <Box align="center">
       {!estado &&   <TextField style={{width:230}} id="standard-basic"  color="secondary" name="fecha_final" onChange={onInputChange}  variant="standard"  type="date"/>}
          </Box>
          <Box sx={styleTwo}>
            <Button color="secondary" variant="contained" onClick={handleClose}>Cerrar</Button>

          { estado ? <Button color="secondary" variant="contained" type="reset" onClick={deleteBook}>Devolver</Button>:<Button color="secondary" variant="contained" type="reset" onClick={updateDataBook}>Actualizar</Button>}
          </Box>

        </Box>
      </Modal>
    </div>
  )
}



export default DataTablePrestamos