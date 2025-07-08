import { Router } from "express";
import Products  from "../models/product.models.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", { 
  title: "Dashboard",
  about: "Inicio del Dashboard", 
});
});

router.get("/get", async (req, res) => {
  try {
    const [products] = await Products.selectAllProducts();
    res.render("get", {
      title: "Listado de productos",
      about: "Consulta de productos",
      products
    });
  } catch (error) {
    console.error("Error en /dashboard/get:", error); // <== Loguear error
    res.status(500).send("Error interno del servidor");
  }
});


router.get("/post", (req, res) => {
  res.render("post", { 
  title: "Alta de productos",
  about: "Alta de productos", 
});
});

router.get("/put", (req, res) => {
  res.render("put", {
  title: "Modificación de productos",
  about: "Modificación de productos", 
});
});

router.get("/delete", (req, res) => {
  res.render("delete", {
  title: "Baja de productos",
  about: "Baja de productos", 
});
});

export default router;