import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { IRoutes, settings } from 'constants/routes';
import { useAuth } from 'lib/auth/useAuth';
import { useUser } from 'lib/user/useUser';
import React from 'react';
import { Link } from 'react-router-dom';

interface MenuHeaderProps {
  handleCloseNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorElUser: HTMLElement | null;
  handleCloseUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  navLinks: Array<IRoutes>;
}

function DesktopMenu({
  handleCloseNavMenu,
  handleOpenUserMenu,
  anchorElUser,
  handleCloseUserMenu,
  navLinks
}: MenuHeaderProps) {
  const { user } = useUser();
  const { logout } = useAuth();
  
  const handleClickUserMenu = (label: string) => {
    if (label !== 'Logout') return;
    else logout();
  }

  return (
    <React.Fragment>
      {/* Desktop screen menu */}
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {navLinks.map((page: IRoutes) => (
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
      {user
        ? (<Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user.account} src={user.avatar} />
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
              <Link key={setting.label} to={setting.path} style={{ textDecoration: 'none' }} onClick={() => handleClickUserMenu(setting.label)}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              </Link>
            ))}
          </Menu>
        </Box>)
        : null}
    </React.Fragment>
  )
}

export default DesktopMenu