import React from "react";
import { useEffect,useState } from "react";
import "./css/main.css"
import "./css/button.css"



export const Boottable = (stuid)=>{


    const [course_info,setcourse_info] = useState({info:[]});
    const [yearsem,setyearsem] = useState({info:[]});
    const [runningsem,setrunningsem] = useState({});

    useEffect(()=>{
        
        const body = {userid:stuid.stuid};
        
        fetch('http://localhost:5001/homeCourseps', {
        method: 'POST',   
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials:'include',
        withCredentials:true,
      })
          .then((response) => response.json())
          .then((dat) => {
            setcourse_info({info:dat});
            console.log(dat);
          })
          .catch((err) => {
            console.log(err.message);
          });

          const body1 = {userid:stuid.stuid};
          fetch('http://localhost:5001/currusersemyearsps', {
          method: 'POST',   
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(body1),
          credentials:'include',
        withCredentials:true,
            })
            .then((response) => response.json())
            .then((dat1) => {
              
              console.log(dat1);
                      fetch('http://localhost:5001/currentsemyear', {
                      method: 'POST',   
                      headers: {
                        'Content-type': 'application/json',
                      },
                      body: JSON.stringify(body),
                      credentials:'include',
                      withCredentials:true,
                    })
                        .then((response) => response.json())
                        .then((dat2) => {
                          setrunningsem(dat2)
                          var idx = dat1.findIndex(checkA);
                          function checkA(age) {
                            return (age.year===dat2.year && age.semester===dat2.semester);
                          }
                          dat1.splice(idx,1)
                          console.log(dat1)
                          setyearsem({info:dat1});  
                        })
                        .catch((err) => {
                          console.log(err.message);
                        });
                      
            })
            .catch((err) => {
              console.log(err.message);
            });    


    },[stuid,setcourse_info,setyearsem])


    const TableysR = ({item})=>(
      course_info.info.map((item1,idx)=>{
        return (item1.year===item.year && item1.semester===item.semester)?<tr ><td >{item1.course_id}</td></tr>:null
      })
)


    const Tableys = ({item})=>(
          course_info.info.map((item1,idx)=>{
            return (item1.year===item.year && item1.semester===item.semester)?<tr ><td >{item1.course_id}</td><td>{item1.grade}</td></tr>:null
          })
    )

    return(
      
    <div>
      <div class="caption">Academic Course Details</div>
        <div class="subcaption">{runningsem.year} {runningsem.semester} (Running Semester)</div>
        <div>
       <table class='content-table'>
          <thead>
              <tr className='table-dark'>
                <th scope='col' >Course</th>
                {/* <th scope='col'>Drop</th> */}
              </tr>
              </thead>
           <tbody>
            <TableysR item={runningsem} />
            </tbody>
          </table>
          </div>
      {
        yearsem.info.map((item,i)=>(
          <div>
            <div class="subcaption">{item.year} {item.semester}</div>
          <table  class='content-table'>
              <thead>
                
                <tr className='table-dark'>
                  <th scope='col'>Course</th>
                  <th scope='col'>Grade</th>
                </tr>
                </thead>
            <tbody>
              <Tableys item={item} />
              </tbody>
              </table>
            </div>
        ))
      }
    </div>


    )
}