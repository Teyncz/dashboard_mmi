import axios from 'axios';
import { useState, useEffect } from 'react';
import CircularProgress, { circularProgressClasses, } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function TeacherPage(user) {

    console.log(user)

    const [datas, setDatas] = useState(null)
    const [load, setLoad] = useState(false)
    const [varColor, setVarColor] = useState("")

    const SetVarColor = (userColor) => {
        if (userColor.toUpperCase() === "#2D55FF") {
            return ('#000F50')
        }
        if (userColor.toUpperCase() === "#26C281") {
            return ('#008A4A')
        }
        if (userColor.toUpperCase() === "#BE5683") {
            return ('#6e304b')
        }
        if (userColor.toUpperCase() === "#FF9470") {
            return ('#D35400')
        }
        if (userColor.toUpperCase() === "#197292") {
            return ('#043B5C')
        }
        if (userColor.toUpperCase() === "#CD1C18") {
            return ('#380009')
        }
    }

    useEffect(() => {
        const fetchUE = async () => {
            try {
                const res = await axios.post('/api/FetchUE', {
                    studentNumber: user.user.studentNumber
                });
                const data = res.data;
                setDatas(data);
                setLoad(true);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchUE();
    }, []);


    function Bar({ ue, classue, skill }) {
        return (
            <div className='flex flex-col gap-[20px] items-center overflow-x-hidden w-[90%] h-[100%]'>
                <div className='flex gap-[10px] items-end w-[100%] justify-center h-[100%]'>
                    <div className={`relative flex items-end justify-center w-[27%] min-h-[15px] rounded-[5px] px-[5px] cursor-pointer hover:scale-y-[0.9] origin-bottom transition-all duration-300 ease-in-out group`} style={{ height: `${ue}%`, backgroundColor: `${user.user.color}` }}>
                        <p className={`top-0 absolute rounded-[5px] translate-y-[-30px] text-center scale-y-[1.1] opacity-0 transform group-hover:opacity-100 transition-opacity duration-300 text-[90%] w-full min-w-[fit-content] `} style={{ borderColor: user.user.color }}>
                            {(ue / 5).toFixed(1)}
                        </p>
                    </div>
                    <div className="relative flex items-end justify-center w-[27%] min-h-[15px] rounded-[5px] px-[5px] cursor-pointer hover:scale-y-[0.9] origin-bottom transition-all duration-300 ease-in-out group" style={{ height: `${classue}%`, backgroundColor: `${SetVarColor(user.user.color)}` }}>
                        <p className={`top-0 absolute rounded-[5px] translate-y-[-30px] text-center scale-y-[1.1] opacity-0 transform group-hover:opacity-100 transition-opacity duration-300 text-[90%] w-full min-w-[fit-content] `} style={{ borderColor: user.user.color }}>
                            {(classue / 5).toFixed(1)}
                        </p>
                    </div>
                </div>
                <p className='h-[fit-content] leading-1 text-[7px] xs:text-[13px] font-[400] truncate overflow-hidden'>{skill}</p>
            </div>
        )
    }

    if (load && user) {

        const ue1 = ((datas['ue1'].result) * 5)
        const ue2 = ((datas['ue2'].result) * 5)
        const ue3 = ((datas['ue3'].result) * 5)
        const ue4 = ((datas['ue4'].result) * 5)
        const ue5 = ((datas['ue5'].result) * 5)

        const classue1 = ((datas['ue1'].avg) * 5)
        const classue2 = ((datas['ue2'].avg) * 5)
        const classue3 = ((datas['ue3'].avg) * 5)
        const classue4 = ((datas['ue4'].avg) * 5)
        const classue5 = ((datas['ue5'].avg) * 5)

        return (
            <section className='flex flex-col justify-between w-[100%] h-[100%]'>
                <div className='leading-none'>
                    <h3 className='text-[16px] font-[600]'>Compétence</h3>
                    <p className='mt-[5px]'>Suivez vos moyennes par compétences</p>
                </div>
                <div className='flex gap-[20px] h-[70%]'>
                    <div className='flex items-end  justify-between flex-col-reverse mb-[30px] text-[13px] w-[20px] h-[100%] pb-[33px]'>
                        <span>0</span>
                        <span>5</span>
                        <span>10</span>
                        <span>15</span>
                        <span>20</span>
                    </div>
                    <section className='flex items-end justify-between w-[100%]'>
                        <Bar key={1} ue={ue1} classue={classue1} skill={"Comprendre"} />
                        <Bar key={2} ue={ue2} classue={classue2} skill={"Concevoir"} />
                        <Bar key={3} ue={ue3} classue={classue3} skill={"Exprimer"} />
                        <Bar key={4} ue={ue4} classue={classue4} skill={"Développer"} />
                        <Bar key={5} ue={ue5} classue={classue5} skill={"Entreprendre"} />
                    </section>
                </div>
                <div className='flex gap-[25px] ml-[40px]'>
                    <div className='flex items-center gap-[15px]'>
                        <div className='w-[15px] h-[15px] rounded-[2.5px]' style={{ backgroundColor: `${user.user.color}` }}></div>
                        <p className='text-[10px] xs:text-[13px] leading-none'>Moyenne élève</p>
                    </div>
                    <div className='flex items-center gap-[15px]'>
                        <div className='w-[15px] h-[15px] rounded-[2.5px]' style={{ backgroundColor: `${SetVarColor(user.user.color)}` }}></div>
                        <p className='text-[10px] xs:text-[13px] leading-none'>Moyenne classe</p>
                    </div>
                </div>
            </section>
        )
    } else {
        return (
            <div className="flex justify-center items-center">
                <CircularProgress thickness={1} />
            </div>
        )
    }



}