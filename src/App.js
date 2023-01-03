import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Hasil, ListCategories, NavbarComponent } from './components'
import { API_URL } from './utils/constants';
import axios from 'axios';
import Menus from './components/Menus';

export default class App extends Component {
  constructor(props) {
    super(props)

    // simpan data ke dalam menus
    this.state = {
      menus: [],
    }
  }

  componentDidMount() {
    axios
      // mendapatkan link url
      .get(API_URL + "products")
      .then(res => {
        const menus = res.data;
        this.setState({ menus: menus });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    // console.log(this.state.menus);

    const { menus } = this.state;
    return (
      <div className="App">
        <NavbarComponent />
        <div className='mt-3'>
          <Container fluid>
            <Row>
              <ListCategories />
              <Col>
                <h4><strong>Daftar Produk</strong></h4>
                <hr />
                <Row>
                  {/* jika ada menu maka lakukan mapping */}
                  {menus && menus.map((menu) =>
                  (
                    <Menus
                      key={menu.id}
                      menu={menu}
                    />
                  )
                  )}
                </Row>
              </Col>
              <Hasil />
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}
