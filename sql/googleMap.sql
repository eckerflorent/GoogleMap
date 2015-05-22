-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Jeu 07 Mai 2015 à 19:52
-- Version du serveur :  5.6.21
-- Version de PHP :  5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `googlemap`
--

-- --------------------------------------------------------

--
-- Structure de la table `concerts`
--

CREATE TABLE IF NOT EXISTS `concerts` (
`id_concert` int(11) NOT NULL,
  `nom_concert` varchar(45) NOT NULL,
  `adresse_concert` varchar(45) DEFAULT NULL,
  `image_concert` varchar(45) DEFAULT NULL,
  `prix_concert` int(11) DEFAULT NULL,
  `description_concert` text,
  `date_concert` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `concerts`
--

INSERT INTO `concerts` (`id_concert`, `nom_concert`, `adresse_concert`, `image_concert`, `prix_concert`, `description_concert`, `date_concert`) VALUES
(1, 'BATACLAN', '50 Boulevard Voltaire 75011 Paris', 'deftones.jpg', 35, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non tellus purus. Pellentesque quis cursus arcu. Mauris commodo interdum aliquet. Nullam malesuada libero ac rhoncus ullamcorper. Quisque sit amet turpis ac massa mollis fringilla eu in mi. Nullam dignissim cursus enim vitae consectetur. Praesent consectetur orci in magna placerat, vestibulum imperdiet lorem iaculis. Aenean vel nunc ut turpis tempor mattis vel sed sapien.', '2015-05-30'),
(2, '	PALAIS OMNISPORTS DE PARIS BERCY', '8 Boulevard de Bercy  75012 Paris', 'FOO FIGHTERS .jpg', 26, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non tellus purus. Pellentesque quis cursus arcu. Mauris commodo interdum aliquet. Nullam malesuada libero ac rhoncus ullamcorper. Quisque sit amet turpis ac massa mollis fringilla eu in mi. Nullam dignissim cursus enim vitae consectetur. Praesent consectetur orci in magna placerat, vestibulum imperdiet lorem iaculis. Aenean vel nunc ut turpis tempor mattis vel sed sapien.', '2015-05-29'),
(5, 'JAZZ AU FIL DE L''OISE', '30 rue Daubigny 95430 Auvers sur Oise', 'jazz.jpg', 29, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non tellus purus. Pellentesque quis cursus arcu. Mauris commodo interdum aliquet. Nullam malesuada libero ac rhoncus ullamcorper. Quisque sit amet turpis ac massa mollis fringilla eu in mi. Nullam dignissim cursus enim vitae consectetur. Praesent consectetur orci in magna placerat, vestibulum imperdiet lorem iaculis. Aenean vel nunc ut turpis tempor mattis vel sed sapien.', '2015-06-10');

-- --------------------------------------------------------

--
-- Structure de la table `groupes`
--

CREATE TABLE IF NOT EXISTS `groupes` (
`id_groupe` int(11) NOT NULL,
  `nom_groupe` varchar(45) DEFAULT NULL,
  `genre_groupe` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `groupes`
--

INSERT INTO `groupes` (`id_groupe`, `nom_groupe`, `genre_groupe`) VALUES
(1, 'DEFTONES', 'Hard-rock/Metal'),
(2, 'FOO FIGHTERS', 'Pop-rock/Folk'),
(3, 'BLUR ', 'Pop-rock/Folk'),
(5, 'MARCUS MILLER', 'jazz');

-- --------------------------------------------------------

--
-- Structure de la table `groupes_concerts`
--

CREATE TABLE IF NOT EXISTS `groupes_concerts` (
`id_groupe_concert` int(11) NOT NULL,
  `id_groupe` int(11) NOT NULL,
  `id_concert` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `groupes_concerts`
--

INSERT INTO `groupes_concerts` (`id_groupe_concert`, `id_groupe`, `id_concert`) VALUES
(16, 1, 1),
(17, 2, 2),
(20, 3, 2),
(21, 5, 5);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `concerts`
--
ALTER TABLE `concerts`
 ADD PRIMARY KEY (`id_concert`);

--
-- Index pour la table `groupes`
--
ALTER TABLE `groupes`
 ADD PRIMARY KEY (`id_groupe`);

--
-- Index pour la table `groupes_concerts`
--
ALTER TABLE `groupes_concerts`
 ADD PRIMARY KEY (`id_groupe_concert`,`id_groupe`,`id_concert`), ADD KEY `id_groupe` (`id_groupe`), ADD KEY `id_concert` (`id_concert`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `concerts`
--
ALTER TABLE `concerts`
MODIFY `id_concert` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `groupes`
--
ALTER TABLE `groupes`
MODIFY `id_groupe` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `groupes_concerts`
--
ALTER TABLE `groupes_concerts`
MODIFY `id_groupe_concert` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `groupes_concerts`
--
ALTER TABLE `groupes_concerts`
ADD CONSTRAINT `groupes_concerts_ibfk_1` FOREIGN KEY (`id_groupe`) REFERENCES `groupes` (`id_groupe`),
ADD CONSTRAINT `groupes_concerts_ibfk_2` FOREIGN KEY (`id_concert`) REFERENCES `concerts` (`id_concert`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
