import {
  Card,
  CardContent,
  Stack,
  Grid,
  Typography,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/system";
import { intervalToDuration } from "date-fns";

import {
  Flight,
  getAirlineName,
  getAirportName,
  getFlightbyId,
} from "../../data";
import { useTranslation } from "react-i18next";

interface Props {
  flights: Array<Flight>;
}

const ArrowLink = styled("div")({
  height: "1px",
  width: "30%",
  position: "absolute",
  borderBottom: "1px dashed #00a79d",
  top: "12px",
  "&::before": {
    content: '" "',
    position: "absolute",
    borderWidth: "4px 0 4px 7px",
    borderColor: "transparent transparent transparent #00a79d",
    borderStyle: "solid",
    top: "-4px",
    left: "50%",
  },
});

const formatDuration = (duration: number): String => {
  const { hours, minutes } = intervalToDuration({
    start: 0,
    end: duration * 60000,
  });
  return `${hours}h${minutes}min`;
};
export default function Flights({ flights }: Props) {
  const [openSelected, setOpenSlected] = useState<string | null>(null);
  const { t } = useTranslation();

  const selectedFlight: Flight = getFlightbyId(openSelected);

  if(flights.length === 0) return <Typography variant="h5" align="center" sx={{mt: 8}}>{t("noFlightAvailable")}</Typography>
  return (
    <Stack spacing={4} sx={{ mt: 4 }}>
      {flights.map((item) => (
        <Card key={item.id}>
          <CardContent>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{ textAlign: { xs: "center", sm: "left" } }}
              >
                <Typography variant="h6">{item.flightNumber}</Typography>
                <Typography variant="caption" component="p">
                  {getAirlineName(item.airline)}
                </Typography>
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                item
                xs={12}
                sm={6}
                position="relative"
              >
                <Grid item xs={6}>
                  <Typography variant="subtitle2" align="center">
                    {item.takeoff}
                  </Typography>
                  <Typography variant="caption" align="center" component="div">
                    {getAirportName(item.departureAirport)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" align="center">
                    {item.landing}
                  </Typography>
                  <Typography variant="caption" align="center" component="div">
                    {getAirportName(item.arrivalAirport)}
                  </Typography>
                </Grid>

                <Typography variant="caption" align="center" component="p">
                  {formatDuration(item.duration)}
                </Typography>

                <ArrowLink />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography align="right">
                  <Typography variant="h6" component="span">
                    {item.price}
                  </Typography>{" "}
                  {item.currencyCode}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "right" }}>
            <Button
              size="medium"
              variant="contained"
              onClick={() => setOpenSlected(item.id)}
            >
              {t("Select")}
            </Button>
          </CardActions>
        </Card>
      ))}
      <Dialog open={openSelected !== null} onClose={() => setOpenSlected(null)}>
        <DialogTitle>
          {t("selectedFlight")}: {selectedFlight.flightNumber}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("price")}: ${selectedFlight.price} {selectedFlight.currencyCode}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSlected(null)} autoFocus>
          {t("ok")}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
