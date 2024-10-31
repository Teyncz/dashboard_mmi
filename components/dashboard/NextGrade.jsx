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


export default function Lesson(user) {

    const [nextLesson, setnextLesson] = useState(null);
    const [calendar, setCalendar] = useState(null);

    const fetchCalendar = async (tp) => {
        const apiKey = '2554f90bc807833564609b17ecc327d2c5052535a59b6b8229cdd13f67d9a4f2';
        const url = `http://162.19.243.247:5000/json/calendar_tp${tp}.json`;

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
        const classrooms = calendar.events.classrooms;

        const currentDate = new Date();

        const upcomingEvent = events.reduce((closestEvent, event) => {

            if (!event.note || event.note === 'SAE') {
                return closestEvent;
            }

            const [day, month, year] = event.date.split('/');
            const [startHours, startMinutes] = event.startHour.split(':');

            const eventStartDate = new Date(year, month - 1, day, startHours, startMinutes);

            if (eventStartDate < currentDate) {
                return closestEvent;
            }

            if (!closestEvent || eventStartDate - currentDate < closestEvent.startDate - currentDate) {
                return { ...event, startDate: eventStartDate };
            }

            return (closestEvent)
        }, null);



        if (upcomingEvent) {
            const lessonClassroom = upcomingEvent.classrooms[0].toString();

            const findclassroom = (lessonClassroom) => {
                if (classrooms[lessonClassroom]) {
                    return classrooms[lessonClassroom].name;
                }
                return null;
            };


            const classroomName = findclassroom(lessonClassroom);

            setnextLesson({
                ...upcomingEvent,
                classroom: classroomName,
            });

            console.log(nextLesson)

        }

    }, [calendar]);

    function teacherLink(instructorsId) {

        const foundTeacher = teacherLinkData.find(t => t.id === instructorsId);

        if (foundTeacher) {
            return [foundTeacher.link, foundTeacher.name];
        } else {
            return "Teacher not found";
        }
    }

    const formatDate = (dateStr) => {

        const [day, month, year] = dateStr.split('/');

        const date = new Date(`${year}-${month}-${day}`);

        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        return new Intl.DateTimeFormat('fr-FR', options).format(date);
    }


    return (
        <div className='h-[100%]'>
            {nextLesson && user.user.tp ? (
                <div className='leading-none flex flex-col justify-between h-[100%] overflow-hidden'>
                    <div className=''>
                        <h3 className='text-[16px] font-[600]'>Prochain contrôle</h3>
                        <p className='mt-[5px] text-nowrap truncate'>Le prochain contrôle prévu</p>
                    </div>
                    <div className=''>
                        <div className='flex gap-[5px] text-[16px] font-[500] mb-[10px]' style={{ color: `${user.user.color}` }}>
                            {nextLesson.date && (
                                <p className='text-transform: uppercase text-nowrap truncate'>{formatDate(nextLesson.date)}</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-[3px]'>
                            <p className='text-[16px] font-[500] text-nowrap truncate'>{nextLesson.name.replace(/[_-]/g, ' ')} {nextLesson.note.replace(/[_-]/g, ' ')}</p>
                            <p className='text-[14px] font-[400]'>{teacherLink(nextLesson.instructors[0].toString())[1]}</p>
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-[20px] font-[500]'>{nextLesson.classroom.replace(/[_-]/g, ' ')}</p>
                    </div>
                </div>
            ) : (
                <div className='leading-none flex flex-col gap-[10px]'>
                    <div>
                        <h3 className='text-[16px] font-[600]'>Prochain contrôle</h3>
                        <p className='mt-[5px] text-nowrap truncate'>Le prochain contrôle prévu</p>
                    </div>
                    <div className=''>
                        <p style={{ color: `${user.user.color}` }}>
                            Veuillez sélectionner un groupe de TP
                        </p>
                    </div>

                </div>
            )}
        </div>
    );

}

