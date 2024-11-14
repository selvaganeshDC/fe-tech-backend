-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2024 at 06:03 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 5.6.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rim`
--

-- --------------------------------------------------------

--
-- Table structure for table `addtocart`
--

CREATE TABLE `addtocart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` varchar(20) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `distributors`
--

CREATE TABLE `distributors` (
  `id` int(11) NOT NULL,
  `companyname` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `gstnumber` varchar(15) DEFAULT NULL,
  `creditlimit` decimal(10,2) DEFAULT NULL,
  `contact_person_name` varchar(255) DEFAULT NULL,
  `phoneno` varchar(15) DEFAULT NULL,
  `emailid` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `distributors`
--

INSERT INTO `distributors` (`id`, `companyname`, `location`, `gstnumber`, `creditlimit`, `contact_person_name`, `phoneno`, `emailid`, `created_at`) VALUES
(7, 'BCC Distributors', '123 Main Street, Coimbatore', '27ABCDE1234F2Z5', '50000.00', 'John', '1234567890', 'johndoe@abcdistributors.com', '2024-11-08 09:40:43');

-- --------------------------------------------------------

--
-- Table structure for table `distributor_images`
--

CREATE TABLE `distributor_images` (
  `id` int(11) NOT NULL,
  `distributor_id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `distributor_images`
--

INSERT INTO `distributor_images` (`id`, `distributor_id`, `image_path`) VALUES
(5, 7, 'uploads\\1731059783425-unnamed.png');

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL,
  `order_id` varchar(20) DEFAULT NULL,
  `product_id` varchar(20) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(13, 'ORD-56d37497', 'FE24', 4, '2300.00'),
(14, 'ORD-56d37497', 'FE24', 2, '2300.00');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` varchar(20) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_date` varchar(12) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `status` enum('received','shipping','complaint','done','cancelled') DEFAULT 'received',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `order_date`, `total_amount`, `status`, `created_at`) VALUES
('ORD-56d37497', 4, 'Nov 13, 2024', '13800.00', 'shipping', '2024-11-13 11:28:15');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_id` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `mrp_rate` decimal(10,2) NOT NULL,
  `technicians_rate` decimal(10,2) NOT NULL,
  `distributors_rate` decimal(10,2) NOT NULL,
  `brand_name` varchar(100) DEFAULT NULL,
  `product_description` text NOT NULL,
  `stocks` int(11) NOT NULL,
  `how_to_use` text,
  `composision` text,
  `item_details` text,
  `organization_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_id`, `name`, `mrp_rate`, `technicians_rate`, `distributors_rate`, `brand_name`, `product_description`, `stocks`, `how_to_use`, `composision`, `item_details`, `organization_name`) VALUES
(24, 'FE24', 'AC Outdoor Stand Wall Stand Split Ac-v1', '2300.00', '2500.00', '2300.00', 'ONIDA', 'Our AC Motor is designed for versatility, durability, and energy efficiency, making it ideal for a wide range of applications. Whether you\'re powering industrial machinery, air conditioning units, or appliances, this motor delivers reliable performance with low maintenance requirements.', 1000, 'To use an AC motor, first, ensure it is properly installed by connecting it to the appropriate power source, as specified in the motor\'s technical specifications. Secure the motor to a stable base or frame, ensuring proper alignment with any connecting shafts or components. If needed, consult a qualified electrician for proper wiring according to the provided wiring diagram. Additionally, ground the motor to prevent electrical hazards.', 'To use an AC motor, first, ensure it is properly installed by connecting it to the appropriate power source, as specified in the motor\'s technical specifications. Secure the motor to a stable base or frame, ensuring proper alignment with any connecting shafts or components. If needed, consult a qualified electrician for proper wiring according to the provided wiring diagram. Additionally, ground the motor to prevent electrical hazards.', '10*20 cm', 'Tools mart');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` varchar(10) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_path`) VALUES
(47, 'FE24', 'uploads\\1731068938149-ac-outdoor-stand.png'),
(48, 'FE24', 'uploads\\1731068938184-ac-outdoor-stand.png');

-- --------------------------------------------------------

--
-- Table structure for table `shipmentitems`
--

CREATE TABLE `shipmentitems` (
  `id` int(11) NOT NULL,
  `shipment_id` varchar(20) DEFAULT NULL,
  `product_id` varchar(20) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shipmentitems`
--

INSERT INTO `shipmentitems` (`id`, `shipment_id`, `product_id`, `quantity`, `price`) VALUES
(12, 'SHP-4a498a13', 'FE24', 4, '2300.00'),
(13, 'SHP-0eb57370', 'FE24', 2, '2300.00');

-- --------------------------------------------------------

