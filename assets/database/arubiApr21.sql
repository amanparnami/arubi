-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 21, 2013 at 10:52 PM
-- Server version: 5.5.24-log
-- PHP Version: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `arubi`
--

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE IF NOT EXISTS `calendar` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `time_begin` int(11) NOT NULL,
  `time_end` int(11) NOT NULL,
  `date_begin` int(11) NOT NULL,
  `date_end` int(11) NOT NULL,
  `day_begin` int(11) NOT NULL,
  `day_end` int(11) NOT NULL,
  `repeat_freq` int(11) NOT NULL,
  `repeat_day` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `device`
--

CREATE TABLE IF NOT EXISTS `device` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `icon_url` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `type` int(1) NOT NULL COMMENT 'input(1)/output(0)/both(2)',
  `latitude` decimal(10,7) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  `altitude` decimal(10,7) NOT NULL,
  `available` tinyint(1) NOT NULL,
  `sym_location` varchar(30) NOT NULL,
  `ipaddress` varchar(30) NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `device`
--

INSERT INTO `device` (`id`, `name`, `icon_url`, `description`, `type`, `latitude`, `longitude`, `altitude`, `available`, `sym_location`, `ipaddress`) VALUES
(1, 'Kinect', 'img/icons/device/kinect.png', 'Microsoft Kinect Depth Sensor', 1, '123.0000000', '123.0000000', '123.0000000', 1, 'Classroom', ''),
(3, 'Projector 1', 'img/icons/device/display.png', 'Projector Control Using Infrared', 0, '125.0000000', '125.0000000', '125.0000000', 1, 'Classroom', '192.168.2.15'),
(4, 'Projector 2', 'img/icons/device/display.png', 'Projector Control Using Infrared', 0, '127.0000000', '127.0000000', '127.0000000', 0, 'Classroom', ''),
(5, 'Lights', 'img/icons/device/light.png', 'Light Switch', 0, '129.0000000', '129.0000000', '129.0000000', 1, 'Classroom', '192.168.2.3'),
(6, 'Projector Screen', 'img/icons/device/screen.png', 'Control the projector screen', 0, '131.0000000', '131.0000000', '131.0000000', 1, 'Classroom', '192.168.2.17'),
(7, 'Laptop', 'img/icons/device/laptop.png', 'Control your laptop', 0, '131.0000000', '131.0000000', '131.0000000', 1, 'Classroom', '192.168.2.22');

-- --------------------------------------------------------

--
-- Table structure for table `feature`
--

