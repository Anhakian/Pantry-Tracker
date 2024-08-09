import Link from "next/link";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="div" sx={{ flexGrow: 1, fontSize: 24 }}>
          Pantry Management
        </Typography>
        <Box>
          <Button
            sx={{ fontSize: 18 }}
            color="inherit"
            component={Link}
            href="/"
          >
            Home
          </Button>
          <Button
            sx={{ fontSize: 18 }}
            color="inherit"
            component={Link}
            href="/inventory"
          >
            Inventory
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
