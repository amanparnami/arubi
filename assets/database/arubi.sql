-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 14, 2013 at 02:55 AM
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
  `id` int(8) NOT NULL,
  `time_begin` int(11) NOT NULL,
  `time_end` int(11) NOT NULL,
  `date_begin` int(11) NOT NULL,
  `date_end` int(11) NOT NULL,
  `day_begin` int(11) NOT NULL,
  `day_end` int(11) NOT NULL,
  `repeat_freq` int(11) NOT NULL,
  `repeat_day` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `device`
--

CREATE TABLE IF NOT EXISTS `device` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `type` int(1) NOT NULL COMMENT 'input(1)/output(0)/both(2)',
  `latitude` decimal(10,7) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  `altitude` decimal(10,7) NOT NULL,
  `available` tinyint(1) NOT NULL,
  `sym_location` varchar(30) NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `device`
--

INSERT INTO `device` (`id`, `name`, `description`, `type`, `latitude`, `longitude`, `altitude`, `available`, `sym_location`) VALUES
(1, 'Kinect', 'Microsoft Kinect Depth Sensor', 1, '123.0000000', '123.0000000', '123.0000000', 0, 'Classroom'),
(3, 'Projector 1', 'Projector Control Using Infrared', 0, '125.0000000', '125.0000000', '125.0000000', 0, 'Classroom'),
(4, 'Projector 2', 'Projector Control Using Infrared', 0, '127.0000000', '127.0000000', '127.0000000', 0, 'Classroom'),
(5, 'Lights', 'Light Switch', 0, '129.0000000', '129.0000000', '129.0000000', 0, 'Classroom'),
(6, 'Projector 1 Screen', 'Control the projector screen', 0, '131.0000000', '131.0000000', '131.0000000', 0, 'Classroom');

-- --------------------------------------------------------

--
-- Table structure for table `feature`
--

CREATE TABLE IF NOT EXISTS `feature` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `device_id` int(8) NOT NULL,
  `title` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `feature_type` varchar(30) NOT NULL COMMENT 'speech, gesture, motion',
  `spec_type` tinyint(1) NOT NULL COMMENT 'input(1)/output(0)',
  PRIMARY KEY (`id`),
  KEY `device_id_refs` (`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `input`
--

CREATE TABLE IF NOT EXISTS `input` (
  `id` int(8) NOT NULL,
  `feature_id` int(8) NOT NULL COMMENT 'foreign key',
  `description` varchar(100) NOT NULL,
  `value` varchar(100) NOT NULL COMMENT 'numeric, string both',
  PRIMARY KEY (`id`),
  KEY `feature_id_refs` (`feature_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE IF NOT EXISTS `location` (
  `id` int(8) NOT NULL,
  `name` varchar(50) NOT NULL COMMENT 'Room level information. For example, inSpace Lab TSRB',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE IF NOT EXISTS `log` (
  `id` int(8) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Automatically updated whenever you change the row',
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `output`
--

CREATE TABLE IF NOT EXISTS `output` (
  `id` int(8) NOT NULL,
  `feature_id` int(8) NOT NULL COMMENT 'foreign key',
  `description` varchar(100) NOT NULL,
  `value` varchar(100) NOT NULL COMMENT 'numeric, string both',
  PRIMARY KEY (`id`),
  KEY `feature_id_refs` (`feature_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE IF NOT EXISTS `people` (
  `id` int(8) NOT NULL,
  `name` varchar(30) NOT NULL,
  `role` int(1) NOT NULL COMMENT 'Programmer(0),User(1), Both(2)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `calendar_id` int(8) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
  ADD CONSTRAINT `fk_location` FOREIGN KEY (`loc_id`) REFERENCES `location` (`id`),
  ADD CONSTRAINT `fk_calendar` FOREIGN KEY (`calendar_id`) REFERENCES `calendar` (`id`),
  ADD CONSTRAINT `fk_input` FOREIGN KEY (`input_id`) REFERENCES `input` (`id`),
  ADD CONSTRAINT `fk_output` FOREIGN KEY (`output_id`) REFERENCES `output` (`id`),
  ADD CONSTRAINT `fk_programmer` FOREIGN KEY (`programmer`) REFERENCES `people` (`id`),
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user`) REFERENCES `people` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
