import React,{Component} from "react";
import cart from './cart.png';

class BookProduct extends Component{
    render() {
        return(
        <div className="container">
            <div className="navbar">
                <div className="logo">
                    <img src={cart} width="125px"/>
                </div>
                <nav>
                    <ul id="MenuItems">
                        <li><a href="">Home</a> </li>
                        <li><a href="">Products</a> </li>
                        <li><a href="">About</a> </li>
                        <li><a href="">Contact</a> </li>
                        <li><a href="">Account</a> </li>
                    </ul>
                </nav>
                <img src={cart} width="30px" height="30px"/>
                    <img src={cart} className="menu-icon" onclick={menutoggle()}/>
            </div>
        </div>

        <div className="small-container single-product">
            <div className="row">
                <div className="col-2">
                    <img src="images/gallery-1.jpg" width="100%" id="productimg">
                        <div className="small-img-row">
                            <div className="small-img-col">
                                <img src={} width="100%" className="small-img"/>
                            </div>
                            <div className="small-img-col">
                                <img src={} width="100%" className="small-img"/>
                            </div>
                            <div className="small-img-col">
                                <img src={} width="100%" className="small-img"/>
                            </div>
                            <div className="small-img-col">
                                <img src={} width="100%" className="small-img"/>
                            </div>
                        </div>
                </div>
                <div className="col-2">
                    <p>Home /T-Shirt</p>
                    <h1>Red Printed T-Shirt by HRX</h1>
                    <h4>$50.0</h4>
                    <select>
                        <option>Select Size</option>
                        <option>XXL</option>
                        <option>XL</option>
                        <option>Large</option>
                        <option>Medium</option>
                        <option>Small</option>
                    </select>
                    <input type="number" value="1">
                        <a href="" className="btn">Add To Cart</a>
                        <h3>Product Details <i className="fa fa-indent"></i> </h3><br/>
                </div>
            </div>
        </div>

        <div className="small-container">
            <div className="row">
                <h2>Related Products</h2>
                <p>View more</p>
            </div>
        </div>


        <div className="small-container">
            <div className="row">
                <div className="col-4">
                    <img src={}/>
                        <h4>Red Printed T-Shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o"></i>
                        </div>
                        <p>$50.00</p>
                </div>
                <div className="col-4">
                    <img src={}/>
                        <h4>Red Printed T-Shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o"></i>
                        </div>
                        <p>$50.00</p>
                </div>
                <div className="col-4">
                    <img src="images/product-3.jpg">
                        <h4>Red Printed T-Shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-half-o"></i>
                            <i className="fa fa-star-o"></i>
                        </div>
                        <p>$50.00</p>
                </div>
                <div className="col-4">
                    <img src={}/>
                        <h4>Red Printed T-Shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o"></i>
                        </div>
                        <p>$50.00</p>
                </div>
            </div>
        </div>
    )
    }
}

export default BookProduct;