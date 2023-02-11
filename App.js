import React, {Component} from 'react';
import Lottie from 'react-lottie';
import lotty from './lotties/lotty.json';
import './App.css';
import Menu from './menu';
import Book from './Book';

export default class App extends Component {
    render() {
        const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: lotty,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
        let name="Rushikesh"
        return (
            <div className=''>
                <Menu name={name}/>
                <div className='App'>
                    <Lottie
                        options={defaultOptions}
                        height={250}
                        width={250}
                    />
                </div>
                <Book/>
            </div>
        );
    }
}


