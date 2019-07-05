import React from 'react';
import * as VisayaPI from './util/VisayaAPI'
import ProductList from './components/ProductList'

class App  extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      resultsAPI: null
    };
  }

  componentDidMount() {
    fetch(VisayaPI.api)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            resultsAPI: result[0]
          });
        }
      ) 
  }

  render() {
    
    const { resultsAPI } = this.state

    if(resultsAPI  == null){
      return(<div></div>)
    } 
   
    return (
      <div className="container-fluid">
      
            <ProductList 
            resultsAPI={resultsAPI}/>
          
      </div>
    )
  }
}

export default App