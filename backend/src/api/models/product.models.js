// Importamos la conexión a la base de datos
import connection from "../database/db.js";

/*
  Función para obtener todos los productos de la tabla producto.
*/
const selectAllProducts = async () => {
  const sql = "SELECT * FROM producto";
  return await connection.query(sql);
};

/*
  Función para obtener un producto por su ID.
  Usa placeholders para prevenir SQL Injection.
*/
const selectProductFromId = async (id) => {
  const sql = "SELECT * FROM producto WHERE id = ?";
  return await connection.query(sql, [id]);
};

/*
  Función para insertar un nuevo producto.
  Se insertan los campos: categoria, imagen, nombre y precio.
*/
const insertNewProduct = async (categoria, imagen, nombre, precio) => {
  const sql = "INSERT INTO producto (categoria, imagen, nombre, precio) VALUES (?, ?, ?, ?)";
  return await connection.query(sql, [categoria, imagen, nombre, precio]);
};

/*
  Función para actualizar un producto existente por ID.
*/
const updateProduct = async (id, categoria, imagen, nombre, precio) => {
  const sql = "UPDATE producto SET categoria = ?, imagen = ?, nombre = ?, precio = ? WHERE id = ?";
  return await connection.query(sql, [categoria, imagen, nombre, precio, id]);
};

/*
  Función para eliminar un producto por su ID.
*/
const deleteProduct = async (id) => {
  const sql = "DELETE FROM producto WHERE id = ?";
  return await connection.query(sql, [id]);
};

// Exportamos todas las funciones como un objeto (modular)
export default {
  selectAllProducts,
  selectProductFromId,
  insertNewProduct,
  updateProduct,
  deleteProduct
};
