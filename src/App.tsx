import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Copyright from "./components/Copyright";
import SearchPage from "./pages/SearchPage";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "FlightSearch": "Flight Search",
        "fromAirport": "From Airport",
        "toAirport": "To Airport",
        "departureDate": "Departure Date",
        "Search":"Search",
        "noFlightAvailable": "No Flight Available",
        "Select": "Select",
        "selectedFlight": "Selected Flight",
        "price": "Price",
        "ok": "OK",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
});

function App() {
  const theme = createTheme({
    palette: {
      background: {
        default: "#fcfcfc",
      },
      primary: {
        main: "#00a79d",
        contrastText: "#FFFFFF",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchPage />
      <Copyright />
    </ThemeProvider>
  );
}

export default App;
