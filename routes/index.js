var express = require('express');
var router = express.Router();

router.get('/Hello', (req, res)=>{
    res.json({response: "Habibi", details: {project_name: "Practice_app", version: "0.0.1", tag: "demo", description: "practice project app ..." } });
});

// if no url matched
// router.get('/*', (req, res) => {
//     return res.json({status: false, message: "wrong url..."});
// });


module.exports = router;