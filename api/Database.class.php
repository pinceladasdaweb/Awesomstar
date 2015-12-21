<?php
/**
 * Database.class.php
 *
 * Database Class establishes a singleton Database Connection via PDO.
 * Requires that connection data be defined before calling.
 *
 * Use this class to connect to the Database from anywhere in the app.
 * Assigning $pdo = Database::connect() loads the PDO
 * for running queries.
 *
 * For example:
 * $sql = 'Some SQL Statement';
 * $result = $pdo->query($sql);
 * returns a PDO result set.
 *
 * Or,
 * $sql = 'INSERT INTO sometable (name) VALUES (:name)';
 * $stmt = $pdo->prepare($sql);
 * $stmt->bindParam(':name', $name);
 * $stmt->execute();
 * executes a prepared statement to insert $name into 'sometable'.
 *
 * @return PDO Connection
 */

class Database
{
    private static $dbName         = '';
    private static $dbHost         = '';
    private static $dbUsername     = '';
    private static $dbUserPassword = '';

    /**
    * The same PDO will persist from one call to the next.
    */
    private static $cont = null;

    /**
    * Disallow calling the class via new Database.
    */
    public function __construct() {}

    /**
    * Disallow cloning the class.
    */
    public function __clone() {}

    /**
    * Establishes a PDO connection if one doesn't exist,
    * or simply returns the already existing connection.
    * @return PDO A working PDO connection
    */
    public static function connect()
    {
        if (null === self::$cont) {
            try {
                self::$cont =  new PDO('mysql:host='.self::$dbHost.'; dbname='.self::$dbName, self::$dbUsername, self::$dbUserPassword);
            } catch(PDOException $e) {
                die($e->getMessage());
            }
        }
        return self::$cont;
    }

    /**
    * Close the existing database connection.
    */
    public static function disconnect()
    {
        self::$cont = null;
    }
}