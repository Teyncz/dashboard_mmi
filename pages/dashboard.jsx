import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from 'axios'
import jwt from 'jsonwebtoken'
import CircularProgress, { circularProgressClasses, } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import GradesList from '@/components/dashboard/GradesList'
import Clock from '@/components/dashboard/Clock'
import TeacherPage from "@/components/dashboard/TeacherPage";
import ChartUE from '@/components/dashboard/ChartUE';
import Lesson from "@/components/dashboard/Lesson";
import NextGrade from "@/components/dashboard/NextGrade"
import Diary from "@/components/dashboard/Diary";


export default function Dashboard() {

    const [userMail, setUserMail] = useState('')
    const [userFname, setUserFname] = useState('')
    const [userLname, setUserLname] = useState('')
    const [userTP, setUserTP] = useState('')
    const [userColor, setUserColor] = useState('')
    const [userCurrentPassword, setUserCurrentPassword] = useState('')
    const [userNewPassword, setUserNewPassword] = useState('')

    const [user, setUser] = useState(null)
    const router = useRouter()
    const [successPopUpStatut, setSuccessPopUpStatut] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.post('/api/verify-token', { token })
                .then(response => {
                    const userData = response.data.user;
                    setUser(userData);

                    const studentNumber = userData.studentNumber;

                    return axios.post('/api/fetchUserInfo', { studentNumber });
                })
                .then(response => {
                    if (response.data) {
                        setUser(prevUser => ({
                            ...prevUser,
                            ...response.data
                        }));
                    }

                })
                .catch(error => {
                    console.error('Error occurred:', error);
                    if (error.response && error.response.status === 401) {
                        router.push('/login');
                    } else {
                        setUserColor('#2D55FF');
                    }
                });
        } else {
            router.push('/login');
        }

    }, []);

    const SetVarColor = (userColor) => {

        if (!userColor) {
            return null; 
        }
        
        if (userColor.toUpperCase() === "#2D55FF") {
            return ('#61A0FF')
        }
        if (userColor.toUpperCase() === "#26C281") {
            return ('#83E2BB')
        }
        if (userColor.toUpperCase() === "#BE5683") {
            return ('#EC99BD')
        }
        if (userColor.toUpperCase() === "#FF9470") {
            return ('#FF7C50')
        }
        if (userColor.toUpperCase() === "#197292") {
            return ('#2B6384')
        }
        if (userColor.toUpperCase() === "#CD1C18") {
            return ('#DB7A77')
        }
    }

    useEffect(() => {
        if (user) {
            setUserMail(user.email);
            setUserFname(user.fname);
            setUserLname(user.lname);
            setUserColor(user.color);
            setUserTP(user.tp);
        }
    }, [user]);



    if (!user) return (
        <main className="flex justify-center items-center h-[100vh]">
            <CircularProgress thickness={1} />
        </main>
    )

    function setProfileColor(mail) {

        if (mail >= 'a' && mail <= 'g') {
            return "#2D55FF";
        } else if (mail >= 'h' && mail <= 'o') {
            return "#2D55FF";
        } else if (mail >= 'p' && mail <= 'z') {
            return "#2D55FF";
        } else {
            return "2D55FF";
        }
    }


    return (
        <main className="">
        { user && (
            <div className="h-full lg:h-[100vh] px-[15px] pb-[15px] sm:px-[30px] sm:pb-[30px] ">
                <section className="h-[7vh] flex items-center justify-end gap-[10px] mr-[20px]">
                    <div className="h-[60%] ">
                        <a href="/account" className=" h-full aspect-square rounded-full flex items-center justify-center font-[400] text-white text-[1.1rem] hover:scale-[.92] transition-all duration-300 ease-in-out" style={{ backgroundColor: `${setProfileColor(user.email.charAt(0).toLowerCase())}` }}>
                            {user.email.charAt(0).toUpperCase()}
                        </a>
                    </div>
                    <div className="">
                        {userFname ? (
                            userFname
                        ) : (
                            `${userMail.charAt(0).toUpperCase()}${userMail.split('@')[0].substring(1)}`
                        )}
                    </div>
                </section>
                <section className="flex gap-[15px] h-100% md:h-[93vh] flex-wrap lg:flex-nowrap" >
                    <section className="md:w-[calc(65%-8px)] flex flex-col gap-[15px] w-[100%] lg:w-[45%] lg:min-w-[500px]">
                        <div className="border-[1px] border-[#B6B6B6] rounded-[10px] p-[30px] overflow-hidden" style={{ height: "calc(50vh - 22.5px)" }}>
                            <ChartUE user={user}/>
                        </div>
                        <div className="border-[1px] border-[#B6B6B6] rounded-[10px] p-[30px] md:h-[calc(43vh-22.5px)]">
                            <GradesList user={user}/>
                        </div>

                    </section>
                    <section className="flex flex-col-reverse md:flex-col gap-[15px] w-[100%] md:w-[calc(35%-7.5px)] lg:w-[22.5%] h-[calc(50vh-22.5px)">
                        <div className="flex flex-col gap-[15px] h-full sm:h-[calc(50vh-22.5px)]">
                            <div className="border-[1px] border-[#B6B6B6] rounded-[10px] p-[30px]" style={{ height: "calc(50% - 7.5px)" }}>
                                <Lesson user={user} />
                            </div>
                            <div className="border-[1px] border-[#B6B6B6] rounded-[10px] p-[30px] " style={{ height: "calc(50% - 7.5px)" }}>
                                <NextGrade user={user} />
                            </div>
                        </div>
                        <div className="flex justify-center items-center border-[1px] h-full border-[#B6B6B6] overflow-hidden md:h-[calc(43vh-22.5px)] rounded-[10px] py-[5%]">
                            <Clock userColor={userColor} />
                        </div>

                    </section>
                    <section className="flex flex-col w-[100%] gap-[15px] lg:w-[32.5%] lg:m-w-[32.5%] overflow-hidden">

                        <div className="border-[1px] border-[#B6B6B6] rounded-[10px] p-[30px] overflow-hidden h-full max-h-[70vh] sm:h-[calc(50vh-22.5px)]">
                            <Diary user={user.studentNumber} userColor={userColor} />

                        </div>

                        <div className="flex flex-col gap-[15px] h-full sm:h-[calc(43vh-22.5px)]">
                            <div className="overflow-hidden relative border-[1px] border-[#B6B6B6] rounded-[10px] p-[30px] flex flex-col gap-3 justify-center items-center h-full">
                                <div className="self-start	leading-none">
                                    <h3 className='text-[16px] font-[600]'>Prochain dépôt</h3>
                                    <p className='mt-[5px]'>Le prochain dépôt prévu</p>
                                </div>
                                <CircularProgress sx={() => ({ color: `${user.color}`, })} size="30px" />
                                <p>Bientôt disponible</p>
                            </div>

                            <div className="relative overflow-hidden border-[1px] border-[#B6B6B6] rounded-[10px] p-[30px] h-full">
                                <TeacherPage user={user} />
                                <svg
                                    className="teacher-svg absolute bottom-0 right-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 275 133"
                                    fill="none"
                                >
                                    <path d="M275 0C226.467 117.458 62.206 133 0 133H275V0Z" fill="url(#paint0_linear_195_78)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_195_78" x1="219.569" y1="-3.99307" x2="137.811" y2="133.185" gradientUnits="userSpaceOnUse">
                                            <stop stop-color={user.color} />
                                            <stop offset="1" stop-color={SetVarColor(user.color)} />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                    </section>

                </section>
            </div>
        )}
        </main>
    )

}