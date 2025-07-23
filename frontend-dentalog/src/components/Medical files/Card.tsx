import { Card, Avatar, Typography, Box, Button, Chip } from "@mui/material";

type PatientCardProps = {
  avatarUrl: string;
  name: string;
  sex: string;
  age: string;
  bloodType: string;
  dni: string;
  handleNavigate: () => void;
};

export function PatientCard({
  avatarUrl,
  name,
  sex,
  age,
  bloodType,
  dni,
  handleNavigate,
}: PatientCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        p: 2,
        paddingBottom: 5,
        paddingTop: 5,

        // width: 320,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      style={{
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
        WebkitBoxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src={avatarUrl} alt={name} sx={{ width: 56, height: 56 }} />
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            DNI: {dni}
          </Typography>
        </Box>
      </Box>

      {/* Info Chips */}
      <Box display="flex" gap={1} flexWrap="wrap">
        <Chip label={`Edad: ${age}`} variant="outlined" />
        <Chip label={`Sexo: ${sex}`} variant="outlined" />
        <Chip
          label={`Tipo de sangre: ${bloodType}`}
          color="error"
          variant="outlined"
        />
      </Box>

      {/* Botón */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleNavigate}
        sx={{
          mt: "auto",
          textTransform: "none",
          borderRadius: 2,
          fontWeight: 500,
        }}
      >
        Subir archivos
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleNavigate}
        sx={{
          textTransform: "none",
          borderRadius: 2,
          fontWeight: 500,
        }}
      >
        Ver archivos
      </Button>
    </Card>
  );
}
