import axios from 'axios';
import { useState, useEffect } from 'react';
import CircularProgress, { circularProgressClasses, } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import calendar from '../../public/data/calendar.json'
import teacherLinkData from '../../public/data/teacherLink.json'


export default function Lesson(user) {
    const [nextLesson, setnextLesson] = useState(null);

    useEffect(() => {
        const events = calendar.events.events;
        const classrooms = calendar.events.classrooms;

        const currentDate = new Date();

        const upcomingEvent = events.reduce((closestEvent, event) => {
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
            const eventStartDate = new Date(upcomingEvent.startDate);
            const lessonClassroom = upcomingEvent.classrooms[0];

            const findclassroom = (lessonClassroom) => {
                if (classrooms[lessonClassroom]) {
                    return classrooms[lessonClassroom].name;
                }
                return null;
            };

            const updateTimer = () => {
                const currentDate = new Date();
                const timer = eventStartDate - currentDate;

                if (timer > 0) {
                    const days = Math.floor(timer / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timer % (1000 * 60)) / 1000);

                    const classroomName = findclassroom(lessonClassroom);

                    setnextLesson({
                        ...upcomingEvent,
                        timer: { days, hours, minutes, seconds },
                        classroom: classroomName,
                    });
                } else {
                    setnextLesson(null);
                }
            };

            const intervalId = setInterval(updateTimer, 1000);

            updateTimer();

            return () => clearInterval(intervalId);
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

    return (
        <div className='h-[100%]'>
            {nextLesson && (
                <div className='leading-none flex flex-col overflow-hidden justify-between h-[100%]'>
                    <div className='leading-none'>
                        <h3 className='text-[16px] font-[600]'>Prochain cours</h3>
                        <p className='mt-[5px]'>Le prochain cours prévu</p>
                    </div>
                    <div className=''>
                        <div className='flex gap-[5px] text-[16px] font-[500] mb-[10px]' style={{ color: `${user.userColor}`}}>
                            {nextLesson.timer.days > 0 ? (
                                <p>{nextLesson.timer.days}j</p>
                            ) : null}
                            {nextLesson.timer.hours > 0 ? (
                                <p>{nextLesson.timer.hours}h</p>
                            ) : null}
                            {nextLesson && nextLesson.timer.minutes > 0 || nextLesson.timer.hours > 0 ? (
                                <p>{nextLesson.timer.minutes}min</p>
                            ) : null}
                            {nextLesson && nextLesson.timer.days === 0 && nextLesson.timer.seconds > 0 ? (
                                <p>{nextLesson.timer.seconds}sec</p>
                            ) : null}
                        </div>
                        <div className='flex flex-col gap-[3px]'>
                            <p className='text-[20px] font-[500]'>{nextLesson.name.replace(/[_-]/g, ' ')}</p>
                            <p className='text-[14px] font-[400]'>{teacherLink(nextLesson.instructors.toString())[1]}</p>
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