CREATE TABLE IF NOT EXISTS `feature` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `device_id` int(8) NOT NULL,
  `title` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `type` varchar(30) NOT NULL COMMENT 'speech, gesture, motion',
  `io_type` int(1) NOT NULL COMMENT 'Input(1)/Output(0)/Both(2)',
  `icon_url` varchar(100) NOT NULL COMMENT 'Relative Url to Icons in UI folder',
  PRIMARY KEY (`id`),
  KEY `device_id_refs` (`device_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `feature`
--

INSERT INTO `feature` (`id`, `device_id`, `title`, `description`, `type`, `io_type`, `icon_url`) VALUES
(1, 1, 'Speech Input', 'Speech input from user like "lights on"', 'speech', 1, 'img/icons/feature/speech.png'),
(2, 1, 'Gesture Input', 'Gestures like "zoom in", "wave right"', 'gesture', 1, 'img/icons/feature/gesture.png'),
(3, 5, 'Lights Controller', 'Lights controller that either switches on, off, or changes intensity.', 'light', 0, 'img/icons/feature/light.png'),
(4, 6, 'Screen', 'Projection Screen', 'screen', 0, 'img/icons/feature/screen.png'),
(5, 3, 'Projector', 'Projector Control', 'display', 0, 'img/icons/feature/display.png'),
(6, 7, 'PowerPoint Controller', 'Gestures like "swipe left" and "swipe right"', 'gesture', 1, 'img/icons/feature/gesture.png');

-- --------------------------------------------------------

--
-- Table structure for table `input`
--

CREATE TABLE IF NOT EXISTS `input` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `icon_url` varchar(100) NOT NULL,
  `feature_id` int(8) NOT NULL COMMENT 'foreign key',
  `description` varchar(100) NOT NULL,
  `value` varchar(100) NOT NULL COMMENT 'numeric, string both',
  PRIMARY KEY (`id`),
  KEY `feature_id_refs` (`feature_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `input`
--

INSERT INTO `input` (`id`, `icon_url`, `feature_id`, `description`, `value`) VALUES
(1, 'img/icons/input/speech.png', 1, '"Lights On"', 'lights_on'),
(2, 'img/icons/input/speech.png', 1, '"Lights Off"', 'lights_off'),
(3, 'img/icons/input/speech.png', 1, '"Screen Up"', 'screen_up'),
(4, 'img/icons/input/speech.png', 1, '"Screen Down"', 'screen_down'),
(5, 'img/icons/input/swipe_left.png', 2, 'Swipe Left', 'swipe_left'),
(6, 'img/icons/input/swipe_right.png', 2, 'Swipe Right', 'swipe_right'),
(7, 'img/icons/input/wave_right.png', 2, 'Wave Right', 'wave_right'),
(8, 'img/icons/input/wave_left.png', 2, 'Wave Left', 'wave_left'),
(9, 'img/icons/input/zoom_in.png', 2, 'Zoom In', 'zoom_in'),
(10, 'img/icons/input/zoom_out.png', 2, 'Zoom Out', 'zoom_out'),
(13, 'img/icons/input/speech.png', 1, '"Projector On"', 'projector_on'),
(14, 'img/icons/input/speech.png', 1, '"Projector Off"', 'projector_off'),
(15, 'img/icons/input/speech.png', 1, '"Presentation Mode"', 'presentation_mode'),
(16, 'img/icons/input/speech.png', 1, '"Blackboard Mode"', 'blackboard_mode');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE IF NOT EXISTS `location` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT 'Room level information. For example, inSpace Lab TSRB',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `name`) VALUES
(1, 'InSpace Lab'),
(2, 'Classroom');

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE IF NOT EXISTS `log` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Automatically updated whenever you change the row',
  `source_name` varchar(32) NOT NULL COMMENT 'Name of the table that generates this log',
  `source_id` int(8) NOT NULL COMMENT 'Id of updated row, new row, deleted row.',
  `event_type` varchar(32) NOT NULL COMMENT 'Insert, update, fetch, delete',
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=359 ;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`id`, `timestamp`, `source_name`, `source_id`, `event_type`, `description`) VALUES
(43, '2013-04-18 21:54:16', 'rule', 12, 'execute', 'executed the rule'),
(44, '2013-04-18 21:54:31', 'rule', 12, 'execute', 'executed the rule'),
(45, '2013-04-18 21:54:39', 'rule', 12, 'execute', 'executed the rule'),
(46, '2013-04-18 21:55:26', 'rule', 12, 'execute', 'executed the rule'),
(47, '2013-04-18 21:55:34', 'rule', 13, 'execute', 'executed the rule'),
(48, '2013-04-18 21:56:15', 'device', 5, 'update', 'ip address updated'),
(49, '2013-04-18 21:56:16', 'device', 5, 'update', 'availability info changed'),
(50, '2013-04-18 21:57:16', 'rule', 12, 'execute', 'executed the rule'),
(51, '2013-04-18 21:58:55', 'rule', 13, 'execute', 'executed the rule'),
(52, '2013-04-18 22:03:57', 'rule', 12, 'execute', 'executed the rule'),
(53, '2013-04-18 22:14:44', 'device', 3, 'update', 'ip address updated'),
(54, '2013-04-18 22:14:47', 'device', 3, 'update', 'ip address updated'),
(55, '2013-04-18 22:15:48', 'device', 3, 'update', 'ip address updated'),
(56, '2013-04-18 22:17:25', 'device', 3, 'update', 'availability info changed'),
(57, '2013-04-18 22:17:28', 'device', 3, 'update', 'availability info changed'),
(58, '2013-04-18 22:18:24', 'device', 3, 'update', 'ip address updated'),
(59, '2013-04-18 22:18:45', 'device', 3, 'update', 'ip address updated'),
(60, '2013-04-18 22:18:48', 'device', 3, 'update', 'ip address updated'),
(61, '2013-04-18 22:20:55', 'rule', 12, 'execute', 'executed the rule'),
(62, '2013-04-18 22:21:48', 'device', 3, 'update', 'ip address updated'),
(63, '2013-04-18 22:21:51', 'device', 3, 'update', 'ip address updated'),
(64, '2013-04-18 22:22:10', 'device', 3, 'update', 'ip address updated'),
(65, '2013-04-18 22:22:14', 'device', 3, 'update', 'ip address updated'),
(66, '2013-04-18 22:22:45', 'rule', 12, 'execute', 'executed the rule'),
(67, '2013-04-18 22:22:49', 'device', 3, 'update', 'ip address updated'),
(68, '2013-04-18 22:25:28', 'device', 3, 'update', 'ip address updated'),
(69, '2013-04-18 22:25:31', 'device', 3, 'update', 'availability info changed'),
(70, '2013-04-18 22:25:49', 'device', 3, 'update', 'ip address updated'),
(71, '2013-04-18 22:25:51', 'device', 3, 'update', 'ip address updated'),
(72, '2013-04-18 22:25:52', 'device', 3, 'update', 'availability info changed'),
(73, '2013-04-18 22:26:15', 'device', 3, 'update', 'ip address updated'),
(74, '2013-04-18 22:26:17', 'device', 3, 'update', 'ip address updated'),
(75, '2013-04-18 22:26:17', 'device', 3, 'update', 'availability info changed'),
(76, '2013-04-18 22:41:26', 'device', 3, 'update', 'ip address updated'),
(77, '2013-04-18 22:41:26', 'device', 3, 'update', 'availability info changed'),
(78, '2013-04-18 22:41:29', 'device', 3, 'update', 'ip address updated'),
(79, '2013-04-18 22:41:29', 'device', 3, 'update', 'availability info changed'),
(80, '2013-04-18 22:43:49', 'device', 5, 'update', 'ip address updated'),
(81, '2013-04-18 22:43:51', 'device', 5, 'update', 'availability info changed'),
(82, '2013-04-18 22:45:23', 'device', 5, 'update', 'ip address updated'),
(83, '2013-04-18 22:45:24', 'device', 5, 'update', 'availability info changed'),
(84, '2013-04-18 22:46:54', 'device', 5, 'update', 'ip address updated'),
(85, '2013-04-18 22:46:55', 'device', 5, 'update', 'availability info changed'),
(86, '2013-04-18 22:48:10', 'device', 5, 'update', 'ip address updated'),
(87, '2013-04-18 22:48:11', 'device', 5, 'update', 'availability info changed'),
(88, '2013-04-18 22:49:02', 'device', 5, 'update', 'ip address updated'),
(89, '2013-04-18 22:49:04', 'device', 5, 'update', 'availability info changed'),
(90, '2013-04-18 22:51:32', 'device', 3, 'update', 'ip address updated'),
(91, '2013-04-18 22:51:32', 'device', 3, 'update', 'availability info changed'),
(92, '2013-04-18 22:51:38', 'device', 3, 'update', 'ip address updated'),
(93, '2013-04-18 22:51:38', 'device', 3, 'update', 'availability info changed'),
(94, '2013-04-18 23:08:59', 'rule', 14, 'insert', 'new rule created'),
(95, '2013-04-18 23:11:55', 'device', 3, 'update', 'ip address updated'),
(96, '2013-04-18 23:11:55', 'device', 3, 'update', 'availability info changed'),
(97, '2013-04-18 23:12:12', 'device', 3, 'update', 'ip address updated'),
(98, '2013-04-18 23:12:12', 'device', 3, 'update', 'availability info changed'),
(99, '2013-04-18 23:14:21', 'device', 3, 'update', 'ip address updated'),
(100, '2013-04-18 23:14:21', 'device', 3, 'update', 'availability info changed'),
(101, '2013-04-18 23:15:41', 'device', 3, 'update', 'ip address updated'),
(102, '2013-04-18 23:15:41', 'device', 3, 'update', 'availability info changed'),
(103, '2013-04-18 23:15:53', 'device', 3, 'update', 'ip address updated'),
(104, '2013-04-18 23:15:53', 'device', 3, 'update', 'availability info changed'),
(105, '2013-04-18 23:43:57', 'device', 3, 'update', 'ip address updated'),
(106, '2013-04-18 23:43:57', 'device', 3, 'update', 'availability info changed'),
(107, '2013-04-18 23:48:05', 'device', 3, 'update', 'ip address updated'),
(108, '2013-04-18 23:48:07', 'device', 3, 'update', 'ip address updated'),
(109, '2013-04-18 23:48:08', 'device', 3, 'update', 'availability info changed'),
(110, '2013-04-18 23:48:39', 'device', 6, 'update', 'ip address updated'),
(111, '2013-04-18 23:48:39', 'device', 6, 'update', 'availability info changed'),
(112, '2013-04-18 23:48:45', 'device', 6, 'update', 'ip address updated'),
(113, '2013-04-18 23:48:45', 'device', 6, 'update', 'availability info changed'),
(114, '2013-04-18 23:48:54', 'device', 6, 'update', 'ip address updated'),
(115, '2013-04-18 23:48:54', 'device', 6, 'update', 'availability info changed'),
(116, '2013-04-18 23:48:56', 'device', 6, 'update', 'ip address updated'),
(117, '2013-04-18 23:48:56', 'device', 6, 'update', 'availability info changed'),
(118, '2013-04-18 23:53:59', 'device', 6, 'update', 'ip address updated'),
(119, '2013-04-18 23:53:59', 'device', 6, 'update', 'availability info changed'),
(120, '2013-04-18 23:54:03', 'device', 6, 'update', 'ip address updated'),
(121, '2013-04-18 23:54:03', 'device', 6, 'update', 'availability info changed'),
(122, '2013-04-18 23:55:44', 'device', 6, 'update', 'ip address updated'),
(123, '2013-04-18 23:55:44', 'device', 6, 'update', 'availability info changed'),
(124, '2013-04-18 23:56:05', 'device', 6, 'update', 'ip address updated'),
(125, '2013-04-18 23:56:05', 'device', 6, 'update', 'availability info changed'),
(126, '2013-04-19 00:07:06', 'device', 6, 'update', 'ip address updated'),
(127, '2013-04-19 00:07:07', 'device', 6, 'update', 'availability info changed'),
(128, '2013-04-19 00:07:09', 'device', 6, 'update', 'ip address updated'),
(129, '2013-04-19 00:07:09', 'device', 6, 'update', 'availability info changed'),
(130, '2013-04-19 00:08:48', 'device', 6, 'update', 'ip address updated'),
(131, '2013-04-19 00:08:48', 'device', 6, 'update', 'availability info changed'),
(132, '2013-04-19 00:09:44', 'device', 6, 'update', 'ip address updated'),
(133, '2013-04-19 00:09:44', 'device', 6, 'update', 'availability info changed'),
(134, '2013-04-19 00:10:00', 'device', 6, 'update', 'availability info changed'),
(135, '2013-04-19 00:13:38', 'device', 6, 'update', 'ip address updated'),
(136, '2013-04-19 00:13:38', 'device', 6, 'update', 'availability info changed'),
(137, '2013-04-19 00:16:11', 'device', 6, 'update', 'availability info changed'),
(138, '2013-04-19 00:16:25', 'device', 6, 'update', 'ip address updated'),
(139, '2013-04-19 00:16:25', 'device', 6, 'update', 'availability info changed'),
(140, '2013-04-19 00:17:38', 'device', 6, 'update', 'availability info changed'),
(141, '2013-04-19 00:18:58', 'device', 6, 'update', 'ip address updated'),
(142, '2013-04-19 00:18:58', 'device', 6, 'update', 'availability info changed'),
(143, '2013-04-19 00:19:09', 'device', 6, 'update', 'ip address updated'),
(144, '2013-04-19 00:19:09', 'device', 6, 'update', 'availability info changed'),
(145, '2013-04-19 00:19:21', 'device', 6, 'update', 'ip address updated'),
(146, '2013-04-19 00:19:21', 'device', 6, 'update', 'availability info changed'),
(147, '2013-04-19 00:19:32', 'device', 6, 'update', 'availability info changed'),
(148, '2013-04-19 00:19:42', 'device', 6, 'update', 'ip address updated'),
(149, '2013-04-19 00:19:42', 'device', 6, 'update', 'availability info changed'),
(150, '2013-04-19 00:19:55', 'device', 6, 'update', 'availability info changed'),
(151, '2013-04-19 00:20:14', 'device', 6, 'update', 'availability info changed'),
(152, '2013-04-19 00:20:44', 'device', 6, 'update', 'ip address updated'),
(153, '2013-04-19 00:20:44', 'device', 6, 'update', 'availability info changed'),
(154, '2013-04-19 00:20:55', 'device', 6, 'update', 'ip address updated'),
(155, '2013-04-19 00:20:55', 'device', 6, 'update', 'availability info changed'),
(156, '2013-04-19 01:18:31', 'device', 6, 'update', 'availability info changed'),
(157, '2013-04-19 01:23:52', 'device', 3, 'update', 'ip address updated'),
(158, '2013-04-19 01:23:52', 'device', 3, 'update', 'availability info changed'),
(159, '2013-04-19 01:24:00', 'device', 3, 'update', 'ip address updated'),
(160, '2013-04-19 01:24:01', 'device', 3, 'update', 'availability info changed'),
(161, '2013-04-19 01:24:07', 'device', 3, 'update', 'ip address updated'),
(162, '2013-04-19 01:24:07', 'device', 3, 'update', 'availability info changed'),
(163, '2013-04-19 01:48:06', 'device', 3, 'update', 'ip address updated'),
(164, '2013-04-19 01:48:06', 'device', 3, 'update', 'availability info changed'),
(165, '2013-04-19 01:48:27', 'device', 3, 'update', 'ip address updated'),
(166, '2013-04-19 01:48:27', 'device', 3, 'update', 'availability info changed'),
(167, '2013-04-19 01:50:35', 'device', 3, 'update', 'ip address updated'),
(168, '2013-04-19 01:50:36', 'device', 3, 'update', 'availability info changed'),
(169, '2013-04-19 02:03:13', 'device', 6, 'update', 'availability info changed'),
(170, '2013-04-19 02:03:40', 'device', 6, 'update', 'ip address updated'),
(171, '2013-04-19 02:03:40', 'device', 6, 'update', 'availability info changed'),
(172, '2013-04-19 02:03:52', 'device', 6, 'update', 'availability info changed'),
(173, '2013-04-19 02:04:06', 'device', 6, 'update', 'ip address updated'),
(174, '2013-04-19 02:04:06', 'device', 6, 'update', 'availability info changed'),
(175, '2013-04-19 02:04:34', 'device', 6, 'update', 'ip address updated'),
(176, '2013-04-19 02:04:34', 'device', 6, 'update', 'availability info changed'),
(177, '2013-04-19 02:05:03', 'device', 6, 'update', 'ip address updated'),
(178, '2013-04-19 02:05:03', 'device', 6, 'update', 'availability info changed'),
(179, '2013-04-19 03:59:45', 'device', 5, 'update', 'ip address updated'),
(180, '2013-04-19 03:59:46', 'device', 5, 'update', 'availability info changed'),
(181, '2013-04-19 04:03:19', 'device', 5, 'update', 'ip address updated'),
(182, '2013-04-19 04:03:20', 'device', 5, 'update', 'availability info changed'),
(183, '2013-04-19 04:04:38', 'device', 5, 'update', 'ip address updated'),
(184, '2013-04-19 04:04:57', 'device', 5, 'update', 'ip address updated'),
(185, '2013-04-19 04:04:58', 'device', 5, 'update', 'availability info changed'),
(186, '2013-04-19 04:06:00', 'device', 5, 'update', 'ip address updated'),
(187, '2013-04-19 04:06:09', 'device', 5, 'update', 'ip address updated'),
(188, '2013-04-19 04:06:11', 'device', 5, 'update', 'availability info changed'),
(189, '2013-04-19 04:07:02', 'device', 5, 'update', 'ip address updated'),
(190, '2013-04-19 04:07:04', 'device', 5, 'update', 'availability info changed'),
(191, '2013-04-19 04:08:00', 'device', 5, 'update', 'ip address updated'),
(192, '2013-04-19 04:08:02', 'device', 5, 'update', 'availability info changed'),
(193, '2013-04-19 04:08:52', 'device', 5, 'update', 'ip address updated'),
(194, '2013-04-19 04:08:54', 'device', 5, 'update', 'availability info changed'),
(195, '2013-04-19 04:09:46', 'device', 5, 'update', 'ip address updated'),
(196, '2013-04-19 04:09:48', 'device', 5, 'update', 'availability info changed'),
(197, '2013-04-19 04:10:27', 'device', 5, 'update', 'ip address updated'),
(198, '2013-04-19 04:10:29', 'device', 5, 'update', 'availability info changed'),
(199, '2013-04-19 04:10:40', 'device', 5, 'update', 'ip address updated'),
(200, '2013-04-19 04:10:41', 'device', 5, 'update', 'availability info changed'),
(201, '2013-04-19 04:11:57', 'device', 5, 'update', 'ip address updated'),
(202, '2013-04-19 04:11:59', 'device', 5, 'update', 'availability info changed'),
(203, '2013-04-19 04:13:39', 'device', 5, 'update', 'ip address updated'),
(204, '2013-04-19 04:13:40', 'device', 5, 'update', 'availability info changed'),
(205, '2013-04-19 04:13:49', 'device', 5, 'update', 'ip address updated'),
(206, '2013-04-19 04:13:51', 'device', 5, 'update', 'availability info changed'),
(207, '2013-04-19 04:15:09', 'device', 5, 'update', 'availability info changed'),
(208, '2013-04-19 04:16:24', 'device', 5, 'update', 'ip address updated'),
(209, '2013-04-19 04:16:25', 'device', 5, 'update', 'availability info changed'),
(210, '2013-04-19 04:19:09', 'device', 5, 'update', 'ip address updated'),
(211, '2013-04-19 04:19:10', 'device', 5, 'update', 'availability info changed'),
(212, '2013-04-19 04:19:29', 'device', 5, 'update', 'ip address updated'),
(213, '2013-04-19 04:19:30', 'device', 5, 'update', 'availability info changed'),
(214, '2013-04-19 04:20:58', 'device', 5, 'update', 'ip address updated'),
(215, '2013-04-19 04:20:59', 'device', 5, 'update', 'availability info changed'),
(216, '2013-04-19 04:23:08', 'device', 5, 'update', 'ip address updated'),
(217, '2013-04-19 04:23:09', 'device', 5, 'update', 'availability info changed'),
(218, '2013-04-19 04:24:55', 'device', 5, 'update', 'ip address updated'),
(219, '2013-04-19 04:24:56', 'device', 5, 'update', 'availability info changed'),
(220, '2013-04-19 04:27:21', 'device', 5, 'update', 'ip address updated'),
(221, '2013-04-19 04:27:23', 'device', 5, 'update', 'availability info changed'),
(222, '2013-04-19 04:28:36', 'device', 5, 'update', 'ip address updated'),
(223, '2013-04-19 04:28:38', 'device', 5, 'update', 'availability info changed'),
(224, '2013-04-19 04:34:29', 'device', 5, 'update', 'ip address updated'),
(225, '2013-04-19 04:34:31', 'device', 5, 'update', 'availability info changed'),
(226, '2013-04-19 04:49:09', 'device', 5, 'update', 'ip address updated'),
(227, '2013-04-19 04:49:10', 'device', 5, 'update', 'availability info changed'),
(228, '2013-04-19 04:50:30', 'device', 5, 'update', 'ip address updated'),
(229, '2013-04-19 04:50:32', 'device', 5, 'update', 'availability info changed'),
(230, '2013-04-19 04:57:28', 'device', 5, 'update', 'ip address updated'),
(231, '2013-04-19 04:57:30', 'device', 5, 'update', 'availability info changed'),
(232, '2013-04-19 05:08:27', 'device', 5, 'update', 'ip address updated'),
(233, '2013-04-19 05:08:28', 'device', 5, 'update', 'availability info changed'),
(234, '2013-04-19 05:08:46', 'device', 5, 'update', 'ip address updated'),
(235, '2013-04-19 05:08:48', 'device', 5, 'update', 'availability info changed'),
(236, '2013-04-19 05:13:04', 'device', 5, 'update', 'availability info changed'),
(237, '2013-04-19 05:13:05', 'device', 5, 'update', 'ip address updated'),
(238, '2013-04-19 05:16:06', 'rule', 13, 'execute', 'executed the rule'),
(239, '2013-04-19 05:16:18', 'rule', 12, 'execute', 'executed the rule'),
(240, '2013-04-19 05:17:32', 'rule', 13, 'execute', 'executed the rule'),
(241, '2013-04-19 05:18:34', 'rule', 15, 'execute', 'executed the rule'),
(242, '2013-04-19 05:18:38', 'rule', 12, 'execute', 'executed the rule'),
(243, '2013-04-19 05:19:02', 'rule', 15, 'execute', 'executed the rule'),
(244, '2013-04-19 05:19:31', 'device', 5, 'update', 'ip address updated'),
(245, '2013-04-19 05:19:33', 'device', 5, 'update', 'availability info changed'),
(246, '2013-04-19 05:21:33', 'rule', 12, 'execute', 'executed the rule'),
(247, '2013-04-19 05:21:51', 'rule', 15, 'execute', 'executed the rule'),
(248, '2013-04-19 05:23:20', 'rule', 15, 'execute', 'executed the rule'),
(249, '2013-04-19 05:23:25', 'rule', 15, 'execute', 'executed the rule'),
(250, '2013-04-19 05:25:53', 'rule', 17, 'execute', 'executed the rule'),
(251, '2013-04-19 05:25:58', 'rule', 17, 'execute', 'executed the rule'),
(252, '2013-04-19 05:26:25', 'rule', 12, 'execute', 'executed the rule'),
(253, '2013-04-19 05:26:38', 'rule', 15, 'execute', 'executed the rule'),
(254, '2013-04-19 05:26:47', 'rule', 15, 'execute', 'executed the rule'),
(255, '2013-04-19 05:26:52', 'rule', 15, 'execute', 'executed the rule'),
(256, '2013-04-19 05:27:51', 'rule', 17, 'execute', 'executed the rule'),
(257, '2013-04-19 05:28:03', 'rule', 17, 'execute', 'executed the rule'),
(258, '2013-04-19 05:28:08', 'rule', 17, 'execute', 'executed the rule'),
(259, '2013-04-19 05:28:29', 'rule', 12, 'execute', 'executed the rule'),
(260, '2013-04-19 05:28:30', 'rule', 15, 'execute', 'executed the rule'),
(261, '2013-04-19 05:28:35', 'rule', 15, 'execute', 'executed the rule'),
(262, '2013-04-19 05:28:39', 'rule', 15, 'execute', 'executed the rule'),
(263, '2013-04-19 05:28:49', 'device', 5, 'update', 'ip address updated'),
(264, '2013-04-19 05:28:50', 'device', 5, 'update', 'availability info changed'),
(265, '2013-04-19 05:28:58', 'rule', 15, 'execute', 'executed the rule'),
(266, '2013-04-19 05:29:04', 'rule', 15, 'execute', 'executed the rule'),
(267, '2013-04-19 05:29:22', 'rule', 15, 'execute', 'executed the rule'),
(268, '2013-04-19 05:30:09', 'rule', 15, 'execute', 'executed the rule'),
(269, '2013-04-19 05:30:14', 'rule', 12, 'execute', 'executed the rule'),
(270, '2013-04-19 05:30:17', 'rule', 15, 'execute', 'executed the rule'),
(271, '2013-04-19 05:33:04', 'rule', 17, 'execute', 'executed the rule'),
(272, '2013-04-19 05:33:08', 'rule', 17, 'execute', 'executed the rule'),
(273, '2013-04-19 05:34:18', 'rule', 17, 'execute', 'executed the rule'),
(274, '2013-04-19 05:34:24', 'rule', 12, 'execute', 'executed the rule'),
(275, '2013-04-19 05:35:47', 'rule', 12, 'execute', 'executed the rule'),
(276, '2013-04-19 05:36:59', 'rule', 12, 'execute', 'executed the rule'),
(277, '2013-04-19 05:37:23', 'rule', 12, 'execute', 'executed the rule'),
(278, '2013-04-19 05:38:16', 'rule', 12, 'execute', 'executed the rule'),
(279, '2013-04-19 05:38:36', 'rule', 15, 'execute', 'executed the rule'),
(280, '2013-04-19 05:39:27', 'rule', 15, 'execute', 'executed the rule'),
(281, '2013-04-19 05:40:22', 'rule', 15, 'execute', 'executed the rule'),
(282, '2013-04-19 05:41:39', 'rule', 12, 'execute', 'executed the rule'),
(283, '2013-04-19 05:42:37', 'rule', 12, 'execute', 'executed the rule'),
(284, '2013-04-19 05:55:03', 'rule', 12, 'execute', 'executed the rule'),
(285, '2013-04-19 05:55:03', 'rule', 18, 'execute', 'executed the rule'),
(286, '2013-04-19 05:55:04', 'rule', 12, 'execute', 'executed the rule'),
(287, '2013-04-19 05:55:05', 'rule', 18, 'execute', 'executed the rule'),
(288, '2013-04-19 05:55:15', 'rule', 15, 'execute', 'executed the rule'),
(289, '2013-04-19 05:55:25', 'rule', 12, 'execute', 'executed the rule'),
(290, '2013-04-19 05:55:25', 'rule', 18, 'execute', 'executed the rule'),
(291, '2013-04-19 05:55:33', 'rule', 15, 'execute', 'executed the rule'),
(292, '2013-04-19 05:56:57', 'rule', 12, 'execute', 'executed the rule'),
(293, '2013-04-19 05:56:58', 'rule', 18, 'execute', 'executed the rule'),
(294, '2013-04-19 06:04:45', 'rule', 19, 'execute', 'executed the rule'),
(295, '2013-04-19 06:04:45', 'rule', 21, 'execute', 'executed the rule'),
(296, '2013-04-19 06:05:43', 'rule', 15, 'execute', 'executed the rule'),
(297, '2013-04-19 06:05:46', 'rule', 15, 'execute', 'executed the rule'),
(298, '2013-04-19 06:05:57', 'rule', 12, 'execute', 'executed the rule'),
(299, '2013-04-19 06:05:58', 'rule', 18, 'execute', 'executed the rule'),
(300, '2013-04-19 06:06:01', 'rule', 15, 'execute', 'executed the rule'),
(301, '2013-04-19 06:06:11', 'rule', 22, 'execute', 'executed the rule'),
(302, '2013-04-19 06:06:11', 'rule', 23, 'execute', 'executed the rule'),
(303, '2013-04-19 06:06:29', 'rule', 12, 'execute', 'executed the rule'),
(304, '2013-04-19 06:06:30', 'rule', 18, 'execute', 'executed the rule'),
(305, '2013-04-19 06:07:25', 'rule', 12, 'execute', 'executed the rule'),
(306, '2013-04-19 06:07:26', 'rule', 18, 'execute', 'executed the rule'),
(307, '2013-04-19 06:07:58', 'rule', 17, 'execute', 'executed the rule'),
(308, '2013-04-19 06:07:59', 'rule', 20, 'execute', 'executed the rule'),
(309, '2013-04-19 06:08:02', 'rule', 17, 'execute', 'executed the rule'),
(310, '2013-04-19 06:08:03', 'rule', 20, 'execute', 'executed the rule'),
(311, '2013-04-19 06:09:11', 'rule', 15, 'execute', 'executed the rule'),
(312, '2013-04-19 06:10:15', 'rule', 15, 'execute', 'executed the rule'),
(313, '2013-04-19 06:12:23', 'rule', 12, 'execute', 'executed the rule'),
(314, '2013-04-19 06:12:23', 'rule', 18, 'execute', 'executed the rule'),
(315, '2013-04-19 06:12:45', 'rule', 15, 'execute', 'executed the rule'),
(316, '2013-04-19 06:13:06', 'rule', 15, 'execute', 'executed the rule'),
(317, '2013-04-19 06:13:27', 'rule', 15, 'execute', 'executed the rule'),
(318, '2013-04-19 06:13:49', 'rule', 12, 'execute', 'executed the rule'),
(319, '2013-04-19 06:13:49', 'rule', 18, 'execute', 'executed the rule'),
(320, '2013-04-19 06:14:10', 'rule', 15, 'execute', 'executed the rule'),
(321, '2013-04-19 06:16:28', 'rule', 12, 'execute', 'executed the rule'),
(322, '2013-04-19 06:16:28', 'rule', 18, 'execute', 'executed the rule'),
(323, '2013-04-19 06:17:14', 'rule', 12, 'execute', 'executed the rule'),
(324, '2013-04-19 06:17:14', 'rule', 18, 'execute', 'executed the rule'),
(325, '2013-04-19 06:18:33', 'device', 3, 'update', 'ip address updated'),
(326, '2013-04-19 06:18:35', 'device', 3, 'update', 'ip address updated'),
(327, '2013-04-19 06:18:36', 'device', 3, 'update', 'availability info changed'),
(328, '2013-04-19 06:18:47', 'rule', 15, 'execute', 'executed the rule'),
(329, '2013-04-19 06:19:09', 'rule', 12, 'execute', 'executed the rule'),
(330, '2013-04-19 06:19:09', 'rule', 18, 'execute', 'executed the rule'),
(331, '2013-04-19 06:20:54', 'device', 3, 'update', 'ip address updated'),
(332, '2013-04-19 06:20:54', 'device', 3, 'update', 'availability info changed'),
(333, '2013-04-19 06:21:53', 'rule', 12, 'execute', 'executed the rule'),
(334, '2013-04-19 06:21:54', 'rule', 18, 'execute', 'executed the rule'),
(335, '2013-04-19 06:24:17', 'rule', 15, 'execute', 'executed the rule'),
(336, '2013-04-19 06:24:18', 'rule', 13, 'execute', 'executed the rule'),
(337, '2013-04-19 06:24:19', 'rule', 16, 'execute', 'executed the rule'),
(338, '2013-04-19 06:25:23', 'rule', 12, 'execute', 'executed the rule'),
(339, '2013-04-19 06:25:24', 'rule', 18, 'execute', 'executed the rule'),
(340, '2013-04-19 06:25:54', 'rule', 15, 'execute', 'executed the rule'),
(341, '2013-04-19 06:27:55', 'device', 3, 'update', 'ip address updated'),
(342, '2013-04-19 06:27:55', 'device', 3, 'update', 'availability info changed'),
(343, '2013-04-19 06:28:11', 'device', 3, 'update', 'ip address updated'),
(344, '2013-04-19 06:28:12', 'device', 3, 'update', 'availability info changed'),
(345, '2013-04-19 06:28:16', 'device', 3, 'update', 'ip address updated'),
(346, '2013-04-19 06:28:16', 'device', 3, 'update', 'availability info changed'),
(347, '2013-04-19 06:30:12', 'device', 3, 'update', 'ip address updated'),
(348, '2013-04-19 06:30:12', 'device', 3, 'update', 'availability info changed'),
(349, '2013-04-19 06:30:30', 'device', 3, 'update', 'ip address updated'),
(350, '2013-04-19 06:30:30', 'device', 3, 'update', 'availability info changed'),
(351, '2013-04-19 06:32:36', 'device', 3, 'update', 'ip address updated'),
(352, '2013-04-19 06:32:36', 'device', 3, 'update', 'availability info changed'),
(353, '2013-04-19 06:33:12', 'device', 3, 'update', 'ip address updated'),
(354, '2013-04-19 06:33:13', 'device', 3, 'update', 'availability info changed'),
(355, '2013-04-19 11:18:13', 'rule', 15, 'execute', 'executed the rule'),
(356, '2013-04-19 11:18:34', 'rule', 15, 'execute', 'executed the rule'),
(357, '2013-04-19 18:23:26', 'rule', 24, 'insert', 'new rule created'),
(358, '2013-04-19 18:23:27', 'rule', 25, 'insert', 'new rule created');

