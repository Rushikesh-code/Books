import React, {Component} from "react";
import ReactDOM from 'react-dom';
import './Product.css';
import book from './book.jpg';
import Auth from './auth/Auth';
let MenuItems;

class Product extends Component {

    render() {

        const openMenu = () => {
            let use=document.getElementById('MenuItems')
            if(use.style.height==='0px')
            {
                use.style.height='200px'
            }
            else
            {
                use.style.height='0px'
            }
        }

        return (
            <div>
                <div className="container">
                    <div className="navbar">
                        <div className="logo">
                            <img src={book} width="125px"/>
                        </div>
                        <nav>
                            <ul id="MenuItems">
                                <li><a href="">Home</a></li>
                                <li><a href="">Products</a></li>
                                <li><a href="">About</a></li>
                                <li><a href="">Contact</a></li>
                                <li><a onClick={() => {
                                    ReactDOM.render(<Auth />, document.getElementById('root'));
                                }}>Account</a></li>
                            </ul>
                        </nav>
                        <span className="menu-icon" onClick={openMenu}>&#9776;</span>
                    </div>
                </div>

                <div className="small-container single-product">
                    <div className="row">
                        <div className="col-2">
                            <img src={this.props.vala.book_banner}  id="productimg"/>
                            <div className="small-img-row">


                            </div>
                        </div>
                        <div className="col-2">
                            <h1>{this.props.vala.book_name}</h1>
                            <h4>{this.props.vala.book_price}&#8377;</h4>
                            <a href={this.props.vala.book_pdf} download className="btn">Download</a><span>   </span>
                            <a href={this.props.vala.book_pdf} className="btn">Preview</a>
                            <h3>Product Details <i className="fa fa-indent"/></h3><br/>
                        </div>
                    </div>
                </div>
                <div className="space">

                </div>
            </div>);
    }
}
export default Product;