import React, { Fragment } from 'react';
import './profileview.css';
import img_profile from './Dashboard/public/shin.png';

import Header from './Components/Header';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { OrderList } from 'primereact/orderlist';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

// The profile view shows all the user's profile information.
class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      title: 'your title',
      desc: 'your description',
      editable: false,
    };

    this.data = [
      {
        id: ("61a42bdbc2b08d7f929292b1"),
        user: 'Mukesh',
        code: 'SD22',
        name: 'Sad Songs',
        category: 'bluesMusic',
        collaborators: 'john',
        image: 'https://i.scdn.co/image/ab67616d0000b273b0822610a715129583e6440c'
      },
      {
        id: ("61a42cf2c2b08d7f929292b6"),
        user: 'Mukesh',
        code: 'LD32',
        name: 'Long Drive',
        category: 'rocknrollMusic',
        collaborators: 'Ike, Brandon',
        image: 'https://i.scdn.co/image/ab67616d0000b273b5d4730e54f84c66c70fe60a'
      },
      {
        id: ("61a47e20bd97dc802df853ff"),
        user: 'Mukesh',
        code: 'Study66',
        name: 'Study Muzikk',
        category: 'rocknrollMusic',
        collaborators: 'Brandon,Ike',
        image: 'https://i.scdn.co/image/ab67616d0000b2737636e1c9e67eaafc9f49aefd'
      },
      {
        id: ("61a47e94bd97dc802df85411"),
        user: 'Mukesh',
        code: 'SL55',
        name: 'Sleep Songs',
        category: 'bluesMusic',
        collaborators: 'Ike,john',
        image: 'https://i.scdn.co/image/ab67616d0000b273a02d47ad3c5c53a9c7e9e081'
      },
      {
        id: ("61a47f14bd97dc802df8542d"),
        user: 'Mukesh',
        code: 'RK76',
        name: 'Rock Muzikk',
        category: 'rockMusic',
        collaborators: 'Brandon,Ike',
        image: 'https://i.scdn.co/image/ab67616d0000b27376bc1c851462191faec76bf8'
      }
    ]


    this.itemTemplate = this.itemTemplate.bind(this);
    this.editInfo = this.editInfo.bind(this);
    this.saveChange = this.saveChange.bind(this);
  }

  componentDidMount() {
    // this.productService.getProductsSmall().then(data => this.setState({ products: data }));
    this.setState({
      products: this.data
    });
    if(localStorage.getItem('user_desc')!== null){
      this.setState({
        desc: localStorage.getItem('user_desc')
      });
    } 
  }

  editInfo = (e) =>{
    e.preventDefault();
    this.setState({
      editable: true
    });

  }
  saveChange = (e) =>{
    e.preventDefault();
    this.setState({
      editable: false
    });
    this.toast.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
  }
  onChangeDesc(e){

    this.setState({ desc: e.target.value})
    localStorage.setItem('user_desc', e.target.value);
  }


  itemTemplate(item) {
    return (
      <div className="product-item">
        <div className="image-container">
          <img
            src={item.image}
            // onError={(e) =>
            //   (e.target.src =
            //     'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
            // }
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
          className="footer-btn p-button-secondary p-ml-2 p-col-4"
          onClick={this.editInfo}
        />
        <Button className="footer-btn p-col-4" label="Save" icon="pi pi-check" onClick={this.saveChange}/>
      </div>
    );
    return (
      <Fragment>
      <Header stitle={'User Profile'}/>
      <Toast ref={(el) => this.toast = el} />
      <div className="pv-container p-d-flex p-jc-center">
        <div className="p-mr-2">
          <Card
            title="Mukesh Mohanty"
            subTitle="tHe Grim ReaPer"
            style={{ width: '25em' }}
           
            footer={footer}
            header={header}
          >{
            this.state.editable ? 
            <InputText className=" ipdesc p-m-0" style={{ lineHeight: '1.5' }}  value={localStorage.getItem('user_desc')=== null ? this.state.desc : localStorage.getItem('user_desc')}
            onChange={(e) => this.onChangeDesc(e)}>
            </InputText> :
            <p>{this.state.desc}</p>
            }
            
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
      </Fragment>
    );
  }
}

export default ProfileView;
