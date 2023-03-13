import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import * as alertify from "alertifyjs";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirContrasena, setconfirContrasena] = useState("");
  const [esError, setEsError] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const readerError = () => {
    if (!esError) {
      return (<Alert key={'success'} variant={'success'}>
              {mensaje}
             </Alert>);
    } else {
      return (<Alert key={'danger'} variant={'danger'}>
              {mensaje}
             </Alert>);
    }
  }

  function MostarMensaje(pMensaje, pTipo) {
    alertify.set('notifier','position', 'bottom-left');
    alertify.notify(pMensaje, pTipo, 10);
  }

  const frmRegistro = async e => {
    e.preventDefault();
    await Registrar({
      nombre,
      correo,
      contrasena,
      confirContrasena
    });
  }

  async function Registrar() {
    setEsError(false);
    setMensaje("");

    if (nombre != "" && correo != "") {
      if (contrasena.length > 3 && confirContrasena.length > 3) {
        const lData = JSON.stringify({
          name: nombre,
          apellido: apellido,
          email: correo,
          role: 1,
          password: contrasena,

        })
        
        fetch("", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: lData
        }).then((response) => response.json()).then((data) => {
          if (data.status === "success") {
            setEsError(false);
            setNombre("");
            setApellido("");
            setCorreo("");
            setContrasena("");
            MostarMensaje("Se registro exitosamente", "success");
          }
          else {
            setEsError(true);
            setMensaje(data.message);
          }      
        }).catch((error) => {
          setEsError(true);
          setMensaje(error);
        }); 
      } else {
        setEsError(true);
        setMensaje("La contraseña debe tener mínimo 6 caracteres");
      }
    } else {
      setEsError(true);
      setMensaje("Datos inválidos");
    }
  }

  return (
    <Form onSubmit={frmRegistro}>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Apellido</Form.Label>
        <Form.Control type="text" placeholder="Apellido" value={apellido} onChange={e => setNombre(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo</Form.Label>
        <Form.Control type="email" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Contraseña" value={contrasena} onChange={e => setContrasena(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirmar Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Confirmar Contraseña" value={confirContrasena} onChange={e => setconfirContrasena(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Registrar
      </Button>

      {mensaje && (        
        <div className="form-group">
          <br />
          {readerError()}
        </div>
      )}
    </Form>
  );
}
  
export default Registro;