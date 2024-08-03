"use client"
import { Box, Stack, Typography, Paper, Container, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const items = ["Potato", "Tomato", "Vegetable", "Fruit", "Meat", "Fish", "Cheese", "Butter", "Milk", "Eggs"];

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
          <Paper
            elevation={3}
            sx={{
              width: '100%',
              maxWidth: 800,
              padding: 2,
              marginBottom: 4,
              textAlign: 'center',
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Pantry Tracker
            </Typography>
            <Typography variant="h6" component="h2" color="textSecondary">
              Keep track of your pantry items easily
            </Typography>
          </Paper>
          <Box
            sx={{
              width: '100%',
              maxWidth: 800,
              height: 400, // Set the height to make the content scrollable
              overflowY: 'auto', // Enable vertical scrolling
              padding: 1,
            }}
          >
            <Stack
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {items.map((item) => (
                <Paper
                  key={item}
                  elevation={1}
                  sx={{
                    width: '100%',
                    height: '100px',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h3">{item}</Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
