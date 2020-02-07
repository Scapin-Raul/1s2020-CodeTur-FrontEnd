import React, { Component } from 'react';
import './Admin.css';
import axios from 'axios';

class Admin extends Component {

  constructor() {
    super();
    this.state = {
      token: localStorage.getItem('usuario-token'),
      email: "",
      senha: "",
      listaDePacotes: [],
      pacoteSelecionado: {},

      titulo: "",
      descricao: "",
      imagem: "",
      datainicio: "",
      datafim: "",
      pais: "",
      ativo: 0,


    }
  }

  componentDidMount() {
    this.colocarNoStatePacotes();   
  }
  

  colocarNoStatePacotes =() =>{

    fetch('http://192.168.3.101:5000/api/pacote/listar', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        "Authorization": "Bearer " + this.state.token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({ listaDePacotes: data })
    })
    .catch(error => console.log(error));
  }

  deslogar = () => {
    localStorage.removeItem("usuario-token");
    window.location.reload();
  }

  getParsedDate = (date) => {
    date = String(date).split('T');
    var days = String(date[0]).split('-');
    return [days[2].toString() + '/' + days[1].toString() + '/' + days[0].toString()];
  }


  atualizarAtivo = () => {
    var ativos = document.getElementById("selectAtivo");
    var ativo = ativos.options[ativos.selectedIndex].value;
    // console.log(ativo);
    return ativo;
  }



  adicionarPacote = () => {


    var pacoteSelecionado = {
      Titulo: this.state.titulo,
      Imagem: this.state.imagem,
      Descricao: this.state.descricao,
      DataInicio: this.state.datainicio,
      DataFim: this.state.datafim,
      Pais: this.state.pais,
      Ativo: this.atualizarAtivo()
    }

    var ativo = this.atualizarAtivo();
    console.log(ativo);

    this.setState({ pacoteSelecionado: pacoteSelecionado })

    console.log(this.state.pacoteSelecionado, pacoteSelecionado)

    const url = "http://192.168.3.101:5000/api/pacote";

    axios.post(url, {
      id: "",
      titulo: this.state.titulo,
      descricao: this.state.descricao,
      imagem: this.state.imagem,
      dataInicio: this.state.datainicio,
      dataFim: this.state.datafim,
      pais: this.state.pais,
      ativo: ativo
    },
      {
        headers: { Authorization: "Bearer " + this.state.token }
      })
      .then(response => console.log(response.data), this.atualizarPagina)
      .catch(error => console.log(error));

  }



  render() {
    return (
      <div className="App">
        <a id='login_nav--a' onClick={this.deslogar} >Deslogar</a>

        {
          this.state.listaDePacotes.map(e => {
            return (
              <div >
                <p>{e.titulo}</p>
                <p>Descricao: {e.descricao}</p>
                <p>Data Inicio: {this.getParsedDate(e.dataInicio)} </p>
                <p>Data Fim: {this.getParsedDate(e.dataFim)}</p>
                <p>Pais: {e.pais}</p>
                <p>Ativo: {e.ativo == true ? "Ativo" : "Inativo"}</p>
                <br />
              </div>

            )
          })}

        Titulo
        <input className="admin__form--inputs" value={this.state.titulo} type="text" id="admin__input--titulo" onChange={(data) => { this.setState({ titulo: data.target.value }) }} />

        Descricao
        <input className="admin__form--inputs" type="text" id="admin__input--descricao" onChange={(data) => { this.setState({ descricao: data.target.value }) }} />

        Imagem
        <input className="admin__form--inputs" type="text" id="admin__input--imagem" onChange={(data) => { this.setState({ imagem: data.target.value }) }} />

        Data Inicio
        <input className="admin__form--inputs" type="date" id="admin__input--datainicio" onChange={(data) => { this.setState({ datainicio: data.target.value }) }} />

        Data Fim
        <input className="admin__form--inputs" type="date" id="admin__input--datafim" onChange={(data) => { this.setState({ datafim: data.target.value }) }} />

        Pais
        <input className="admin__form--inputs" type="text" id="admin__input--pais" onChange={(data) => { this.setState({ pais: data.target.value }) }} />

        <select name="ativo" onChange={this.atualizarAtivo} id="selectAtivo">
          <option value="false">Inativo</option>
          <option value="true">Ativo</option>
        </select>

        <input type="submit" onClick={this.adicionarPacote} value="Adicionar" />
      </div>
    )
  }
}
export default Admin;