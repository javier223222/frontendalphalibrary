import "../css/AgregrarPrestamo.css"
import { Button, FormControl, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MultipleSelect from './Seleccion'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Select from "react-select"
import $ from "jquery"

 const FormAgrearPrestamo = (props) => {
    const [data,setData]=useState([])


    useEffect(()=>{
      $.ajax({
        url: "https://heqpx6wxw1.execute-api.us-east-2.amazonaws.com/getlibros",//URL AWS
        jsonp: "callback",
        method: 'GET',
        async: false,
        success: (response) => {
         setData(response)
            
       
        }
      })
    
 
},[data])

useEffect(()=>{
    setData([...data].map(x=>x.titulo))
},[])
  
  return (
    <FormControl style={{
        marginTop:"13rem",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        gap:"3.5rem"
       
     }} className=' gap-2 gap-lg-5 gap-md-5 query mx-auto'>
     
       <div className=' d-flex flex-column flex-md-row  flex-lg-row  flex-xl-row  gap-1 gap-lg-5 gap-md-3  '>
        
       <Select className='max2 inputAdd abar'  onChange={props.handleChangeli} placeholder="Seleccione un libro" options={[...data].map(x=>{
        return {value:x.titulo,label:x.titulo}
       })} ></Select>
       <TextField  style={{width:300}} label={'Nombre del alumno(obligatorio)'} id="nombrelibro" margin="normal" size="small" type='text' required className='inputAdd  abar' name={props.nombrealumno} onChange={props.handleChange} fullWidth />
       <TextField style={{width:300}}  label={'Apellido paterno del alumno(obligatorio)'} id="nombrelibro" margin="normal" size="small" type='text' required className='inputAdd abar' name={props.apellidoP} onChange={props.handleChange} fullWidth/>
       </div>
       <div className=' d-flex  flex-column flex-md-row  flex-lg-row  flex-xl-row  gap-1 gap-lg-5  gap-md-3'>
       <TextField  style={{width:300}} label={'Apellido materno del alumno(obligatorio)'} id="nombrelibro" margin="normal" size="small" type='text' required className='inputAdd abar' name={props.apellidoM} onChange={props.handleChange} fullWidth/>
       <TextField  style={{width:300}} label={'Número de teléfono(opcional)'} id="nombrelibro" margin="normal" size="small" type='tel' required className='inputAdd abar' name={props.numerodeTelefono} onChange={props.handleChange} fullWidth/>
       <MultipleSelect   names={["1","2","3","4","5","6"]} categoriaName={props.grado} handleChangecategoria={props.handleChangegrado} class=" max2 inputAdd abar" abar labelclass="maxcate" labelName="Grado"></MultipleSelect>
       </div>
       <div className=' d-flex flex-column flex-md-row  flex-lg-row  flex-xl-row  gap-1 gap-lg-5  gap-md-3'>
       <MultipleSelect   names={["A","B","C","D","E"]} categoriaName={props.grupo} handleChangecategoria={props.handleChangegrupo} class=" max2 inputAdd abar" labelclass="maxcate" labelName="Grupo"></MultipleSelect>
      
     
       <TextField style={{width:300}}  label={'Fecha inicial'} id="nombrelibro" margin="normal" size="small" type='date' required className='inputAdd abar' name={props.fechainical} onChange={props.handleChange} fullWidth/>
       <TextField style={{width:300}}  label={'Fecha final'} id="nombrelibro" margin="normal" size="small" type='date' required className='inputAdd abar' name={props.fechafinal} onChange={props.handleChange} fullWidth/>
      
        </div> 
        <Button  variant="contained" className='addbook ' onClick={props.handleSubmit}>Agregar Prestamo</Button>
       
     
       
       
     
      

       
  
      

     </FormControl>
  )
}



export default FormAgrearPrestamo