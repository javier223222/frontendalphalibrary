import React, { useEffect, useState } from 'react'
import Navbar from '../componets/Navbar'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'

import DataTablePrestamos from '../componets/DataTablePrestamos'
import '../css/Prestamos.css'
import $ from "jquery"
const Prestamos = props => {
   const [datapres,setDataPres]=useState([])
    const navigate=useNavigate()

    const cerrar=()=>{
        localStorage.removeItem("acessToken")
        navigate("/",{
            replace:true
        })
        
    }
    const agregarPrestamo=()=>{
        navigate("/agregarprestamos/:components",{
            replace:false,
            state:{datapres}
        })
        
    }
    useEffect(() => {
        $.ajax({
            url: "https://pd06fi7i3c.execute-api.us-east-2.amazonaws.com/getallprestamos",//URL AWS
            jsonp: "callback",
            method: 'GET',
            async: false,
            success: (response) => {
                setDataPres(response)
                
           
            }
          })
       
        
       


        
      
      },[]);

      
   
  return (
    <div className='principallibros'>
         <div className="d-flex align-items-center justify-content-center tit">
                <h1 className="tituilolibros tracking-in-expand ">Prestamos</h1>
           </div>
           <div className="container-fluid d-flex align-items-start justify-content-start mb-3">
                 <Button className='agregarlibros'  variant="contained" onClick={agregarPrestamo}> Agregar Prestamo</Button>

       </div>
        <Navbar names={[<Link to={"/libros"}>Inicio</Link>,<Link to={"/prestamos"} >Prestamos</Link>,<Link to={"/extraviados"}>Extraviados</Link>,<Button onClick={cerrar} className="iniciosesionboton">Cerrar sesion</Button>]}classImage="imagePrincipalLibros pasar" image={"../assets/img/logo.jpeg"} navclass="navLibros" itemsNavbar="itemslibros" navbaragregarLibro="navdisplay"></Navbar>
        <DataTablePrestamos data={datapres}></DataTablePrestamos>
    </div>
  )
}



export default Prestamos