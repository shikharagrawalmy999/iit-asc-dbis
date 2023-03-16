import React from 'react'
import { Routes, Route } from 'react-router-dom'

// import { About } from './components/About'

import { NoMatch } from './components/NoMatch'
import { Login } from './components/Login'
import { Profile } from './components/Profile'
import { Landing } from './components/Landing'
import { Rcourses } from './components/Rcourses'
import { Insts } from './components/instructor'
import { Coursedetail } from './components/course_detail'
import { Instdetail } from './components/instructor_detail'
import { Department} from './components/department'
import {Reg} from './components/Registration'
import {Students} from './components/Students'
import {Stuinfo} from './components/Stu_info'
import {Inststulogin} from './components/Inst_or_Stu'
import {Insthdetail} from './components/InstructorHome'
import { Alldeptinfo } from './components/Alldeptinfo'
import {Adepartment} from'./components/Adepartment'
import { Persistentinst } from './components/Persistentinst'
import { Persistentstu } from './components/Persistentstu'

function App() {
  
  return (
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/login' element={<Login />}/>
        <Route element={<Inststulogin/>} >
          <Route element={<Persistentstu/>} >
            <Route path='/home' element={ <Profile /> }/>
            <Route path='/home/registration' element={ <div><Reg/></div>}/>
          </Route>
          <Route element={<Persistentinst/>} >
            <Route path='/inst_home' element={<div><Insthdetail /></div>}/>
            <Route path='/students' element={ <div><Students /></div> }/>
            <Route path='/students/:stu_id' element={ <div><Stuinfo /></div> }/>
          </Route>
          <Route path='/department' element={ <div><Alldeptinfo/></div>}/>
          <Route path='/department/:dept_name' element={ <div><Adepartment/></div> }/>
          <Route path='/course/running' element={ <div><Rcourses/></div> }/>
          <Route path='/course/running/:dept_name' element={ <div><Department/></div>}/>
          <Route path='/course/:course_id' element={ <div><Coursedetail/></div>}/>
          <Route path='/instructor' element={ <Insts/>}/>
          <Route path='/instructor/:instructor_id' element={ <div><Instdetail/></div> }/>
        </Route>
        <Route path='/mbsa' element={ <Insts/>}/>
        <Route path='*' element={ <NoMatch /> }/>
      </Routes>
  )
}

export default App