import React, {useState} from "react";


function Login() {
  const [usuario, setUsuario] = useState();
  const [contrasena, setContrasena] = useState();

  const formLogin = async e => {
    e.preventDefault();
    await Ingresar({
      usuario,
      contrasena
    });
  }

  async function Ingresar(){
    fetch("http://127.0.0.1:5002", {
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
      var item = data.users.filter(item => item.username === usuario);

      if (item.length === 0){
        item = data.users.filter(item => item.email === usuario);
      }

      if(item.length > 0) {
        const lUsuario = item[0];

        if((lUsuario.username === usuario && lUsuario.password === contrasena) 
        || (lUsuario.email === usuario && lUsuario.password === contrasena)) {
          localStorage.setItem("token", JSON.stringify(lUsuario));   
          window.location.href = "/"      
        }
        else{
          alert("Usuario y/o contraseña incorrectos");
        }
      }
      else{
        alert("Usuario y/o contraseña incorrectos");
      }      
    });
  }

  return (
    <div className="m-0 vh-100 row justify-content-center align-items-center">
      <div className="col-auto p-4 text-center">
        <form onSubmit={formLogin}>
          <h1 className="h3 mb-3 fw-normal">Iniciar Sesión</h1>
          <div className="form-floating">
            <input type="text" className="form-control" requerid="true" id="floatingInput" placeholder="Usuario/Correo" onChange={e => setUsuario(e.target.value)}></input>
            <label for="floatingInput">Usuario/Correo</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" requerid="true" id="floatingPassword" placeholder="Contraseña" onChange={e => setContrasena(e.target.value)}></input>
            <label for="floatingPassword">Contraseña</label>
          </div>
          <br />
          <button className="w-100 btn btn-lg btn-primary" type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login