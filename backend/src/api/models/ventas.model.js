import  pool  from "../database/db.js";

export const insertarVenta = async (usuario, total) => {
  const [resultado] = await pool.query(
    "INSERT INTO venta (usuario, fecha, total) VALUES (?, NOW(), ?)",
    [usuario, total]
  );
  return resultado;
};