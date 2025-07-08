const validateId = (req, res, next) => {
  const id = req.params.id;// Tambien podemos hacer const {id} = req.params;
  if (!id || isNaN(id)) {
    return res.status(400).json({
      message: "El ID es obligatorio y debe ser un número",
    });
  }

   next();
};



export {  validateId
};