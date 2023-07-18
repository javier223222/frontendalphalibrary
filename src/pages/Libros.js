import Navbar from "../componets/Navbar";
import "../css/Libros.css";
import logo from "../assets/img/logo.jpeg"
import  { PDFDownloadLink } from "@react-pdf/renderer";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import DataTable from "../componets/DataTable";
import MyDocument from "../componets/Pdf";
import {  useEffect, useState } from "react";
import $ from "jquery";
import { useForm } from "../hooks/useForm";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    maarginTop:40,
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,
    borderRadius:3,
    p: 4,
  };
 const styleTwo={
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        marginTop:4,
        gap:2
 }
const Libros=()=>{
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () =>{ setOpen(false)
     onResetForm()
    };
    const [databook,setDataBook]=useState([])
   const {directName,fechadereporte,onInputChange,onResetForm}=useForm({
     directName:null,
     fechadereporte:null
   })
     
   useEffect(()=>{
   
     $.ajax({
      url: "https://heqpx6wxw1.execute-api.us-east-2.amazonaws.com/getlibros",//URL AWS
      jsonp: "callback",
      method: 'GET',
      async: false,
      success: (response) => {
        setDataBook(response)
          
     
      }
    })
  
    

   },[])
  
    const navigate=useNavigate()
    const cerrar=()=>{
        localStorage.removeItem("acessToken")
        navigate("/",{
            replace:true
        })
        
    }
   
    const addBook=()=>{
      
        navigate("/agregarLibros",{
          replace:false,
          state:{databook}
        })
    }
    alert("La resolución de tu pantalla es: " + window.screen.width + " x " + window.screen.height)
    return(


        <div className="principallibros">
           <div className="d-flex align-items-center justify-content-center tit">
                <h1 className="tituilolibros">Inventario de Libros</h1>
           </div>
            <div className=" d-flex align-items-start justify-content-start agrega">
            <div className=" ">
            <Button variant="contained " onClick={addBook} className="agregarlibro ">Agregar Libro</Button>
            </div>
            <div className="">
            {/* <PDFDownloadLink className="a "  document={<MyDocument ></MyDocument>} fileName="Inventariobibliotecario.pdf"> */}
            <Button variant="contained "  onClick={()=>handleOpen()} className="agregarlibro ">Generar Pdf</Button>
            {/* </PDFDownloadLink> */}
            
            </div>
            </div>
            
              <Navbar names={[<Link to={"/libros"}>Inicio</Link>,<Link to={"/prestamos"} >Prestamos</Link>,<Link to={"/extraviados"}>Extraviados</Link>,<Button className="iniciosesionboton" onClick={cerrar}>Cerrar sesion</Button>]}classImage="imagePrincipalLibros" image={logo} navclass="navLibros" itemsNavbar="itemslibros" navbaragregarLibro="navdisplay"></Navbar>
              
              <DataTable datapres={databook}></DataTable>
              <Modal

open={open}
        
        
      >
        <Box sx={style}>

          <Typography color="secondary" align="center" id="modal-modal-title" variant="h6" component="h2">
           Ingrese el nombre del director 
          </Typography>
          <Box align="center">
       <TextField id="standard-basic" placeholder="Ingrese el nombre del director" color="secondary" name="directName"  variant="standard" fullWidth onChange={onInputChange} />
          </Box>
          <Typography color="secondary" align="center" id="modal-modal-title" variant="h6" component="h2">
           Ingrese la fecha del reporte
          </Typography>
          <Box align="center">
       <TextField id="standard-basic" placeholder="" color="secondary" name="fechadereporte"  variant="standard" fullWidth onChange={onInputChange} type="date" />
          </Box>
          <Box sx={styleTwo}>
            <Button color="secondary" variant="contained" onClick={handleClose}>Cerrar</Button>



           <PDFDownloadLink className="a "  document={<MyDocument name={ directName ? directName:"VLADIMIR A. DE LA ROSA TUN"} fecha={fechadereporte?new Date(new Date(fechadereporte).setDate(new Date(fechadereporte).getDate()+1)):fechadereporte} ></MyDocument>} fileName="Inventariobibliotecario.pdf"> 
           <Button color="secondary" variant="contained" onClick={()=>onResetForm} >Generar pdf</Button>
           </PDFDownloadLink>
          </Box>
          
        </Box>
      </Modal> 

          
        </div>
      
    )
}
export default Libros