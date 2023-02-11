import React from "react";
import {Button, makeStyles, TextField, Typography} from "@material-ui/core";
import firebase from "firebase";
import ReactDOM from "react-dom";
import App from "./App";

const useStyles = makeStyles(theme => ({
    lgForm: {
        margin: 'auto',
        maxWidth: 350,
    },
    textFi: {
        marginTop: 5,
        marginBottom: 5,
    },
    lB: {
        marginTop: 5,
    },
    btn: {
        marginTop: 5,
        marginBottom: 5,
    }
}))

const Home = () => {
    const classes = useStyles()
    const emailText = React.useRef()
    const passText = React.useRef()

    const authSub = firebase.auth().onAuthStateChanged((user) => {
        if(user)
        {
            authSub()
            ReactDOM.render(<App />, document.getElementById('root'))
        }
        else
            authSub()
    })

    const loginUser = () => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                // In memory persistence will be applied to the signed in Google user
                // even though the persistence was set to 'none' and a page redirect
                // occurred.
                return firebase.auth().signInWithEmailAndPassword(emailText.current.value, passText.current.value)
                    .then((user) => {
                        //ReactDOM.render(<App user={user} />, document.getElementById('root'))
                        ReactDOM.render(<Dashboard user={user} />, document.getElementById('root'))
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

    const signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(emailText.current.value, passText.current.value)
            .then((user) => {
                alert("Registration Successful!")
            })
            .catch(err => {
                alert(err.message)
            })
    }

    return (
        <div>
            <div className={classes.lgForm}>
                <form noValidate autoComplete="off">
                    <Typography variant={"h5"} align={"center"} className={classes.lB}>Login/Register</Typography>
                    <TextField inputRef={emailText} fullWidth={true} className={classes.textFi} label="Email" variant="outlined" type={"email"}/>
                    <TextField inputRef={passText} fullWidth={true} className={classes.textFi} label="Password" variant="outlined" type="password"/>
                    <Button
                        onClick={loginUser}
                        fullWidth={true}
                        color={"primary"}
                        className={classes.btn}
                        variant={"contained"}>Login</Button>
                    <Button
                        onClick={signUp}
                        fullWidth={true}
                        color={"primary"}
                        className={classes.btn}
                        variant={"contained"}>Register</Button>
                </form>
            </div>
        </div>
    )
}

export default Home
