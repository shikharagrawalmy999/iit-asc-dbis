import { useNavigate,useLocation} from 'react-router-dom'
import { useEffect, useState  } from 'react'

import "./css/main.css"
import { Boottable } from './Boottable';
import "./css/button.css"

export const Studetail = (instid) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [user_info,setuser_info] = useState([]);

  useEffect(() => {

    fetch('http://localhost:5001/hStudent', {
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
          setuser_info(dat);
        }).catch((err) => {
          console.log(err.message);
        });
      }
   });

  }, [setuser_info,location,navigate]);


  return(
    <div>
    <div align="center">
    <div class="caption">Student Information</div>
    <table class='content-table'>
      <thead>
      <tr className='table-dark'>
        <th scope='col'>ID</th>
        <th scope='col'>Name</th>
        <th scope='col'>Dept</th>
        <th scope='col'>Tot_cred</th>
      </tr>
      </thead>
      <tbody>
          <tr >
            <td>{user_info.id}</td>
            <td>{user_info.name}</td>
            <td>{user_info.dept_name}</td>
            <td>{user_info.tot_cred}</td>
          </tr>
          </tbody>   
    </table>
    </div>
    <div align="center">
    <Boottable/>
    </div>
  </div>
  )
}
