const express = require("express");
const app = express();
const mysql = require("mysql");
app.use(express.json());
app.use(
    express.urlencoded({
      parameterLimit: 100000,
      limit: "50mb",
      extended: false,
    })
  );
//connect to db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rezazadeh1234",
  database: "nodemysql",
});
db.connect((err) => {
  if (err) console.log(err);
  console.log("mySql connected ...");
});
//create db
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("created dataBase");
  });
});
// create table
app.get("/cereatePostTable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255),body VARCHAR(255) ,PRIMARY KEY (id) )";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("create post table ..");
  });
});
// create first post
app.get("/add", (req, res) => {
  let body = { title: "title two", body: "body two" };
  let sql = "INSERT INTO posts SET ?";
  db.query(sql, body, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("add second post to posts..");
  });
});
// get posts
app.get("/getPost", (req, res) => {
  let sql = "SELECT * FROM posts";
  const poots = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
// get single post
app.get("/getPost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  const poots = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
// update post
app.get("/updatePost/:id", (req, res,next) => {
  try {
    const title = req.body.title
    const body = req.body.body
    let sql = `UPDATE posts SET title = '${title}' WHERE id = ${req.params.id}`;
    const poots = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("post updated");
    });
  } catch (error) {
    console.log(error);
    next(error)
  }
});
// delete post
app.get("/deletePost/:id", (req, res,next) => {
  try {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    const poots = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("post deleted");
    });
  } catch (error) {
    console.log(error);
    next(error)
  }
});
app.listen("3000", () => {
  console.log("server started on port 3000 ...");
});
