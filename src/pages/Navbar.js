import React, { useState, useEffect } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Button,
  Slide,
  Avatar,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/images/LogoRG3.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider } from "@mui/material";

const GOLD_COLOR = "#B4881B";
const NAV_LINKS = ["Home", "History", "About", "Contact"];

const getPathForLink = (text) => {
  if (text === "Home") return "/home";
  if (text === "History") return "/historybooking";
  return `/${text.toLowerCase()}`;
};

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [userFullname, setUserFullname] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();
  const open = menuOpen;
  const isMobile = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
        setMenuOpen(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const fullname = sessionStorage.getItem("fullname");
    setUserFullname(fullname || "");
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUserFullname("");
    navigate("/signin");
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <Slide direction="down" in={showNavbar}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: GOLD_COLOR,
            height: "50px",
            boxShadow: "none",
            zIndex: (theme) => theme.zIndex.appBar + 1,
          }}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ display: "flex", minHeight: "10px" }}>
              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: "15px",
                  ml: "auto",
                  alignItems: "center",
                }}
              >
                {userFullname ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                      "&:hover .account-dropdown": {
                        opacity: 1,
                        visibility: "visible",
                        pointerEvents: "auto",
                        transform: "translateY(0) scale(1)",
                      },
                    }}
                  >
                    <IconButton
                      onClick={handleMenuOpen}
                      size="small"
                      sx={{ ml: 1 }}
                      aria-controls={open ? "account-menu-list" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      aria-label="Akun"
                    >
                      <Avatar sx={{ width: 32, height: 32, bgcolor: "#fff" }}>
                        <PersonIcon sx={{ color: GOLD_COLOR }} />
                      </Avatar>
                    </IconButton>
                    {!isMobile && (
                      <Typography
                        variant="body1"
                        sx={{
                          ml: 1,
                          color: "#FFFFFF",
                          fontWeight: "bold",
                          fontSize: "14px",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        Hallo, {userFullname}
                      </Typography>
                    )}

                    <Box
                      className="account-dropdown"
                      sx={[
                        {
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          pt: 1.5,
                          zIndex: 1300,
                          opacity: 0,
                          visibility: "hidden",
                          pointerEvents: "none",
                          transform: "translateY(-4px) scale(0.98)",
                          transformOrigin: "top right",
                          transition: "opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease",
                        },
                        open && {
                          opacity: 1,
                          visibility: "visible",
                          pointerEvents: "auto",
                          transform: "translateY(0) scale(1)",
                        },
                      ]}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          overflow: "visible",
                          filter: "drop-shadow(0px 4px 14px rgba(0,0,0,0.15))",
                          minWidth: 220,
                          borderRadius: "12px",
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        }}
                      >
                        <ClickAwayListener onClickAway={handleMenuClose}>
                          <MenuList id="account-menu-list" sx={{ py: 0 }}>
                            <Box sx={{ px: 2.5, py: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
                              <Avatar sx={{ width: 44, height: 44, bgcolor: GOLD_COLOR }}>
                                <PersonIcon sx={{ color: "#fff" }} />
                              </Avatar>
                              <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#222" }}>
                                  {userFullname}
                                </Typography>
                                <Typography sx={{ fontSize: "0.8rem", color: "#888" }}>
                                  {sessionStorage.getItem("role") || "Guest"}
                                </Typography>
                              </Box>
                            </Box>

                            <Divider />

                            <MenuItem
                              onClick={() => {
                                handleMenuClose();
                                navigate("/profile");
                              }}
                              sx={{
                                py: 1.25,
                                px: 2.5,
                                gap: 1.5,
                                "&:hover": {
                                  backgroundColor: "rgba(180, 136, 27, 0.1)",
                                },
                              }}
                            >
                              <PersonIcon sx={{ fontSize: 20, color: GOLD_COLOR }} />
                              <Typography>Profile</Typography>
                            </MenuItem>

                            {sessionStorage.getItem("role") === "Admin" && (
                              <MenuItem
                                onClick={() => {
                                  handleMenuClose();
                                  navigate("/admin/dashboard");
                                }}
                                sx={{
                                  py: 1.25,
                                  px: 2.5,
                                  gap: 1.5,
                                  "&:hover": {
                                    backgroundColor: "rgba(180, 136, 27, 0.1)",
                                  },
                                }}
                              >
                                <DashboardIcon sx={{ fontSize: 20, color: GOLD_COLOR }} />
                                <Typography>Manage</Typography>
                              </MenuItem>
                            )}

                            <Divider />

                            <MenuItem
                              onClick={handleLogout}
                              sx={{
                                py: 1.25,
                                px: 2.5,
                                gap: 1.5,
                                "&:hover": {
                                  backgroundColor: "rgba(220, 53, 69, 0.1)",
                                },
                              }}
                            >
                              <LogoutIcon sx={{ fontSize: 20, color: "#dc3545" }} />
                              <Typography sx={{ color: "#dc3545" }}>Exit</Typography>
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Box>
                  </Box>
                ) : (
                  <>
                    {!isMobile && (
                      <>
                        <Button
                          variant="outlined"
                          component={Link}
                          to="/signin"
                          sx={{
                            color: "#FFFFFF",
                            border: "3px solid #FFFFFF",
                            padding: "1px 15px",
                            textTransform: "none",
                            fontWeight: "bold",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "13px",
                          }}
                        >
                          Sign In
                        </Button>
                        <Button
                          variant="contained"
                          component={Link}
                          to="/signup"
                          sx={{
                            color: GOLD_COLOR,
                            backgroundColor: "#FFFFFF",
                            textTransform: "none",
                            fontWeight: "bold",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "13px",
                            padding: "1px 15px",
                          }}
                        >
                          Sign Up
                        </Button>
                      </>
                    )}
                  </>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>

      <Slide direction="down" in={showNavbar}>
        <AppBar
          position="fixed"
          sx={{
            top: 50,
            backgroundColor: "white",
            boxShadow: 3,
            height: "90px",
          }}
        >
          <Container maxWidth="lg">
            <Toolbar
              sx={{ justifyContent: "space-between", minHeight: "80px" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mt: "8px" }}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Box
                    component="img"
                    src={Logo}
                    alt="Logo"
                    sx={{
                      height: "70px",
                      width: "auto",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Link>
              </Box>

              {isMobile ? (
                <IconButton onClick={() => setMobileMenuOpen(true)}>
                  <MenuIcon sx={{ color: GOLD_COLOR, fontSize: "32px" }} />
                </IconButton>
              ) : (
                <Box sx={{ display: "flex", gap: 3 }}>
                  {NAV_LINKS.map((text) => {
                    const path = getPathForLink(text);
                    const isActive =
                      currentPath === path ||
                      (text === "Home" && currentPath === "/");

                    return (
                      <Button
                        key={text}
                        color="inherit"
                        component={Link}
                        to={path}
                        sx={{
                          color: "black",
                          textTransform: "none",
                          fontSize: "16px",
                          fontFamily: "Graphik, sans-serif",
                          fontWeight: 400,
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            width: "100%",
                            height: "3px",
                            backgroundColor: GOLD_COLOR,
                            left: 0,
                            bottom: "-4px",
                            transform: isActive ? "scaleX(1)" : "scaleX(0)",
                            transition: "transform 0.3s ease-in-out",
                          },
                          "&:hover::after": {
                            transform: "scaleX(1)",
                          },
                        }}
                      >
                        {text}
                      </Button>
                    );
                  })}
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box sx={{ width: 260, pt: 2 }} role="presentation">
          <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2 }}>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {NAV_LINKS.map((text) => {
              const path = getPathForLink(text);
              const isActive =
                currentPath === path ||
                (text === "Home" && currentPath === "/");

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={path}
                    onClick={() => setMobileMenuOpen(false)}
                    sx={{
                      color: isActive ? GOLD_COLOR : "black",
                      fontWeight: isActive ? "bold" : "normal",
                    }}
                  >
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
            {!userFullname && (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    sx={{ color: GOLD_COLOR, fontWeight: "bold" }}
                  >
                    <ListItemText primary="Sign In" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    sx={{ color: GOLD_COLOR, fontWeight: "bold" }}
                  >
                    <ListItemText primary="Sign Up" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;