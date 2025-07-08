# **Sistema de Autoservicio de Componentes de PC**

*Este proyecto es un Trabajo Práctico Integrador para la Tecnicatura Universitaria en Programación de la UTN Avellaneda. El objetivo es desarrollar un sistema de autoservicio que permite a los usuarios/clientes comprar componentes de computadora, específicamente procesadores y placas de video.*

### El sistema se divide en dos componentes principales:
## Frontend
Una aplicación para el cliente, que permite visualizar y comprar productos.

## Backend
Encargado de la base de datos, proveer una API, incorporar plantillas con vistas HTML (EJS), utilización de middlewares, controllers, dependencias express, cors, mysql2, nodemon, dotenv.

## Flujo del sistema - Cliente
***Pantalla de Bienvenida***: Permite al cliente ingresar su nombre antes de iniciar la compra.

***Visualización de Productos***: Muestra los procesadores y placas de video (divididos en dos categorías según corresponda), con sus datos, imagen, precio y la opción de agregar al carrito.

***Carrito de Compras***: Permite ver el listado de productos seleccionados y ajustar las cantidades.

***Reiniciar Proceso***: Tras la compra, el sistema se reinicia, listo para un nuevo cliente.

## Flujo del sistema - Administrador
***Dashboard de Productos***: Muestra un listado completo de los productos, permitiendo:
* _Alta de Productos_: Agregar nuevos procesadores o placas de video con todos sus datos e imagen.
* _Modificación de Productos_: Editar todos los datos de un producto existente por su ID.
* _API_: Todas las peticiones responden en formato JSON.
* _Manejo de operaciones CRUD (Alta, Baja, Listados, Modificación)_
* _Rutas y endpoints_ estructurados siguiendo el patrón MVC.

## Autores
[Agustin Lopez Teson](https://github.com/AgustinLopezTeson)
[Guido Giniger](https://github.com/guidoginiger)

## Agradecimientos
***Agradecemos a los profesores Xabi y Gabi por las clases y las guías durante toda la cursada.***