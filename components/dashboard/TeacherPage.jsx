import axios from 'axios';
import { useState, useEffect } from 'react';
import CircularProgress, { circularProgressClasses, } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import calendar from '../../public/data/calendar.json'
import teacherLinkData from '../../public/data/teacherLink.json'


export default function TeacherPage(user) {
    const [nextLesson, setnextLesson] = useState(null);

    useEffect(() => {
        const events = calendar.events.events;

        const currentDate = new Date();

        const currentEvent = events.find((event) => {
            const [day, month, year] = event.date.split('/');
            const [startHours, startMinutes] = event.startHour.split(':');
            const [endHours, endMinutes] = event.endHour.split(':');

            const eventStartDate = new Date(year, month - 1, day, startHours, startMinutes);
            const eventEndDate = new Date(year, month - 1, day, endHours, endMinutes);

            return currentDate >= eventStartDate && currentDate <= eventEndDate;

        });

        if (currentEvent) {
            setnextLesson(currentEvent);
        } else {
            setnextLesson(null);
        }
    }, []);

    function teacherLink(instructorsId) {

        const foundTeacher = teacherLinkData.find(t => t.id === instructorsId);

        if (foundTeacher) {
            return [foundTeacher.link, foundTeacher.name];
        } else {
            return "Teacher not found";
        }
    }

    return (
        <div className='relative'>
            {nextLesson ? (
                <a href={teacherLink(nextLesson.instructors.toString())[0]} target="_blank" rel="noopener noreferrer">
                    <div className='leading-none'>
                        <h3 className='text-[16px] font-[600]'>Site de l'enseignant</h3>
                        <p className='mt-[5px]'>Accéder au site de l'enseignant actuel</p>
                    </div>
                    <p className=' mt-[10px] font-[500]' style={{ color: `${user.userColor}` }}>{teacherLink(nextLesson.instructors.toString())[1]}</p> 
                </a>
            ) : (
                <div>
                    <div className="leading-none">
                        <h3 className='text-[16px] font-[600]'>Site de l'enseignant</h3>
                        <p className='mt-[5px]'>Accéder au site de l'enseignant actuel</p>
                    </div>
                    <p className=' mt-[10px] font-[500]' style={{ color: `${user.userColor}` }}>Pas de cours actuellement</p>
                </div>
            )}
        </div>
    );

}

