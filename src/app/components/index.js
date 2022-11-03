import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { addtoCart } from '../lib/actions'



export const Navbar = ({ filter, setFiltering }) => {
  const items = useSelector(state =>state.items)
  return (
    <nav className="navbar orange navbar-expand-lg navbar-light bg-light fixed-top">
      <Link className="navbar-brand crimson" to="/"><i className="fas fa-shopping-cart"></i>Mes Courses en Ligne</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="ml-auto cart">
          <div>
            <form className="search form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setFiltering(e.target.value.length > 0)
                  filter(e.target.value)
                }}
              />
            </form>
          </div>
          <div className="menu-right">
            <Link to="/cart">
              <i className="fas fa-shopping-bag fa-2x grey"></i>
            </Link>
            <span class="badge badge-pill badge-success">{items.length>0 && items.length}</span>  
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <span className="text-muted">Place sticky footer content here.</span>
      </div>
    </footer>
  );
};

export const Card = props => {
  const { item, count } = props
  return (
    <div className="col-sm-4">
      <div className="card">
        <img
          width="170"
          height="170"
          src={process.env.PUBLIC_URL + `/assets/${item.category}/${item.image}`}
          alt={item.name}
        />
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6">
              <h4>{item.name}</h4>
            </div>
            <div className="col-sm-6">
              <p>
                €{item.price}/{item.unit}
              </p>
              <button className="btn btn-warning btn-sm" data-toggle="modal" data-target={`#${item.ref}`}>view product</button>
            </div>
          </div>
        </div>
      </div>
      <Modal item={item}  count={count} />
    </div>
  );
};


export const Modal = ({ item }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch()
  const add = (item,quantity) =>{
    dispatch(addtoCart(item,quantity))
  }
  return (
    <div
      class="modal fade "
      id={item.ref}
      data-backdrop="static"
      tabindex="-1"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">{item.name}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div className="row">
              <div className="col-sm-4">
                <img
                  width="170"
                  height="170"
                  src={
                    process.env.PUBLIC_URL +
                    `/assets/${item.category}/${item.image}`
                  }
                  alt="Citron"
                />
              </div>

              <div className="col-sm">
                <p class="lead">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore
                </p>
                <h3 className="price">€{item.price}/{item.unit}</h3> <br />
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>
                    -
                  </button>
                  <span className="btn btn-light qty">{qty}</span>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setQty(qty + 1)}>
                    +
                  </button>
                </div>
                <br />
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-dismiss="modal"
              onClick={() => add(item,qty)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export const List = props => {
  const { data, category, updateCart } = props

  return (
    <div className="col-sm">
      <div className="row">
        {data.map(item => <Card key={item.ref} item={item} updateCart={updateCart} />)}
      </div>
    </div>
  );
};

export const SideMenu = ({ loadCategory, category }) => {
  const links = ["Fruits", "Légumes", "Produits Frais", "Epicerie", "Boissons"]
  return (
    <div className="col-sm-2 sidebar" >
      <ul>
        {links.map((link, index) => {
          return (<li className={category == index && 'active'} key={index} onClick={() => loadCategory(index)}>{link}</li>)
        })}
      </ul>
    </div>
  )
}