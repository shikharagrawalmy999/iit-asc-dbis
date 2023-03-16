//import { useNavigate } from 'react-router-dom'
import { useEffect, useState  } from 'react'
//import { useAuth } from './auth'
import "./css/main.css"
import { NavLink } from 'react-router-dom'
// import background from "./img/p6.jpeg";

export const Students = () => {
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

    fetch('http://localhost:5001/getstudents', {
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
        })
        .catch((err) => {
          console.log(err.message);
        });
  }, [setrcourse_info]);

  return (
            <div  align="center">
              <div class="caption"> List of Students </div>
            <table class='content-table'>
        <thead>
        <tr>
        <th>Student_Id</th>
        <th>Name</th>
        <th>Dept_name</th>
        </tr>
        </thead>
        <tbody>
        {
            rcourse_info.rci && rcourse_info.rci.map((item,i)=>(
                <tr key ={i}>
                <td><nav>
                    <NavLink to={`/students/${item.id}`}  style={navLinkStyles}>{item.id}</NavLink>
                    </nav></td>
                <td>{item.name}</td>
                <td> 
                    {item.dept_name}
                </td>
            </tr>
            ))
        }
        </tbody>
        </table>
        </div>
  )
}
