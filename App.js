import React, {Component} from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import book from './book.jpg';
import firebase from 'firebase';
import Product from "./Product";
import Auth from "./auth/Auth";
import {Typography} from "@material-ui/core";

let MenuItems;

const names = [
    'Motivational',
    'Horror',
    'Entrepreneur',
    'Spiritual',
    'Biography'
];

class App extends Component {

    state = {
        bgr_books: [],
        mv_books: [],
        enr_books: [],
        hrr_books: [],
        spr_books:[],
    }

    componentDidMount() {
        const dbr = firebase.database().ref().child("Book").orderByChild('book_type').equalTo('Biography');
        dbr.once('value')
            .then((ds) => {
                ds.forEach((item) => {
                    const tmp = []
                    tmp.push({
                        ...item.val()
                    })
                    this.setState({
                        bgr_books: this.state.bgr_books.concat(tmp)
                    })
                })
            })

        const dbr_mv = firebase.database().ref().child("Book").orderByChild('book_type').equalTo('Motivational');
        dbr_mv.once('value')
            .then((ds) => {
                ds.forEach((item) => {
                    const tmp = []
                    tmp.push({
                        ...item.val()
                    })
                    this.setState({
                        mv_books: this.state.mv_books.concat(tmp)
                    })
                })
            })

        const dbr_enr = firebase.database().ref().child("Book").orderByChild('book_type').equalTo('Entrepreneur');
        dbr_enr.once('value')
            .then((ds) => {
                ds.forEach((item) => {
                    const tmp = []
                    tmp.push({
                        ...item.val()
                    })
                    this.setState({
                        enr_books: this.state.enr_books.concat(tmp)
                    })
                })
            })
        const hrr_enr = firebase.database().ref().child("Book").orderByChild('book_type').equalTo('Horror');
        hrr_enr.once('value')
            .then((ds) => {
                ds.forEach((item) => {
                    const tmp = []
                    tmp.push({
                        ...item.val()
                    })
                    this.setState({
                        hrr_books: this.state.hrr_books.concat(tmp)
                    })
                })
            })
        const spr_enr = firebase.database().ref().child("Book").orderByChild('book_type').equalTo('Spiritual');
        spr_enr.once('value')
            .then((ds) => {
                ds.forEach((item) => {
                    const tmp = []
                    tmp.push({
                        ...item.val()
                    })
                    this.setState({
                        spr_books: this.state.spr_books.concat(tmp)
                    })
                })
            })
    }

    clickMe(item) {
        ReactDOM.render(<Product vala={item}/>, document.getElementById('root'))
    }

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

            <>
                <div className="header">
                    <div className="container">
                        <div className="navbar">
                            <div className="logo">
                                <img src={book} width="325px"/>
                            </div>
                            <nav>
                                <ul id="MenuItems">
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Products</a></li>
                                    <li><a href="#">About</a></li>
                                    <li><a href="#">Contact</a></li>
                                    <li><a href="#" onClick={() => {
                                        ReactDOM.render(<Auth />, document.getElementById('root'));
                                    }}>Account</a></li>
                                </ul>
                            </nav>
                            <span className="menu-icon" onClick={openMenu}>&#9776;</span>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <h1>Books Are Waiting For You What Are You Waiting For?</h1>
                                <p>Success isn't always about greatness. It's about consistency. Consistent<br/>hardwork
                                    gains success.
                                    Greatness will come.</p>
                                <a href="" className="btn">Explore Now &#8594;</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="categories">
                    <div className="small-container">
                        <Typography variant={"h6"}>
                            Biography Books
                        </Typography>
                        <div className="scrollBook">
                            {
                                this.state.bgr_books.map((item, index) => (
                                    <div key={index}>
                                        <div className="col-4">
                                            <a onClick={() => this.clickMe(item)}>
                                                <img src={item.book_banner}/></a>
                                            <div>
                                                <h4>{item.book_name}</h4>
                                                <h4>{item.book_price}&#8377;</h4>
                                                <div className="rating">
                                                    <i className="fa fa-star"/>
                                                    <i className="fa fa-star"/>
                                                    <i className="fa fa-star"/>
                                                    <i className="fa fa-star-half-o"/>
                                                    <i className="fa fa-star-o"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                    <div className="small-container">
                        <Typography variant={"h6"}>
                            Motivational Books
                        </Typography>
                        <div className="scrollBook">
                            {
                                this.state.mv_books.map((item, index) => (
                                    <div key={index}>
                                        <div className="col-4">
                                            <a onClick={() => this.clickMe(item)}>
                                                <img src={item.book_banner}/></a>
                                            <div>
                                                <h4>{item.book_name}</h4>
                                                <h4>{item.book_price}&#8377;</h4>
                                                <div className="rating">
                                                    <i className="fa fa-star"/>
                                                    <i className="fa fa-star"/>
                                                    <i className="fa fa-star"/>
                                                    <i className="fa fa-star-half-o"/>
                                                    <i className="fa fa-star-o"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                    <div className="small-container">
                        <Typography variant={"h6"}>
                            Spiritual Books
                        </Typography>
                        <div className="scrollBook">
                            {
                                this.state.spr_books.map((item, index) => (
                                    <div key={index}>
                                        <div className="col-4">
                                            <a onClick={() => this.clickMe(item)}>
                                                <img src={item.book_banner}/></a>
                                            <div>
                                                <h4>{item.book_name}</h4>
                                                <h4>{item.book_price}&#8377;</h4>
                                                <div className="rating">
                                                    <i className="fa fa-star"/>
                                                    <i className="fa fa-star"/>
                                                    <i className="fa fa-star"/>
                                                    <i className="fa fa-star-half-o"/>
                                                    <i className="fa fa-star-o"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                    <div className="small-container">
                        <Typography variant={"h6"}>
                            Entrepreneur Books
                        </Typography>
                        <div className="scrollBook">
                            {
                                this.state.enr_books.map((item, index) => (
                                    <div key={index}>
                                        <div className="col-4">
                                            <a onClick={() => this.clickMe(item)}>
                                                <img src={item.book_banner}/></a>
                                            <div>
                                                <h4>{item.book_name}</h4>
                                                <h4>{item.book_price}&#8377;</h4>
                                                <div className="rating">
                                                    <i className="fa fa-star"/>
                                                    <i className="fa fa-star"/>
                                                    <i className="fa fa-star"/>
                                                    <i className="fa fa-star-half-o"/>
                                                    <i className="fa fa-star-o"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="small-container">
                        <Typography variant={"h6"}>
                            Horror Books
                        </Typography>
                        <div className="scrollBook">
                            {
                                this.state.hrr_books.map((item, index) => (
                                    <div key={index}>
                                        <div className="col-4">
                                            <a onClick={() => this.clickMe(item)}>
                                                <img src={item.book_banner} alt={"book"}/></a>
                                            <div>
                                                <h4>{item.book_name}</h4>
                                                <h4>{item.book_price}&#8377;</h4>
                                                <div className="rating">
                                                    <i className="fa fa-star"/>
                                                    <i className="fa fa-star"/>
                                                    <i className="fa fa-star"/>
                                                    <i className="fa fa-star-half-o"/>
                                                    <i className="fa fa-star-o"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default App;