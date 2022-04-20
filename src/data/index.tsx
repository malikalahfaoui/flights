import data from "./data.json";

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  takeoff: string;
  landing: string;
  duration: number;
  price: number;
  currencyCode: string;
  departureAirport: string;
  arrivalAirport: string;
}

export function getData(
  departureAirport: string | undefined,
  arrivalAirport: string | undefined
): Array<Flight> {
  return data.data
    .filter(
      (flight) =>
        flight.departureAirport === departureAirport &&
        flight.arrivalAirport === arrivalAirport
    )
    .sort((a: Flight, b: Flight) => (a.takeoff < b.takeoff ? -1 : 1));
}

export interface AutocompleteOption {
  label: string;
  key: string;
}
export function getAirportsOption(): Array<AutocompleteOption> {
  return Object.entries(data.included)
    .filter(([key]) => key.startsWith("/airports"))
    .map(([key, { name }]) => ({
      label: name,
      key,
    }));
}

export function getAirlineName(airlineId: string): string {
  return data.included[airlineId as keyof typeof data.included].name;
}

export function getAirportName(airportId: string): string {
  return data.included[airportId as keyof typeof data.included].name;
}

export function getFlightbyId(id: string | null): Flight{
  const currentFlight = data.data.find((flight) => flight.id === id);
  return currentFlight ? currentFlight : {} as Flight;
}
