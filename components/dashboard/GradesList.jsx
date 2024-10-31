import axios from 'axios';
import { useState, useEffect } from 'react';
import CircularProgress, { circularProgressClasses, } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SquareArrowOutUpRight, Eye } from 'lucide-react';
import React, { useRef } from 'react';


export default function GradesList(user) {

  const [response, setResponse] = useState([]);
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await axios.post('/api/FetchGrades', {
          studentNumber: user.user.studentNumber
        });
        setResponse(res.data);
      } catch (error) {

      }
    };

    fetchGrades();
  }, []);

  const circleRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (circleRef.current) {
        const { clientWidth, clientHeight } = circleRef.current;
        setSize({ width: clientWidth, height: clientHeight });
      }
    };

    updateSize();

    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);


  function GradeBox({ studentGrade, gradeName, date, link }) {
    return (
      <div className="flex items-center justify-between gap-[10px] xs:gap-[30px] py-[8px] px-[20px] xs:px-[30px] bg-[#F4F4F4] rounded-[10px] hover:scale-[.98] cursor-pointer transition-all duration-300 ease-in-out">

        <Box sx={{ position: 'relative', display: 'inline-flex' }}>

          <CircularProgress
            size={45} variant="determinate"
            sx={({ color: `${user.user.color}`, [`& .${circularProgressClasses.circle}`]: { strokeLinecap: 'round', } })}
            value={studentGrade * 5}
          />

          <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <Typography variant="caption" component="div">
              <p className='text-[11px] font-[700] text-[#2D2D2D]'>{studentGrade}</p>
            </Typography>
          </Box>

        </Box>

        <div className='flex flex-col w-[100%] whitespace-nowrap overflow-hidden text-ellipsis'>
          <p className='w-[100%] whitespace-nowrap overflow-hidden text-ellipsis text-[10px] xs:text-[16px]'>{gradeName}</p>
          <p className='whitespace-nowrap xs:hidden text-[8px] font-[500]'>{date}</p>
        </div>

        <div className='flex gap-[30px] items-center'>
          <p className='whitespace-nowrap xs:block hidden'>{date}</p>
          <a className='hover:scale-[.9] transition-all duration-300 ease-in-out' href={link} target='_blank'><SquareArrowOutUpRight color={user.user.color} size={18} /></a>
        </div>
      </div>
    );
  }


  return (
    <div ref={circleRef} className='h-full overflow-hidden flex flex-col justify-between'>

      <div className='leading-none'>
        <h3 className='text-[16px] font-[600]'>Dernières notes</h3>
        <p className='mt-[5px]'>Gardez un oeil sur vos dernières notes</p>
      </div>
      <div className='flex flex-col gap-[7px] h-[60%] overflow-y-scroll overflow-x-hidden scrollbar-custom pr-[5px]' id={user.user.color}>
        {response.length > 0 ? (
          response.slice(0, 10).map((grade, index) => (
            <GradeBox
              key={index}
              studentGrade={parseFloat(grade.studentGrade).toFixed(2)}
              gradeName={grade.gradeList.gradeName}
              date={new Date(grade.gradeList.date).toLocaleDateString('fr-FR').replace(/\//g, '-')}
              link={grade.gradeList.gradeLink}
            />
          ))
        ) : (
          <p>Aucune note disponible.</p>
        )}
      </div>
      <div className='flex justify-end pr-[10px]'>
        <button onClick={() => { setFormStatut(true); setTimeInputStatut(false); setColorInputStatut(false); setTaskInfo('') }} className='w-[fit-content] p-[8px] rounded-[50%] cursor-pointer hover:scale-[.9] transition-all duration-300 ease-in-out' style={{ backgroundColor: `${user.user.color}` }}>
          <Eye stroke='#ffffff' />
        </button>
      </div>
    </div>
  );
};
