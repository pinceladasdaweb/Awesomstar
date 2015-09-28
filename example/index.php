<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Awesomstar - Awesome (star)rating system</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../build/css/awesomstar.min.css">
    <link rel="stylesheet" type="text/css" href="css/demo.css">
</head>
<body>
    <main class="container">
        <div class="row">
            <h1 class="page-title">Awesomstar</h1>
            <p class="page-subtitle">Awesome (star)rating system with PHP, MySQL and pure JavaScript</p>

            <?php
                require '../api/Database.class.php';
                require '../api/Template.class.php';

                $pdo = Database::connect();
                $getMovies = $pdo->prepare('SELECT movies.id, movies.poster, movies.title, movies.gender, movies.time, AVG(movies_rating.rating) AS rating
                                            FROM movies
                                            LEFT JOIN movies_rating
                                            ON movies.id = movies_rating.movie
                                            GROUP BY movies.id');
                $getMovies->execute();

                if($getMovies->rowCount() > 0) {
                    $movies = new Template("../api/tpl/movies.tpl");

                    while ($row = $getMovies->fetch()) {
                        $average = ceil($row['rating']);

                        $movies->set("id",     $row['id']);
                        $movies->set("poster", $row['poster']);
                        $movies->set("title",  $row['title']);
                        $movies->set("gender", $row['gender']);
                        $movies->set("time",   $row['time']);
                        $movies->set("rating", $average);

                        echo $movies->output();
                    }
                }

                Database::disconnect();
            ?>
        </div>
    </main>

    <script src="../build/js/awesomstar.min.js" type="text/javascript"></script>
    <script>
        new Awesomstar();
    </script>
    </body>
</html>