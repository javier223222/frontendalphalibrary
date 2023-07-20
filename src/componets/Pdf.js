import React, { useEffect, useState } from 'react';


import Libro from '../class/Libro';



import { fecha,options } from '../functions/Time';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import $ from "jquery"
import { Button, colors } from '@mui/material';

// Create styles














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
    dataelemts=[...dataelemts] ? [...dataelemts].map(x=>[x.getnumero(),x.getcantidad(),x.getitulo(),x.getAutor()]):[]
     const doc=new jsPDF({
      orientation:"p",
      unit:"mm",
      format:"a4",
      putOnlyUsedFonts: true,
      floatPrecision: 16, // or "smart", default is 16
     })
     var y = 10;
     doc.setLineWidth(2);
     doc.setFontSize(16);

     doc.setFont("calibri","normal")
     
  doc.text("         Secretaría de Educación\nSubsecretaria de Educación Estatal \n    Dirección de Educación Básica\nDepartamento de Educación Primaria\n              Jefatura de Sector 012\n             Supervisoría Escolar 012", 72, 14);
  doc.text("ESCUELA PRIMARIA “JOAQUIN CRUZ CALVO” TURNO MATUTINO \n                                               CLAVE: 07EPR0128U",18,55)
  

    // doc.text( , 20,"         Secretaría de Educación\nSubsecretaria de Educación Estatal \n    Dirección de Educación Básica\nDepartamento de Educación Primaria\n              Jefatura de Sector 012\n             Supervisoría Escolar 012", 72, 19);
    // doc.text("ESCUELA PRIMARIA “JOAQUIN CRUZ CALVO” TURNO MATUTINO \n                                               CLAVE: 07EPR0128U",18,59)
        
 
     autoTable(doc,{
    //   headStyles:{textColor:"black",fillColor:"white",lineColor:10,fontStyle:"normal"},
     startY:80,
      head:[["Número","Cantidad","Título","Autor"]] ,
      body:dataelemts,
      theme:"grid"
     })
doc.setFontSize(12);
doc.text("Encargada de la bibilioteca                                                   VTO. BNO. ", 35, 150);
doc.text("_________________________                                  _________________________", 33, 162);
doc.text(`Profa. Marcela Gpe. Toledo Vázquez                         Prof.${props.name?props.name :"Vladimir A. De la rosa Tun."}`, 33, 172);

doc.text(`Ocozocoautla de Espinosa Chiapas a ${props.fecha?props.fecha.toLocaleDateString("es-ES", options):fecha.toLocaleDateString("es-ES", options)}`,  55, 220);

     
     
     const descargarPDFH = () => {
      doc.save("InventarioLibros.pdf");
    };
     
  

    
   return(
    <Button className={props.pdfstyle} onClick={descargarPDFH}   color="secondary" variant="contained">Generar reporte</Button>
    // <Document>
    //     <Page size="A4" style={styles.page}>
    //     <View style={styles.title}>
    //     <Image src={logogob} style={styles.image} ></Image>
    //       <View style={{position:"relative",left:15}}>
    //       <Text style={{textAlign:"center"}}>  Secretaría de Educación</Text>
    //       <Text  style={{textAlign:"center"}}>Subsecretaria de Educación Estatal</Text>
    //       <Text  style={{textAlign:"center"}}>Dirección de Educación Básica</Text>
    //       <Text style={{textAlign:"center"}}>Departamento de Educación Primaria</Text>
    //       <Text style={{textAlign:"center"}}>Jefatura de Sector 012</Text>
    //       <Text style={{textAlign:"center"}}> Supervisoría Escolar 012</Text>
    //       </View>
    //       <View>
          
    //       </View>
    //       <View style={{position:"relative",left:15}}>
    //         <Text  >ESCUELA PRIMARIA “JOAQUIN CRUZ CALVO” TURNO MATUTINO</Text>
    //         <Text >CLAVE: 07EPR0128U</Text>
    //       </View>
     
        

    //     </View>
    //     <View style={styles.table}  > 
         
    //     <View style={styles.tableRow}> 
    //       <View style={styles.tableCol}> 
    //         <Text style={styles.tableCellheader} >Número</Text> 

    //       </View> 
    //       <View style={styles.tableCol}> 
    //         <Text style={styles.tableCellheader}>Cantidad</Text> 
    //       </View> 
    //       <View style={styles.tableCol}> 
    //         <Text style={styles.tableCellheader}>Título</Text> 
    //       </View> 
    //       <View style={styles.tableCol}> 
    //         <Text style={styles.tableCellheader}>Autor</Text> 
    //       </View> 
    //     </View>
    //      {dataelemts}
    //     </View>
    //     <View style={styles.firms} >
    //       <View style={styles.firmsection} >
    //       <Text>Encargada de la biblioteca</Text>
    //       <Text>____________________________</Text>
    //       <Text>Profa. Marcela Gpe. Toledo Vázquez </Text>
    //       </View>
    //       <View style={styles.firmsection}>
    //         <Text>Vto. Bno. </Text>
    //         <Text>____________________________</Text>
    //       <Text>Prof.{props.name} </Text>
    //         </View>
        
        
    //     </View>
    //     <View style={styles.firms}>
    //       <Text style={{fontSize:14,fontWeight:"bold"}}>Ocozocoautla de Espinosa Chiapas a {props.fecha?props.fecha.toLocaleDateString("es-ES", options):fecha.toLocaleDateString("es-ES", options)}</Text>
    //     </View>
       
    //     </Page>
    // </Document>
   )
}
export default PdfReport