import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useAppThemeContext, useAuthContext, useDrawerContext } from '../../contexts';

interface IMenuLateral {
    children: React.ReactNode;
}
interface IListItemLinkProps{
  children?: React.ReactNode;
  label: string;
  icon: string;
  to: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path:resolvedPath.pathname , end : false });

  const handleClick = () =>{
    onClick?.();
    navigate(to);
  };

  return(
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label}/>
    </ListItemButton>
  );
};

export const MenuLateral: React.FC<IMenuLateral> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  
  const handleSobreClick = () => {
    if (smDown) {
      toggleDrawerOpen();
    }
    navigate('/sobre');
  };

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src='https://media.discordapp.net/attachments/990816866618470440/1089327836738891866/UltimateTrollior_Kowloon_walled_city_cinematic_VFX_VFAA_Photogr_b86e7ae5-2ec3-45b4-8cef-aa02a28a71a0.png?width=676&height=676'/>
          </Box>
          <Divider/>
          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map(drawerOption => (
                <ListItemLink
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component="nav">
              <ListItemButton onClick={handleSobreClick}>
                <ListItemIcon>
                  <Icon>info</Icon>
                </ListItemIcon>
                <ListItemText primary="Sobre"/>
              </ListItemButton>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Trocar tema"/>
              </ListItemButton>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair"/>
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};