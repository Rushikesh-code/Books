import './menu.css'
import {TextField} from "@material-ui/core";
import {useState} from "react";
import Search from './Search';
import ReactDOM from 'react-dom';

function Menu(props){
    const [state,setState]=useState('');
    const handleChange=e=>{setState(e.target.value)}
    const onclick=()=>{ReactDOM.render(<Search search={state}/>,document.getElementById('root'))}
    return(
        <>
            <div className='menu'>
                <div className="left">

                </div>
                <div className="right">

                    <TextField id="standard-basic" onChange={handleChange} label="Search" variant="standard" />
                        <button onClick={onclick} style={{color:'#fff',backgroundColor:'steelblue',borderRadius:'20%'}}>Search</button>
                </div>
            </div>
        </>
    )
}

export default Menu;
