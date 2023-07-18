

import {FaFacebook} from "react-icons/fa"
import {AiFillInstagram} from "react-icons/ai"

const Footer=()=>{
  return(
    <>
    <footer className="footer">
      <div className="imgaecontendor">
        <img src={"../assets/img/logo.jpeg"} alt="Logo de la empresa footer" className="imagenFooter"></img>
      </div>
      <div className="links">
        <div><p>About</p></div>
        <div><p>Features</p></div>
        <div><p>Pricing</p></div>      
        <div><p>Careers</p></div>   
        <div><p>Help</p></div>
        <div><p>Privacy Policy</p></div>       

      </div>
      <div className="contenedorLinea">
        <hr className="linea"></hr>
      </div>
      <div className="containerh1">
      <h1 className="Copyright">
      &copy; {new Date().getFullYear()} Copyright:{' AlphaLibrary. Todos los derechos reservados'}
      </h1>
      <div className="icons">
        <FaFacebook color="white" size={30}></FaFacebook>
        <AiFillInstagram color="white" size={30}/>
        <FaFacebook color="white" size={30}></FaFacebook>
        <FaFacebook color="white" size={30}></FaFacebook>
       

      </div>

    
      </div>
    </footer>
    </>
  )
}
export default Footer