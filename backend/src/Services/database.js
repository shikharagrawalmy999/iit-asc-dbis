const bcrypt = require("bcrypt");
const { Pool } = require("pg");
var fs = require('fs')
const data = fs.readFileSync('../config.txt',{encoding:'utf8', flag:'r'});
console.log(JSON.parse(data))
const pool = new Pool(JSON.parse(data));

async function getHashedFromDB(user_id) {
  const values = [user_id];
  try{
      const res = await pool.query(
          "SELECT hashed_password FROM user_password WHERE id=$1",
          values
        );
      console.log("Fetched from DB");
     return res.rows[0].hashed_password;
  }catch (error) {
      throw error;
  }
}

function authenticate(user_id,password) {
  return new Promise((myResolve, myReject)=>{
    (async () => {
      try{
        var x = await getHashedFromDB(user_id);
        bcrypt.compare(password,x,(error,result)=>{
          if(error){
            myReject();
          }
          else{
            myResolve(result);
          }
        });
      }catch{
        myReject();
      }
    })();
  });
}

async function getUserInfo(user_id) {
  const values = [user_id];
  try{
      const res = await pool.query(
          "SELECT * FROM student WHERE id=$1",
          values
        );
      console.log("Fetched User from DB");
     return {name: res.rows[0].name, id: res.rows[0].id, dept_name: res.rows[0].dept_name, tot_cred: res.rows[0].tot_cred};
  }catch (error) {
      console.error(error);
  }
}
async function getUserCourseInfo(user_id, sem, year) {
  const values = [user_id, sem, year];
  try{
     const res = await pool.query(
        "select * from takes where id=$1 and semester=$2 and year=$3;",
        values
     );
     return res;
     
  }catch (error) {
      console.error(error);
  }
}

async function getAllUserCourses(user_id) {
  const values = [user_id];
  try{
    const res = await pool.query(
      // "select distinct semester, year from takes where id=$1 order by year DESC, semester DESC;",
      "select * from (select distinct semester, year from takes where id=$1) as sy(semester,year) order by year desc, (case when semester='Spring' then 1 when semester='Summer' then 2 when semester='Fall' then 3 when semester='Winter' then 4 end);",
      values
    );

    var final = [];

    // for(let i=0;i<res.rowCount;i++){
    //   final[res.rows[i].year]={};
    // }

    for(let i=0;i<res.rowCount;i++){
      var x = await getUserCourseInfo(user_id, res.rows[i].semester, res.rows[i].year);
      for(let j=0;j<x.rowCount;j++){
        var temp = {};
        temp['year']=res.rows[i].year;
        temp['semester']=res.rows[i].semester;
        temp['course_id'] = x.rows[j].course_id;
        temp['sec_id'] = x.rows[j].sec_id;
        temp['grade'] = x.rows[j].grade;
        final.push(temp);
      }
      // (final[res.rows[i].year])[res.rows[i].semester]=x;
    }
    return final;
     
  }catch (error) {
      console.error(error);
  }
}

async function getCurrentCourseInfo(course_id, semester, year) {
  const values = [course_id, semester, year];
  const valuenew=[course_id];
  try{
     const res = await pool.query("select distinct course_id, title, credits from course where course_id=$1;",
     valuenew
     );
     var final = res.rows[0];
     const insRes = await pool.query("select distinct id, name from teaches natural join instructor where course_id=$1 and semester=$2 and year=$3;",
     values
     );
     if(insRes){
      final['isinst']=1;
      final['inst_count']=insRes.rowCount;
      final['insts'] = insRes.rows;
     }else{
      final['isinst']=0;
     }
    const resnew = await pool.query("select distinct prereq.course_id, prereq_id, title from prereq, course where prereq.course_id=$1 and course.course_id=prereq.prereq_id;",
    valuenew
    );
    if(resnew){
      final['ispreq'] =1;
      final['prereq_count']=resnew.rowCount;
      final['prereqs'] = resnew.rows;
    }else{
      final['ispreq'] =0;
    }
    return final;
  }catch (error) {
      console.error(error);
  }
}

async function getInstructorInfo(id, semester, year) {
  console.log("I am the ID: ", id);
  const values = [id];
  const valuesnew = [id, semester, year];
  try{
     const res = await pool.query("select id, name, dept_name from instructor where id=$1",
     values
     );
     var final = res.rows[0];
     const currRes = await pool.query("select distinct course_id, title from teaches natural join course where id=$1 and semester=$2 and year=$3 order by course_id;",
     valuesnew
     );
     final['current_course_count']= currRes.rowCount;
    //  final['currCourses'] = Object.assign({}, currRes.rows);
    final['currCourses'] = currRes.rows;

    const OldCourse = await pool.query(
    // "select course_id, title from teaches natural join course where id=$1 and (semester<>$2 or year<>$3) order by year desc, semester desc;",\
    "select course_id, title from (select course_id, title, semester, year from teaches natural join course where id=$1 and (semester<>$2 or year<>$3)) as sy(course_id,title,semester,year) order by year desc, (case when semester='Spring' then 1 when semester='Summer' then 2 when semester='Fall' then 3 when semester='Winter' then 4 end);",
    valuesnew
    );
    final['old_course_count']=OldCourse.rowCount;
    final['oldCourses'] = OldCourse.rows;
    return final;
  }catch (error) {
      console.error(error);
  }
}

