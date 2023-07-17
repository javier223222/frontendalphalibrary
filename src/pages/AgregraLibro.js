import Navbar from "../componets/Navbar"
import { AlphaLibraryLogo } from "../functions/Image"
import "../css/AgregarLibro.css"
import FormAddBook from "../componets/FormAddBook"
import { useEffect, useState } from "react"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {  Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "../hooks/useForm"
import $ from "jquery"
const AgregarLibro=()=>{
  const MySwal = withReactContent(Swal)
    const {numeroDeLibro,titulo,editorial,autor,cantidad,isbn,onInputChange,onResetForm}=useForm({
       numeroDeLibro:null,
        titulo:"",
        editorial:"",
        autor:"",
        
        cantidad:0,
        isbn:"",

    })
    const navigate=useNavigate()
    const [datalibros,setDataLibros]=useState([])
    const [categoria,setCategoria]=useState("")
    const location=useLocation()
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
        setDataLibros(location.state.databook?location.state.databook:[])
        console.log(datalibros)

     
       },[datalibros])
       const comprobar=(isbn)=>{
        if(isbn =="no contiene"){
            return false;

        }else{
            const exists=datalibros.filter(x=>x.isbn==isbn && x.isbn!="" && x.isbn != "no contiene")
            return exists.length !=0
        }
        
        

     } 
    const handleSubmit=  ()=>{
      
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
          html: <i>El isbn ya existe</i>,
          icon: 'error'
        })

      }else if(cantidad&&numeroDeLibro&&titulo&&autor&&categoria&&editorial){

        try{
          $.ajax({
            url: "https://heqpx6wxw1.execute-api.us-east-2.amazonaws.com/etapaalphaee",//URL AWS
            jsonp: "callback",
            method: 'POST',
            data : JSON.stringify({numeroDeLibro:numeroDeLibro,titulo:titulo,editorial:editorial,autor:autor,categoria:categoria,cantidad:cantidad,isbn:isbn}),
            async: false,
            success: (respuestaSolicitud) => {
              console.log(JSON.stringify(respuestaSolicitud))
                
            JSON.stringify(respuestaSolicitud)==`"Se registro El libro existosamente."`?backtobooks():erromessage();
            }
        });
          
    //       axios.post(" https://lambda.us-east-2.amazonaws.com/2015-03-31/functions/arn:aws:lambda:us-east-2:894815212994:function:alphabackend/invocation",{
    //         numeroDeLibro:parseInt(numeroDeLibro),
    //          titulo:titulo,
    //          editorial:editorial,
    //          autor:autor,
    //          categoria:categoria,
    //          cantidad:parseInt(cantidad),
    //          isbn:isbn

    //      }).then( async (response)=>{
    //        if(response.data==="Libro agregado exitosamente"){
    //          console.log(response.data)
    //          const MySwal = withReactContent(Swal)
          
            
    // await MySwal.fire({
    //            title: <strong>Agregado</strong>,
    //             html: <i>El libro fue agregado correctamente</i>,
    //              icon: 'success'
    //         })
    //            onResetForm()
    //          navigate("/libros")
       

    //        }else{
     
    //       MySwal.fire({
    //      title: <strong>Error</strong>,
    //        html: <i>El Libro ya existe</i>,
    //         icon: 'error'      })
    //       }
          

            

              


    //   })
        }catch(e){
      
          MySwal.fire({
            title: <strong>Error</strong>,
            html: <i>Nose pudo guardan el libro</i>,
            icon: 'error'
          })

        }

      
    
      }
        
     
    }
    const backtobooks=()=>{
      MySwal.fire({
                  title: <strong>Agregado</strong>,
                   html: <i>El libro fue agregado correctamente</i>,
                    icon: 'success'
              })
              onResetForm()
              navigate("/libros")
            }
    const erromessage=()=>{
      MySwal.fire({
              title: <strong>Error</strong>,
               html: <i>El Libro ya existe</i>,
               icon: 'error'      })
    }        
    return(
        <div className="principal">
        <Navbar navclass="nav"  names={[<Link to={"/libros"}>Inicio</Link>,<Link to={"/prestamos"}>Prestamos</Link>,<Link to={"/extraviados"}>Extraviados</Link>]} navbaragregarLibro="navbaragregarLibro" image={AlphaLibraryLogo} classImage="imagePrincipal "></Navbar>
        
        {/* items={["inicio"]}  width={"172px"} height={"56px"} class="navbar" logo={AlphaLibraryLogo} imgClassname={" imagePrincipal"}/>
         */}
        <FormAddBook titulobuton="Agregar Libro" names={["Ciencia Ficción","Fantasía","Ciencia y Matemáticas","Historia","Infantil y Juvenil","Literatura y Ficción","Misterio"," Thriller o Suspenso","Romance","Humor y Entretenimiento","Educativo","Otro"]} handleChange={onInputChange}  handlechangeCategoria={handleChangecate} categoriaName={categoria} handleChangecategoria={handleChangecate} handleSubmit={handleSubmit} name1="titulo" name0="numeroDeLibro" name2="editorial" name3="autor"  name5="cantidad" name6="isbn"></FormAddBook>
       
       </div>
    )
}
export default AgregarLibro;