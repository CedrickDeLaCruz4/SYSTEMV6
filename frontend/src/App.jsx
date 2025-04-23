import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './components/Register';
import AdmissionDashboard from './pages/Adm_Dashboard';
import Login from './components/Login';
import EnrolledDashboard from './pages/Erlm_Dashboard';
import StudentPage from './pages/Erlm_Student_Page';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DepartmentRegistration from './components/DprtmntRegistration';
import DepartmentRoom from './components/DprtmntRoom';
import DepartmentProf from './components/DprtmntProf';
import DepartmentCourse from './components/DprtmntCourse';
import SideBar from './components/Sidebar';
import ProgramTagging from './components/ProgramTagging';
import CourseManagement from './components/CourseManagement';
import CoursePanel from './components/CoursePanel';
import ProgramPanel from './components/ProgramPanel';
import CurriculumPanel from './components/CurriculumPanel';
import { Dashboard } from '@mui/icons-material';
import SectionPanel from './components/SectionPanel';
import DepartmentSection from './components/DepartmentSection';
import AdmForm from './components/adm_form';
import ApplicantForm from './components/Applicant';
import ApplicantRequirement from './components/applicant_requirement';
import StudentProfileForm from './components/StudentProfile';
import EducationalAttainmentForm from './components/EducationalAttainment';
import FamilyBackgroundForm from './components/FamilyBackground';
import YearPanel from './components/YearPanel';
import YearLevelPanel from './components/YearLevelPanel';
import SemesterPanel from './components/SemesterPanel';
import SchoolYearPanel from './components/SchoolYearPanel';
import SchoolYearActivatorPanel from './components/SchoolYearActivatorPanel';
import RequirementsForm from './components/RequirementsForm';
import YearUpdateForm from './components/YearUpdateForm';



function App() {

  //Set the default font of entire app into poppins
  const theme = createTheme({
    typography: {
        fontFamily: "Poppins, sans-serif",
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <header>
          <Navbar />
        </header>
        <article>
          <SideBar />
        </article>
        <main>
          <Routes>
           <Route path="/register" element={<Register />} />
           <Route path="/" element={<Login />}/>
           <Route path="/login" element={<Login />}/>
           <Route path="/dashboard" element={<Dashboard />}/>
           <Route path="/adm_form" element={<AdmForm />}/>
           <Route path="/applicant" element={<ApplicantForm />}/>
           <Route path="/applicant_requirement" element={<ApplicantRequirement />}/>
           <Route path="/room_registration" element={<DepartmentRoom/>}/>
           <Route path="/course_registration" element={<DepartmentCourse/>}/>
           <Route path="/course_management" element={<CourseManagement/>}/>
           <Route path="/program_tagging" element={<ProgramTagging/>}/>
           <Route path="/course_panel" element={<CoursePanel/>}/>
           <Route path="/program_panel" element={<ProgramPanel/>}/>
           <Route path="/department_section_panel" element={<DepartmentSection/>}/>
           <Route path="/curriculum_panel" element={<CurriculumPanel/>}/>
           <Route path="/department_registration" element={<DepartmentRegistration/>}/>
           <Route path="/section_panel" element={<SectionPanel/>}/>
           <Route path="/professor_registration" element={<DepartmentProf/>}/>
           <Route path="/admission_dashboard" element={<AdmissionDashboard />} />
           <Route path="/enrollment_dashboard" element={<EnrolledDashboard />} />
           <Route path="/enrolled_student" element={<StudentPage />} />
           <Route path="/student_profile" element={<StudentProfileForm />} />
           <Route path="/educational_attainment" element={<EducationalAttainmentForm />} />
           <Route path="/family_background" element={<FamilyBackgroundForm />} />
           <Route path="/year_panel" element={<YearPanel />} />
           <Route path="/year_level_panel" element={<YearLevelPanel />} />
           <Route path="/semester_panel" element={<SemesterPanel />} />
           <Route path="/school_year_panel" element={<SchoolYearPanel />} />
           <Route path="/school_year_activator_panel" element={<SchoolYearActivatorPanel />} />
           <Route path="/requirements" element={<RequirementsForm />} />
           <Route path="/year_update_form" element={<YearUpdateForm />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </Router>
    </ThemeProvider>
  )
}

export default App