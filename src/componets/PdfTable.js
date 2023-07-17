import { View } from "@react-pdf/renderer"
import { Text } from "@react-pdf/renderer"
import { useState } from "react"
const PdfTable=(props)=>{
    const [styles,setStyles]=useState(props.styles?props.styles:[])
    const [x,setX]=useState(props.x)
    return(
      
           
    
        <View style={styles.tableRow}> 

        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>{x.getnumero()}</Text> 
        </View> 
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>{x.getcantidad() ? x.getcantidad():""}</Text> 
        </View> 
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{x.getitulo()}</Text> 
        </View>
         <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>{x.getAutor()}</Text> 
        </View>  
      
      </View>
    
      
     
    )
}
export default PdfTable