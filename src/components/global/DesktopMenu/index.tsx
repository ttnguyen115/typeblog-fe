import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import { bfLoginLinks, settings } from 'constants/routes';

interface MenuHeaderProps {
  handleCloseNavMenu: any;
  handleOpenUserMenu: any;
  anchorElUser: any;
  handleCloseUserMenu: any;
}

function DesktopMenu({ handleCloseNavMenu, handleOpenUserMenu, anchorElUser, handleCloseUserMenu }: MenuHeaderProps) {
  return (
    <React.Fragment>
      {/* Desktop screen menu */}
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {bfLoginLinks.map((page) => (
          <Link to={page.path} key={page.label} style={{ textDecoration: 'none' }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page.label}
            </Button>
          </Link>
        ))}
      </Box>
      {/* User menu */}
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <Link key={setting.label} to={setting.path} style={{ textDecoration: 'none' }}>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting.label}</Typography>
              </MenuItem>
            </Link>
          ))}
        </Menu>
      </Box>
    </React.Fragment>
  )
}

export default DesktopMenu