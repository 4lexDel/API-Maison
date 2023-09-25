-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bde_maison
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `proof`
--

DROP TABLE IF EXISTS `proof`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proof` (
  `idProof` int(11) NOT NULL AUTO_INCREMENT,
  `dateProof` datetime NOT NULL,
  `proofImg` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `accepted` tinyint(1) DEFAULT NULL,
  `challengerName` varchar(45) DEFAULT NULL,
  `idHouse` int(11) NOT NULL,
  `idChallenge` int(11) NOT NULL,
  PRIMARY KEY (`idProof`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proof`
--

LOCK TABLES `proof` WRITE;
/*!40000 ALTER TABLE `proof` DISABLE KEYS */;
INSERT INTO `proof` VALUES (40,'2023-09-24 23:21:09','proofImg_1695590469181.png','Desc',0,'username',1,1),(41,'2023-09-24 23:21:10','proofImg_1695590469950.png','Desc',0,'username',1,1),(42,'2023-09-24 23:21:12','proofImg_1695590472492.png','Desc',0,'username',3,1),(43,'2023-09-25 00:13:52','proofImg_1695593632074.png','qsqdvfbgfnj,',0,'zdfegrhtjty',4,14),(44,'2023-09-25 20:35:06','proofImg_1695666905904.png','Oui la preuve',0,'C\'est alex pedeon',1,1),(45,'2023-09-25 20:55:35','proofImg_1695668135746.png','Description',0,'e',1,1),(46,'2023-09-25 20:55:36','proofImg_1695668136274.png','Description',0,'e',1,1),(47,'2023-09-25 20:55:36','proofImg_1695668136449.png','Description',0,'e',1,1),(48,'2023-09-25 20:55:36','proofImg_1695668136632.png','Description',0,'e',1,1),(49,'2023-09-25 20:55:36','proofImg_1695668136795.png','Description',0,'e',1,1),(50,'2023-09-25 20:55:36','proofImg_1695668136916.png','Description',0,'e',1,1),(51,'2023-09-25 20:55:37','proofImg_1695668137055.png','Description',0,'e',1,1),(52,'2023-09-25 20:55:37','proofImg_1695668137201.png','Description',0,'e',1,1),(53,'2023-09-25 20:55:37','proofImg_1695668137328.png','Description',0,'e',1,1),(54,'2023-09-25 20:55:37','proofImg_1695668137470.png','Description',0,'e',1,1),(55,'2023-09-25 20:55:37','proofImg_1695668137640.png','Description',0,'e',1,1),(56,'2023-09-25 20:55:37','proofImg_1695668137803.png','Description',0,'e',1,1),(57,'2023-09-25 20:55:37','proofImg_1695668137954.png','Description',0,'e',1,1),(58,'2023-09-25 20:55:38','proofImg_1695668138113.png','Description',0,'e',1,1),(59,'2023-09-25 20:55:38','proofImg_1695668138361.png','Description',0,'e',1,1),(60,'2023-09-25 20:55:38','proofImg_1695668138766.png','Description',0,'e',1,1),(61,'2023-09-25 20:55:38','proofImg_1695668138901.png','Description',0,'e',1,1),(62,'2023-09-25 20:55:39','proofImg_1695668139030.png','Description',0,'e',1,1);
/*!40000 ALTER TABLE `proof` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-25 21:56:30
