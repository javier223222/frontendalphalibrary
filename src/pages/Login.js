import "../css/Login.css"
import FormLogin from "../componets/Form"
import Container from "react-bootstrap/esm/Container"
import Col from "react-bootstrap/esm/Col"
import Row from 'react-bootstrap/Row';
import logo from "../assets/img/logo.jpeg"

import { useForm } from "../hooks/useForm";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom";
import $ from "jquery"

function Login(props) {
  
  
  const {email,password,onInputChange,onResetForm}=useForm({
  email:"",
  password:""


  })
  const navigate=useNavigate()


  const submit=()=>{
try {
  $.ajax({
    url: "https://sm8xbd6ip1.execute-api.us-east-2.amazonaws.com/iniciarsesion",//URL AWS
    jsonp: "callback",
    method: 'POST',
    data:JSON.stringify({email:email,password:password}),
    async: false,
    success: (response) => {
     
      if(response){
        localStorage.setItem("acessToken","true")
   
        navigate("/libros",{
         replace:true
        })
        onResetForm()
      }else{
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: <strong>Error</strong>,
            html: <i>El usuario no existe o la Contraseña es incorrecta</i>,
            icon: 'error'
          })
      }
     
   
    }
  })
  
} catch (error) {
  const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: <strong>Error</strong>,
            html: <i>Fallo en la conexión</i>,
            icon: 'error'
          })
}
 
  }
  return (
    <div className="principalLogin">
      <Container className="pricinpalInav">
      <Row >
        <Col><h1  className=" text-start">Sistema <br></br> Bibliotecario </h1></Col>
        <Col><img  alt="Imagen de libros" className=" mx-auto imagenprincipallogin" src={logo}/></Col>
      </Row>
    </Container >
      <FormLogin className="fomulario" name1="email" password="password" handleChange={onInputChange} submit={submit}>

      </FormLogin>
    </div>
  )
}

export default Login