-- --------------------------------------------------------

--
-- Table structure for table `output`
--

CREATE TABLE IF NOT EXISTS `output` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `icon_url` varchar(100) NOT NULL,
  `feature_id` int(8) NOT NULL COMMENT 'foreign key',
  `description` varchar(100) NOT NULL,
  `value` varchar(100) NOT NULL COMMENT 'numeric, string both',
  PRIMARY KEY (`id`),
  KEY `feature_id_refs` (`feature_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `output`
--

INSERT INTO `output` (`id`, `icon_url`, `feature_id`, `description`, `value`) VALUES
(1, 'img/icons/output/light_on.png', 3, 'Turn On', 'lights_on'),
(2, 'img/icons/output/light_off.png', 3, 'Turn Off', 'lights_off'),
(5, 'img/icons/output/screen_up.png', 4, 'Screen Up', 'screen_up'),
(6, 'img/icons/output/screen_down.png', 4, 'Screen Down', 'screen_down'),
(7, 'img/icons/output/projector_turn_on.png', 5, 'Turn Off', 'projector_off'),
(8, 'img/icons/output/projector_turn_off.png', 5, 'Turn On', 'projector_on'),
(14, 'img/icons/device/display.png', 5, 'Source Button', 'projector_source'),
(17, 'img/icons/device/display.png', 5, 'Set Video Source', 'projector_videosource'),
(18, 'img/icons/device/display.png', 5, 'Set SVideo Source', 'projector_svideosource'),
(19, 'img/icons/device/display.png', 5, 'Set Computer Source', 'projector_computersource'),
(21, 'img/icons/output/laptop_next_slide.png', 6, 'Next Slide', 'next_slide'),
(22, 'img/icons/output/laptop_previous_slide.png', 6, 'Previous Slide', 'previous_slide');

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE IF NOT EXISTS `people` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `role` int(1) NOT NULL COMMENT 'Programmer(0), User(1), Both(2)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`id`, `name`, `role`) VALUES
(1, 'programmer1', 0),
(2, 'user1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rule`
--

CREATE TABLE IF NOT EXISTS `rule` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT 'rule id',
  `input_id` int(8) NOT NULL,
  `output_id` int(8) NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rule_before` int(8) DEFAULT NULL,
  `rule_after` int(8) DEFAULT NULL,
  `calendar_id` int(8) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL,
  `loc_id` int(8) NOT NULL,
  `programmer` int(8) NOT NULL COMMENT 'people_id',
  `user` int(8) NOT NULL COMMENT 'people_id',
  PRIMARY KEY (`id`),
  KEY `fk_output` (`output_id`),
  KEY `fk_input` (`input_id`),
  KEY `fk_calendar` (`calendar_id`),
  KEY `fk_programmer` (`programmer`),
  KEY `fk_user` (`user`),
  KEY `fk_location` (`loc_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `rule`
--

INSERT INTO `rule` (`id`, `input_id`, `output_id`, `time_created`, `rule_before`, `rule_after`, `calendar_id`, `enabled`, `loc_id`, `programmer`, `user`) VALUES
(12, 1, 1, '2013-04-18 20:40:40', NULL, NULL, NULL, 1, 1, 1, 2),
(13, 13, 8, '2013-04-18 20:58:31', NULL, NULL, NULL, 1, 1, 1, 2);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feature`
--
ALTER TABLE `feature`
  ADD CONSTRAINT `device_id_refs` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`);

--
-- Constraints for table `input`
--
ALTER TABLE `input`
  ADD CONSTRAINT `feature_id_refs` FOREIGN KEY (`feature_id`) REFERENCES `feature` (`id`);

--
-- Constraints for table `output`
--
ALTER TABLE `output`
  ADD CONSTRAINT `output_ibfk_1` FOREIGN KEY (`feature_id`) REFERENCES `feature` (`id`);

--
-- Constraints for table `rule`
--
ALTER TABLE `rule`
  ADD CONSTRAINT `fk_calendar` FOREIGN KEY (`calendar_id`) REFERENCES `calendar` (`id`),
  ADD CONSTRAINT `fk_input` FOREIGN KEY (`input_id`) REFERENCES `input` (`id`),
  ADD CONSTRAINT `fk_location` FOREIGN KEY (`loc_id`) REFERENCES `location` (`id`),
  ADD CONSTRAINT `fk_output` FOREIGN KEY (`output_id`) REFERENCES `output` (`id`),
  ADD CONSTRAINT `fk_programmer` FOREIGN KEY (`programmer`) REFERENCES `people` (`id`),
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user`) REFERENCES `people` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
