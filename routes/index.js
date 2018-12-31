var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host : "eu-cdbr-west-02.cleardb.net",
  user : "bda3ab0092b9fe",
  password : "c903136f",
  database : "heroku_30631074981c2d1"
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cryeate', function (req,res){
  connection.query('DROP TABLE user_courses', function(r,re){
    connection.query('CREATE TABLE user_courses(id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, course_id INT)', function(err, results){
      if (err){
        return res.json({message: err.message});
      }
      else{
        connection.query('INSERT INTO user_courses(user_id, course_id) VALUES(1, 3)');
        console.log('created user_courses table')
      }
    });
  })



  connection.query('DROP TABLE courses', function(r,re){
    connection.query('CREATE TABLE courses(id INT, main_course_name VARCHAR(255), course_name VARCHAR(255), link VARCHAR(255), description VARCHAR(255))', function(err, results){
      if(err){
        return res.json({message: err.message});
      }
      else{
        let query = "INSERT INTO courses VALUES(?,?,?,?,?)"
        connection.query(query,[1, "Algorithm and Programming", "[Algorithm Session 01] - IDE and I/O", "https://www.youtube.com/embed/YvjMya_9RcA", "Topics: - Typing code with syntax error - Compile, run, and debug program - Knowing data type and variable assignment - Creating a program using I/O syntax"]);
        connection.query(query,[2, "Algorithm and Programming", "[Algorithm Session 02] - Arithmatic Operation", "https://www.youtube.com/embed/O_E_Jzje6IM", "Topic - Creating a program using arithmatic operation"]);
        connection.query(query,[3, "Algorithm and Programming", "[Algorithm Session 03] - Repetition", "https://www.youtube.com/embed/GJ9vQ-CMb9M", "Topic: - Create a program using repetition structure control"]);
        connection.query(query,[4, "Algorithm and Programming", "[Algorithm Session 04] - Selection", "https://www.youtube.com/embed/ETPxMBZCmng", "Topic - Create a program using selection control"]);
        connection.query(query,[5, "Algorithm and Programming", "[Algorithm Session 05] - Array", "https://www.youtube.com/embed/RJkY-5hJq3k", "Topics: - Creating a modular program using array 1D - Creating a modular program using array 2D"]);
        console.log('created course table');
      }
      return res.json({message: "success"});
    })
  })
})

router.get('/courses', function(req,res){
  var query = 'SELECT id, main_course_name, course_name, description FROM courses'
  connection.query(query, function(err,results){
    if(err){
      return res.json({message: err.message});
    }
    else{
      return res.json(results);
    }
  });
})

router.post('/user_courses', function(req,res){
  var user_id=req.body.userid;

  connection.query('SELECT courses.id, main_course_name, course_name, description FROM user_courses JOIN courses ON user_courses.course_id = courses.id WHERE user_id=?', [user_id], function(err,results){
    if(err){
      return res.json({
        message: err.message
      })
    }
    else{
        return res.json({
        user_id : user_id,
        courses : results
      })
    }
  })
})

router.post('/detail_courses', function(req,res){
  var course_id = req.body.course_id;
  var query = 'SELECT * FROM courses WHERE id=?'
  connection.query(query, [course_id], function(err,results){
    if(err){
      return res.json({message: err.message});
    }
    else{
      return res.json(results[0]);
    }
  });
})

router.post('/assign_course', function(req,res){
  var course_id = req.body.course_id;
  var user_id = req.body.user_id;
  connection.query('INSERT INTO user_courses(user_id, course_id) VALUES (?,?)', [user_id,course_id], function(err,results){
    if(err){
      return res.json({message:err.message})
    }
    else{
      return res.json({
        user_id : user_id,
        course_id : course_id,
        status : "success"
      })
    }
  })
})

module.exports = router;
