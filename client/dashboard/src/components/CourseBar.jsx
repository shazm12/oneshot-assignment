/* Component For Bar Chart For Courses Offered By Colleges */
import React from 'react'
import {BarChart, CartesianGrid, XAxis
    ,YAxis, Tooltip, Legend, Bar, Cell} from 'recharts'
import { COLORS } from '../util/colors';
import { useState } from 'react';
import { Divider, Card, Typography, Spin } from 'antd';
import {useNavigate} from 'react-router-dom'

const CourseBar = ({ colleges }) => {         
    const navigate = useNavigate();
    const data = []
    const [activeItem, setActiveItem] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const handleClick = (data, index) => {
        setActiveIndex(index);
        setActiveItem(data);

    }
    const collegeCount = colleges.length;
    const map = new Map();
    colleges.map((college) => {
        college.courses.map((course) => {
            if(map.has(course)) {
                map.set(course, map.get(course)+1);
            }
            else {
                map.set(course, 1);
            }
        })
    })

    for(let [key, value] of map.entries()) {
        const percentage = Math.floor(((value/collegeCount)*100));
        data.push({name: key, percentage: percentage});
    }
    if(!data || data.length === 0) {
        return <Spin tip="Loading Your Content..." size='large' className='mt-[10vh]' />
      }
  return (
    <div>      
        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="percentage" name="% of Colleges providing the Course" fill="#8884d8" onClick={handleClick} >
                {data.map((entry, index) => (
                    <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
                ))}
            </Bar>
        </BarChart>
         {activeItem.name!=undefined && (
         <>
            <p className="text-lg italic underline">{`% of "${activeItem?.name}": ${activeItem?.percentage}`}</p>
            <div className='flex flex-col justify-center items-center'>
                <Card size='large' bordered={true} className="border-1 border-black">
                    <h1 className='text- ml-4 text-[22px] my-5 font-bold'>List Of Colleges</h1>
                    <div className='flex flex-col justify-center items-center'>
                    {colleges.map(college => {
                        if(college.courses.includes(activeItem.name)) {
                            return (
                                <h5 onClick={() => navigate(`/college/${college._id}`, {name: college.name})} className='text-[18px] cursor-pointer hover:text-teal-500 transition ease-in-out'>{college.name}</h5>
                            )
                        }
                    })}
                    </div>
                </Card>
            </div>
         </>
         )}
    </div>
  )
}

export default CourseBar