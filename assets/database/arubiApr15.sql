-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 15, 2013 at 07:50 PM
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
CREATE DATABASE `arubi` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `arubi`;

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
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `device`
--

INSERT INTO `device` (`id`, `name`, `icon_url`, `description`, `type`, `latitude`, `longitude`, `altitude`, `available`, `sym_location`) VALUES
(1, 'Kinect', 'img/icons/device/kinect.svg', 'Microsoft Kinect Depth Sensor', 1, '123.0000000', '123.0000000', '123.0000000', 0, 'Classroom'),
(3, 'Projector 1', 'img/icons/device/display.svg', 'Projector Control Using Infrared', 0, '125.0000000', '125.0000000', '125.0000000', 0, 'Classroom'),
(4, 'Projector 2', 'img/icons/device/display.svg', 'Projector Control Using Infrared', 0, '127.0000000', '127.0000000', '127.0000000', 0, 'Classroom'),
(5, 'Lights', 'img/icons/device/light.svg', 'Light Switch', 0, '129.0000000', '129.0000000', '129.0000000', 0, 'Classroom'),
(6, 'Projector 1 Screen', 'img/icons/device/screen.svg', 'Control the projector screen', 0, '131.0000000', '131.0000000', '131.0000000', 0, 'Classroom');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `feature`
--

INSERT INTO `feature` (`id`, `device_id`, `title`, `description`, `type`, `io_type`, `icon_url`) VALUES
(1, 1, 'Speech Input', 'Speech input from user like "lights_on"', 'speech', 1, 'img/icons/feature/speech.svg'),
(2, 1, 'Gesture Input', 'Gestures like "zoom_in", "wave_right"', 'gesture', 1, 'img/icons/feature/gesture.svg'),
(3, 5, 'Lights Controller', 'Lights controller that either switches on, off, or changes intensity.', 'light', 0, 'img/icons/feature/light.svg'),
(4, 6, 'Screen', 'Projection Screen', 'screen', 0, 'img/icons/feature/screen.svg'),
(5, 3, 'Projector', 'Projector Control', 'display', 0, 'img/icons/feature/display.svg');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `input`
--

INSERT INTO `input` (`id`, `icon_url`, `feature_id`, `description`, `value`) VALUES
(1, 'img/icons/input/speech.svg', 1, 'Command to switch on lights', 'lights_on'),
(2, 'img/icons/input/speech.svg', 1, 'Command to switch off lights', 'lights_off'),
(3, 'img/icons/input/speech.svg', 1, 'Command to lift projection screen up', 'screen_up'),
(4, 'img/icons/input/speech.svg', 1, 'Command to lift projection screen down', 'screen_down'),
(5, 'img/icons/input/swipe_left.png', 2, 'Gesture for swipe left', 'swipe_left'),
(6, 'img/icons/input/swipe_right.png', 2, 'Gesture to swipe right', 'swipe_right'),
(7, 'img/icons/input/wave_right.png', 2, 'Gesture for wave right', 'wave_right'),
(8, 'img/icons/input/wave_left.png', 2, 'Gesture for wave left', 'wave_left'),
(9, 'img/icons/input/zoom_in.png', 2, 'Gesture to zoom in', 'zoom_in'),
(10, 'img/icons/input/zoom_out.png', 2, 'Gesture to zoom out', 'zoom_out'),
(11, 'img/icons/input/speech.svg', 1, 'Speech input lights dim', 'lights_dim'),
(12, 'img/icons/input/speech.svg', 1, 'Speech input lights bright', 'lights_bright');

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
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `output`
--

INSERT INTO `output` (`id`, `icon_url`, `feature_id`, `description`, `value`) VALUES
(1, 'img/icons/output/light_on.png', 3, 'Lights on', 'lights_level5'),
(2, 'img/icons/output/light_off.png', 3, 'Lights off', 'lights_level0'),
(3, 'img/icons/output/light_intensity_dim.svg', 3, 'Lights dim', 'lights_level2'),
(4, 'img/icons/output/light_intensity_bright.svg', 3, 'Lights bright', 'lights_level5'),
(5, '', 4, 'Screen up', 'screen_up'),
(6, '', 4, 'Screen down', 'screen_down'),
(7, 'img/icons/output/projector_turn_on.svg', 5, 'Projector off', 'projector_turn_off'),
(8, 'img/icons/output/projector_turn_off.svg', 5, 'Projector on', 'projector_turn_on');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `rule`
--

INSERT INTO `rule` (`id`, `input_id`, `output_id`, `time_created`, `rule_before`, `rule_after`, `calendar_id`, `enabled`, `loc_id`, `programmer`, `user`) VALUES
(12, 1, 1, '2013-04-14 17:48:48', NULL, NULL, NULL, 1, 1, 1, 2);

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
