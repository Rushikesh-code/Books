import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Typography from "@material-ui/core/Typography";
import firebase from "firebase";
import App from './App'
import {TextField} from "@material-ui/core";

export default class Sign extends Component{
    constructor(props) {
        super(props);
        this.state={
            email:'',
            pass:'',
            name:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.handlePass=this.handlePass.bind(this);
        this.register=this.register.bind(this);
        this.authSub=this.authSub.bind(this);
    }
    handleChange=e=>{
        this.setState({
            email:e.target.value
        })
    }
    handlePass=e=>{
        this.setState({
            pass:e.target.value
        })
    }
    writeUserData=()=> {
        firebase.database().ref('users/').push({
            username1: this.state.name,
            email: this.state.email,
            user: firebase.auth().currentUser.uid
        }).then(() =>{

        })
    }
    register=()=>{
        const auth = firebase.auth();
        auth.createUserWithEmailAndPassword(this.state.email, this.state.pass)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                this.writeUserData();
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    loginUser = () => {
        const auth=firebase.auth();
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                // In memory persistence will be applied to the signed in Google user
                // even though the persistence was set to 'none' and a page redirect
                // occurred.
                return firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
                    .then((user) => {
                        ReactDOM.render(<App user={user} />, document.getElementById('root'))
                    })
                    .catch(err => {
                        alert(err.message)
                    });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    authSub =()=> firebase.auth().onAuthStateChanged((user) => {
        if(user)
        {
            ReactDOM.render(<App user={user}/>, document.getElementById('root'))
        }
        else{alert('Unknown id and pass')}
    })
    render() {
        return(
            <>
                <Typography>
                    <TextField label="First Name" variant='standard' id="standard-basic" onChange={this.handleChange}/>
                </Typography>
                <Typography>
                    <TextField label="Last Name" variant='standard' id="standard-basic" onChange={this.handleChange}/>
                </Typography>
                <Typography>
                    <TextField label="Email" variant='standard' id="standard-basic" onChange={this.handleChange}/>
                </Typography>
                <Typography>
                    <input type='password' placeholder='Password' onChange={this.handlePass}/>
                </Typography>
                <button onClick={this.register} variant='contained'>Register</button>
                <button onClick={this.loginUser} variant='contained'>Login</button>
            </>
        )
    }
}
