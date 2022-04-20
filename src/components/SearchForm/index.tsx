import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/system";
import {
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  useMediaQuery,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AutocompleteOption, getAirportsOption, getData } from "../../data";
import bgImage from "../../images/bg.jpg";
import { useTranslation } from "react-i18next";

interface Props {
  setFlights: Function;
}

const BackgroundImage = styled("div")({
  minHeight: "400px",
  backgroundImage: `url('${bgImage}')`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundColor: "#00a79d",
});

export default function SearchForm({ setFlights }: Props) {
  const [date, setDate] = React.useState<Date | null>(null);
  const [departureAirport, setDepartureAirport] = React.useState<string>();
  const [arrivalAirport, setArrivalAirport] = React.useState<string>();
  const theme = useTheme();
  const { t } = useTranslation();
  const isXS = useMediaQuery(theme.breakpoints.up("sm"));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFlights(getData(departureAirport, arrivalAirport));
  };

  return (
    <>
      {isXS && <BackgroundImage />}
      <Box
        sx={{
          marginTop: {xs:8, sm: -12},
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card sx={{ minWidth: "50%" }} square elevation={3}>
          <CardHeader
            title={t("FlightSearch")}
            titleTypographyProps={{
              variant: "h4",
              align: "center",
            }}
          ></CardHeader>
          <CardContent>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    disablePortal
                    id="departureAirport"
                    options={getAirportsOption()}
                    onChange={(
                      event: any,
                      newValue: AutocompleteOption | null
                    ) => setDepartureAirport(newValue?.key)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="departureAirport"
                        label={t("fromAirport")}
                        variant="standard"
                        autoFocus
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    disablePortal
                    id="arrivalAirport"
                    options={getAirportsOption()}
                    onChange={(
                      event: any,
                      newValue: AutocompleteOption | null
                    ) => setArrivalAirport(newValue?.key)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="arrivalAirport"
                        label={t("toAirport")}
                        variant="standard"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label={t("departureDate")}
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          name="departureDate"
                          fullWidth
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t("Search")}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
