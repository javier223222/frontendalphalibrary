import React, { useEffect, useState } from 'react'
import Navbar from '../componets/Navbar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AlphaLibraryLogo } from '../functions/Image'
import FormAddBook from '../componets/FormAddBook'
import { useForm } from '../hooks/useForm'
import axios from "axios"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import $ from "jquery"

const AgregarExtraviado = () => {
    const location=useLocation()
    const [dataextra,setDataExtra]=useState([])
    const MySwal = withReactContent(Swal)
    const navigate=useNavigate()
    const {titulo,numeroDeLibro,editorial,autor,cantidad,isbn,onInputChange,onResetForm}=useForm({
        titulo:"",
        numeroDeLibro:"",
        editorial:"",
        autor:"",
        cantidad:"",
        isbn:""
    })
    
    const [categoria,setCategoria]=useState("")
    const handleChangecate = (event) => {
        const {
          target: { value },
        } = event;
        setCategoria(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value[0],
        );
        console.log(categoria)
      };
      useEffect(()=>{
    
    setDataExtra(location.state.dataextraviados)
      },[])

     const comprobar=(isbn)=>{
        if(isbn =="no contiene"){
            return false;

        }else{
            const exists=dataextra.filter(x=>x.isbn==isbn && x.isbn!="" && x.isbn != "no contiene")
            return exists.length !=0
        }
        
        

     } 
   
    const handleSubmit= async ()=>{
      
       if(!cantidad || !numeroDeLibro || !titulo || !autor || !categoria || !editorial){
        
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>Los capos obligatorios deben ser llenados</i>,
          icon: 'error'
        })

      }else if(parseInt(cantidad)<=0){
        
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>La cantidad debe ser mayor a 0</i>,
          icon: 'error'
        })

      }else if(comprobar(isbn)){
     
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>El isbn ya</i>,
          icon: 'error'
        })

      }else if(cantidad&&numeroDeLibro&&titulo&&autor&&categoria&&editorial){
       

        try{
          $.ajax({
            url: "https://l57ogzskej.execute-api.us-east-2.amazonaws.com/agregarlibroextraviado",//URL AWS
            jsonp: "callback",
            method: 'POST',
            data : JSON.stringify({numeroDeLibro:numeroDeLibro,titulo:titulo,editorial:editorial,autor:autor,categoria:categoria,cantidad:cantidad,isbn:isbn}),
            async: false,
            success: (respuestaSolicitud) => {
              console.log(JSON.stringify(respuestaSolicitud))
                
            JSON.stringify(respuestaSolicitud)==`"Se registro El libro extraviado existosamente."`?backtobooks():erromessage();
            }
        });
          
        }catch(e){
          const MySwal = withReactContent(Swal)
          MySwal.fire({
            title: <strong>Error</strong>,
            html: <i>Nose pudo guardan el libro</i>,
            icon: 'error'
          })

        }

      
    
      }
        
     
    }
    const backtobooks= async()=>{
     await MySwal.fire({
                  title: <strong>Agregado</strong>,
                   html: <i>El libro fue agregado correctamente</i>,
                    icon: 'success'
              })
              onResetForm()
              navigate("/extraviados")
            }
    const erromessage=()=>{
      MySwal.fire({
              title: <strong>Error</strong>,
               html: <i>El Libro ya existe</i>,
               icon: 'error'      })
    }        
  return (
    <div className='principal'>
           <Navbar navclass="nav"  names={[<Link to={"/libros"}>Inicio</Link>,<Link to={"/prestamos"}>Prestamos</Link>,<Link to={"/extraviados"}>Extraviados</Link>]} navbaragregarLibro="navbaragregarLibro" image={AlphaLibraryLogo} classImage="imagePrincipal "></Navbar>
           <FormAddBook titulobuton={"Agregar Libro Extraviado"} names={["Ciencia Ficción","Fantasía","Ciencia y Matemáticas","Historia","Infantil y Juvenil","Literatura y Ficción","Misterio"," Thriller o Suspenso","Romance","Humor y Entretenimiento","Educativo","Otro"]} handleChange={onInputChange}  handlechangeCategoria={handleChangecate} categoriaName={categoria} handleChangecategoria={handleChangecate} handleSubmit={handleSubmit} name1="titulo" name0="numeroDeLibro" name2="editorial" name3="autor"  name5="cantidad" name6="isbn"></FormAddBook>
    </div>
  )
}

export default AgregarExtraviado