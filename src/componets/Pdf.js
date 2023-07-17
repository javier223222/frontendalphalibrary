import React, { useEffect, useState } from 'react';

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Libro from '../class/Libro';

import PdfTable from './PdfTable';
import logogob from "../assets/img/logoGob.png"
import { fecha,options } from '../functions/Time';

import $ from "jquery"
// Create styles
const styles = StyleSheet.create({
  table: { 
    display: "table", 
    width: "auto", 
    margin:30,
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol: { 
    width: "25%", 
    
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCell: { 
    margin: "auto", 
    
    fontSize: 9
  },
  tableCol2: { 
    width: "100%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCellheader: { 
    margin: "auto", 
    marginTop: 5,
    fontWeight:"bold",
    color:"black",
    fontSize: 16
  },
  tableCell2: { 
    margin: "auto", 
    marginTop: 5,
   fontWeight:"bold",
    fontSize: 16 
  },
  page:{
     
   paddingTop:50,
   paddingBottom:50

  },
  title:{
  //  display:"flex",
  //  flexDirection:"column",
  //  alignItems:"center",
  //  justifyContent:"center",
  
    marginTop:-95,
    fontWeight:"bold",
   textAlign:"center",
   fontSize:13
  
  },
  image:{
    width:"180px",
    position:"relative",
    left:24,
    top:80,
  },
  firms:{
     margin:50,
     display:"flex",
     alignItems:"center",
     justifyContent:"center",
     flexDirection:"row",
     gap:80,
  },
  linea:{
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  firmsection:{
    display:"flex",
    flexDirection:"column",
    gap:15,
    fontSize:13
  }
});














const PdfReport=(props)=>{
    const [databook,setDataBook]=useState([])
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
       
    let dataelemts=databook ?databook.map(x=>new Libro(x.id_libro,x.cantidad,x.titulo,x.autor,x.editorial)):[];
    // dataelemts = dataelemts.filter(x=>x.Editorial==" Libros Literarios   "); 
    dataelemts=dataelemts ? dataelemts.map((x,i)=> <PdfTable styles={styles} x={x}  ></PdfTable>):[];
        // let pasoDeLuna=dataelemts ? [...dataelemts].filter(x=>x.getEditorial()=="Pasos de Luna"):[];
    // let astralabio=dataelemts ?  [...dataelemts].filter(x=>x.getEditorial()=="Astrolabio"):[];
    // let alSolito=dataelemts ?  [...dataelemts].filter(x=>x.getEditorial()=="sol solito"):[];

    // let  LibrosLiterariosInformativos=dataelemts ?  [...dataelemts].filter(x=>x.getEditorial()=="Libros Literarios Informativos"):[]; 
    // let  LibrosLiterariosInformativos2=dataelemts ?  [...dataelemts].filter(x=>x.getEditorial()==" Libros Literarios  "):[]; 
    // let textosInformativossecretariadeEducación=dataelemts ? [...dataelemts].filter(x=>x.getEditorial()=="Textos Informativos   secretaria de Educación "):[] 
    // let desconocidos=dataelemts ? [...dataelemts].filter(x=>x.getEditorial()!="Textos Informativos   secretaria de Educación " && x.getEditorial()!="sol solito" && x.getEditorial()!="Pasos de Luna" && x.getEditorial()!="Pasos de Luna" && x.getEditorial()!="Libros Literarios"  ):[]
    // let  LibrosLiterarios=dataelemts ?  [...dataelemts].filter(x=>x.Editorial=="Libros Literarios  Informativos "):[];
    // pasoDeLuna=pasoDeLuna.map(x=> <PdfTable styles={styles} x={x}  ></PdfTable> )
    // astralabio=astralabio.map(x=> <PdfTable styles={styles} x={x}  ></PdfTable> )
    // alSolito=alSolito.map(x=> <PdfTable styles={styles} x={x}  ></PdfTable> )
  
    // LibrosLiterariosInformativos=LibrosLiterariosInformativos.map(x=> <PdfTable styles={styles} x={x}  ></PdfTable> )
    // // let libroliterarios3=librosLiterarios.map(x=>  <PdfTable styles={styles} x={x}  ></PdfTable>)
    // textosInformativossecretariadeEducación=textosInformativossecretariadeEducación.map(x=> <PdfTable styles={styles} x={x}  ></PdfTable>)
    
   return(
    <Document>
        <Page size="A4" style={styles.page}>
        <View style={styles.title}>
        <Image src={logogob} style={styles.image} ></Image>
          <View style={{position:"relative",left:15}}>
          <Text style={{textAlign:"center"}}>Secretaría de Educación</Text>
          <Text  style={{textAlign:"center"}}>Subsecretaria de Educación Estatal</Text>
          <Text  style={{textAlign:"center"}}>Dirección de Educación Básica</Text>
          <Text style={{textAlign:"center"}}>Departamento de Educación Primaria</Text>
          <Text style={{textAlign:"center"}}>Jefatura de Sector 012</Text>
          <Text style={{textAlign:"center"}}> Supervisoría Escolar 012</Text>
          </View>
          <View>
          
          </View>
          <View style={{position:"relative",left:15}}>
            <Text  >ESCUELA PRIMARIA “JOAQUIN CRUZ CALVO” TURNO MATUTINO</Text>
            <Text >CLAVE: 07EPR0128U</Text>
          </View>
     
        

        </View>
        <View style={styles.table}  > 
         
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellheader} >Número</Text> 

          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellheader}>Cantidad</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellheader}>Título</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellheader}>Autor</Text> 
          </View> 
        </View>
         {dataelemts}
        </View>
        <View style={styles.firms} >
          <View style={styles.firmsection} >
          <Text>Encargada de la biblioteca</Text>
          <Text>____________________________</Text>
          <Text>Profa. Marcela Gpe. Toledo Vázquez </Text>
          </View>
          <View style={styles.firmsection}>
            <Text>Vto. Bno. </Text>
            <Text>____________________________</Text>
          <Text>Prof.{props.name} </Text>
            </View>
        
        
        </View>
        <View style={styles.firms}>
          <Text style={{fontSize:14,fontWeight:"bold"}}>Ocozocoautla de Espinosa Chiapas a {props.fecha?props.fecha.toLocaleDateString("es-ES", options):fecha.toLocaleDateString("es-ES", options)}</Text>
        </View>
       
        </Page>
    </Document>
   )
}
export default PdfReport