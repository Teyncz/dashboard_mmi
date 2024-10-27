import { useState, useEffect } from "react";
import axios from 'axios'
import { useRouter } from "next/router";
import studentNumbers from '../public/data/students.json'
import logoIUT from '../public/images/logo_iut.jpg'
import Image from "next/image";
import { KeyRound } from 'lucide-react';
import { Fingerprint } from 'lucide-react';
import { Mail } from 'lucide-react';
import { CircleAlert } from 'lucide-react';

export default function Register() {

    const router = useRouter()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            axios.post('/api/verify-token', { token })
                .then(response => {
                    setUser(response.data.user);
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        console.log("Token detected but expired");
                        try {
                            console.log("Try to remove the token ");
                            localStorage.removeItem('token');
                            console.log("Token successfully removed");
                        } catch (error) {
                            console.error("token removal failed", error);
                        }
                    }
                    else {
                        console.error("Can't check token", error);
                    }

                })
        } else {
            console.log('No token has been detected, you can try to connect or register.')
        }
    }, [])

    const [studentNumberStatus, setStudentNumberStatus] = useState(true)
    const [studentNumber, setStudentNumber] = useState('')

    const [emailStatus, setEmailStatus] = useState(true)
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [matchPassword, setMatchPassword] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (studentNumbers.includes(studentNumber)) {
            try {

                const response = await axios.post('/api/register', {
                    email,
                    password,
                    studentNumber
                });

                console.log('tets')
                console.log(response.data)

                try {

                    const response = await axios.post('/api/login', {
                        email,
                        password
                    });

                    localStorage.setItem('token', response.data.token);
                    router.push('dashboard');


                } catch (error) {
                    console.error('Push login failed', error);
                }

            } catch (error) {

                if (error.response && error.response.status === 409) {
                    setStudentNumberStatus(true)
                    setEmailStatus(false)
                }
                else {

                }
            }

        } else {
            setEmailStatus(true)
            setStudentNumberStatus(false)
        }
    }

    const checkPassword = async (p) => {

        if (p != password) {
            setMatchPassword(false)
        } else {
            setMatchPassword(true)
        }
    }

    if (!user) {
        return (

            <main className="h-[100vh] flex items-center justify-center">
                <section className="w-[500px] px-[35px] pb-[55px] pt-[25px] rounded-[10px] shadow-custom login_shadow">

                    <div className="flex justify-center items-center gap-[10px]">
                        <div className="flex flex-col gap-[4px] items-end">
                            <div className="flex gap-[4px]">
                                {Array(9).fill().map((_, index) => (
                                    <div key={index} className={`h-[2px] w-[2px] rounded-[2px] ${index === 2 ? 'bg-[#B12B4D66]' : index === 5 ? 'bg-[#4B33A266]' : 'bg-[#2D55FF]'}`}></div>
                                ))}
                            </div>
                            <div className="flex gap-[4px]">
                                {Array(10).fill().map((_, index) => (
                                    <div key={index} className={`h-[2px] w-[2px] rounded-[2px] ${index === 4 ? 'bg-[#4B33A266]' : 'bg-[#2D55FF]'}`}></div>
                                ))}
                            </div>
                            <div className="flex gap-[4px]">
                                {Array(9).fill().map((_, index) => (
                                    <div key={index} className={`h-[2px] w-[2px] rounded-[2px] ${index === 2 ? 'bg-[#B12B4D66]' : 'bg-[#2D55FF]'}`}></div>
                                ))}
                            </div>
                        </div>
                        <Image src={logoIUT} width={50} height={50} className="rounded-[5px]" />
                        <div className="flex flex-col gap-[4px] items-start">
                            <div className="flex gap-[4px]">
                                {Array(9).fill().map((_, index) => (
                                    <div key={index} className={`h-[2px] w-[2px] rounded-[2px] ${index === 6 ? 'bg-[#B12B4D66]' : 'bg-[#2D55FF]'}`}></div>
                                ))}
                            </div>
                            <div className="flex gap-[4px]">
                                {Array(10).fill().map((_, index) => (
                                    <div key={index} className={`h-[2px] w-[2px] rounded-[2px] ${index === 5 ? 'bg-[#4B33A266]' : 'bg-[#2D55FF]'}`}></div>
                                ))}
                            </div>
                            <div className="flex gap-[4px]">
                                {Array(9).fill().map((_, index) => (
                                    <div key={index} className={`h-[2px] w-[2px] rounded-[2px] ${index === 5 ? 'bg-[#4B33A266]' : index === 7 ? 'bg-[#B12B4D66]' : 'bg-[#2D55FF]'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mb-[30px] mt-[17px]">
                        <h2 className="text-[24px] font-[500]">Inscription</h2>
                        <p className="text-[14px] mb-[30px]">Inscrivez-vous avec votre email et mot de passe</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col">

                        <div className="flex flex-col gap-[17px]">

                            <div className="flex gap-[10px] border-[1px] border-[#2D55FF] rounded-[5px] py-[10px] px-[14px] items-center">
                                <Fingerprint
                                    color={studentNumber.length > 0 ? "#2D55FF" : "#787878"}
                                    strokeWidth={1.5}
                                />

                                <input
                                    className="outline-none w-[100%] text-[14px]"
                                    type="number"
                                    value={studentNumber}
                                    onChange={(e) => setStudentNumber(e.target.value)}
                                    placeholder="Numéro étudiant"
                                    required
                                />
                            </div>

                            <div className="flex gap-[10px] border-[1px] border-[#2D55FF] rounded-[5px] py-[10px] px-[14px] items-center">
                                <Mail
                                    color={email.length > 0 ? "#2D55FF" : "#787878"}
                                    strokeWidth={1.5}
                                />

                                <input
                                    className="outline-none w-[100%] text-[14px]"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Votre adresse email"
                                    required
                                />
                            </div>

                            <div className="flex gap-[10px] border-[1px] border-[#2D55FF] rounded-[5px] py-[10px] px-[14px] items-center">
                                <KeyRound
                                    color={password.length > 0 ? "#2D55FF" : "#787878"}
                                    strokeWidth={1.5}
                                />

                                <input
                                    className="outline-none w-[100%] text-[14px]"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Votre mot de passe"
                                    required
                                />
                            </div>

                            <div className="flex gap-[10px] border-[1px] border-[#2D55FF] rounded-[5px] py-[10px] px-[14px] items-center">
                                <KeyRound
                                    color={confirmPassword.length > 0 ? "#2D55FF" : "#787878"}
                                    strokeWidth={1.5}
                                />

                                <input
                                    className="outline-none w-[100%] text-[14px]"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value); checkPassword(e.target.value) }}
                                    placeholder="Confirmer votre mot de passe"
                                    required
                                />
                            </div>
                        </div>


                        <p className="text-[13px] mt-[10px] mb-[35px]">Vous avez déjà un compte ?<a href="/login" className="underline text-[#2D55FF] text-[11px] pl-[5px]">Se connecter</a></p>

                        {!matchPassword && <div className="flex items-center gap-[7px] mb-[10px]"><CircleAlert color="#B12647" size={13} /><p className="text-[11px] text-[#B12647]">Les mots de passe saisis ne sont pas identiques.</p></div>}
                        {!studentNumberStatus && <div className="flex items-center gap-[7px] mb-[10px]"><CircleAlert color="#B12647" size={13} /><p className="text-[11px] text-[#B12647]">Le numéro étudiant n'est pas valide.</p></div>}
                        {!emailStatus && <div className="flex items-center gap-[7px] mb-[10px]"><CircleAlert color="#B12647" size={13} /><p className="text-[11px] text-[#B12647]">Cette adresse email est déjà utilisée.</p></div>}

                        <button type="submit" className="bg-[#2D55FF] h-[40px] rounded-[5px] text-[14px] font-[500] text-[white] transition duration-150 ease-in-out hover:scale-[98%] hover:transition hover:duration-150 hover:ease-in-out ">S'inscrire</button>

                    </form>
                </section>
            </main>

        )
    } else {
        router.push('/dashboard')
    }
}