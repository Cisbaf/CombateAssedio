import { Paper, Typography, Box } from "@mui/material";
import React from "react";

export default function CardComponent({
  title,
  value,
  icon,
  color = "primary.main",
}: {
  title: string;
  value: number;
  icon?: React.ReactNode;
  color?: string;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: 3,
        backgroundColor: "white",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: `${color}1A`,
          color: color,
          mr: 2,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
          {title}
        </Typography>
        <Typography variant="h4" color="text.primary" sx={{ fontWeight: 800 }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}
