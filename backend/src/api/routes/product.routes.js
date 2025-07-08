import {Router} from 'express';
import {validateId} from "../middlewares/middlewares.js"; // Importamos el middleware de validación de ID
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from '../controllers/product.controllers.js';
const router = Router();


//GET products
router.get("/", getAllProducts);

//GET product by ID
// Validamos que el ID sea un número y no esté vacío
router.get("/:id", validateId, getProductById);


//Post products
// Validamos que los datos del body no estén vacíos
router.post("/",createProduct);


//Put products
router.put("/:id", validateId, modifyProduct);


// Delete products
router.delete("/:id", validateId, removeProduct);

export default router;