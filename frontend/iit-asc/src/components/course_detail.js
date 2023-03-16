//import { useNavigate } from 'react-router-dom'
import { useEffect, useState  } from 'react'
//import { useAuth } from './auth'
import {useParams} from 'react-router-dom'
//import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom'
import "./css/main.css"
// import background from "./img/pf5.jpeg";


export const Coursedetail = () => {
  //const navigate = useNavigate()
  const params = useParams();
  const courseid = params.course_id;  
  const [rcourse_info,setrcourse_info] = useState({});
   // const [addr,setaddr] =useState("");
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
    var body = {course_id:courseid};
    fetch(`http://localhost:5001/course/${courseid}`, {
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
  }, [courseid]);


  return (
            <div align="center" >
              <div class = "caption" >Course Information</div>
            <table class = 'content-table'>
        <thead>
        <tr>
        <th>Course_ID</th>
        <th>Name</th>
        <th>Credits</th>
        </tr>
        </thead>
        <tbody>
            <tr >
            <td>{rcourse_info.course_id}</td>
            <td>{rcourse_info.title}</td>
            <td> {rcourse_info.credits}</td>
            </tr>
        </tbody>
        </table >
        <div class = "caption" >Course Prereq</div>
        <table class = 'content-table'>
        <thead>
            <tr>
            <th>Course_Id</th>
            <th>name</th>
            </tr>
        </thead>
        <tbody>
        {
            rcourse_info.prereqs && rcourse_info.prereqs.map((item,i)=>(
                <tr key ={i}>
                <td><nav>
                    <NavLink to={`/course/${item.prereq_id}`}  style={navLinkStyles}>{item.prereq_id}</NavLink>
                    </nav></td>
                <td>{item.title}</td>
            </tr>
            ))
        }
        </tbody>
        </table>
        <div class = "caption" >Course Instructor</div>
        <table class = 'content-table'>
        <thead>
            <tr>
            <th>Instructor_Id</th>
            <th>name</th>
            </tr>
        </thead>
        <tbody>
        {
            rcourse_info.insts && rcourse_info.insts.map((item,i)=>(
                <tr key ={i}>
                <td><nav>
                    <NavLink to={`/instructor/${item.id}`}  style={navLinkStyles}>{item.id}</NavLink>
                    </nav></td>
                <td>{item.name}</td>
            </tr>
            ))
        }
        </tbody>
        </table>
        </div>
  )
}
