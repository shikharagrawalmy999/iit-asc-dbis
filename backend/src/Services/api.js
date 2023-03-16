var bodyParser = require('body-parser');
const e = require('cors');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
const database = require('./database.js');
var session;

const createRestApi = app => {

    async function auth_user (req,res,next){
        if(req.session.userid){
            next();
        }else{
            res.status(403).json({exit:false});
        }
    }

    app.post('/exist',urlencodedParser,(req,res)=>{
        if(req.session.userid){
            res.json({value:1,inst:req.session.inst})
        }else{
            res.json({value:0})
        }
    })

    app.post('/IIS',urlencodedParser,auth_user,(req,res)=>{
        res.json({value:req.session.inst})
    })

    app.post('/logout',urlencodedParser,auth_user,(req,res) => {
        req.session.destroy();
     });

    app.post('/login', urlencodedParser, function (req, res) {
        database.authenticate(req.body.userid,req.body.password).then(
            function(value){
                if(value){
                    session=req.session;
                    session.userid=req.body.userid;
                    (async () => {
                        var x = await database.isInstructor(req.body.userid);
                        console.log(x);
                        session.inst = x
                        res.json({value:1,inst:x});
                        })();
                }
                else{
                    res.json({value:0,inst:0});
                };
            },
            function(error){
                res.json({value:0,inst:0});
            } 
        ).catch(err=>console.log(err)); 
     });

     app.post('/home',urlencodedParser,auth_user, function (req, res) {
        (async () => {
            var x = await database.getUserInfo(req.body.userid);
            res.json(x);
          })();
     });

     app.post('/hStudent',urlencodedParser,auth_user, function (req, res) {
        (async () => {
            var x = await database.getUserInfo(req.session.userid);
            res.json(x);
          })();
     });

    app.post("/hInstructor",urlencodedParser,auth_user, async (req, res) => {
        try {
           const instructor_id =  req.session.userid;
           const curr = await database.getCurrentSemesterYear();
            const insRes = await database.getInstructorInfo(instructor_id, curr.semester, curr.year);
            res.json(insRes);
        } catch (err) {
            console.error(err.message);
        }
    });

    app.post('/homeCourseps',urlencodedParser,auth_user,function (req, res) {
        (async () => {
            var x = await database.getAllUserCourses(req.body.userid);
            res.json(x);
          })();
     });

     app.post('/homeCourse',urlencodedParser,auth_user,function (req, res) {
        (async () => {
            var x = await database.getAllUserCourses(req.session.userid);
            res.json(x);
          })();
     });
    
    app.post("/course/:course_id",urlencodedParser,auth_user, async (req, res) => {
        try {
          const course_id  = req.body.course_id;
          const curr = await database.getCurrentSemesterYear();
          const courseRes = await database.getCurrentCourseInfo(course_id, curr.semester, curr.year);
          res.json(courseRes);
        } catch (err) {
          console.error(err.message);
        }
      });

    app.post("/instructor/:instructor_id",urlencodedParser,auth_user, async (req, res) => {
    try {
       const instructor_id =  req.body.instructor_id;
       const curr = await database.getCurrentSemesterYear();
        const insRes = await database.getInstructorInfo(instructor_id, curr.semester, curr.year);
        res.json(insRes);
    } catch (err) {
        console.error(err.message);
    }
    });

    app.post("/allinstructors",urlencodedParser,auth_user, async (req, res) => {
        try {
            const insRes = await database.getInstructors();
            res.json(insRes);
        } catch (err) {
            console.error(err.message);
        }
    });

    app.post("/allcurrentcourses",urlencodedParser,auth_user, async (req, res) => {
        try {
            const curr = await database.getCurrentSemesterYear();
            const courseRes = await database.getCurrentCourses(curr.semester, curr.year);
            res.json(courseRes);
        } catch (err) {
            console.error(err.message);
        }
    });

    app.post("/alldept",urlencodedParser,auth_user, async (req, res) => {
        try {
            const courseRes = await database.getAlldeptname();
            res.json(courseRes);
        } catch (err) {
            console.error(err.message);
        }
    });

    app.post("/alldeptcourses",urlencodedParser,auth_user, async (req, res) => {
        const dept_id =  req.body.dept_id;
        try {
            const courseRes = await database.getDepartmentCourses(dept_id);
            res.json(courseRes);
        } catch (err) {
            console.error(err.message);
        }
    });


    app.post("/alldeptcurcourses",urlencodedParser,auth_user, async (req, res) => {
        const dept_id =  req.body.dept_id;
        try {
            const curr = await database.getCurrentSemesterYear();
            const courseRes = await database.getCurrentDepartmentCourses(dept_id,curr.semester, curr.year);
            res.json(courseRes);
        } catch (err) {
            console.error(err.message);
        }
    });

    app.post("/register",urlencodedParser,auth_user, async (req, res) => {
        try {
            const prereqRes = await database.verifyPrereqForUser(req.session.userid, req.body.course_id, req.body.sec_id);
            res.json(prereqRes);
        } catch (err) {
            console.error(err.message);
        }
    });

    app.post("/sections",urlencodedParser,auth_user, async (req, res) => {
        try {
            const secRes = await database.getSectionForCourse(req.body.course_id);
            res.json(secRes);
        } catch (err) {
            console.error(err.message);
        }
    });

    app.post("/drop",urlencodedParser,auth_user, async(req, res)=>{
        try {
            const dropRes = await database.dropCourse(req.session.userid, req.body.course_id);
            console.log(req.body,dropRes)
            res.json(dropRes);
        } catch (error) {
            console.log(error.message);
        }
    });

    app.post("/currentsemyear",urlencodedParser,auth_user, async(req, res)=>{
        try {
            const resp = await database.getCurrentSemesterYear();
            res.json(resp);
        } catch (error) {
            console.log(error.message);
        }
    });    

    app.post("/currusersemyears",urlencodedParser,auth_user, async(req, res)=>{
        try {
            const curRes = await database.getSemYearsForUser(req.session.userid);
            res.json(curRes);
        } catch (error) {
            console.log(error.message);
        }
    });

    app.post("/currusersemyearsps",urlencodedParser,auth_user, async(req, res)=>{
        try {
            const curRes = await database.getSemYearsForUser(req.body.userid);
            res.json(curRes);
        } catch (error) {
            console.log(error.message);
        }
    });


    app.post("/getstudents",urlencodedParser,auth_user, async(req, res)=>{
        try {
            const curRes = await database.getAllStudents();
            res.json(curRes);
        } catch (error) {
            console.log(error.message);
        }
    });
  
};

module.exports = {
    createRestApi
};