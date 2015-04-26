<?php
require 'Database.class.php';

if (!empty($_POST)) {
    $movie = (int)$_POST['id'];
    $rating = (int)$_POST['rating'];

    if (in_array($rating, [1, 2, 3, 4, 5])) {
        $pdo = Database::connect();

        $exists = $pdo->prepare('SELECT id FROM movies WHERE id = ?');
        $exists->execute(array($movie));

        if ($exists->rowCount() > 0) {
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = 'INSERT INTO movies_rating (movie, rating) values(?, ?)';
            $q = $pdo->prepare($sql);
            $q->execute(array($movie, $rating));

            $status  = 'success';
            $message = 'Amazing, your vote has been successfully recorded.';
        } else {
            $status  = 'error';
            $message = 'Too bad, this film does not exist here.';
        }

        Database::disconnect();
    } else {
        $status  = 'error';
        $message = 'Only allowed votes of 1 to 5';
    }

    $data = array(
        'status'  => $status,
        'message' => $message
    );

    echo json_encode($data);
}