--
-- Table structure for table `shipments`
--

CREATE TABLE `shipments` (
  `shipment_id` varchar(20) NOT NULL,
  `order_id` varchar(20) DEFAULT NULL,
  `distributor_id` int(11) DEFAULT NULL,
  `transport_id` int(11) DEFAULT NULL,
  `dispatch_date` varchar(12) DEFAULT NULL,
  `dispatch_address` text,
  `status` enum('pending','Shipment') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shipments`
--

INSERT INTO `shipments` (`shipment_id`, `order_id`, `distributor_id`, `transport_id`, `dispatch_date`, `dispatch_address`, `status`, `created_at`) VALUES
('SHP-0eb57370', 'ORD-56d37497', 7, 1, 'Nov 14 2024', '92A/5, Main road, Rajapalayam', 'Shipment', '2024-11-13 11:28:16'),
('SHP-4a498a13', 'ORD-56d37497', 7, 1, 'Nov 14 2024', '92A/5, Main road, Rajapalayam', 'Shipment', '2024-11-13 11:28:16');

-- --------------------------------------------------------

--
-- Table structure for table `transport`
--

CREATE TABLE `transport` (
  `id` int(11) NOT NULL,
  `travelsName` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `driverName` varchar(100) NOT NULL,
  `contactPersonName` varchar(100) NOT NULL,
  `phoneNo` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transport`
--

INSERT INTO `transport` (`id`, `travelsName`, `location`, `driverName`, `contactPersonName`, `phoneNo`, `email`) VALUES
(1, 'DC Travels', 'SALEM', 'John wick', 'Selva', '7904474640', 'dctravels@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `isAdmin`) VALUES
(2, 'Selva', 'selvaganesh.deecodes@gmail.com', '$2b$10$tWubOE4qhBMgb21Px.ck0uIHV2tZs/jJVIns8LRv0PcwAq.zpOmHa', 0),
(3, 'admin', 'admin@gmail.com', '$2b$10$bNR7JobM/ZdeijfWUdWC3O00tU.ooE93yy35Hd8LuzKk/.wUx5H2u', 1),
(4, 'lachu', 'lachu@gmail.com', '$2b$10$H4hvh0/Ii0QwwuMR/uo7QO2IRlVnzLtLaJdWENt7A0ATOfkkks822', 0),
(5, 'mugesh', 'mugesh@gmail.com', '$2b$10$H7qI4oofbWkQGDAix5app.Eg5UtisvL5k8Fajr1ExmH6XvVh/2KmS', 0),
(7, 'mugesh', 'mugesh123@gmail.com', '$2b$10$TeLagSnBiJSkhvcHP5MmQu/9VCViMmKkGSkJZsiL6./g5YtRSdmha', 0),
(8, 'raj', 'raj@gmail.com', '$2b$10$yjEOkSqLSzo1vL93Mm91cu/Yv3T7rjK2W3gFhvJEQ94jHAi0u8tv2', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addtocart`
--
ALTER TABLE `addtocart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `distributors`
--
ALTER TABLE `distributors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `distributor_images`
--
ALTER TABLE `distributor_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `distributor_id` (`distributor_id`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_id` (`product_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `shipmentitems`
--
ALTER TABLE `shipmentitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shipment_id` (`shipment_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `shipments`
--
ALTER TABLE `shipments`
  ADD PRIMARY KEY (`shipment_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `distributor_id` (`distributor_id`),
  ADD KEY `transport_id` (`transport_id`);

--
-- Indexes for table `transport`
--
ALTER TABLE `transport`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addtocart`
--
ALTER TABLE `addtocart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `distributors`
--
ALTER TABLE `distributors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `distributor_images`
--
ALTER TABLE `distributor_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `shipmentitems`
--
ALTER TABLE `shipmentitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `transport`
--
ALTER TABLE `transport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addtocart`
--
ALTER TABLE `addtocart`
  ADD CONSTRAINT `addtocart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `addtocart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `distributor_images`
--
ALTER TABLE `distributor_images`
  ADD CONSTRAINT `distributor_images_ibfk_1` FOREIGN KEY (`distributor_id`) REFERENCES `distributors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `shipmentitems`
--
ALTER TABLE `shipmentitems`
  ADD CONSTRAINT `shipmentitems_ibfk_1` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`shipment_id`),
  ADD CONSTRAINT `shipmentitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `shipments`
--
ALTER TABLE `shipments`
  ADD CONSTRAINT `shipments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `shipments_ibfk_2` FOREIGN KEY (`distributor_id`) REFERENCES `distributors` (`id`),
  ADD CONSTRAINT `shipments_ibfk_3` FOREIGN KEY (`transport_id`) REFERENCES `transport` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
