import Button from '@mui/material/Button';
import MultipleSelect from './Seleccion';



import { TextField } from '@mui/material';

const FormAddBook =(props)=>{
    const opciones=[{ label:"Aventura",value:"Aventura" },{label:"Ciencia ficción y fantasía",value:"Ciencia ficción y fantasía"},{label:"Misterio, Thriller y Suspenso",value:"Misterio, Thriller y Suspenso"},{label:"Literatura y Ficción",value:"Literatura y Ficción"},{label:"Ciencia y Matemáticas",value:"Ciencia y Matemáticas"},{label:"Historia",value:"Historia"},{label:"otro",value:"otro"}]
    return(
        <form >
        <div className="d-flex justify-content-end mx-5 mt-4 boton">
           <Button  variant="contained" className='addbook boto' onClick={props.handleSubmit}>{props.titulobuton}</Button>
           
        </div> 
         <div className='container mt-2 columnform subir'>
            <div className='d-flex align-items-center flex-column '>
            <div className="mb-auto max">
            <TextField  required label={'Número de libro(obligatorio)'} id="Numerodelibro" margin="normal" size="small"  className='inputAdd' name={props.name0}  onChange={props.handleChange} type='number'  fullWidth/>
            </div>
            <div className="mb-auto max">
            <TextField  required label={'Título(obligatorio)'} id="Titulo" margin="normal" size="small"  className='inputAdd' name={props.name1}  onChange={props.handleChange} fullWidth/>
            </div>

            
  
  <div class="mb-auto max">
  <TextField required label={'Editorial(obligatorio)'} id="Editorial" margin="normal" size="small"  className='inputAdd' name={props.name2}  onChange={props.handleChange} fullWidth/>
  
  </div>
 
  <div class="mb-auto max">
  <TextField required label={'Autor(obligatorio)'} id="Autor" margin="normal" size="small"  className='inputAdd' name={props.name3}  onChange={props.handleChange} fullWidth/>
  </div>
  
  <div class="mb-auto max">
  <MultipleSelect  names={props.names} categoriaName={props.categoriaName} handleChangecategoria={props.handleChangecategoria} class="alto max inputAdd" labelclass="maxcate"labelName="Categorias(obligatorio)"></MultipleSelect>
  </div>
 
  <div class="mb-auto max ">
  <TextField label={'Cantidad(Obligatorio)'} id="Cantidad" margin="normal" size="small" type='number' required className='inputAdd' name={props.name5} onChange={props.handleChange} fullWidth/>
  </div>

  <div class="mb-auto max">
  <TextField label={'ISBN(opcional)'} id="Isbn" margin="normal" size="small" className='inputAdd' name={props.name6} onChange={props.handleChange} fullWidth/>
  
  </div>

</div>
           

         </div>

        </form>

       
    )
}
export default FormAddBook;