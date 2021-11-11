import React from "react";
import './profileview.css'

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { OrderList } from 'primereact/orderlist';

class ProfileView extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       products : [],
       title : 'your title',
       desc : 'your description'

    }

    this.data =[
        {"id": "1000","code": "f230fh0g3","name": "Bamboo Watch","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
        {"id": "1001","code": "nvklal433","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4},
        {"id": "1002","code": "zz21cz3c1","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3},
        {"id": "1003","code": "244wgerg2","name": "Blue T-Shirt","description": "Product Description","image": "blue-t-shirt.jpg","price": 29,"category": "Clothing","quantity": 25,"inventoryStatus": "INSTOCK","rating": 5},
        {"id": "1004","code": "h456wer53","name": "Bracelet","description": "Product Description","image": "bracelet.jpg","price": 15,"category": "Accessories","quantity": 73,"inventoryStatus": "INSTOCK","rating": 4},
        {"id": "1005","code": "av2231fwg","name": "Brown Purse","description": "Product Description","image": "brown-purse.jpg","price": 120,"category": "Accessories","quantity": 0,"inventoryStatus": "OUTOFSTOCK","rating": 4},
        {"id": "1006","code": "bib36pfvm","name": "Chakra Bracelet","description": "Product Description","image": "chakra-bracelet.jpg","price": 32,"category": "Accessories","quantity": 5,"inventoryStatus": "LOWSTOCK","rating": 3},
        {"id": "1007","code": "mbvjkgip5","name": "Galaxy Earrings","description": "Product Description","image": "galaxy-earrings.jpg","price": 34,"category": "Accessories","quantity": 23,"inventoryStatus": "INSTOCK","rating": 5},
        {"id": "1008","code": "vbb124btr","name": "Game Controller","description": "Product Description","image": "game-controller.jpg","price": 99,"category": "Electronics","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 4},
        {"id": "1009","code": "cm230f032","name": "Gaming Set","description": "Product Description","image": "gaming-set.jpg","price": 299,"category": "Electronics","quantity": 63,"inventoryStatus": "INSTOCK","rating": 3}
      ]

    this.itemTemplate = this.itemTemplate.bind(this);
  }

  componentDidMount() {
    // this.productService.getProductsSmall().then(data => this.setState({ products: data }));
    this.setState({
      products: this.data 
    })
  }
  itemTemplate(item) {
    return (
        <div className="product-item">
            <div className="image-container">
                <img src={`showcase/demo/images/product/${item.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.name} />
            </div>
            <div className="product-list-detail">
                <h5 className="p-mb-2">{item.name}</h5>
                <i className="pi pi-tag product-category-icon"></i>
                <span className="product-category">{item.category}</span>
            </div>
            <div className="product-list-action">
                <h6 className="p-mb-2">${item.price}</h6>
                <span className={`product-badge status-${item.inventoryStatus.toLowerCase()}`}>{item.inventoryStatus}</span>
            </div>
        </div>
    );
  }



  render() {
    const header = (
      <img alt="Card" src="showcase/demo/images/usercard.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
  );
  const footer = (
        <div className="p-grid p-justify-between">
            <Button label="Edit" icon="pi pi-user-edit" className="p-button-secondary p-ml-2 p-col-4" />
            <Button className="p-col-4" label="Save" icon="pi pi-check" />
        </div>
    );
    return(
        <div className='pv-container p-d-flex p-jc-center'>
          <div className="p-mr-2">
            <Card title="Mukesh Mohanty" subTitle="tHe Grim ReaPer" style={{ width: '25em' }} footer={footer} header={header}>
                <p className="p-m-0" style={{lineHeight: '1.5'}}>Like Listening Metal and Rock Music.</p>
            </Card>
          </div>
          <div>
            <div className="orderlist-demo">
                <div className="card">
                    <OrderList value={this.state.products} header="My Playlist" dragdrop listStyle={{height:'40em',width: '25em'}} dataKey="id"
                        itemTemplate={this.itemTemplate} onChange={(e) => this.setState({ products: e.value })}></OrderList>
                </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ProfileView;
