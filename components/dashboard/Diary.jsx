import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Plus, X, Eye, Trash, ChevronDown } from 'lucide-react';


export default function Diary(user) {

    const [countTask, setCountTask] = useState(0)
    const [formStatut, setFormStatut] = useState(false)
    const [load, setLoad] = useState(false)
    const [datas, setDatas] = useState([])
    const [addIndicator, setAddIndicator] = useState(false)
    const [color, setColor] = useState(user.userColor)
    const [colorInputStatut, setColorInputStatut] = useState(false)
    const [date, setDate] = useState("")
    const [time, setTime] = useState("8h00")
    const [timeInputStatut, setTimeInputStatut] = useState(false)
    const dateInputRef = useRef(null);
    const [selectDateStatut, setSelectDateStatut] = useState(false)

    const [taskInfo, setTaskInfo] = useState("")

    const taskChange = async (e) => {
        e.preventDefault();

        const [hour, minute] = time.split('h').map(Number);
        const dateTime = new Date(date);
        const now = new Date()

        dateTime.setHours(hour);
        dateTime.setMinutes(minute);
        dateTime.setSeconds(0);

        console.log(dateTime.toString())
        console.log(now.toString())

        if (now < dateTime) {

            const res = await axios.post('/api/AddTask', {
                studentNumber: parseInt(user.user, 10),
                color,
                date: dateTime.toISOString(),
                taskInfo,
                hour: time
            });

            setFormStatut(false)
            setColor(user.userColor)
            setTaskInfo("")
            setTime('8h00')
            setDate("")

        } else {
            setSelectDateStatut(true)
        }

        setAddIndicator(!addIndicator)
    }

    useEffect(() => {
        if (user && user.userColor) {
            setColor(user.userColor)
        }
    }, [user])


    const taskDelete = async (id) => {
        try {
            await axios.post('/api/RemoveTask', {
                id: id
            });
            console.log(`Task ${id} removed`)
        } catch (error) {
            console.error(error)
        }
        setAddIndicator(!addIndicator)
    }

    useEffect(() => {
        const Tasks = async () => {
            const res = await axios.post('/api/FetchTask', { studentNumber: parseInt(user.user, 10) });
            const data = res.data;
            setDatas(data);
            setCountTask(data['result'].length);
            setLoad(true);
        }
        Tasks();

    }, [addIndicator]);

    function isInThisWeek(date, now) {

        const day = now.getDay()
        const startWeek = new Date(new Date(now).setDate(now.getDate() - day + 1))
        const endWeek = new Date(new Date(now).setDate(now.getDate() + (7 - day)))

        if (date.getDate() >= startWeek.getDate() && date.getDate() <= endWeek.getDate()) {
            return true
        }
    }

    function formatDate(task) {

        const date = new Date(task.Date);
        const now = new Date();
        const isToday = date.getDay() === now.getDay() && date.getDate() === now.getDate() && date.getFullYear() === now.getFullYear();
        const isTomorrow = (date.getDay() - now.getDay()) === 1 && date.getDate() - now.getDate() === 1 && date.getFullYear() === now.getFullYear();

        if (isToday) {
            return `Aujourd'hui - ${task.Hour}`;
        } else if (isTomorrow) {
            return `Demain - ${task.Hour}`;
        } else if (isInThisWeek(date, now) && date.getFullYear() === now.getFullYear()) {
            const dayOfWeek = date.toLocaleDateString('fr-FR', { weekday: 'long' });
            return `${dayOfWeek} - ${task.Hour}`;
        } else if (now.getFullYear() === date.getFullYear()) {
            const dayOfWeek = date.toLocaleDateString('fr-FR', { weekday: 'long' });
            const month = date.toLocaleDateString('fr-FR', { month: 'long' });
            return `${dayOfWeek} ${date.getDate()} ${month} - ${task.Hour}`;
        } else {
            const dayOfWeek = date.toLocaleDateString('fr-FR', { weekday: 'long' });
            const month = date.toLocaleDateString('fr-FR', { month: 'long' });
            return `${dayOfWeek} ${date.getDate()} ${month.charAt(0).toUpperCase() + month.substring(1)} ${date.getFullYear()} - ${task.Hour}`;
        }
    }

    function TaskBox({ task }) {
        return (
            <div className='flex h-[80px] hover:scale-[.98] cursor-pointer transition-all duration-300 ease-in-out'>
                <div className='w-[7px] rounded-tl-[10px] h-[80px] rounded-bl-[10px]' style={{ backgroundColor: task.Color }}>

                </div>
                <div className='relative bg-[#F4F4F4] h-[80px] w-full flex justify-between px-[10px] group overflow-hidden'>
                    <div className='w-[80%]'>
                        <p className='text-[16px] font-[400] break-words overflow-hidden text-ellipsis line-clamp-2'>{task.TaskInfo}</p>
                        <p className='text-[12px] text-[#424246] text-nowrap first-letter:uppercase break-words truncate'>{formatDate(task)}</p>
                    </div>
                    <div className='flex items-center w-[fit-content] '>
                        <button onClick={() => taskDelete(task.id)} type='submit' className='w-[fit-content] p-[8px] rounded-full cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-[.9] transition-all duration-300 ease-in-out' style={{ backgroundColor: `${user.userColor}` }}><Trash stroke='#ffffff' size={15} /></button>
                    </div>
                </div>
            </div>
        );
    }

    const timeOptions = [];

    for (let hour = 6; hour <= 23; hour++) {
        for (let minute of ["00 ", "30"]) {
            timeOptions.push(`${hour}h${minute}`);
        }
    }

    useEffect(() => {
        if (countTask > 0) {
            const nowDate = new Date();

            datas['result'].slice(0, 8).forEach((task) => {
                const taskDate = new Date(task.Date);

                if (nowDate > taskDate) {
                    taskDelete(task.id)
                    console.log(`Task ${task.id} expired`)
                }
            });
        }
    }, [datas]);


    return (
        <div className='h-[100%] relative overflow-hidden flex flex-col flex-grow'>

            {formStatut ? (

                <div className='flex flex-col h-full w-full justify-between'>

                    <div className='leading-none mb-[20px] h-[fit-content]'>
                        <h3 className='text-[16px] font-[600]'>Agenda</h3>
                        <p className='mt-[5px]'>Ajouter une tache</p>
                    </div>

                    <div className='relative h-full flex items-center w-full'>

                        <form onSubmit={taskChange} className='flex flex-wrap items-center justify-between gap-[10px] w-full'>

                            <div className='flex w-full gap-[10px] justify-between flex-wrap'>

                                <div className='relative flex flex-col min-w-[fit-content] '>

                                    <div onClick={() => { setColorInputStatut(!colorInputStatut); setTimeInputStatut(false) }} className='flex border-[1px] gap-[10px] h-[40px] justify-between border-[#B6B6B6] rounded-[5px] py-[7px] px-[10px] cursor-pointer'>
                                        <div className='w-[25px] h-[25px] rounded-full' style={{ backgroundColor: color }}>
                                        </div>
                                        <ChevronDown />
                                    </div>

                                    <div className={`absolute top-0 mt-[45px] overflow-y-scroll min-w-[fit-content] h-[150px]  z-10 border-[1px] border-[#B6B6B6] rounded-[5px] no-scrollbar opacity-100 transition-opacity duration-300 ease-in-out ${colorInputStatut ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                        <ul className='flex flex-col gap-[5px] justify-center item bg-white'>
                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-center cursor-pointer' onClick={() => { setColor("#2D55FF"); setColorInputStatut(!colorInputStatut); }}><div className='w-[25px] h-[25px] rounded-full bg-[#2D55FF]'></div></li>
                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-center cursor-pointer' onClick={() => { setColor("#26C281"); setColorInputStatut(!colorInputStatut); }}><div className='w-[25px] h-[25px] rounded-full bg-[#26C281]'></div></li>
                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-center cursor-pointer' onClick={() => { setColor("#be5683"); setColorInputStatut(!colorInputStatut); }}><div className='w-[25px] h-[25px] rounded-full bg-[#be5683]'></div></li>
                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-center cursor-pointer' onClick={() => { setColor("#FF9470"); setColorInputStatut(!colorInputStatut); }}><div className='w-[25px] h-[25px] rounded-full bg-[#FF9470]'></div></li>
                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-center cursor-pointer' onClick={() => { setColor("#FFA72D"); setColorInputStatut(!colorInputStatut); }}><div className='w-[25px] h-[25px] rounded-full bg-[#FFA72D]'></div></li>
                                        </ul>
                                    </div>
                                </div>

                                <input ref={dateInputRef} onClick={() => dateInputRef.current.showPicker()} onChange={(e) => setDate(e.target.value)} className='border-[1px] flex-grow cursor-pointer border-[#B6B6B6] h-[40px] rounded-[5px] py-[7px] px-[10px] min-w-[fit-content]' type='date' value={date} placeholder='Date' min={new Date().toISOString().split("T")[0]} required />

                                <div className='relative flex flex-col min-w-[fit-content] z-9 w-[20%]'>
                                    <div onClick={() => { setTimeInputStatut(!timeInputStatut); setColorInputStatut(false) }} className='flex justify-between h-[40px] border-[1px] gap-[10px] border-[#B6B6B6] rounded-[5px] py-[7px] px-[10px] cursor-pointer'>
                                        <div className=''>{time}</div>
                                        <ChevronDown />
                                    </div>
                                    <div className={`absolute top-0 mt-[45px] h-[100px] overflow-y-scroll w-[100%] z-10 border-[1px] border-[#B6B6B6] rounded-[5px] no-scrollbar opacity-100 transition-opacity duration-300 ease-in-out ${timeInputStatut ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                        <ul className='flex flex-col gap-[5px] justify-center item bg-white'>
                                            {timeOptions.map((time, index) => (
                                                <li
                                                    key={index}
                                                    className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-center cursor-pointer'
                                                    onClick={() => { setTime(time); setTimeInputStatut(!timeInputStatut); setSelectDateStatut(false);}}
                                                >
                                                    <div>{time}</div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <input onClick={() => { setColorInputStatut(false); setTimeInputStatut(false) }} onChange={(e) => setTaskInfo(e.target.value)} className='w-[100%] border-[1px] border-[#B6B6B6] rounded-[5px] py-[7px] px-[10px]' type='text' value={taskInfo} maxLength={100} placeholder='Description' />

                            <div className='flex flex-col gap-[10px] w-full'>

                                <div className='flex w-[100%] gap-[20px]'>
                                    <div className=''>
                                        <button onClick={() => {setFormStatut(false); setSelectDateStatut(false); setColor(user.userColor)}} className='bg-[#B6B6B6] hover:bg-[#FF462D] hover:scale-[.9] transition-all duration-300 ease-in-out w-[fit-content] p-[8px] rounded-full cursor-pointer'>
                                            <X stroke='#ffffff' />
                                        </button>
                                    </div>
                                    <button className='text-white w-[100%] rounded-full z-1 hover:scale-[.98] transition-all duration-300 ease-in-out' type='submit' style={{ backgroundColor: `${user.userColor}` }}>Ajouter</button>
                                </div>

                                {selectDateStatut && (<p className='text-[12px] text-[#ff0000]'>La tâche ne peut pas être programmée dans le passé. Veuillez ajuster l'heure sélectionnée.</p>)}
                            </div>

                        </form>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col h-full justify-between flex-grow'>
                    <div className='leading-none'>
                        <h3 className='text-[16px] font-[600]'>Agenda</h3>
                        <p className='mt-[5px]'>Votre agenda personnel</p>
                    </div>
                    {load && countTask > 0 ? (
                        <div className='flex flex-col justify-start gap-[15px] h-[60%] relative overflow-y-auto overflow-x-hidden scrollbar-custom pr-[5px]' id={user.userColor}>
                            {datas['result'].slice(0, 8).map((task) => {
                                return <TaskBox key={task.id} task={task} />
                            })}
                        </div>
                    ) : (
                        <div className='h-[60%]'>
                            <p>...</p>
                        </div>

                    )}
                    <div className='flex gap-[10px] items-center justify-end'>
                        <button className='w-[fit-content] p-[8px] rounded-[50%] cursor-pointer hover:scale-[.9] transition-all duration-300 ease-in-out' style={{ backgroundColor: `${user.userColor}` }}>
                            <Eye stroke='#ffffff' />
                        </button>
                        <button onClick={() => {setFormStatut(true); setTimeInputStatut(false); setColorInputStatut(false); setTaskInfo('')}} className='w-[fit-content] p-[8px] rounded-[50%] cursor-pointer hover:scale-[.9] transition-all duration-300 ease-in-out' style={{ backgroundColor: `${user.userColor}` }}>
                            <Plus stroke='#ffffff' />
                        </button>
                    </div>
                </div>

            )}
        </div>
    )
}

