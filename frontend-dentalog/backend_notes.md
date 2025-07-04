# JSON PARA USAR LOS ENDPOINTS DEL BACKEND

## Pacientes

Para crear pacientes tenemos dos opciones

1. Crear un paciente utilizando el ID de un usuario ya existente. En este caso, se debe enviar en el JSON el campo `responsable_user` con el ID correspondiente, y no se debe incluir ni enviar nada en `responsable_user_data`.

```json
{
  "first_name": "Juan",
  "last_name": "Pérez",
  "dni":1006999239,
  "birth_date": "2015-06-25",
  "gender": "Masculino",
  "blood_type": "A+",
  "address": "Calle 123 #45-67",
  "profile_photo_url": "https://shorturl.at/ANKvV",
  "responsable_user": 2
}
```

2. Crear un paciente junto con un nuevo usuario. Para ello, se deben enviar todos los datos del usuario en el campo `responsable_user_data` y no se debe enviar nada en `responsable_user`.

```json
{
  "first_name": "Juan",
  "last_name": "Pérez",
  "dni":1006999239,
  "birth_date": "2015-06-25",
  "gender": "Masculino",
  "blood_type": "A+",
  "address": "Calle 123 #45-67",
  "profile_photo_url": "https://shorturl.at/ANKvV",
  "responsable_user_data": {
    "email":"user14@gmail.com",
    "password":"pass12345",
    "first_name": "Luis",
    "last_name": "Pérez",
    "phone_number": "3178127431",
    "role": 2,
    "is_active": "True"
    }
}
```
s

