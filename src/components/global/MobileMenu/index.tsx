import { Menu as MenuButton } from '@mui/icons-material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { bfLoginLinks } from 'constants/routes';
import React from 'react';
import { Link } from 'react-router-dom';

interface MenuHeaderProps {
  handleOpenNavMenu: any;
  anchorElNav: any;
  handleCloseNavMenu: any;
}

function MobileMenu({ handleOpenNavMenu, anchorElNav, handleCloseNavMenu }: MenuHeaderProps) {
  return (
    <React.Fragment>{/* Mobile responsive menu */}
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuButton />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {bfLoginLinks.map((page) => (
            <Link to={page.path} key={page.label} style={{ textDecoration: 'none' }}>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page.label}</Typography>
              </MenuItem>
            </Link>
          ))}
        </Menu>
      </Box></React.Fragment>
  )
}

export default MobileMenu