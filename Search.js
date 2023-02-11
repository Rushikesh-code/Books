import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import App from './App'
import ReactDOM from 'react-dom'

export default class Search extends Component{
    constructor(props) {
        super(props);
        this.state={
            item:[]
        }
        this.cut=this.cut.bind(this);
    }
    componentDidMount() {
        fetch('https://www.googleapis.com/books/v1/volumes?q='+this.props.search+'+inauthor:keyes&key=AIzaSyBxrXAwyu2G2czpX5yzoS-FtY4EPVthzr0')
            .then((res)=>res.json())
            .then((json)=>{
                this.setState({
                    item:json.items
                });
            })
    }
    cut(){ReactDOM.render(<App/>,document.getElementById('root'))}
    render() {
        return(
            <>
                <div style={{backgroundColor: "steelblue", height: '4em'}} onClick={this.cut}><button style={{ backgroundColor:'steelblue', border:'none'}}>Back</button></div>
                    <div className='book'>
                        {this.state.item.map(item => (
                            <ul>
                                <li>
                                    <Card style={{maxWidth: 100, height:240, top:'5em'}}>
                                        <Button size="small" color="primary" /*onClick={()=>handleClick(item.volumeInfo.previewLink)}*/>
                                            <CardActionArea>
                                                <CardMedia
                                                    component={"img"}
                                                    height={140}
                                                    image={item.volumeInfo.imageLinks.thumbnail}
                                                    title="Contemplative Reptile"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom style={{fontSize:10}}>
                                                        {item.volumeInfo.title}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Button>
                                    </Card>
                                </li>
                            </ul>
                        ))}

                    </div>
            </>
        )
    }
}
