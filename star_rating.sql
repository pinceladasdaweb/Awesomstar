CREATE TABLE IF NOT EXISTS `movies` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `poster` varchar(200) DEFAULT NULL,
    `title` varchar(200) DEFAULT NULL,
    `gender` varchar(100) DEFAULT NULL,
    `time` varchar(20) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `movies` (`id`, `poster`, `title`, `gender`, `time`) VALUES
(1, 'imgs/paddington.jpg', 'Paddington', 'Comedy / Family', '1hr 35 min'),
(2, 'imgs/the-imitation-game.jpg', 'The Imitation Game', 'Biography / Drama', '1hr 54 min'),
(3, 'imgs/sanitarium.jpg', 'Sanitarium', 'Horror / Thriller', '1hr 48 min');
(4, 'imgs/digging-up-the-marrow.jpg', 'Digging Up the Marrow', 'Biography / Drama', '1hr 38 min');
(5, 'imgs/eat.jpg', 'Eat', 'Horror / Drama', '1hr 32 min');
(6, 'imgs/exists.jpg', 'Exists', 'Horror', '1hr 21 min');
(7, 'imgs/the-theatre-bizarre.jpg', 'The Theatre Bizarre', 'Horror', '1hr 54 min');
(8, 'imgs/comet.jpg', 'Comet', 'Comedy / Drama', '1hr 31 min');
(9, 'imgs/inherit-vice.jpg', 'Inherit Vice', 'Crime / Drama', '2hr 28 min');
(10, 'imgs/the-taking-of-deborah-logan.jpg', 'The Taking of Deborah Logan', 'Horror / Thriller', '1hr 30 min');
(11, 'imgs/blood-diner.jpg', 'Blood Diner', 'Comedy / Horror', '1hr 28 min');
(12, 'imgs/under-the-electric-sky.jpg', 'Under the Electric Sky', 'Documentary / Music', '1hr 25 min');

CREATE TABLE IF NOT EXISTS `movies_rating` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `movie` int(11) DEFAULT NULL,
    `rating` int(11) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `movies_rating` (`id`, `movie`, `rating`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 1),
(7, 7, 2),
(8, 8, 3),
(9, 9, 4),
(10, 10, 5),
(11, 11, 5),
(12, 12, 4),
(13, 1, 3),
(14, 2, 2),
(15, 3, 1),
(16, 4, 2),
(17, 5, 3),
(18, 6, 4),
(19, 7, 5),
(20, 8, 5),
(21, 9, 4),
(22, 10, 3),
(23, 11, 2),
(24, 12, 1);