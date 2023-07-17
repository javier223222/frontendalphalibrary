import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import React from 'react'
import imagen from "../assets/img/imagenLogin.jpeg"


const FormLogin=(props)=> {

  return (
    
        <Container className=' d-flex flex-row flex-lg-row   align-items-center  align-items-sm-center flex-sm-column flex-column   contendor m-5 p-5 '>
        <div className='container imagen'>
            <img  className='  imagen'  src={imagen}></img>
        </div>
        
        <Form className='width '>
        <div className='marginincio '>
            <h1 className='text-center '>Iniciar Sesión</h1>
            </div>
     
      <Form.Group className="mb-3 pt-3" >
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control type="email" placeholder="Ej. Hey@rodolforivera.co" className='input' name={props.name1}   id={props.email} onChange={props.handleChange} />
        <Form.Text className="text-muted">
        Nunca compartiremos su correo electrónico con nadie más.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3 pt-2 " controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Password" className='input' name={props.password}  id={props.password} onChange={props.handleChange} />
      </Form.Group>
     
      <Button className='text-center' onClick={props.submit} variant="outline-light" type="button">
        Iniciar sesión
      </Button>
    </Form>
 
    </Container>
  )
}


export default FormLogin;
