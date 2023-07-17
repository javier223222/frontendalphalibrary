import { useEffect } from "react";
import Select  from "react-select";
const Suplieres =(props)=>{

         const opciones=props.opciones;
 
   
    return(
        <div>
            <Select
            className={props.className}
             options={opciones&&opciones}
         
          
             onChange={props.handleChange}
             
             
            ></Select>
        </div>
    )
        
    

}
export default Suplieres;