import React from 'react';
import Admin from './pages/Admin/Admin.js';
import Login from './pages/Login/Login.js';

import Enzyme, { configure } from "enzyme";
const Adapter = require("enzyme-adapter-react-16");

configure({ adapter: new Adapter() });

const { shallow } = Enzyme;
const { render } = Enzyme;
const { mount } = Enzyme;


describe('Conjunto de Testes de Login', () => {

  it('deve renderizar o <form>', () => {
    const wrapper = shallow(<Login />);

    // expect(wrapper.find('form.login').exists()).toBe(true);
    expect(wrapper.find('#email').length).toEqual(1);
    expect(wrapper.find('#senha').length).toEqual(1);
  })

  it('seta states do login', () => {
    const wrapper = mount(<Login />);

    // wrapper.find('#email').simulate('change',{target: { value: 'admin@codetur.com' }});
    // wrapper.find('#senha').simulate('change',{target: { value: 'CodeTur@132' }});
    wrapper.setState({senha : 'CodeTur@132'})
    wrapper.setState({email : 'admin@codetur.com'})
  
    expect(wrapper.state('email')).toEqual('admin@codetur.com')
    expect(wrapper.state('senha')).toEqual('CodeTur@132')
  })
})

  describe('Conjunto de Testes de Admin', ()=>{
    let wrapper
    beforeEach(() => {
     wrapper = mount(<Admin />);
  });

    it('renderiza a pagina', ()=>{
      expect(wrapper.find(".App").length).toEqual(1);
    })
    
    it('lista de pacotes no state', ()=>{
      var existe = false
      console.log(wrapper.state('listaDePacotes'));
      
      const instance = wrapper.instance(); // you assign your instance of the wrapper
      jest.spyOn(instance, 'colocarNoStatePacotes');
      instance.componentDidMount();
      expect(instance.colocarnoStatePacotes).toHaveBeenCalledTimes(1); // You check if the condition you want to match is correct.
      
      if (wrapper.state('listaDePacotes').length > 0) existe = true; 
      // expect(existe).toEqual(true)
    })


  })