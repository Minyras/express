const express = require("express");
const mysql = require("mysql2");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Tel2234221nu",
  database: "music",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the MySQL database.");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/albums", (req, res) => {
  connection.query(
    "SELECT albums.id, albums.album, albums.year, bands.band FROM albums JOIN bands ON albums.band_id = bands.id",
    (err, data) => {
      if (err) {
        console.error("Error fetching albums:", err.message);
        return res.status(500).json({ error: "Database query failed" });
      }
      res.json(data);
    }
  );
});

app.post("/albums", (req, res) => {
  const { album, year, band_id } = req.body;

  const query = "INSERT INTO albums (album, year, band_id) VALUES (?, ?, ?)";
  connection.query(query, [album, year, band_id], (err, result) => {
    if (err) {
      console.error("Error adding album:", err.message);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(201).json({ album, year, band_id });
  });
});

app.put("/albums/:id", (req, res) => {
  const { id } = req.params;
  const { album, year, band_id } = req.body;

  const query =
    "UPDATE albums SET album = ?, year = ?, band_id = ? WHERE id = ?";
  connection.query(query, [album, year, band_id, id], (err, result) => {
    if (err) {
      console.error("Error updating album:", err.message);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Album not found" });
    }
    res.json({ id, album, year, band_id });
  });
});

app.delete("/albums/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM albums WHERE id = ?";
  connection.query(query, [id], (err, result) => {
    res.json({ message: "Album deleted successfully" });
  });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
