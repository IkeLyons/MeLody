import React from 'react';
import './profileview.css';
import img_profile from './Dashboard/public/shin.png';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { OrderList } from 'primereact/orderlist';

// The profile view shows all the user's profile information.
class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      title: 'your title',
      desc: 'your description'
    };

    this.data = [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'My Workout',
        description: 'Product Description',
        image: 'ironmaiden_rock.jpeg',
        price: 65,
        category: 'Rock Music',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '1001',
        code: 'nvklal433',
        name: 'study',
        description: 'Product Description',
        image: 'jazz.png',
        price: 72,
        category: 'Jazz Music',
        quantity: 61,
        inventoryStatus: 'INSTOCK',
        rating: 4
      },
      {
        id: '1002',
        code: 'zz21cz3c1',
        name: 'The GoodNight Sleep',
        description: 'Product Description',
        image: 'soul.jpeg',
        price: 79,
        category: 'Soul Music',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 3
      },
      {
        id: '1003',
        code: '244wgerg2',
        name: 'PaRTy Night',
        description: 'Product Description',
        image: 'rnr.jpeg',
        price: 29,
        category: 'Rock n Roll Music',
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '1004',
        code: 'h456wer53',
        name: 'PaRTy Night Friday',
        description: 'Product Description',
        image: 'rnr.jpeg',
        price: 15,
        category: 'Rock n Roll Music',
        quantity: 73,
        inventoryStatus: 'INSTOCK',
        rating: 4
      },
      {
        id: '1005',
        code: 'av2231fwg',
        name: 'PaRTy Night Sunday',
        description: 'Product Description',
        image: 'rnr.jpeg',
        price: 120,
        category: 'Rock n Roll Music',
        quantity: 0,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4
      },
      {
        id: '1006',
        code: 'bib36pfvm',
        name: 'Running',
        description: 'Product Description',
        image: 'hip.png',
        price: 32,
        category: 'Hip Hop Music',
        quantity: 5,
        inventoryStatus: 'LOWSTOCK',
        rating: 3
      }
    ];

    this.itemTemplate = this.itemTemplate.bind(this);
  }

  componentDidMount() {
    // this.productService.getProductsSmall().then(data => this.setState({ products: data }));
    this.setState({
      products: this.data
    });
  }
  itemTemplate(item) {
    return (
      <div className="product-item">
        <div className="image-container">
          <img
            src={`showcase/demo/images/product/${item.image}`}
            onError={(e) =>
              (e.target.src =
                'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
            }
            alt={item.name}
          />
        </div>
        <div className="product-list-detail">
          <h5 className="p-mb-2">{item.name}</h5>
          <i className="pi pi-star"></i>
          <span className="product-category">{item.category}</span>
        </div>
      </div>
    );
  }

  render() {
    const header = (
      <img
        alt="Card"
        src={img_profile}
        onError={(e) =>
          (e.target.src =
            'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png%27%7D />')
        }
      />
    );
    const footer = (
      <div className="p-grid p-justify-between">
        <Button
          label="Edit"
          icon="pi pi-user-edit"
          className="p-button-secondary p-ml-2 p-col-4"
        />
        <Button className="p-col-4" label="Save" icon="pi pi-check" />
      </div>
    );
    return (
      <div className="pv-container p-d-flex p-jc-center">
        <div className="p-mr-2">
          <Card
            title="Mukesh Mohanty"
            subTitle="tHe Grim ReaPer"
            style={{ width: '25em' }}
            footer={footer}
            header={header}
          >
            <p className="p-m-0" style={{ lineHeight: '1.5' }}>
              Likes listening to Metal and Rock Music.
            </p>
          </Card>
        </div>
        <div>
          <div className="orderlist-demo">
            <div className="card">
              <OrderList
                value={this.state.products}
                header="My Playlist"
                dragdrop
                listStyle={{ height: '40em', width: '25em' }}
                dataKey="id"
                itemTemplate={this.itemTemplate}
                onChange={(e) => this.setState({ products: e.value })}
              ></OrderList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileView;
