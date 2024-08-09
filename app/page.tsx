import React from "react";
import NavBar from "./components/NavBar";
import { Box, Button, Container, Link, Typography } from "@mui/material";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Box
        sx={{
          height: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Container
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            bgcolor: "background.default",
            py: 4,
            px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              Pantry Management
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, fontSize: "1.5rem" }}>
              Ready to make your life easier?
            </Typography>
            <Button variant="contained" component={Link} href="/inventory">
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
