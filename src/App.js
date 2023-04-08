import { Route, Routes } from "react-router-dom";
import { Projects } from "./Projects";
import './b0.css'
import { Table } from "./Table";
import { CreateProject } from "./CreateProject";
import { ProjectEdit } from "./ProjectEdit";
import { CreateHouse } from "./CreateHouse";
import { HouseEdit } from "./HouseEdit";
import { SectionEdit } from "./SectionEdit";
import { NewSection } from "./NewSection";

function App() {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-md">
              <a className="navbar-brand" href="/">Шахматки</a>
          </div>
      </nav>
      <Routes>
        <Route path="/" element={<Projects />} />

        <Route path="/table/:projectId" element={<Table />} />
        <Route path="/projectEdit/:projectId" element={<ProjectEdit />} />
        <Route path="/projectEdit/:projectId/newHouse" element={<CreateHouse />} /> 
        <Route path="/projectCreate" element={<CreateProject />} />
        <Route path="/houseEdit/:projectId/:houseId" element={<HouseEdit />} />
        <Route path="/houseEdit/:projectId/:houseId/newSection" element={<NewSection />} />
        <Route path="/sectionEdit/:projectId/:houseId/:sectionId" element={<SectionEdit />} />



      </Routes>
    </>
  );
}

export default App;
