import axios from 'axios';
import { useState, useEffect } from 'react';
import CircularProgress, { circularProgressClasses, } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useRef } from 'react';


export default function Clock(user) {

    const [time, seTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            seTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId)
        }
    }, []);

    function convertTime(time) {

        let meridiemHours = time.getHours();
        let convertMinutes = ((time.getMinutes() * (100 / 60)) / 100);

        if (time.getHours() >= 12) {
            meridiemHours = ((time.getHours() - 12))
        }
        else {
            meridiemHours = ((time.getHours()))
        }

        return ((meridiemHours + convertMinutes) * (100 / 12))

    }

    function convertMonth(time) {
        let convertedMonth = '';

        switch (time.getMonth() + 1) {
            case 1:
                convertedMonth = 'JANV';
                break;
            case 2:
                convertedMonth = 'FEVR';
                break;
            case 3:
                convertedMonth = 'MARS';
                break;
            case 4:
                convertedMonth = 'AVR';
                break;
            case 5:
                convertedMonth = 'MAI';
                break;
            case 6:
                convertedMonth = 'JUIN';
                break;
            case 7:
                convertedMonth = 'JUILL';
                break;
            case 8:
                convertedMonth = 'AOUT';
                break;
            case 9:
                convertedMonth = 'SEPT';
                break;
            case 10:
                convertedMonth = 'OCT';
                break;
            case 11:
                convertedMonth = 'NOV';
                break;
            case 12:
                convertedMonth = 'DEC';
                break;
            default:
                console.log(`Sorry, can't find month`);
        }

        return convertedMonth;
    }

    const clockRef = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            if (clockRef.current) {
                const { clientWidth, clientHeight } = clockRef.current;
                setSize({ width: clientWidth, height: clientHeight });
            }
        };

        updateSize();

        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    return (
        <div className='flex items-center justify-center w-[100%]' id="clock" ref={clockRef}>
            <Box sx={{ position: 'relative', display: 'flex' }}>

                <CircularProgress
                    variant="determinate"
                    sx={() => ({ color: '#F4F4F4', })}
                    size={size.width * 0.8 } thickness={2} value={100}
                />

                <CircularProgress
                    sx={() => ({ color: `${user.userColor}`, position: 'absolute', left: 0 })} value={convertTime(time)}
                    size={size.width * 0.8 } variant="determinate" thickness={2}
                />
                <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                    <Typography variant="caption" component="div" className='flex flex-col items-center pt-[40%] h-[100%] gap-[10px]'>
                        <p style={{ fontSize: `${size.width * 0.15 }px` }} className='font-[00] text-[#2D2D2D] leading-none'>{time.getHours()}h{time.getMinutes().toString().padStart(2, '0')}</p>
                        <div className='flex flex-col items-center gap-[2px]'>
                            <p style={{ fontSize: `${size.width * 0.07 }px` }} className='font-[300] text-[#2D2D2D] leading-none'>{time.getDate()} {convertMonth(time)}</p>
                            <p style={{ fontSize: `${size.width * 0.07 }px` }} className='font-[300] text-[#2D2D2D] leading-none'>{time.getFullYear()}</p>
                        </div>
                    </Typography>
                </Box>
            </Box>

        </div>
    )

}