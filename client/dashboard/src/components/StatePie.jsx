/* Component For Pie Chart For College Data by State  */
import React from 'react'
import {PieChart, Pie, Cell} from 'recharts'
import { COLORS } from '../util/colors';
import {useNavigate} from 'react-router-dom'
import {Spin} from 'antd';

const StatePie = ({ colleges }) => {
    const navigate = useNavigate(); 
    const statecount = colleges.map((data) => data.state).length;
    const map = new Map();
    colleges.map((college) => {
      if(map.has(college.state)) {
        map.set(college.state, map.get(college.state)+1);
      }
      else {
        map.set(college.state, 1);
      }
    })
    const data = []
    for(let [key, value] of map.entries()) {
      const percentage = Math.floor(((value/statecount)*100));
      data.push({name: key, numberOfColleges: percentage});
    }

    if(!data || data.length === 0) {
      return <Spin tip="Loading Your Content..." size='large' className='mt-[10vh]' />
    }
  return (
    <>
        <PieChart width={800} height={400} >
        <Pie data={data} dataKey="numberOfColleges" nameKey="Number Of Colleges" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label={(label) => label.name+" "+label.numberOfColleges+"%"} >
            {data.map((entry, index) => (
            <Cell key={`cell-${index}`} onClick={() => navigate(`/state/${entry.name}`)} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
    </PieChart>
  </>
  )
}

export default StatePie