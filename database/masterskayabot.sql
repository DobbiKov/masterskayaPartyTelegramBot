-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Фев 20 2021 г., 17:18
-- Версия сервера: 5.5.25
-- Версия PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `masterskayabot`
--

-- --------------------------------------------------------

--
-- Структура таблицы `accounts`
--

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `is_in` int(2) NOT NULL DEFAULT '0',
  `telegramid` int(12) NOT NULL,
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `accounts`
--

INSERT INTO `accounts` (`id`, `is_in`, `telegramid`, `first_name`, `last_name`) VALUES
(3, 0, 716720991, 'Роман', 'Запотоцкий'),
(4, 0, 1129340099, 'утка', '');

-- --------------------------------------------------------

--
-- Структура таблицы `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `partyid` int(9) NOT NULL,
  `type` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `members`
--

INSERT INTO `members` (`id`, `partyid`, `type`, `name`) VALUES
(1, 1, 'картой', 'Роман Запотоцкий'),
(2, 2, 'наличка', 'Роман Запотоцкий'),
(3, 4, 'наличка', 'утка undefined');

-- --------------------------------------------------------

--
-- Структура таблицы `registers`
--

CREATE TABLE IF NOT EXISTS `registers` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `partyid` int(9) NOT NULL,
  `type` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `registers`
--

INSERT INTO `registers` (`id`, `partyid`, `type`, `name`) VALUES
(3, 0, 'наличка', 'утка undefined');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
