import {Routes, Route} from "react-router-dom"
import { Project } from "./Project/Project";
import "./body0.css"
import { CreateProject } from "./Project/CreateProject";
import ProjectEdit from "./Project/ProjectEdit";
import { CreateHouse } from "./House/CreateHouse";
import HouseEdit from "./House/HouseEdit";
import { SectionEdit } from "./Section/SectionEdit";
import { SectionCreate } from "./Section/SectionCreate";
import { Table } from "./Table/Table";


function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-md">
              <a className="navbar-brand" href="./projects.html">Шахматки</a>
          </div>
      </nav>
      <Routes>
        <Route path="/" element={<Project />} />
        <Route path="/projectCreate" element={<CreateProject />} />
        <Route path="/projectEdit/:projectId" element={<ProjectEdit />} />
        <Route path="/projectEdit/:projectId/newHouse" element={<CreateHouse />} />
        <Route path="houseEdit/:projectId/:houseId" element={<HouseEdit />} />
        <Route path="houseEdit/:projectId/:houseId/newSection" element={<SectionCreate />} />
        <Route path="sectionEdit/:projectId/:houseId/:sectionId" element={<SectionEdit />} />
        <Route path="/table/:projectId" element={<Table />} />
      </Routes>
    </>
  )
}

export default App;
