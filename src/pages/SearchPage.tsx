import { useState } from "react";
import Container from "@mui/material/Container";
import Flights from "../components/Flights";
import SearchForm from "../components/SearchForm";

export default function SearchPage() {
  const [flights, setFlights] = useState();

  return (
    <>
      <SearchForm setFlights={setFlights} />
      <Container component="main">
        {flights && <Flights flights={flights} />}
      </Container>
    </>
  );
}
