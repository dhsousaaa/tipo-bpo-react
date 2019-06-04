import React from 'react';
import axios from 'axios';
import { Button, Icon, CardPanel} from 'react-materialize';

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          valor: '',
          dataVencimento: '',
          data: ''
      };
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    handleSubmit(event) {

        var data = new Date(this.state.dataVencimento)
        event.preventDefault()
        axios.post(`http://www.localhost:9000/cobrancas/cadastrar`, null, {
            params: {
                    valor : this.state.valor,
                    dataVencimento : converterData(data)
                }
        }).then((response) =>{
            console.log('oiii')
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
            <h1 align="center"><b>TIPO-BPO</b></h1>
            <form onSubmit={this.handleSubmit}>
                <label> Valor:
                    <input name="valor" type="text"onChange={this.handleInputChange} />
                </label>
                <br />
                <label> Data de vencimento:
                    <input name="dataVencimento" type="date" onChange={this.handleInputChange} />
                </label>
                <Button type="submit" waves="light" action="handleSubmit()">
                    Gerar boleto
                    <Icon right> 
                        send
                    </Icon>
                </Button>
        </form>
        <CardPanel className="teal">
            <span className="white-text">
                {this.state.data}
            </span>
        </CardPanel>
        </div>
        
      );
    }
  }

function converterData(date) {
    var dd = date.getDate() + 1;
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    } 

    if (mm < 10) {
        mm = '0' + mm
    }

    return mm + '/' + dd + '/' + yyyy;
}

export default Home;