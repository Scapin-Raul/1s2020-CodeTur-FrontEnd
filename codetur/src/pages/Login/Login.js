import React, { Component } from 'react';
import './Login.css';
import logo from '../../assets/img/logoSemNome.png';
class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      senha: ""
    }
  }

  definirLogin = (data) => {
    if (data.token != null) {
      console.log(data);  
      localStorage.setItem("usuario-token", data.token);
      window.location.reload();
    }
    else {
      const mensagemErro = document.querySelector("#login__form--mensagemErro");
      mensagemErro.innerHTML = "Email ou senha inválidos";
    }

  }

  atualizarInputs = () => {
    this.setState({ email: document.querySelector("#email").value });
    this.setState({ senha: document.querySelector("#senha").value });
  }

  efetuarLogin = (e) => {
    e.preventDefault();

    const url = "http://192.168.3.101:5000/api/usuario";

    fetch(url, {
      method: 'POST', body: JSON.stringify({ email: this.state.email, senha: this.state.senha }),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => this.definirLogin(data))
      .catch(error => console.log(error));

  }

  render() {
    return (
      <div className="Login">
        <header id="login__div--header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>CodeTur</h1>
        </header>
        <section id="login__div--section">
          <h2>LOGIN</h2>
          <form>
            <p id="login__form--mensagemErro"></p>
            <input type="text" id="email" name="email" placeholder="E-mail" onChange={this.atualizarInputs} />
            <input type="password" id="senha" name="senha" placeholder="Senha" onChange={this.atualizarInputs} />
            <input type="submit" id="submit" value="Acessar" onClick={this.efetuarLogin} />
          </form>
        </section>
      </div>
    )
  }
}
export default Login;

