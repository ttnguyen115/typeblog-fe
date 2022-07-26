import { Menu as MenuButton } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { queryKeys } from 'constants/queryKeys';
import { IRoutes } from 'constants/routes';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

interface MenuHeaderProps {
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorElNav: HTMLElement | null;
  handleCloseNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  navLinks: Array<IRoutes>;
}

function MobileMenu({ handleOpenNavMenu, anchorElNav, handleCloseNavMenu, navLinks }: MenuHeaderProps) {
  const { data: user } = useQuery(queryKeys.user);

  return (
    <React.Fragment>
      {/* Mobile responsive menu */}
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
          {navLinks.map((page: IRoutes) => (
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