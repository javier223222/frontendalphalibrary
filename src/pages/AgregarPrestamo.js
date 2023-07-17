import React, {  useEffect, useState } from 'react'
import { AlphaLibraryLogo } from '../functions/Image'
import Navbar from '../componets/Navbar'
import { Link,useLocation, useNavigate} from 'react-router-dom'



import FormAgrearPrestamo from '../componets/FormAgrearPrestamo'
import { useForm } from '../hooks/useForm'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import $ from "jquery"




const AgregarPrestamo = props => {
 const location=useLocation()
 const navigate=useNavigate()
 const [dataprestamos,setDataPrestamos]=useState([])
 useEffect(()=>{
  setDataPrestamos(location.state.datapres?location.state.datapres:[])
  console.log(dataprestamos)
 },[dataprestamos])

 const {nombrealumno,apellidoM,apellidoP,numerodeTelefono,fechainical,fechafinal,onInputChange,onResetForm}=useForm({
    nombrealumno:"",
    apellidoM:"",
    apellidoP:"",
    numerodeTelefono:"",
    fechainical:"",
    fechafinal:""
  })
  const [libro,setLibro]=useState("")
  const MySwal = withReactContent(Swal)
  const [grado,setgrado]=useState("")
  const [grupo,setgrupo]=useState("")
  const [datoslibrosprestatario,setDatosLibros]=useState(null)

  const handleChange = (selectedOption) => {
   setLibro(selectedOption.value)
    console.log(`Option selected:`, selectedOption);
  };

        


  


 
    const handleChangegrado = (event) => {
      const {
        target: { value },
      } = event;
      setgrado(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value[0],
      );
      console.log(grado)
    };
    const handleChangegrupo = (event) => {
      const {
        target: { value },
      } = event;
      setgrupo(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value[0],
      );
      console.log("kkkkk")
    };
   const handlesubmit= async  ()=>{
    console.log(`${nombrealumno} ${apellidoM} ${apellidoP} ${numerodeTelefono}`)
      if(!libro || !nombrealumno || !apellidoM  || !apellidoP || !fechainical || !fechafinal || !grado || !grupo){
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>Necesitas Llenar todos los datos obligatorios</i>,
          icon: 'error'
        })
       
      }else if(!/^\d{10}$/.test(numerodeTelefono)){
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>necesitas Ingresar un numero telefonico de 10 digitos</i>,
          icon: 'error'
        })
        
      }else if(new Date(fechainical)>new Date(fechafinal)){
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>La fecha inicial debe ser menor a la fecha final</i>,
          icon: 'error'
        })

        


      }else if(compronbar(nombrealumno,apellidoP,apellidoM)){
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>El alumno ha excedido el numero de prestamos</i>,
          icon: 'error'
        })

      }else if(comprobarNombre(nombrealumno,apellidoP,apellidoM,grado,grupo,numerodeTelefono)){
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>Los datos de grado y grupo y telefono no coinciden con los existentes</i>,
          icon: 'error'
        })
      }else if(comprobarnumero(nombrealumno,apellidoP,apellidoM,grado,numerodeTelefono)){
        MySwal.fire({
          title: <strong>Error</strong>,
          html: <i>El numero ya esta guardado por otro alumno</i>,
          icon: 'error'
        })

      }
      else{
        try{
          $.ajax({
            url: "https://zdw7yeo1sf.execute-api.us-east-2.amazonaws.com/getidlibro",//URL AWS
            jsonp: "callback",
            method: 'POST',
            data:JSON.stringify({libro:libro}),
            async: false,
            success: (response) => {
              setDatosLibros({id:response[0].id_libro,cantidad:response[0].cantidad-1})
             
           
            }
          })
         
           registrarPrestatario()
          getidprestatario()
          updateLibro()
          agregarPrestamo()
         
       await  MySwal.fire({
          title: <strong>Agregado</strong>,
          html: <i>El Prestamo fue agregado correctamente</i>,
          icon: 'success'
        })


         navigate("/prestamos",{
           replace:false
         })
        

        }catch (e){
          MySwal.fire({
            title: <strong>Error</strong>,
            html: <i>No se puedo agregar el Prestamo</i>,
            icon: 'error'
          })
          

        }
        
    

        
   
   

      

   

      

    
       
      }
     
      
    }
    const getidprestatario=   ()=>{
      $.ajax({
        url: "https://67h1csy0oi.execute-api.us-east-2.amazonaws.com/getidprestatario",//URL AWS
        jsonp: "callback",
        method: 'POST',
        data:JSON.stringify({nombre:nombrealumno,grado:grado,grupo:grupo,apellidopaterno:apellidoP,apellidomaterno:apellidoM}),
        async: false,
        success: (response) => {
          setDatosLibros(x=>{
          
            return{...x,
                   idprestatario:response?response[0].id_prestatario:response.data
                    }
           }
           )
         
            
       
        }
      })
    
      
    }

    const updateLibro=  ()=>{
        $.ajax({
          url: "https://pd06fi7i3c.execute-api.us-east-2.amazonaws.com/actulizarlibro",//URL AWS
          jsonp: "callback",
          method: 'POST',
          data : JSON.stringify({ value:datoslibrosprestatario.cantidad,id:datoslibrosprestatario.id}),
          async: false,
          success: (respuestaSolicitud) => {
  
            console.log(JSON.stringify(respuestaSolicitud))
              
          
          }})

    }
 
    const comprobarnumero=(nombre,apellidop,appellidoM,grado,grupo,telefono)=>{
      if(isEmpty(dataprestamos)){
        const existe=dataprestamos.filter(x=>x.nombre.toLowerCase()!=nombre.toLowerCase() && x.apellidopaterno.toLowerCase()!=apellidop.toLowerCase() && x.apellidomaterno.toLowerCase()!=appellidoM.toLowerCase() &&( x.grado!=grado || x.grupo != grupo  ) && x.numero_de_telefono==telefono)
        console.log(existe)
        return existe.length !=0
      }else{
        return false
      }
    }
    const agregarPrestamo=  ()=>{
      $.ajax({
        url: "https://6hve346noc.execute-api.us-east-2.amazonaws.com/agregarprestamo",//URL AWS
        jsonp: "callback",
        method: 'POST',
        data : JSON.stringify({ fecha_inicio:convert(fechainical),fecha_final:convert(fechafinal),id_libro:datoslibrosprestatario.id,id_prestatario:datoslibrosprestatario.idprestatario}),
        async: false,
        success: (respuestaSolicitud) => {

          console.log(JSON.stringify(respuestaSolicitud))
            
        
        }})
   
    }
    const convert=(date)=>{
      return new Date(new Date(date).setDate(new Date(date).getDate()+1))
    }
    const registrarPrestatario=  ()=>{
      $.ajax({
        url: "https://omylgaavc0.execute-api.us-east-2.amazonaws.com/registrarprestatatario",//URL AWS
        jsonp: "callback",
        method: 'POST',
        data:JSON.stringify({ nombre:nombrealumno,grado:grado,grupo:grupo,numero_de_telefono:numerodeTelefono?numerodeTelefono:1111111111,apellidopaterno:apellidoP,apellidomaterno:apellidoM}),
        async: false,
        success: (response) => {
          console.log(response)
        }
      })
      
    }
    const comprobarNombre=(nombre,apellidop,appellidoM,grado,grupo,telefono)=>{
      if(isEmpty(dataprestamos)){
        const existe=dataprestamos.filter(x=>x.nombre.toLowerCase()==nombre.toLowerCase() && x.apellidopaterno.toLowerCase()==apellidop.toLowerCase() && x.apellidomaterno.toLowerCase()==appellidoM.toLowerCase() &&( x.grado!=grado || x.grupo != grupo || x.numero_de_telefono!=telefono))
        return existe.length !=0
      }else{
        return false
      }

    }
    const isEmpty=(array)=>{
      return array

    }
    const compronbar=(nombre,apellidop,appellidoM)=>{
      if(isEmpty(dataprestamos)){
        const existe=dataprestamos.filter(x=>x.nombre.toLowerCase()==nombre.toLowerCase() && x.apellidopaterno.toLowerCase()==apellidop.toLowerCase() && x.apellidomaterno.toLowerCase()==appellidoM.toLowerCase())
        console.log(existe)
        return existe.length>2
      }else{
        return false
      }
     
    }
  return (
    <div className='principal'>
         <Navbar navclass="nav"  names={[<Link to={"/libros"}>Inicio</Link>,<Link to={"/prestamos"}>Prestamos</Link>,<Link to={"/extraviados"}>Extraviados</Link>]} navbaragregarLibro="navbaragregarLibro" image={AlphaLibraryLogo} classImage="imagePrincipal "></Navbar>
         <FormAgrearPrestamo handleSubmit={handlesubmit} libro={libro} handleChangeli={handleChange} grado={grado} handleChangegrado={handleChangegrado} grupo={grupo} handleChangegrupo={handleChangegrupo} nombrealumno="nombrealumno" apellidoM="apellidoM" apellidoP="apellidoP"  numerodeTelefono="numerodeTelefono"  fechainical="fechainical" fechafinal="fechafinal" handleChange={onInputChange}  ></FormAgrearPrestamo>
    </div>
  )
}



export default AgregarPrestamo