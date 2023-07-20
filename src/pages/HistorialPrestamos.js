import React from 'react'
import Navbar from '../componets/Navbar'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DataTableHistorial from '../componets/DataTableHistorial'

const HistorialPrestamos = props => {
    const navigate=useNavigate()
    const cerrar=()=>{
        localStorage.removeItem("acessToken")
        navigate("/",{
            replace:true
        })
        
    }
  return (
    <div  className="principallibros">
        <div className="d-flex align-items-center justify-content-center tit">
                <h1 className="tituilolibros tracking-in-expand ">Historial de Prestamos</h1>
           </div>
         <Navbar names={[<Link to={"/libros"}>Inicio</Link>,<Link to={"/prestamos"} >Prestamos</Link>,<Link to={"/historialDePrestamos"}>Historial De prestamos</Link>,<Link to={"/extraviados"}>Extraviados</Link>,<Button className="iniciosesionboton" onClick={cerrar}>Cerrar sesion</Button>]}classImage="imagePrincipalLibros pasar"  navclass="navLibros" itemsNavbar="itemslibros" navbaragregarLibro="navdisplay"></Navbar>
         <DataTableHistorial></DataTableHistorial>
    </div>
  )
}



export default HistorialPrestamos