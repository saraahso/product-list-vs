import React, { Component } from 'react'
import Product from './Product'
import * as VisayaPI from '../util/VisayaAPI'
import Range from 'rc-slider/lib/Range'
import Checkbox from './Checkboxes'
import checkboxes from '../util/checkboxes';
import 'rc-slider/assets/index.css'

class ProductList extends Component {

  constructor() {
    super()
      this.state = {
        lowerBound: 0,
        upperBound: 6500,
        value: [0, 6500],
        resultAPI: null,
        checkedItems: new Map()
      }
  
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const item = e.target.name
    const isChecked = e.target.checked
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    var param = ''

    if(item === 'brand'){
      param += VisayaPI.apiBrand
    }
    if(item === 'category' ){
      param += VisayaPI.apiCategory
    }
    if(item === 'application' ){
      param += VisayaPI.apiApplication
    }
        
    { (isChecked)
      ? fetch(VisayaPI.api + param)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              resultAPI: result[0]
            }) 
          })
      : fetch(VisayaPI.api)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            resultAPI: result[0]
          }) 
        })
      }
  }

  onLowerBoundChange = (e) => {
    this.setState({ lowerBound: +e.target.value });
  }
  onUpperBoundChange = (e) => {
    this.setState({ upperBound: +e.target.value });
  }
  onSliderChange = (value) => {
    const [lowerBound, upperBound] = value;

    this.setState({
      lowerBound,
      upperBound,
    });
  }
  handleApply = () => {
    const { lowerBound, upperBound } = this.state
    this.setState({ value: [lowerBound, upperBound] })
  }

  render (){
    const { resultsAPI } = this.props 
    const { resultAPI} = this.state
    
    let products

    console.log("---"+resultAPI)
    if(resultAPI !== null){
      products = Object.keys(resultAPI.results).map((key, index) => {
        const product = resultAPI.results[key]
        return ( <Product product={product} key={index} /> )
      })
    } else {
      products = Object.keys(resultsAPI.results).map((key, index) => {
      const product = resultsAPI.results[key]
      return ( <Product product={product} key={index} /> )
      })
    }
    
    return (
      
      <div className="row mb-0">
        <div className="col-12 col-md-2 pt-3 bg-light">
          <p className="font-weight-bold">Filters</p>
        {
          checkboxes.map(item => (
            <label key={item.key}>
              {item.label}
              <Checkbox name={item.name} className={item.className}  checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} />
            </label>
          ))
        }
          <br/><hr/>
          <Range allowCross={false} value={[this.state.lowerBound, this.state.upperBound]} onChange={this.onSliderChange} className="mt-2 mb-2"/>
          <label>Min Price: </label>
          <input type="number" value={this.state.lowerBound} onChange={this.onLowerBoundChange} className="form-control"/>
          <br />
          <label>Max Price: </label>
          <input type="number" value={this.state.upperBound} onChange={this.onUpperBoundChange} className="form-control"/>
          <br />
          <button onClick={this.handleApply} className="btn btn-dark">Apply</button>
          <br />

        </div>
        <div className="col-12 col-md-10">
            <div className="row p-2">
              {products} 
              
            </div>
        </div>
      </div>
    )
  }
}

export default ProductList