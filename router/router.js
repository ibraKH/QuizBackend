const express = require('express');
const pool = require('../connection/database');
const multer = require('multer');
const upload = multer();
const router = express.Router();


router.post("/results", upload.none() ,(req,res) => {
    const name = req.body.name;
    const answers = req.body.result;

    let points = 0;
    pool.query("SELECT correct FROM quiz;" , (err, result) => {
        if(err){
            console.log(err);
        }
        for(let i = 0; i < answers.length; i++){
            if(answers[i] == result.rows[i].correct){
                points++;
            }
        }

        return pool.query("INSERT INTO leaderboard (name,points) VALUES ($1,$2);", [name,points], (err) => {
            if(err){
                console.log(err);
            }


            return res.send([name, points]);
        })
    })
});
router.get("/quizes", (req,res) => {
    pool.query("SELECT q,a,b,c,d FROM quiz;", (err, result) => {
        if(err){
            console.log(err);
        }

        return res.send(result.rows);
    })
});

module.exports = router;