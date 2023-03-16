//import { useNavigate } from 'react-router-dom'
import { useEffect, useState  } from 'react'
//import { useAuth } from './auth'
import {useParams} from 'react-router-dom'
import "./css/main.css"
import { NavLink } from 'react-router-dom'
// import background from "./img/pf5.jpeg";

export const Instdetail = () => {
  //const navigate = useNavigate()
  const params = useParams();
  const courseid = params.instructor_id;  
  const [rcourse_info,setrcourse_info] = useState({});
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'underline'
    }
  }
//   const myStyle={
//     backgroundImage: `url(${background})`,
//     height:'100vh',
//     backgroundSize: 'cover',
//     resizeMode: 'repeat', 
// };

  useEffect(() => {
    //Runs only on the first render
    var body = {instructor_id:courseid};
    fetch(`http://localhost:5001/instructor/${courseid}`, {
      method: 'POST',   
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
      params:JSON.stringify(body),
      credentials:'include',
        withCredentials:true,
    })
        .then((response) => response.json())
        .then((dat) => {
            console.log(dat.course_id);
          setrcourse_info(dat);
        })
        .catch((err) => {
          console.log(err.message);
        }); 
  
  }, [setrcourse_info,courseid]);


  return (
        <div align="center" >
        <div class='caption'>About</div>
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
          <nav>
              <NavLink to={`/department/${rcourse_info.dept_name}`}  style={navLinkStyles}>{rcourse_info.dept_name}</NavLink>
          </nav>
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
                <td><nav>
                    <NavLink to={`/course/${item.course_id}`}  style={navLinkStyles}>{item.course_id}</NavLink>
                    </nav></td>
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
  )
}
