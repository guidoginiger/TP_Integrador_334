// Importamos el modelo de productos desde la capa de modelos
import Products from "../models/product.models.js";

/*
  Controlador para obtener todos los productos de la base de datos.
  Utiliza el método selectAllProducts del modelo.
*/
export const getAllProducts = async (req, res) => {
  try {
    let [rows] = await Products.selectAllProducts(); // Trae todos los productos

    // Respondemos con los datos encontrados o un mensaje si no hay ninguno
    res.status(200).json({
      payload: rows,
      message: rows.length === 0 ? "No se encontraron productos" : "Productos obtenidos correctamente",
    });

  } catch (error) {
    // En caso de error interno, lo informamos al cliente
    res.status(500).json({
      message: "Error al obtener los productos",
      error: error.message,
    });
  }
};

/*
  Controlador para obtener un solo producto a partir de su ID.
  Se busca en la base con selectProductFromId y se devuelve si existe.
*/
export const getProductById = async (req, res) => {
  try {
    let id = parseInt(req.params.id); // Obtenemos el ID de los parámetros de la ruta

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const [rows] = await Products.selectProductFromId(id); // Consultamos el producto

    if (rows.length === 0) {
      // Si no existe, devolvemos error 404
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    // Si lo encontramos, lo devolvemos como objeto (rows[0])
    res.status(200).json({
      payload: rows[0],
      message: "Producto encontrado",
    });

  } catch (error) {
    // Error interno
    res.status(500).json({
      message: "Error interno al obtener el id",
      error: error.message,
    });
  }
};

/*
  Controlador para crear un nuevo producto.
  Recibe los datos por body y los inserta en la base.
*/
export const createProduct = async (req, res) => {
  try {
    // Desestructuramos los datos que vienen del body
    const { categoria, imagen, nombre, precio } = req.body;

    // Validamos que no haya campos vacíos
    if (!categoria || !imagen || !nombre || !precio) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    // Insertamos el producto con el método del modelo
    const [rows] = await Products.insertNewProduct(categoria, imagen, nombre, precio);

    // Respondemos con éxito y el ID generado
    res.status(201).json({
      message: "Producto creado correctamente",
      payload: {
        id: rows.insertId,
      }
    });

  } catch (error) {
    // Error interno
    res.status(500).json({
      message: "Error interno al crear el producto",
      error: error.message,
    });
  }
};

/*
  Controlador para modificar un producto existente.
  Recibe el ID por parámetro y los nuevos datos por body.
*/
export const modifyProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id); // Obtenemos el ID de la URL

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const { categoria, imagen, nombre, precio } = req.body;

    // Validamos los campos
    if (!categoria || !imagen || !nombre || !precio) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Llamamos al método del modelo para actualizar el producto
    const result = await Products.updateProduct(id, categoria, imagen, nombre, precio);

    // Si no se encontró el producto a modificar
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Si todo salió bien, respondemos con éxito
    res.json({ message: "Producto actualizado correctamente", updatedId: id });

  } catch (error) {
    // Error interno
    res.status(500).json({ message: "Error interno al actualizar", error: error.message });
  }
};

/*
  Controlador para eliminar un producto por su ID.
*/
export const removeProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id); // ID desde los parámetros

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Eliminamos el producto usando el modelo
    const result = await Products.deleteProduct(id);

    // Si no se eliminó nada, es porque no existía
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Si se eliminó, lo confirmamos
    res.json({ message: `Producto con ID ${id} eliminado correctamente` });

  } catch (error) {
    // Error interno
    res.status(500).json({ message: "Error interno al eliminar", error: error.message });
  }
};
