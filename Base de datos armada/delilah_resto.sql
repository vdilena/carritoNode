-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-05-2021 a las 18:57:32
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah_resto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `pedidoId` int(11) NOT NULL,
  `estado` varchar(255) DEFAULT 'En proceso',
  `hora` datetime DEFAULT NULL,
  `tipoPago` varchar(255) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `direccionEnvio` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `platoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`pedidoId`, `estado`, `hora`, `tipoPago`, `precio`, `direccionEnvio`, `createdAt`, `updatedAt`, `userId`, `platoId`) VALUES
(1, 'En proceso', '2021-05-05 16:54:11', 'efectivo', NULL, NULL, '2021-05-05 16:54:11', '2021-05-05 16:54:11', 1, 1),
(2, 'En proceso', '2021-05-05 16:54:11', 'efectivo', NULL, NULL, '2021-05-05 16:54:11', '2021-05-05 16:54:11', 1, 2),
(3, 'En proceso', '2021-05-05 16:54:11', 'Credito', NULL, NULL, '2021-05-05 16:54:11', '2021-05-05 16:54:11', 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platos`
--

CREATE TABLE `platos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `platos`
--

INSERT INTO `platos` (`id`, `nombre`, `descripcion`, `precio`, `createdAt`, `updatedAt`) VALUES
(1, 'Hamburguesa', 'Hamburguesa completa', 850, '2021-05-05 16:51:12', '2021-05-05 16:51:12'),
(2, 'Sushi', 'Buenos Aires Sushi', 2000, '2021-05-05 16:51:38', '2021-05-05 16:51:38'),
(3, 'Milanesa Napolitana', 'Milanesa completa', 600, '2021-05-05 16:52:23', '2021-05-05 16:52:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `rol` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `direccion`, `numero`, `rol`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin@gmail.com', 'admin', 'admin 1234', '47932455', 0, '2021-05-05 16:49:35', '2021-05-05 16:49:35');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`pedidoId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `platoId` (`platoId`);

--
-- Indices de la tabla `platos`
--
ALTER TABLE `platos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `pedidoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `platos`
--
ALTER TABLE `platos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`platoId`) REFERENCES `platos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

/*Correcciones*/

CREATE TABLE `detallespedidos` (
  `detallePedidoId` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `carritoPedidoId` int(11) DEFAULT NULL,
  `platoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `detallespedidos`
  ADD PRIMARY KEY (`detallePedidoId`),
  ADD KEY `carritoPedidoId` (`carritoPedidoId`),
  ADD KEY `platoId` (`platoId`);
  
ALTER TABLE `detallespedidos`
  MODIFY `detallePedidoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
  
ALTER TABLE `detallespedidos`
  ADD CONSTRAINT `det_ped_pedido_fk` FOREIGN KEY (`carritoPedidoId`) REFERENCES `pedidos` (`pedidoId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `det_ped_plato_fk` FOREIGN KEY (`platoId`) REFERENCES `platos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;
