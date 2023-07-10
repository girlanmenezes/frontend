import { AppBar, Toolbar, Typography } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import assets from "../../assets";
//import { Button } from 'primereact/button';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/features/authSlice'

function TopbarFun() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = () => {
      dispatch(logOut({"true":"true"}))
      navigate('/')
      return true

};

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src={assets.images.logoMV} style={{ width: 90, height: 33}} alt='MV'/>
        </Typography>
        <Button color="inherit" onClick={onLogout} >Sair</Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopbarFun;