import { useNavigate,useLocation } from 'react-router-dom'
import { useEffect, useState  } from 'react'
//import background from "./img/p6.jpeg";

import "./css/main.css"

export const Insthdetail = (instid) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [rcourse_info,setrcourse_info] = useState({});
  // const myStyle={
  //   backgroundImage: `url(${background})`,
  //   height:'100%',
  //   backgroundSize: 'cover',
  //   resizeMode: 'repeat', 
  // };
  const handleLogout = () => {
    fetch('http://localhost:5001/logout', {
      method: 'POST',   
      headers: {
        'Content-type': 'application/json',
      },
      credentials:'include',
      withCredentials:true,
    })
        .then((response) => response.json())
        .then((dat) => {     
        })
        .catch((err) => {
          console.log(err.message);
        });
    navigate('/')
  }

  useEffect(() => {
    //Runs only on the first render
    fetch(`http://localhost:5001/hInstructor`, {
      method: 'POST',   
      headers: {
        'Content-type': 'application/json',
      },
      credentials:'include',
      withCredentials:true, 
    })
    .then((response) => {
      if(response.status===403){
        console.log("reached 403")
        navigate('/login', {state:{ path: location.pathname }})
      }else{
        response.json().then((dat) => {
          setrcourse_info(dat);
        }).catch((err) => {
          console.log(err.message);
        });
      }
   });
  
  }, [location,navigate,setrcourse_info]);


  return (
          <>
         <div >
         <div class="bnlg"><button  class="button-29" onClick={handleLogout}>Logout</button></div>

        <div align="center">
        <div class='caption'>Instructor Information</div>
        <table class='content-table'>
        <thead>
        <tr>
        <th>Name</th>
        <th>Dept_name</th>
        </tr>
        </thead>
        <tbody>
        <tr >
        <td>{rcourse_info.name}</td>
        <td>
              {rcourse_info.dept_name}
        </td>
        </tr>
        </tbody>
        </table>

        <div class='caption'>Offered Current Semester</div>
        <table class='content-table'>
        <thead>
            <tr>
            <th>Course_Id</th>
            <th>name</th>
            </tr>
        </thead>
        <tbody>
        {
            rcourse_info.currCourses && rcourse_info.currCourses.map((item,i)=>(
                <tr key ={i}>
                <td>
                    {item.course_id}
                    </td>
                <td>{item.title}</td>
            </tr>
            ))
        }
        </tbody>
        </table>

        <div class='caption'>Offered till Last Semester</div>
        <table class='content-table'>
        <thead>
            <tr>
            <th>Course_Id</th>
            <th>name</th>
            </tr>
        </thead>
        <tbody>
        {
            rcourse_info.oldCourses && rcourse_info.oldCourses.map((item,i)=>(
                <tr key ={i}>
                <td>{item.course_id}</td>
                <td>{item.title}</td>
            </tr>
            ))
        }
        </tbody>
        </table>
        </div>
        </div>
        </>
  )
}
