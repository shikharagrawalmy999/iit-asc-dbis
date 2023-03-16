//import { useNavigate } from 'react-router-dom'
import { useEffect, useState  } from 'react'
//import { useAuth } from './auth'
import "./css/main.css"
import { NavLink } from 'react-router-dom'
//import background from "./img/pf2.jpeg";
import './css/Rcourse.css'

export const Rcourses = () => {
  //const navigate = useNavigate()
  
  const [rcourse_info,setrcourse_info] = useState({rci:[]});
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'underline'
    }
  }
  
//   const myStyle={
//     backgroundImage: `url(${background})`,
//     height:'100%',
//     backgroundSize: 'cover',
//     resizeMode: 'repeat', 
// };

  useEffect(() => {
    //Runs only on the first render

    fetch('http://localhost:5001/allcurrentcourses', {
      method: 'POST',   
      headers: {
        'Content-type': 'application/json',
      },
      credentials:'include',
        withCredentials:true,
    })
        .then((response) => response.json())
        .then((dat) => {
          setrcourse_info({rci:dat});
          console.log("fetchcourses");
        })
        .catch((err) => {
          console.log(err.message);
        });
  }, [setrcourse_info]);

  return (
            <div align="center">
              <div class="caption">Running Course Information</div>
            <table class= 'content-table' >
        <thead>
        <tr>
        <th>Course_Id</th>
        <th>Title</th>
        <th>Dept_name</th>
        </tr>
        </thead>
        <tbody>
        {
            rcourse_info.rci && rcourse_info.rci.map((item,i)=>(
                <tr key ={i}>
                <td>    
                    <nav>
                    <NavLink to={`/course/${item.course_id}`}  style={navLinkStyles}>{item.course_id}</NavLink>
                    </nav>
                </td>
                <td>{item.title}</td>
                <td> <nav>
                    <NavLink to={`/course/running/${item.dept_name}`}  style={navLinkStyles}>{item.dept_name}</NavLink>
                    </nav>
                </td>
            </tr>
            ))
        }
        </tbody>
        </table>
        </div>
  )
}
