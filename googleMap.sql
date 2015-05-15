-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Sam 18 Avril 2015 à 03:16
-- Version du serveur :  5.6.21
-- Version de PHP :  5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `googleMap`
--

-- --------------------------------------------------------

--
-- Structure de la table `albums`
--

CREATE TABLE IF NOT EXISTS `albums` (
`id_album` int(11) NOT NULL,
  `id_groupe` int(11) NOT NULL,
  `image_album` varchar(45) DEFAULT NULL,
  `description_album` text
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `albums`
--

INSERT INTO `albums` (`id_album`, `id_groupe`, `image_album`, `description_album`) VALUES
(1, 1, 'godeHateUsAll.png', 'description de fou sur slayé');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `concerts`
--

INSERT INTO `concerts` (`id_concert`, `nom_concert`, `adresse_concert`, `image_concert`, `prix_concert`, `description_concert`, `date_concert`) VALUES
(1, 'hell festival', '1 place de l''hotel de ville 92600 asnieres', 'hellfest.jpg', 35, '<p>test<p>', '2015-04-20'),
(2, 'down festival', '3 place de l''hotel de ville 95800 Cergy', 'downfestival.jpg', 26, 'festival de malade', '2015-04-18'),
(3, 'up festival', 'Esplanade Claude Fuzier 93140 Bondy', 'upfestival.jpg', 98, 'wouw', '2015-04-28');

-- --------------------------------------------------------

--
-- Structure de la table `groupes`
--

CREATE TABLE IF NOT EXISTS `groupes` (
`id_groupe` int(11) NOT NULL,
  `nom_groupe` varchar(45) DEFAULT NULL,
  `image_groupe` varchar(45) DEFAULT NULL,
  `genre_groupe` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `groupes`
--

INSERT INTO `groupes` (`id_groupe`, `nom_groupe`, `image_groupe`, `genre_groupe`) VALUES
(1, 'slayer', 'slayer.jpg', 'speed metal'),
(2, 'system of a down', 'SystemOfADown.jpg', 'crazy metal'),
(3, 'dew scented', 'dewscented.jpg', 'speed metal'),
(4, 'kalmah', 'kalmah.jpg', 'black metal');

-- --------------------------------------------------------

--
-- Structure de la table `groupes_concerts`
--

CREATE TABLE IF NOT EXISTS `groupes_concerts` (
`id_groupe_concert` int(11) NOT NULL,
  `id_groupe` int(11) NOT NULL,
  `id_concert` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `groupes_concerts`
--

INSERT INTO `groupes_concerts` (`id_groupe_concert`, `id_groupe`, `id_concert`) VALUES
(16, 1, 1),
(17, 2, 2),
(18, 3, 3),
(19, 4, 2);

-- --------------------------------------------------------

--
-- Structure de la table `titres`
--

CREATE TABLE IF NOT EXISTS `titres` (
`id_titre` int(11) NOT NULL,
  `id_album` int(11) NOT NULL,
  `titre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `titres`
--

INSERT INTO `titres` (`id_titre`, `id_album`, `titre`) VALUES
(1, 1, 'gode hat use all titre 1'),
(2, 1, 'gode hate us all titre');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `albums`
--
ALTER TABLE `albums`
 ADD PRIMARY KEY (`id_album`,`id_groupe`), ADD KEY `fk_album_groupe1_idx` (`id_groupe`);

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
-- Index pour la table `titres`
--
ALTER TABLE `titres`
 ADD PRIMARY KEY (`id_titre`,`id_album`), ADD KEY `fk_titre_album1_idx` (`id_album`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `albums`
--
ALTER TABLE `albums`
MODIFY `id_album` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `concerts`
--
ALTER TABLE `concerts`
MODIFY `id_concert` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `groupes`
--
ALTER TABLE `groupes`
MODIFY `id_groupe` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `groupes_concerts`
--
ALTER TABLE `groupes_concerts`
MODIFY `id_groupe_concert` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT pour la table `titres`
--
ALTER TABLE `titres`
MODIFY `id_titre` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `albums`
--
ALTER TABLE `albums`
ADD CONSTRAINT `fk_album_groupe1` FOREIGN KEY (`id_groupe`) REFERENCES `groupes` (`id_groupe`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `groupes_concerts`
--
ALTER TABLE `groupes_concerts`
ADD CONSTRAINT `groupes_concerts_ibfk_1` FOREIGN KEY (`id_groupe`) REFERENCES `groupes` (`id_groupe`),
ADD CONSTRAINT `groupes_concerts_ibfk_2` FOREIGN KEY (`id_concert`) REFERENCES `concerts` (`id_concert`);

--
-- Contraintes pour la table `titres`
--
ALTER TABLE `titres`
ADD CONSTRAINT `fk_titre_album1` FOREIGN KEY (`id_album`) REFERENCES `albums` (`id_album`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
