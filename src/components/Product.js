import React, { Component } from 'react'

class Product extends Component {

	render (){
        const { product } = this.props
		return (
          		<div className="col-md-4">
				<div className="card product-card  mt-4 pt-4">
                    <img src={product.image} alt="" className="card-img-top product-img img-fluid"/>
						
					<div className="price m-3 p-2 text-center rounded bg-blue text-white">{product.price}</div>
					<div className="info m-3 p-2 text-center rounded border border-primary text-primary">More Info</div>
					<div className="card-body bg-gray p-2">
                        <div className="card-title m-0">{product.name}</div>
						<span className="description text-secondary">{product.short_description}</span>
                        
					</div>
							
					
				</div>
              </div>
        )
    }
}

export default Product