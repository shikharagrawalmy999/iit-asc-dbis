//import { useNavigate } from 'react-router-dom'
import { useEffect, useState  } from 'react'
//import { useAuth } from './auth'
import "./css/main.css"
import { NavLink } from 'react-router-dom'

import "./css/i.css"

export const Alldeptinfo = () => {
  //const navigate = useNavigate()
  
  const [rcourse_info,setrcourse_info] = useState({rci:[]});
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'underline'
    }
  }
  

  useEffect(() => {
    //Runs only on the first render

    fetch('http://localhost:5001/alldept', {
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
            <div align="center" >
              <div class="caption"> List of Departments </div>
            <table class='content-table'>
        <thead>
        <tr>
        <th>Dept_name</th>
        <th>Building</th>
        </tr>
        </thead>
        <tbody>
        {
            rcourse_info.rci && rcourse_info.rci.map((item,i)=>(
                <tr key ={i}>
                <td><nav>
                    <NavLink to={`/department/${item.dept_name}`}  style={navLinkStyles}>{item.dept_name}</NavLink>
                    </nav></td>
                <td> {item.building}</td>
            </tr>
            ))
        }
        </tbody>
        </table>
        </div>
  )
}
