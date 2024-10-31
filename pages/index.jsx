import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { useRouter } from "next/router";
import dashboard from '../public/images/dashboard.png'
import logo from '../public/images/logo.svg'
import Image from "next/image";
import graph from "../public/images/graph.png"
import { List, CloudUpload, Calendar, ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import Head from 'next/head'


import localFont from 'next/font/local'

const sfPro = localFont({
    src: [
        {
            path: './fonts/SFPRODISPLAYBOLD.woff2',
            weight: '600',
            style: 'bold',
        },
        {
            path: './fonts/SFPRODISPLAYMEDIUM.woff2',
            weight: '500',
            style: 'medium',
        },
        {
            path: './fonts/SFPRODISPLAYREGULAR.woff2',
            weight: '400',
            style: 'normal',
        },
    ],
})


export default function index() {

    const router = useRouter()
    const [user, setUser] = useState(null)
    const [userStatut, setUserStatut] = useState(false)

    const [responseStatut, setResponseStatut] = useState(0)
    const [mobileMenuStatut, setMobileMenuStatut] = useState(false)

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
                        setUserStatut(true)
                    }

                })
                .catch(error => {
                    console.error('Error occurred:', error);
                });
        }

    }, []);

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
        <div className={`${sfPro.className} px-[30px] lg:px-0`}>
            <Head>
                <title>Dashboard MMI</title>
                <meta name='Simplifiez le suivi des résultats académiques avec notre dashboard intuitif, conçu pour centraliser et organiser les notes des étudiants en un seul espace pratique et sécurisé.'/>
            </Head>
            <header className="">
                <div className='flex lg:hidden mt-[40px]'>
                    {mobileMenuStatut ? (
                        <X
                            onClick={() => { setMobileMenuStatut((prev) => !prev); console.log(mobileMenuStatut) }}
                            size={35}
                        />
                    ) : (
                        <Menu
                            onClick={() => { setMobileMenuStatut((prev) => !prev); console.log(mobileMenuStatut) }}
                            size={35}
                        />
                    )}

                </div>
                <div className={`flex-col ${mobileMenuStatut ? 'flex' : 'hidden'} lg:flex lg:flex-row lg:h-[40px] gap-[50px] items-center justify-between w-full px-[100px] mt-[20px] mb-[150px] lg:mb-0 transition-all duration-300 ease-in-out`}>
                    <div className="hidden lg:block lg:w-[25%]">
                        <Image
                            src={logo}
                        />
                    </div>
                    <nav className="flex-col lg:flex-row flex justify-center items-center">
                        <ul className="list-none flex flex-col lg:flex-row items-center lg:items-start gap-[20px] lg:gap-[50px]">
                            <li><a href="#Features" className="text-[16px] font-[400]">Fonctionnalités</a></li>
                            <li><a href="#FAQ" className="text-[16px] font-[400]">FAQ</a></li>
                            <li><a href="#Changelog" className="text-[16px] font-[400]">Changelog</a></li>
                            <li><a href="#Contact" className="text-[16px] font-[400]">Contact</a></li>
                        </ul>
                    </nav>
                    {userStatut ? (
                        <div className="flex flex-col-reverse lg:flex-row gap-[20px] lg:gap-[35px] justify-end min-h-[40px] h-full lg:w-[25%] min-w-[fit-content]">
                            <a href="/dashboard" className=" h-full w-[40px] aspect-square rounded-full flex items-center justify-center font-[400] text-white text-[1.1rem] hover:scale-[.92] transition-all duration-300 ease-in-out" style={{ backgroundColor: `${setProfileColor(user.email.charAt(0).toLowerCase())}` }}>
                                {user.email.charAt(0).toUpperCase()}
                            </a>
                        </div>
                    ) : (
                        <div className="flex flex-col-reverse lg:flex-row gap-[20px] lg:gap-[35px] justify-end items-center lg:w-[25%] min-w-[fit-content]">
                            <a href="/login" className="text-[16px] font-[500]">Se connecter</a>
                            <a href="/register" className="bg-blue-gradient flex items-center justify-center text-[16px] font-[500] text-white w-[150px] h-[40px] rounded-[5px] hover:scale-[.97] transition-all duration-300 ease-in-out">S’inscrire</a>
                        </div>
                    )}
                </div>
            </header>
            <main className="flex flex-col items-center gap-[100px] mt-[50px] lg:mt-[185px]">
                <section className="flex flex-col justify-end items-center gap-[40px]">
                    <div className="leading-none flex flex-col items-center gap-[6px]">
                        <h2 className="font-[700] text-[36px] text-center sm:text-[64px] text-darkGray">Un suivi en un clic.</h2>
                        <p className="font-[400] text-[16px] text-center sm:text-[20px] text-darkGray">Une app simple et efficace pour votre scolarité.</p>
                    </div>
                    <a href="/register" className="bg-blue-gradient flex items-center justify-center text-[16px] font-[500] text-white w-[200px] h-[40px] rounded-[5px] hover:scale-[.97] transition-all duration-300 ease-in-out">Commencer</a>
                </section>
                <div className=' overflow-hidden max-w-[1143px] w-full rounded-[8px] sm:rounded-[15px] ' style={{ boxShadow: "0px 0px 32.7px 11px rgba(152, 172, 255, 0.26)" }}>
                    <Image
                        src={dashboard}
                        style={{ width: '100%' }}
                    />
                </div>
            </main>
            <section className="mt-[100px] sm:mt-[180px] max-w-[1143px] mx-auto overflow-hidden" id="Features">
                <div className="text-center leading-none flex flex-col items-center gap-[10px]">
                    <h3 className="text-[20px] sm:text-[32px] font-[500] text-darkGray">Toutes les données dont vous avez besoin</h3>
                    <p className="text-[14px] sm:text-[20px] font-[400] text-darkGray opacity-70 max-w-[665px]">Accédez rapidement et sans effort à toutes les données nécessaires pour suivre
                        votre année universitaire.</p>
                </div>
                <div className="flex flex-col-reverse gap-[30px] sm:gap-0 sm:flex-row mt-[80px] sm:mt-[150px] items-center">
                    <div className="w-full flex flex-col items-start gap-[20px]">
                        <h4 className="text-[20px] sm:text-[32px] font-[500] text-darkGray leading-none">Graphique des compétences</h4>
                        <p className="text-[14px] sm:text-[16px] font-[400] leading-[23px] text-darkGray opacity-70 sm:w-[70%]">Un calcul précis des moyennes des compétences, en intégrant les coefficients selon la maquette MCC </p>
                    </div>
                    <div className='max-w-[567px] w-full overflow-hidden'>
                        <Image
                            style={{ width: "100%" }}
                            src={graph}
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-[50px] max-w-[1143px] mt-[50px] sm:mt-[150px]">
                    <div className="flex flex-col items-center sm:items-start gap-[15px] ">
                        <div className="w-[70px] h-[70px] bg-customBlue rounded-[10px] flex justify-center items-center">
                            <List color="#ffffff" size={32} />
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <h4 className="text-[20px] sm:text-[32px] text-center sm:text-left font-[500] text-darkGray leading-none">Liste des notes</h4>
                            <p className="text-[14px] sm:text-[16px] text-center sm:text-left font-[400] leading-[23px] text-darkGray opacity-70" >Une liste pour suivre en temps réel les dernières notes publiées sur l'intranet.</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center sm:items-start gap-[15px]">
                        <div className="w-[70px] h-[70px] bg-customBlue rounded-[10px] flex justify-center items-center">
                            <Calendar color="#ffffff" size={32} />
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <h4 className="text-[20px] sm:text-[32px] text-center sm:text-left font-[500] text-darkGray leading-none">Agenda</h4>
                            <p className="text-[14px] sm:text-[16px] text-center sm:text-left font-[400] leading-[23px] text-darkGray opacity-70" >Un agenda personnel intuitif qui vous permet d'ajouter et de gérer facilement vos tâches.</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center sm:items-start gap-[15px]">
                        <div className="w-[70px] h-[70px] bg-customBlue rounded-[10px] flex justify-center items-center">
                            <CloudUpload color="#ffffff" size={32} />
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <h4 className="text-[20px] sm:text-[32px] text-center sm:text-left font-[500] text-darkGray leading-none">Dêpot</h4>
                            <p className="text-[14px] sm:text-[16px] text-center sm:text-left font-[400] leading-[23px] text-darkGray opacity-70" >Un espace de dépôt synchronisé avec Moodle vous assure de ne manquer aucun rendu.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='pb-[100px] sm:pb-[200px] mt-[100px] sm:mt-[250px] flex flex-col sm:flex-row gap-[30px] sm:gap-0 max-w-[1143px] mx-[auto] justify-between' id='FAQ'>

                <p className='text-[32px] text-center text-darkGray font-[500]'>FAQ</p>

                <div className=''>
                    <div className='max-w-[565px] w-full'>
                        <div className='flex flex-col gap-[10px]'>
                            <div onClick={() => setResponseStatut(prev => (prev === 1 ? 0 : 1))} className='flex items-start sm:items-center justify-between cursor-pointer'>
                                <h5 className='text-[16px] sm:text-[20px] font-[500] text-darkGray'>Puis-je suivre les notes de mes camarades de classe ?</h5>
                                <div className='min-w-[fit-content]'>{responseStatut == 1 ? (<ChevronUp />) : (<ChevronDown />)}</div>
                            </div>
                            <div className='block overflow-hidden transition-max-height duration-300 ease-in-out' style={{ maxHeight: responseStatut == 1 ? '150px' : '0px' }}>
                                <p className='text-[14px] sm:text-[16px] mb-[20px]'>Non, il n'est pas possible de suivre les notes de vos camarades de classe. Chaque compte utilisateur est strictement lié à un numéro d'étudiant unique, et un compte ne peut pas être créé avec un numéro d'étudiant déjà utilisé.</p>
                            </div>
                        </div>
                    </div>
                    <div className='max-w-[565px] w-full'>
                        <div className='flex flex-col gap-[10px]'>
                            <div onClick={() => setResponseStatut(prev => (prev === 2 ? 0 : 2))} className='flex items-start sm:items-center justify-between cursor-pointer'>
                                <h5 className='text-[16px] sm:text-[20px] font-[500] text-darkGray'>Comment sont calculées mes moyennes de compétences ?</h5>
                                <div className='min-w-[fit-content]'>{responseStatut == 2 ? (<ChevronUp />) : (<ChevronDown />)}</div>
                            </div>
                            <div className='block overflow-hidden transition-max-height duration-300 ease-in-out' style={{ maxHeight: responseStatut == 2 ? '100px' : '0px' }}>
                                <p className='text-[14px] sm:text-[16px] mb-[20px]'>Les moyennes de compétences sont calculées selon la maquette <a className='text-customBlue' target='_blank' href='https://seafile.unistra.fr/d/45b21c9b6c904892be01/files/?p=%2FBUT_MMI_MCC_S3_20242025_simplifie.pdf'>MCC</a>.</p>
                            </div>
                        </div>
                    </div>
                    <div className='max-w-[565px] w-full'>
                        <div className='flex flex-col gap-[10px]'>
                            <div onClick={() => setResponseStatut(prev => (prev === 3 ? 0 : 3))} className='flex items-start sm:items-center justify-between cursor-pointer'>
                                <h5 className='text-[16px] sm:text-[20px] font-[500] text-darkGray'>Puis-je accéder à la plateforme depuis un appareil mobile ?</h5>
                                <div className='min-w-[fit-content]'>{responseStatut == 3 ? (<ChevronUp />) : (<ChevronDown />)}</div>
                            </div>
                            <div className='block overflow-hidden transition-max-height duration-300 ease-in-out' style={{ maxHeight: responseStatut == 3 ? '100px' : '0px' }}>
                                <p className='text-[14px] sm:text-[16px] mb-[20px]'>Oui, vous pouvez accéder à la plateforme depuis un appareil mobile. Mais certaines fonctionnalités sont plus faciles à utiliser sur un écran plus grand</p>
                            </div>
                        </div>
                    </div>
                    <div className='max-w-[565px] w-full'>
                        <div className='flex flex-col gap-[10px]'>
                            <div onClick={() => setResponseStatut(prev => (prev === 4 ? 0 : 4))} className='flex items-start sm:items-center justify-between cursor-pointer'>
                                <h5 className='text-[16px] sm:text-[20px] font-[500] text-darkGray'>Les données sont-elles sécurisées ?</h5>
                                <div className='min-w-[fit-content]'>{responseStatut == 4 ? (<ChevronUp />) : (<ChevronDown />)}</div>
                            </div>
                            <div className='block overflow-hidden transition-max-height duration-300 ease-in-out' style={{ maxHeight: responseStatut == 4 ? '100px' : '0px' }}>
                                <p className='text-[14px] sm:text-[16px] mb-[20px]'>Oui, les données sont sécurisées. Les mots de passe sont stockés de manière sécurisée grâce à un processus de hachage. De plus, sans le numéro d'étudiant, il est impossible d'accéder aux notes d'un autre utilisateur.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className='max-w-[1143px] mx-auto'>
                <div className='flex justify-between items-center pb-[20px]'>
                    <Image
                        src={logo}
                    />
                    <div className='' id='Contact'>
                        <p>contact@thibault-roth.ovh</p>
                    </div>
                </div>
                <div className="relative text-center my-[20px] before:content-[''] before:absolute before:left-0 before:top-[-20px] before:opacity-35 before:w-full before:h-[1px] before:bg-darkGray">
                    <p className=' text-[12px] xs:text-[15px] font-[400]'>2024 © Copyright ROTH Thibault. All rights Reserved.</p>
                </div>
            </footer>
        </div>
    )

}