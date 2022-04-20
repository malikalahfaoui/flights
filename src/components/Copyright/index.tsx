import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 5 }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://les-tilleuls.coop/">
        Flight | https://les-tilleuls.coop/ 
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
