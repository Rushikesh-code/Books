import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './book.css'

export default class MediaCard extends Component{
    constructor() {
        super();
        this.state={
            item:[],
            isLoad:false
        }
    }
    componentDidMount() {
        fetch('https://www.googleapis.com/books/v1/volumes?q=horror+inauthor:keyes&key=AIzaSyBxrXAwyu2G2czpX5yzoS-FtY4EPVthzr0')
            .then((res)=>res.json())
            .then((json)=>{
                this.setState({
                    item:json.items,
                    isLoad:true
                });
            })
    }

    render() {
        if(!this.state.isLoad){
            return <div>Wait! ..... data is loading</div>
        }
        const handleClick=pdf=>{
            window.open(pdf)
        }
        return (
            <div className='book'>
                {this.state.item.map(item => (
                    <ul>
                        <li>
                            <Card style={{maxWidth: 100, height:240}}>
                                <Button size="small" color="primary" onClick={()=>handleClick(item.volumeInfo.previewLink)}>
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
        );
    }
}
