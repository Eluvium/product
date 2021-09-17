import React from 'react';

import { backendService } from '_services';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: backendService.currentTokenValue,
      users: null,
      products: [],
      showAddModal: false,
      showUpdateModal: false
    };
    this.addProduct = this.addProduct.bind(this);
  }
  addProduct(){
    var name = document.getElementById("exampleFormControlInput1").value;
    var description = document.getElementById("exampleFormControlInput1").value;

    var price = document.getElementById("exampleFormControlInput3").value;
    let request = {
      name: name,
      description: description,
      price: parseFloat(price)
    }
    console.log(request)
    backendService.POST('', 'product/', request)
      .then((product) => {
        $("#exampleModal").modal();
        location.href = "/";
      });
    return;
  }
  renderAddModal(){
    return(
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addProductModal" onClick={()=>{$("#exampleModal").modal()}}>
          Add product
        </button>
        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={this.state.showAddModal}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add product</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form id="AddForm">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="name" ref="name"/>
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlInput2">Description</label>
                    <input type="text" class="form-control" id="exampleFormControlInput2" placeholder="description" ref="description"/>
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlInput3">Price</label>
                    <input type="text" className="form-control" id="exampleFormControlInput3" placeholder="price" ref="price"/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.addProduct}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderUpdateModal(product){
    return(
        <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form id="UpdateForm">
                  <input type="hidden" id="exampleFormControlInput7"/>

                  <div class="form-group">
                    <label for="exampleFormControlInput4">Name</label>
                    <input type="text" class="form-control" id="exampleFormControlInput4"  placeholder="name" ref="Updatename"/>
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlInput5">Description</label>
                    <input type="text" class="form-control" id="exampleFormControlInput5"  placeholder="description" ref="Updatedescription"/>
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlInput6">Price</label>
                    <input type="text" class="form-control" id="exampleFormControlInput6"  placeholder="price" ref="Updateprice"/>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onClick={()=>{
                  let v2 = {
                    id: parseInt(document.getElementById("exampleFormControlInput7").value),
                    name: document.getElementById("exampleFormControlInput4").value,
                    description :document.getElementById("exampleFormControlInput5").value,
              
                    price : parseFloat(document.getElementById("exampleFormControlInput6").value),
                  }
                  console.log(v2)
                  this.updateProduct(v2)
                  }}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
    )
  }
  updateProduct(p){
    console.log(p)
    backendService.PUT('', 'product/', p)
      .then((product) => {
        $("#exampleModal2").modal();
        location.href = "/";
      });
    return;
  }
  deleteProduct(p){
    console.log(p)
    backendService.DELETE('', 'product/'+p, {})
      .then((product) => {
        location.href = "/";
      });
    return;
  }
  showUpdateModal(v){
    document.getElementById("exampleFormControlInput7").value = v.id;
    document.getElementById("exampleFormControlInput4").value = v.name;
    document.getElementById("exampleFormControlInput5").value = v.description;
    document.getElementById("exampleFormControlInput6").value = v.price;
    $("#exampleModal2").modal();
  }
  getProducts(){
    backendService.GET('', 'product/', {

    })
      .then((products) => {
      // store user details and jwt token in local storage
      // to keep user logged in between page refreshes
        //user = JSON.parse(user);
        if(products !== null){
          this.setState({products:products})

        }
        console.log(products)
      });
  }


  componentDidMount() {
    // userService.getAll().then(users => this.setState({ users }));
    this.getProducts();
  }

  render() {
    return (
      <div>
        {this.renderAddModal()}
        {this.renderUpdateModal()}
        {(this.state.products.length!=0)?
            <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((v)=>{
                return(
                  <tr>
                    <th scope="row">{v.id}</th>
                    <td>{v.name}</td>
                    <td>{v.description}</td>
                    <td>{v.price}</td>
                    <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#updateProductModal" onClick={()=>{this.showUpdateModal(v)}}>
                        Update product
                      </button><br/>
                      <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#updateProductModal" onClick={()=>{this.deleteProduct(v.id)}}>
                        Delete product
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>:<p>Empty...</p>
        }
        
      </div>
    );
  }
}

export default HomePage;
