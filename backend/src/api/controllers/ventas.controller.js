import { insertarVenta } from "../models/ventas.model.js";

export const registrarVenta = async (req, res) => {
  try {
    const { usuario, total } = req.body;
    if (!usuario || !total) {
      return res.status(400).json({ message: "Faltan datos." });
    }

    const resultado = await insertarVenta(usuario, total);
    res.status(201).json({ message: "Venta registrada", id: resultado.insertId });
  } catch (error) {
    console.error("Error al registrar venta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};