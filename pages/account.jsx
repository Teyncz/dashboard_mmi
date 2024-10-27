import { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import { Plus, X, Eye, Trash, ChevronDown } from 'lucide-react';

export default function Account() {

    const router = useRouter()

    const [userMail, setUserMail] = useState('')
    const [userFname, setUserFname] = useState('')
    const [userLname, setUserLname] = useState('')
    const [userTP, setUserTP] = useState('')
    const [userColor, setUserColor] = useState('')
    const [userCurrentPassword, setUserCurrentPassword] = useState('')
    const [userNewPassword, setUserNewPassword] = useState('')

    const [user, setUser] = useState('')

    console.log(user)

    const [userTPstatut, setUserTPstatut] = useState('')
    const [userColorStatut, setUserColorStatut] = useState('')
    const [successPopUpStatut, setSuccessPopUpStatut] = useState(false)
    const [errorPopUpStatut, setErrorPopUpStatut] = useState(false)




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

    useEffect(() => {
        if (user) {
            setUserMail(user.email);
            setUserFname(user.fname);
            setUserLname(user.lname);
            setUserColor(user.color);
            setUserTP(user.tp);
        }
    }, [user]);

    function ConvertColor(color) {

        switch (color) {
            case '#2D55FF':
                return 'Azure'
            case '#26C281':
                return 'Printemps'
            case '#BE5683':
                return 'Incarnat'
            case '#FF9470':
                return 'Saumon'
            case '#197292':
                return 'Minéral'
            case '#CD1C18':
                return 'Spicy'
            default:
                return 'Azure';
        }
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('/api/updateUserInfo', {
                id: user.id,
                email: userMail,
                fname: userFname,
                lname: userLname,
                color: userColor,
                tp: userTP,
            });

            setSuccessPopUpStatut(true)

        } catch (error) {

            console.error(error)
            setErrorPopUpStatut(true)
        }

    }

    useEffect(() => {
        if (successPopUpStatut) {
            const timer = setTimeout(() => {
                setSuccessPopUpStatut(false);
            }, 8000);

            return () => clearTimeout(timer);
        }
    }, [successPopUpStatut]);

    const successPopUp = () => {

        return (
            <div className="absolute max-w-[80%] bg-white z-[999] left-0 bottom-0 flex items-center cursor-pointer shadow-custom p-[20px] gap-[40px] mb-[100px] rounded-[5px] hover:scale-[.98] transition-all opacity-0 duration-300 ease-in-out popupanim">
                <div className='flex gap-[10px]'>
                    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill-rule="evenodd"><circle fill={userColor} cx="12" cy="12" r="10"></circle><path d="M9.707 11.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L11 12.586l-1.293-1.293z" fill='#ffffff'></path></g></svg>
                    <p>Vous avez mis à jour votre profil</p>
                </div>
                <button className='hover:scale-[.8] transition-all duration-300 ease-in-out' onClick={() => setSuccessPopUpStatut(false)}>

                    <X size={20} color='#000000CC' />
                </button>
            </div>
        )
    }

    const errorPopUp = () => {

        return (
            <div className="absolute max-w-[80%] bg-white z-[999] left-0 bottom-0 flex items-center cursor-pointer shadow-custom p-[20px] gap-[40px] mb-[100px] ml-[50px] rounded-[5px] hover:scale-[.98] transition-all transform translate-x-[-120%] duration-300 ease-in-out popupanim">
                <div className='flex gap-[10px]'>
                    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill-rule="evenodd"><circle fill="#ff0000" cx="12" cy="12" r="10"></circle><path d="M9.707 11.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L11 12.586l-1.293-1.293z" fill='#ffffff'></path></g></svg>
                    <p>Vous avez mis à jour votre profil</p>
                </div>
                <button className='hover:scale-[.8] transition-all duration-300 ease-in-out' onClick={() => setErrorPopUpStatut(false)}>

                    <X size={20} color='#000000CC' />
                </button>
            </div>
        )
    }


    return (


        <main className='overflow-y-scroll overflow-x-hidden min-h-[100vh] h-full flex justify-center items-center py-[10px]'>
            {successPopUpStatut &&
                successPopUp()
            }
            {errorPopUpStatut &&
                errorPopUp()
            }
            {user && (
                <div className='w-[750px] overflow-x-hidden overflow-y-hidden account_shadow shadow-custom rounded-[10px] p-[90px] flex flex-col gap-[50px]'>
                    <div className='w-full flex justify-center items-center'>
                        <div className=" h-[50px] aspect-square rounded-full flex items-center justify-center font-[400] text-white text-[1.1rem]" style={{ backgroundColor: `${setProfileColor(user.email.charAt(0).toLowerCase())}` }}>
                            {user.fname ? (
                                user.fname.charAt(0).toUpperCase()) : (
                                user.email.charAt(0).toUpperCase()
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} role="presentation" autocomplete="off" className='flex flex-col gap-[30px]' >

                        <div className='flex flex-col gap-[10px]'>

                            <div className=''>
                                <h3 className='text-[16px] text-[#000000CC]'>Informations personnelles</h3>
                            </div>

                            <div className='flex flex-col gap-[10px]'>

                                <div className='flex flex-nowrap w-full gap-[10px]'>
                                    <div className="flex w-[calc(50%-5px)] border-[1px] rounded-[5px] py-[10px] px-[14px] items-center" style={{ borderColor: `${userColor}` }}>
                                        <input className='w-full' autoComplete='none' onChange={(e) => setUserFname(e.target.value)} type='text' value={userFname} placeholder='Prénom' />
                                    </div>
                                    <div className="flex w-[calc(50%-5px)]  border-[1px] rounded-[5px] py-[10px] px-[14px] items-center" style={{ borderColor: `${userColor}` }}>
                                        <input className='w-full' autoComplete='none' onChange={(e) => setUserLname(e.target.value)} type='text' value={userLname} placeholder='Nom' />
                                    </div>
                                </div>

                                <div className="flex w-full border-[1px] rounded-[5px] py-[10px] px-[14px] items-center" style={{ borderColor: `${userColor}` }}>
                                    <input autoComplete='none' onChange={(e) => setUserMail(e.target.value)} className='w-full' type='text' value={userMail} placeholder='email' />
                                </div>

                                <div className='relative flex flex-col min-w-[fit-content] w-[30%] '>
                                    <div onClick={() => { setUserTPstatut(!userTPstatut) }} className='flex border-[1px] gap-[10px] h-[40px] justify-between rounded-[5px] py-[7px] px-[10px] cursor-pointer' style={{ borderColor: `${userColor}` }}>
                                        {userTP ? (userTP) : ("Groupe de TP")}
                                        <ChevronDown />
                                    </div>

                                    <div className={`absolute top-0 mt-[45px] overflow-y-scroll min-w-[fit-content] h-[150px]  z-10 border-[1px] rounded-[5px] no-scrollbar opacity-100 transition-opacity duration-300 ease-in-out ${userTPstatut ? 'opacity-100 visible' : 'opacity-0 invisible'}`} style={{ borderColor: `${userColor}` }}>
                                        <ul className='flex flex-col gap-[5px] justify-center item bg-white'>
                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-center cursor-pointer' onClick={() => { setUserTP("TP 1"); setUserTPstatut(!userTPstatut); }}><div className=''>TP 1</div></li>
                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-center cursor-pointer' onClick={() => { setUserTP("TP 2"); setUserTPstatut(!userTPstatut); }}><div className=''>TP 2</div></li>
                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-center cursor-pointer' onClick={() => { setUserTP("TP 3"); setUserTPstatut(!userTPstatut); }}><div className=''>TP 3</div></li>
                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-center cursor-pointer' onClick={() => { setUserTP("TP 4"); setUserTPstatut(!userTPstatut); }}><div className=''>TP 4</div></li>
                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-center cursor-pointer' onClick={() => { setUserTP("TP 5"); setUserTPstatut(!userTPstatut); }}><div className=''>TP 5</div></li>
                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-center cursor-pointer' onClick={() => { setUserTP("TP 6"); setUserTPstatut(!userTPstatut); }}><div className=''>TP 6</div></li>
                                        </ul>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[10px]'>
                            <div className=''>
                                <h3 className='text-[16px] text-[#000000CC]'>Sécurité</h3>
                            </div>
                            <div className='flex flex-col gap-[10px]'>
                                <div className="flex gap-[10px] border-[1px] rounded-[5px] py-[10px] px-[14px] items-center" style={{ borderColor: `${userColor}` }}>
                                    <input autoComplete='none' onChange={(e) => setUserCurrentPassword(e.target.value)} type='password' value={userCurrentPassword} placeholder='Mot de passe actuel' />
                                </div>
                                <div className="flex gap-[10px] border-[1px] rounded-[5px] py-[10px] px-[14px] items-center" style={{ borderColor: `${userColor}` }}>
                                    <input autoComplete='none' onChange={(e) => setUserNewPassword(e.target.value)} type='password' value={userNewPassword} placeholder='Nouveau mot de passe' />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-[10px]'>
                            <div className=''>
                                <h3 className='text-[16px] text-[#000000CC]'>Préférences du compte</h3>
                            </div>
                            <div className='flex flex-col gap-[5px]'>
                                <div className=''>
                                    <p className='text-[13px] font-[400] text-[#00000094]'>Thème</p>
                                </div>
                                <div className='relative flex flex-col w-[fit-content] '>
                                    <div onClick={() => { setUserColorStatut(!userColorStatut) }} className='flex border-[1px] gap-[10px] h-[40px] items-center justify-start rounded-[5px] py-[10px] px-[10px] cursor-pointer' style={{ borderColor: `${userColor}` }}>
                                        <div className='w-[25px] h-[25px] rounded-full' style={{ backgroundColor: `${userColor}` }}>

                                        </div>
                                        {ConvertColor(userColor)}
                                        <ChevronDown />
                                    </div>

                                    <div className={`absolute top-0 mt-[45px] overflow-y-scroll w-[fit-content] h-[150px] z-[10] border-[1px] rounded-[5px] no-scrollbar opacity-100 transition-opacity duration-300 ease-in-out ${userColorStatut ? 'opacity-100 visible' : 'opacity-0 invisible'}`} style={{ borderColor: `${userColor}` }}>
                                        <ul className='flex flex-col gap-[5px] justify-center item bg-white'>
                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-start gap-[10px] cursor-pointer' onClick={() => { setUserColor("#2D55FF"); setUserColorStatut(!userColorStatut); }}><div className='w-[25px] h-[25px] rounded-full bg-[#2D55FF]'></div>Azure</li>
                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-start gap-[10px] cursor-pointer' onClick={() => { setUserColor("#197292"); setUserColorStatut(!userColorStatut); }}><div className='w-[25px] h-[25px] rounded-full bg-[#197292]'></div>Minéral</li>

                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-start gap-[10px] cursor-pointer' onClick={() => { setUserColor("#26C281"); setUserColorStatut(!userColorStatut); }}><div className='w-[25px] h-[25px] rounded-full bg-[#26C281]'></div>Printemps</li>
                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-start gap-[10px] cursor-pointer' onClick={() => { setUserColor("#BE5683"); setUserColorStatut(!userColorStatut); }}><div className='w-[25px] h-[25px] rounded-full bg-[#BE5683]'></div>Incarnat</li>
                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-start gap-[10px] cursor-pointer' onClick={() => { setUserColor("#CD1C18"); setUserColorStatut(!userColorStatut); }}><div className='w-[25px] h-[25px] rounded-full bg-[#CD1C18]'></div>Spicy</li>

                                            <li className='hover:bg-[#dddddd] w-full py-[7px] px-[10px] flex justify-start gap-[10px] cursor-pointer' onClick={() => { setUserColor("#FF9470"); setUserColorStatut(!userColorStatut); }}><div className='w-[25px] h-[25px] rounded-full bg-[#FF9470]'></div>Saumon</li>

                                        </ul>
                                    </div>


                                </div>
                            </div>
                        </div>

                        <div className='flex w-full gap-[10px]'>
                            <a href="/dashboard" className='w-[fit-content] p-[8px] rounded-full cursor-pointer hover:scale-[.9] transition-all duration-300 ease-in-out bg-[#B6B6B6] hover:bg-[#FF462D]'>
                                <X stroke='#ffffff' />
                            </a>
                            <button onClick={() => { setSuccessPopUpStatut(false); setErrorPopUpStatut(false) }} type='submit' className='w-full z-0 text-white p-[8px] rounded-[5px] cursor-pointer hover:scale-[.98] transition-all duration-300 ease-in-out' style={{ backgroundColor: `${userColor}` }}>Enregistrer</button>
                        </div>
                    </form>
                </div>
            )}
        </main>

    )
}