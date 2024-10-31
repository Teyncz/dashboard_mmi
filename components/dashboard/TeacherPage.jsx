import axios from 'axios';
import { useState, useEffect } from 'react';
import CircularProgress, { circularProgressClasses, } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import calendar1 from '../../public/data/calendar_tp1.json';
import calendar2 from '../../public/data/calendar_tp2.json';
import calendar3 from '../../public/data/calendar_tp3.json';
import calendar4 from '../../public/data/calendar_tp4.json';
import calendar5 from '../../public/data/calendar_tp5.json';
import calendar6 from '../../public/data/calendar_tp6.json';
import teacherLinkData from '../../public/data/teacherLink.json'


export default function TeacherPage(user) {
    const [nextLesson, setnextLesson] = useState(null);
    const [calendar, setCalendar] = useState(null);
    const [teacherLinkData, setTeacherLinkData] = useState(null);

    const fetchCalendar = async (tp) => {
        const apiKey = '2554f90bc807833564609b17ecc327d2c5052535a59b6b8229cdd13f67d9a4f2';
        const url = `http://162.19.243.247:5000/json/calendar_tp${tp}.json`;
        const urlTeacher = `http://162.19.243.247:5000/json/teacherLink.json`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ api_key: apiKey }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }

            const data = await response.json(); 
            setCalendar(data);
        } catch (error) {
            console.error('Erreur :', error);
        }

        try {
            const responseTeacher = await fetch(urlTeacher, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ api_key: apiKey }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }

            const data = await response.json(); 
            setTeacherLinkData(data);
            console.log(teacherLinkData)
        } catch (error) {
            console.error('Erreur :', error);
        }
    };
    

    useEffect(() => {
        switch (user.user.tp) {
            case 'TP 1':
                fetchCalendar('1')
                break;
            case 'TP 2':
                fetchCalendar('2')
                break;
            case 'TP 3':
                fetchCalendar('3')
                break;
            case 'TP 4':
                fetchCalendar('4')
                break;
            case 'TP 5':
                fetchCalendar('5')
                break;
            case 'TP 6':
                fetchCalendar('6')
                break;
            default:
                setCalendar(null); 
        }

        

    }, [user.user.tp]); 

    useEffect(() => {
        if (!calendar) return;
        
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
                    <p className=' mt-[10px] font-[500]' style={{ color: `${user.user.color}` }}>{teacherLink(nextLesson.instructors.toString())[1]}</p> 
                </a>
            ) : (
                <div>
                    <div className="leading-none">
                        <h3 className='text-[16px] font-[600]'>Site de l'enseignant</h3>
                        <p className='mt-[5px]'>Accéder au site de l'enseignant actuel</p>
                    </div>
                    <p className=' mt-[10px] font-[500]' style={{ color: `${user.user.color}` }}>Pas de cours actuellement</p>
                </div>
            )}
        </div>
    );

}

