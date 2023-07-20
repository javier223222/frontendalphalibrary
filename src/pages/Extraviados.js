import React, { useEffect, useState } from 'react'
import Navbar from '../componets/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

import Circulo from '../componets/Circulo'
import $ from "jquery"
import DataTableExtraviados from '../componets/DataTableExtraviados'
import "../css/Extraviados.css"

const Extraviados = props => {
  const [dataextraviados,setDataExtraviados]=useState([])
const navigate=useNavigate()
  const cerrar=()=>{
    localStorage.removeItem("acessToken")
    navigate("/",{
        replace:true
    })
    
}
useEffect(()=>{
  $.ajax({
    url: "https://l57ogzskej.execute-api.us-east-2.amazonaws.com/getextraviados",//URL AWS
    jsonp: "callback",
    method: 'GET',
    async: false,
    success: (response) => {
      setDataExtraviados(response)
        
   
    }
  })

 
  

 },[])
const agregarExtraviado=()=>{
  navigate("/agregarExtraviado",{
    replace:false,
    state:{dataextraviados}
  })
}
  return (
    <div>
          <div className="d-flex align-items-center justify-content-center tit">
                <h1 className="tituilolibros tracking-in-expand ">Extraviados o dañados</h1>
           </div>
      <Navbar names={[<Link to={"/libros"}>Inicio</Link>,<Link to={"/prestamos"} >Prestamos</Link>,<Link to={"/historialDePrestamos"}>Historial De prestamos</Link>,<Link to={"/extraviados"}>Extraviados</Link>,<Button onClick={cerrar} className="iniciosesionboton">Cerrar sesion</Button>]}classImage="imagePrincipalLibros" image={"../assets/img/logo.jpeg"} navclass="navLibros" itemsNavbar="itemslibros" navbaragregarLibro="navdisplay"></Navbar>
      <div className="container-fluid d-flex align-items-start justify-content-start mb-3">
                 <Button className='agregarlibros'  variant="contained" onClick={agregarExtraviado}> Agregar extraviado</Button>

       </div>
      <DataTableExtraviados datapres={dataextraviados}></DataTableExtraviados>
      <Circulo/>
    </div>
  )
}



export default Extraviados