async function getCurrentCourses(sem, year) {
  const values = [sem, year];
  try{
     const res = await pool.query(
        "select distinct course_id, title, dept_name from course natural join section where semester=$1 and year=$2;",
        values
     );
     return res.rows;
     
  }catch (error) {
      console.error(error);
  }
}

async function getInstructors() {
  const values = [];
  try{
     const res = await pool.query(
        "select id, name, dept_name from instructor",
        values
     );
     return res.rows;
     
  }catch (error) {
      console.error(error);
  }
}

async function getDepartmentCourses(dept_name) {
  const values = [dept_name];
  try{
     const res = await pool.query(
        "select distinct course_id, title from course where dept_name=$1;",
        values
     );
     return res.rows;
     
  }catch (error) {
      console.error(error);
  }
}

async function getCurrentDepartmentCourses(dept_name, semester, year) {
  const values = [dept_name, semester, year];
  try{
     const res = await pool.query(
        "select distinct course_id, title from section natural join course where semester=$2 and year=$3 and dept_name=$1;",
        values
     );
     return res.rows;
     
  }catch (error) {
      console.error(error);
  }
}

async function verifyPrereqForUser(user_id, course_id, sec_id) {
  const values = [user_id, course_id];
  const final = await getCurrentSemesterYear();
  const valuesnew = [user_id, course_id, sec_id, final.semester, final.year];
  try {
    const res = await pool.query("(select prereq_id from prereq where prereq.course_id=$2) except (select course_id from takes where takes.id=$1 and grade is not null and grade<>'F');",
      values);
    if (res.rowCount!=0) {
      return false;
    }
    else {
      const checkRes = await pool.query("select * from takes where id=$1 and course_id=$2 and (grade<>'F' or grade is null);",
        values);
      if (checkRes.rowCount == 0) {
        const timeRes = await pool.query("select time_slot_id from section where course_id=$2 and semester=$4 and year=$5 and sec_id=$3 except select time_slot_id from section natural join takes where semester=$4 and year=$5 and id=$1;",
          valuesnew);
        if(timeRes.rowCount!=0){
          const newres = await pool.query("insert into takes(id,course_id,sec_id,semester,year,grade) values($1, $2, $3, $4, $5, null);",
          valuesnew);
          return true;
        }
        else{
          return false;
        }
      }
      else {
        return false;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function getCurrentSemesterYear(){
  values = []
  try {
    const res = await pool.query("select * from reg_dates where start_time<current_timestamp order by start_time desc;",
    values);
    final = {};
    final['semester'] = res.rows[0].semester;
    final['year'] = res.rows[0].year;
    return final;

  } catch (error) {
    console.log(error);
  }
}

async function getSectionForCourse(course_id){
  
  try {
    const final = await getCurrentSemesterYear();
    values = [course_id, final.semester, final.year];
    const res = await pool.query("select distinct sec_id from section where course_id=$1 and semester=$2 and year=$3;",
    values);
    return res.rows;

  } catch (error) {
    console.log(error);
  }
}

async function dropCourse(user_id, course_id ){
  const final = await getCurrentSemesterYear();
  const values = [user_id, course_id,final.semester, final.year];
  try {
    const res = await pool.query("delete from takes where id=$1 and course_id=$2 and semester=$3 and year=$4;",
      values);
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function getSemYearsForUser(user_id){
  const values = [user_id];
  try {
    const res = await pool.query(
      //"select distinct semester, year from takes where id=$1 order by year DESC, semester DESC;",
      "select * from (select distinct semester, year from takes where id=$1) as sy(semester,year) order by year desc, (case when semester='Spring' then 1 when semester='Summer' then 2 when semester='Fall' then 3 when semester='Winter' then 4 end);",
      values
    );
    return res.rows;
  } catch (error) {
    console.log(error);
  }
}

async function isInstructor(id){
  const values = [id];
  console.log(id)
  try {
    const res = await pool.query("select * from instructor where id=$1;",
    values);
    //console.log(id,res)
    if(res.rowCount==0){
      return false;
    }
    else{
      return true;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllStudents(){
  const values = [];
  try {
    const res = await pool.query("select id, name, dept_name from student;",
    values);
    return res.rows;
  } catch (error) {
    console.log(error.message);
  }
}

async function getAlldeptname(){
  const values = [];
  try {
    const res = await pool.query("select * from department;",
    values);
    return res.rows;
  } catch (error) {
    console.log(error.message);
  }
}


module.exports = {
  authenticate,
  getUserInfo,
  getAllUserCourses,
  getCurrentCourseInfo,
  getInstructorInfo,
  getInstructors,
  getCurrentCourses,
  getDepartmentCourses,
  getCurrentDepartmentCourses,
  verifyPrereqForUser,
  getCurrentSemesterYear,
  getSectionForCourse,
  dropCourse,
  getSemYearsForUser,
  isInstructor,
  getAllStudents,
  getAlldeptname
};
