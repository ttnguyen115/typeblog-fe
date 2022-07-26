import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import DesktopMenu from 'components/global/DesktopMenu';
import MobileMenu from 'components/global/MobileMenu';
import SearchHeader from 'components/global/SearchHeader';
import { afLoginLinks, bfLoginLinks, IRoutes } from 'constants/routes';
import { useUser } from 'lib/user/useUser';
import React from 'react';

function Header(): JSX.Element {
  const { user } = useUser();
  const navLinks: Array<IRoutes> = user ? afLoginLinks : bfLoginLinks;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TypeBlog
            </Typography>
            <MobileMenu
              navLinks={navLinks}
              handleCloseNavMenu={handleCloseNavMenu}
              anchorElNav={anchorElNav}
              handleOpenNavMenu={handleOpenNavMenu}
            />
            {/* Logo text */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TypeBlog
            </Typography>
            {/* Desktop searchbox */}
            <SearchHeader />
            <DesktopMenu
              navLinks={navLinks}
              handleCloseNavMenu={handleCloseNavMenu}
              handleCloseUserMenu={handleCloseUserMenu}
              handleOpenUserMenu={handleOpenUserMenu}
              anchorElUser={anchorElUser}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Header