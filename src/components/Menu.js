import React, {useState} from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Grid,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {ExitToApp} from '@material-ui/icons';

const Menu = ({user, logout}) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div>
            <AppBar position={'static'} color={process.env.NODE_ENV === 'development' ? 'secondary' : 'primary'}>
                <Toolbar>
                    <Grid container alignItems={'center'}>
                        <Grid item style={{flexGrow: 1}}>
                            <IconButton href={''} onClick={toggleDrawer}>
                                <MenuIcon style={{color: 'white'}}/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography variant={'h6'}>
                                {user.displayName}
                            </Typography>
                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={toggleDrawer}>
                <List style={{minWidth: '200px'}}>
                    <ListItem button onClick={logout}>
                        <ListItemIcon>
                            <ExitToApp/>
                        </ListItemIcon>
                        <ListItemText primary={'Logout'}/>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
};

export default Menu;