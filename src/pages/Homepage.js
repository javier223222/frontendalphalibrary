

import "../css/Home.css"

import Container from "react-bootstrap/esm/Container"
import { addClassList } from "../functions/Addclalist";
import Footer from "../componets/Footer"
import DrawerAppBar from "../componets/NavbarHome"
const  Homepage=(props)=> {

  addClassList("principalHome")

  
  return (
  <>

    * <div className="principalHome">
      <DrawerAppBar></DrawerAppBar>
     <Container className="d-flex flex-column align-items-start contenedoprincipal  ">
      <h1> Sistema  <br></br>Bibliotecario <br></br> Intuitivo </h1>
      <br></br>
      <br></br>
      <p>El propósito de AlphaLibrary es ser fácil e intuitivo </p>
     </Container>
    
    </div>
    <div>
        
    </div> 
  
    <Footer></Footer>
    </>
  )
}


export default Homepage
