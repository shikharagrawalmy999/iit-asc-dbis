//import { useNavigate } from 'react-router-dom'
import { useEffect, useState  } from 'react'
//import { useAuth } from './auth'
// import "./css/main.css"
import { NavLink } from 'react-router-dom'

// import "./css/i.css"

export const Insts = () => {
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

    fetch('http://localhost:5001/allinstructors', {
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
            <div align="center" style={{}}>
               <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
              <div class="caption"> List of Instructors </div>
            <table class='content-table'>
        <thead>
        <tr>
        <th>Instructor_Id</th>
        <th>Name</th>
        <th>Dept_name</th>
        </tr>
        </thead>
        <tbody>
        {
            rcourse_info.rci && rcourse_info.rci.map((item,i)=>(
                <tr key ={i}>
                <center>
                <td><nav>
                    <NavLink to={`/instructor/${item.id}`}  style={navLinkStyles}>{item.id}</NavLink>
                    </nav></td>
                </center>
                <td>{item.name}</td>
             
               <center>
               <td><nav>
                    <NavLink to={`/department/${item.dept_name}`}  style={navLinkStyles}>{item.dept_name}</NavLink>
                    </nav>
                </td>
               </center>

            </tr>
            ))
        }
        </tbody>
        </table>
        </div>
  )
}
