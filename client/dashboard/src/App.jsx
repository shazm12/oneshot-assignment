import { useEffect, useState } from 'react'
import colleges from '../src/util/data.js';
import TableView from './components/TableView.jsx';
import ColStudTableView from './components/ColStudTableView.jsx';
import {PieChart, Pie, Cell} from 'recharts'
import StatePie from './components/StatePie.jsx';
import CourseBar from './components/CourseBar.jsx';
import axios from './util/axios.js';
import {Routes, Route} from 'react-router-dom';
import 'antd/dist/antd.css';
import ColTable from './components/ColTable.jsx';
import StudentDetails from './components/StudentDetails.jsx';
function App() {
  const [collegeData, setCollegeData] = useState([]);
  useEffect(() => {
    const getCollegeData = async() => {
      
      const data =await axios.get('/college/getColleges')
      .then(res => {
        return res.data.college;
      })
      .catch(err => {
        console.log(err);
      });
      setCollegeData(data);
    }
    getCollegeData();

  },[]);
  console.log(collegeData);

  // Home Component 
  const Home = () => (
    <>
              <div className='mt-[8vh]'>
              <h2 className='text-center text-[28px] mb-[2vh] font-semibold'>List Of Colleges</h2>
              <ColTable collegeData={collegeData} />
          
        </div>
          <div className='mt-[20vh]'>
        <StatePie colleges={collegeData} />
      <h2 className='text-center text-[28px] font-semibold'>% of Colleges in India by State</h2>
      </div>
      {/*  % of Colleges providing specified course */}
      <div className='mt-[20vh]'>
        <CourseBar colleges={collegeData} />
        <h2 className='text-center text-[28px] font-semibold mt-[5vh]'>% of Colleges in India by Courses</h2>
      </div>
    </>
  )


  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-[#CDF0EA] overflow-x-hidden'>
      {/* % of Colleges by State */}
      <h1 className="text-6xl mt-[10vh] text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mt-0 mb-2 text-slate-800 drop-shadow-lg">College And Students Dashboard</h1>
      <Routes>
        <Route path='/state/:state' element={<TableView collegeData={collegeData} />} />
        <Route path='/college/:collegeId' element={<ColStudTableView  />} />
        <Route path='/student/:name' element={<StudentDetails  />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <div className='flex justify-center items-center mt-[12vh] mb-[2rem]'>
          <h1 className='text-center text-[18px] font-semibold'>Created By Shamik Bera <span className='text-[32px]'>👨‍💻</span></h1>

      </div>

    </div>
  )
}

export default App;
