import { useState } from 'react'




import { Route, Routes } from 'react-router-dom'
import CreateProject from './CurrentProjectPage/CreateProject/CreateProject'
import CurrentProjectPage from './CurrentProjectPage/CurrentProjectPage'
import CreateSection from './CurrentProjectPage/HouseEdit/CreateSection/CreateSection'
import HouseEdit from './CurrentProjectPage/HouseEdit/HouseEdit'
import SectionEdit from './CurrentProjectPage/HouseEdit/SectionEdit/SectionEdit'
import NewHouse from './CurrentProjectPage/NewHouse/NewHouse'
import ProjectPage from './ProjectPage/ProjectsPage'
import TablePage from './TablePage/TablePage'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<ProjectPage />} />
        <Route path='/createProject' element={<CreateProject />} />
        <Route path='/projectEdit/:projectId' element={<CurrentProjectPage />} />
        <Route path='/projectEdit/:projectId/newHouse' element={<NewHouse />} />
        <Route path='/houseEdit/:projectId/:houseId' element={<HouseEdit />} />
        <Route path='/houseEdit/:projectId/:houseId/sectionCreate' element={<CreateSection />} />
        <Route path='/sectionEdit/:projectId/:houseId/:sectionId' element={<SectionEdit />} />
        <Route path='table/:projectId' element={<TablePage />} />
      </Routes>


      <script src="/js/bootstrap.esm.min.js"></script>
      <script src="/js/bootstrap.min.js"></script>
      <script src="/js/popper.min.js"></script>
    </>
  )
}

export default App
