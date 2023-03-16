import React from "react";
import { useEffect,useState } from "react";
import "./css/main.css"
import "./css/button.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Boottable = ()=>{
  
    const [course_info,setcourse_info] = useState({info:[]});
    const [yearsem,setyearsem] = useState({info:[]});
    const [runningsem,setrunningsem] = useState({});


    const showToastMessage = () => { 

      toast.success(' Course Dropped !', {
        position: toast.POSITION.TOP_RIGHT
      });
    
    };

    useEffect(()=>{
        
        fetch('http://localhost:5001/homeCourse', {
        method: 'POST',   
        headers: {
          'Content-type': 'application/json',
        },
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

          fetch('http://localhost:5001/currusersemyears', {
          method: 'POST',   
          headers: {
            'Content-type': 'application/json',
          },
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


    },[setcourse_info,setyearsem])

    const handledelete = idx => e => {
      showToastMessage();
      const body = {course_id:course_info.info[idx].course_id};
        console.log(body)
        fetch('http://localhost:5001/drop', {
        method: 'POST',   
        headers: {
          'Content-type': 'application/json',
        },
        credentials:'include',
        withCredentials:true,
        body: JSON.stringify(body)
      })
          .then((response) => response.json())
          .then((dat) => {
            console.log(dat)
            var x = [...course_info.info]
            x.splice(idx,1)
            setcourse_info({info:x})
          })
          .catch((err) => {
            console.log(err.message);
          });
    }

    const TableysR = ({item})=>(
      course_info.info.map((item1,idx)=>{
        return (item1.year===item.year && item1.semester===item.semester)?<tr ><td>{item1.course_id}</td><td><button class = "button-29" onClick={handledelete(idx)}>Drop</button></td></tr>:null
      })
)


    const Tableys = ({item})=>(
          course_info.info.map((item1,idx)=>{
            return (item1.year===item.year && item1.semester===item.semester)?<tr ><td >{item1.course_id}</td><td>{item1.grade}</td></tr>:null
          })
    )

    return(
      
    <div>
      <ToastContainer />
      <div class="caption">Academic Course Details</div>
        <div class="subcaption">{runningsem.year} {runningsem.semester} (Running Semester)</div>
        <div>
       <table class='content-table'>
          <thead>
              <tr className='table-dark'>
                <th scope='col' >Course</th>
                <th scope='col'>Drop</th>
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