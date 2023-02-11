import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {Button, Grid, LinearProgress, MenuItem, Paper, TextField, useMediaQuery} from "@material-ui/core";
import {DropzoneArea} from "material-ui-dropzone";
import firebase from "firebase";
import {DeleteForever, ExitToApp, Home, LibraryBooks} from "@material-ui/icons";
import App from "./App";
import ReactDOM from 'react-dom'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    camCard: {},
    icon: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '50%'
    },
    label: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    bookGridItem: {
        position: "relative",
        height: 410,
        margin: theme.spacing(1)
    },
    bookTypo: {
        padding: 1
    },
    delIconBtn: {
        position: "absolute",
        left: "75%",
        color: 'black'
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Motivational',
    'Horror',
    'Entrepreneur',
    'Spiritual',
    'Biography'
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function Dashboard() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [bookName, setBookName] = React.useState('')
    const [bookType, setBookType] = React.useState('');
    const [bookPrice, setBookPrice] = React.useState('');
    const [imageFile, setImageFile] = React.useState([])
    const [pdfFile, setPdfFile] = React.useState([])
    const [bookUrl, setBookUrl] = React.useState('')
    const [pdfUrl, setPdfUrl] = React.useState('')
    const [bookUploadProgress, setBookUploadProgress] = React.useState(0)
    const [pdfUploadProgress, setPdfUploadProgress] = React.useState(0)
    const [section, setSection] = React.useState(0)
    const [userBooks, setUSerBooks] = React.useState([])

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

    // Create a root reference
    const storageRef = firebase.storage().ref();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleBookNameChange = (event) => {
        setBookName(event.target.value)
    }

    const handleBookTypeChange = (event) => {
        setBookType(event.target.value)
    }

    const handleBookPriceChange = (event) => {
        setBookPrice(event.target.value)
    }

    const handleImageDropZone = (files) => {
        if (files.length === 0) {
            console.log("INIT: Image Drop Zone!")
        } else {
            setImageFile(files)
            uploadToFirebaseStorage('BookBanners/', files[0])
        }
    }

    const handlePDFDropZone = (files) => {
        if (files.length === 0) {
            console.log("INIT: PDF Drop Zone!")
        } else {
            setPdfFile(files[0])
            uploadToFirebaseStorage('BooksDoc/', files[0])
        }
    }

    const upLoadBookInDb = () => {
        const dbRef = firebase.database().ref('/Book')
        const bookRef = dbRef.push()
        bookRef.set({
            book_name: bookName,
            book_type: bookType,
            book_price: bookPrice,
            book_banner: bookUrl,
            book_pdf: pdfUrl,
            author: firebase.auth().currentUser.uid
        }).then(() => {
            setBookName('')
            setBookType('')
            setBookPrice('')
            setBookUrl('')
            setPdfUrl('')
            setImageFile([])
            setPdfFile([])
            alert("Book Uploaded Successfully")
        })
    }

    const uploadToFirebaseStorage = (upRef, file) => {
        const uploadTask = storageRef.child(upRef + file.name).put(file);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (upRef === 'BookBanners/') {
                    setBookUploadProgress(progress)
                } else if (upRef === 'BooksDoc/') {
                    setPdfUploadProgress(progress)
                }
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function (error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            }, function () {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log('File available at', downloadURL);
                    if (upRef === 'BookBanners/') {
                        setBookUploadProgress(0)
                        alert("Book Banner Uploaded Successfully")
                        setBookUrl(downloadURL)
                    } else if (upRef === 'BooksDoc/') {
                        setPdfUploadProgress(0)
                        alert("Book PDF Uploaded Successfully")
                        setPdfUrl(downloadURL)
                    }
                });
            });
    }

    const handleLoadSection = (index) => {
        setSection(index)
        if(userBooks.length !== 0){
            setUSerBooks([])
        }
        const booksRef = firebase.database().ref('/Book').orderByChild('author').equalTo(firebase.auth().currentUser.uid)
        booksRef.once('value')
            .then((ds) => {
                ds.forEach(item => {
                    const tmp = []
                    tmp.push({
                        id: item.key,
                        ...item.val()
                    })
                    setUSerBooks(userBooks => userBooks.concat(tmp))
                })
            })
    }

    const handleBookDeleteBtn = (id, index) => {
        const bookRef = firebase.database().ref("Book")
        bookRef.child(id).remove().then(() => {
            let tmp = [...userBooks]
            tmp.splice(index, 1)
            setUSerBooks(tmp)
        })
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Book Bucket
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button onClick={() => {window.open("/", "_self")}}>
                        <ListItemIcon><Home/></ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        setSection(0)
                    }}>
                        <ListItemIcon><InboxIcon/></ListItemIcon>
                        <ListItemText primary={"Upload New Book"}/>
                    </ListItem>
                    <ListItem button onClick={() => handleLoadSection(1)}>
                        <ListItemIcon><LibraryBooks/></ListItemIcon>
                        <ListItemText primary={"My Books"}/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        firebase.auth().signOut().then(r => {
                            ReactDOM.render(<App/>, document.getElementById('root'))
                        })
                    }}>
                        <ListItemIcon><ExitToApp/></ListItemIcon>
                        <ListItemText primary={"Logout"}/>
                    </ListItem>
                </List>
                <Divider/>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader}/>
                <div hidden={section !== 0}>
                    <Grid
                        style={
                            {maxWidth: 500, margin: "auto"}
                        }
                        spacing={2}
                        direction={"column"}
                        container>
                        <Grid
                            item>
                            <Typography variant={"body1"}>Fill New Book Upload Form</Typography>
                        </Grid>
                        <Grid
                            item>
                            <TextField
                                value={bookName}
                                onChange={handleBookNameChange}
                                fullWidth={true}
                                variant={"outlined"}
                                label={"Book Name"}/>
                        </Grid>
                        <Grid
                            item>
                            <TextField
                                value={bookType}
                                onChange={handleBookTypeChange}
                                select
                                fullWidth={true}
                                variant={"outlined"}
                                label={"Book Type"}>
                                {names.map((name) => (
                                    <MenuItem key={name} value={name} style={getStyles(name, bookType, theme)}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid
                            item>
                            <TextField
                                value={bookPrice}
                                onChange={handleBookPriceChange}
                                inputProps={{min: 0}}
                                type={"number"}
                                fullWidth={true}
                                variant={"outlined"}
                                label={"Price in Rs"}/>
                        </Grid>
                        <Grid
                            component={"div"}
                            hidden={bookUploadProgress <= 0}
                            item>
                            <Typography variant={"body1"}>Uploading Book Banner</Typography>
                            <LinearProgress variant="determinate" value={bookUploadProgress}/>
                        </Grid>
                        {
                            (bookName !== "" && bookType !== "" && bookPrice !== "") ?
                                <Grid
                                    component={"div"}
                                    item>
                                    <DropzoneArea
                                        onChange={handleImageDropZone}
                                        acceptedFiles={['image/*']}
                                        filesLimit={1}
                                        maxFileSize={1e+8}
                                        dropzoneText={"Drag Your Book Banner Image Here"}/>
                                </Grid>
                                :
                                null
                        }
                        <Grid
                            component={"div"}
                            hidden={pdfUploadProgress <= 0}
                            item>
                            <Typography variant={"body1"}>Uploading Book PDF</Typography>
                            <LinearProgress variant="determinate" value={pdfUploadProgress}/>
                        </Grid>
                        {
                            (bookName !== "" && bookType !== "" && bookPrice !== "") ?
                                <Grid
                                    component={"div"}
                                    item>
                                    <DropzoneArea
                                        onChange={handlePDFDropZone}
                                        acceptedFiles={['application/pdf']}
                                        filesLimit={1}
                                        maxFileSize={1e+8}
                                        dropzoneText={"Drag Your Book PDF Here"}/>
                                </Grid>
                                :
                                null
                        }
                        <Grid
                            item>
                            <Button
                                onClick={upLoadBookInDb}
                                fullWidth={true}
                                color={"primary"}
                                variant={"outlined"}>
                                Upload My Book!
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <div hidden={section !== 1}>
                    <Grid
                        container
                        direction={"row"}>
                        {
                            userBooks.map((item, index) =>
                                <Grid
                                    key={index}
                                    xs={fullScreen ? 12 : 2}
                                    component={Paper}
                                    className={classes.bookGridItem}
                                    item>
                                    <IconButton className={classes.delIconBtn} onClick={() => handleBookDeleteBtn(item.id, index)}><DeleteForever /></IconButton>
                                    <img width={"100%"} height={"80%"} src={item.book_banner}/>
                                    <Typography align={"center"} className={classes.bookTypo} variant={"h6"}>{item.book_name}</Typography>
                                </Grid>
                            )
                        }

                    </Grid>
                </div>
            </main>
        </div>
    );
}