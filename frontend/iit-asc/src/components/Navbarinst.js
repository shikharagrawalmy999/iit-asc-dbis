import { NavLink } from 'react-router-dom'
import "./css/Navbar.css"

export const Navbarinst = () => {


  return (

    // </nav>
    <div align="center" class="navigation">
    <nav class="nav-type1">
      <ul class="nav-type">

        <li target="_blank" class="nav-link">
            <NavLink to='/inst_home' >Home</NavLink>
        </li>
        <li target="_blank" class="active2">
              <NavLink to='/course/running' class="nav-link" ><i class="fas fa-tachometer-alt"></i>Running Courses</NavLink>
        </li>

          <li target="_blank" class="active2">
            <NavLink to='/instructor' class="nav-link" ><i class="fas fa-tachometer-alt"></i>Instructors</NavLink>
          </li>

          <li target="_blank" class="active2">
            <NavLink to='/department' class="nav-link" ><i class="fas fa-tachometer-alt"></i>Departments</NavLink>
          </li>
        <li target="_blank" class="active1">
             <NavLink to='/students' class="nav-link" ><i class="fas fa-tachometer-alt"></i>All Students</NavLink>
        </li>
  
 
      </ul>
    </nav>
  </div>
  )
}
