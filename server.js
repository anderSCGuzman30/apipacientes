const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//servidor http
const app = express();

//configuraciones servidor http
app.use(bodyParser.json());
app.use(cors());

//conexion a la base de datos
mongoose.connect(process.env.MONGODB_URI,
    {useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(() => console.log("Conexión a MongoDB exitosa"))
    .catch(err => console.log("Error al conectar a MongoDB: ", err));

//rutas de la API
//rutas para autenticación
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//rutas para pacientes
const pacienteRoutes = require('./routes/paciente');
app.use('/api/pacientes', pacienteRoutes);

// Rutas para citas médicas
const appointmentRoutes = require('./routes/appointment');
app.use('/api/appointments', appointmentRoutes);

//puerto para bakend
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});
