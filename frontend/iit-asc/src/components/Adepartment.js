//import { useNavigate } from 'react-router-dom'
import { useEffect, useState  } from 'react'
//import { useAuth } from './auth'
import {useParams} from 'react-router-dom'
import "./css/main.css"
import { NavLink } from 'react-router-dom'


export const Adepartment = () => {
  //const navigate = useNavigate()
  const params = useParams();
  const courseid = params.dept_name;  
  const [rcourse_info,setrcourse_info] = useState([]);
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'underline'
    }
  }

  useEffect(() => {
    //Runs only on the first render
    var body = {dept_id:courseid};
    fetch(`http://localhost:5001/alldeptcourses`, {
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
            console.log(dat);
          setrcourse_info(dat);
        })
        .catch((err) => {
          console.log(err.message);
        }); 
  
  }, [setrcourse_info,courseid]);


  return (
        <div align='center'>
            <div class='caption'>
                {`${courseid} Dept. All Courses`}
            </div>
        <table class='content-table'>
        <thead>
            <tr>
            <th>Course_Id</th>
            <th>name</th>
            </tr>
        </thead>
        <tbody>
        {
            rcourse_info && rcourse_info.map((item,i)=>(
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
        </div>
  )
}
