"use client"
import { Box, Container, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import InventoryList from "../components/InventoryList";
import { InventoryProvider } from "../context/Inventory";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    h3: {
      fontWeight: 700,
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <InventoryProvider>
        <Container maxWidth="lg">
          <Box
            width="100%"
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bgcolor="background.default"
            padding={2}
          >
            <InventoryList />
          </Box>
        </Container>
      </InventoryProvider>
    </ThemeProvider>
  );
}
