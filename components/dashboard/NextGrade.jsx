import axios from 'axios';
import { useState, useEffect } from 'react';
import CircularProgress, { circularProgressClasses, } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import calendar from '../../public/data/calendar.json'
import teacherLinkData from '../../public/data/teacherLink.json'


export default function Lesson(user) {
    const [nextLesson, setnextLesson] = useState(null);
    const classrooms = calendar.events.classrooms;

    useEffect(() => {
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

            if (eventStartDate < currentDate ) {
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

    }, [calendar.events.events]);

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
            {nextLesson && (
                <div className='leading-none flex flex-col justify-between h-[100%] overflow-hidden'>
                    <div className=''>
                        <h3 className='text-[16px] font-[600]'>Prochain contrôle</h3>
                        <p className='mt-[5px] text-nowrap truncate'>Le prochain contrôle prévu</p>
                    </div>
                    <div className=''>
                        <div className='flex gap-[5px] text-[16px] font-[500] mb-[10px]' style={{ color: `${user.userColor}`}}>
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
            )}
        </div>
    );

}

