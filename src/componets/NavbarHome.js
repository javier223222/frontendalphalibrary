import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from "../assets/img/logo.jpeg"
import { useNavigate } from 'react-router-dom';
import { addClassList, removeClassList } from '../functions/Addclalist';

const drawerWidth = 240;
const navItems = [];


function DrawerAppBar(props) {
    
    const navigate=useNavigate()
    addClassList("principalHome")
    const navigateLogin=()=>{
     removeClassList("principalHome")
    navigate("/iniciarSesion",{
      replace:false
    })
}
const navItems2=[<Button onClick={navigateLogin} className='iniciosesionboton' sx={{ color: '#fff' }}>
Iniciar sesion
</Button>];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
      <img src={logo} alt='logo de empresa' className='imagenFooter pasar'></img>
      </Typography>
      <Divider />
      <List>
        {navItems2.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box  sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar className='navHome' component="nav">
        <Toolbar>
          <IconButton
            color="white"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
         
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' },flexGrow: 7}}>
            {navItems.map((item) => (
              <Button className='boton1' key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 9, display: { xs: 'none', sm: 'block' } }}
          >
            <img alt='logo de la empresa' src={logo} className='imagenFooter pasar'></img>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          
              <Button onClick={navigateLogin} className='iniciosesionboton' sx={{ color: '#fff' }}>
               Iniciar sesion
              </Button>
          
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;