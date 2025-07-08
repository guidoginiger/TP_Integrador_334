// Core y externos
import express from "express";
import cors from "cors";

// Config y utilidades
import environments from "./src/api/config/environments.js";
import { __dirname, join } from "./src/api/utils/index.js";

// Rutas
import { productsRouter } from "./src/api/routes/index.js";
import ventasRouter from "./src/api/routes/ventas.routes.js";
import viewRoutes from "./src/api/routes/view.routes.js";
const app = express();
const PORT = environments.port;


//Configuración de la aplicación
app.set("view engine", "ejs"); //Establece el motor de plantillas EJS
app.set("views", join(__dirname, "src/views")); //Establece la carpeta de vistas para EJS
//join(__dirname, "src/views") une el directorio actual con la carpeta "views


//Middlewares para servir archivos estáticos
app.use(express.static(join(__dirname, "src/public"))); //Sirve archivos estáticos desde la carpeta "public"

//Middlewares
app.use(cors());
app.use(express.json()); //Para poder recibir datos en formato JSON 


//Rutas
app.get("/", (req, res) => {
  res.send("Funcionando OK UHS!");
});

//Rutas de la API
app.use("/api/products", productsRouter);
app.use("/api/venta", ventasRouter);
app.use("/dashboard", viewRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
}); 