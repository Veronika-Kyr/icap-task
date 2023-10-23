import React, { useState, useEffect } from 'react';
import '../assets/styles/loginPage.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { fetchLogin } from '../features/login/loginSlice';
import { ILoginData } from '../interfaces/user';
import { useAppSelector, useAppDispatch } from '../app/hooks'


export default function LoginPage() {
    const [password, setUserPassword] = useState('');
    const [username, setUserName] = useState('');
    const [clickedSubBTN, setclickedSubBTN] = useState(false);
    const [userDataR, setuserDataR] = useState<ILoginData>({
        'username': '',
        'password': ''
    });
    const subscribe = useAppSelector((state) => state.login);
    const dispatch = useAppDispatch();


    function getUserName(event: React.FormEvent<HTMLInputElement>) {
        setUserName(event.currentTarget.value);
    }
    function getPassword(event: React.FormEvent<HTMLInputElement>) {
        setUserPassword(event.currentTarget.value);
    }

    function handleSubscribe(e) {
        e.preventDefault();
        setclickedSubBTN(true);
        setuserDataR({ 'username': username, 'password': password });
        dispatch(fetchLogin(userDataR));
    }


    useEffect(() => {
        if (!clickedSubBTN) return;
        // setdisabledBtn(true);
        if (subscribe.isSubscribed) {
            //  setdisabledBtn(false);
            setclickedSubBTN(false);
        }
    }, [clickedSubBTN, subscribe.isSubscribed])

    {/*  useEffect(() => {
        if (subscribe.data.error) {
            window.alert(subscribe.data.error);
            setclickedSubBTN(false);
            setdisabledBtn(false);
            setEmail('');
            setclickedunSubBTN(false);
        }
    }, [subscribe.data.error])*/}



    return (
        <div className='page'>
            <Header />
            <div className='datapage'>
                <div className='joinProgram_cover'>
                    <h1>Welcome to our company!</h1>
                    {!subscribe.isSubscribed && <div>  <h2 className='joinHeader'> Please, sign in to view our list of employees</h2>

                        <form className='joinForm'>
                            <input className='joinMail' title='Enter your username here' placeholder='username' type="text" onChange={getUserName} />
                            <input className='joinMail' title='Enter your password here' placeholder='password' type="password" onChange={getPassword} />
                            <button className='joinBtns' type='submit' onClick={handleSubscribe} >Sign in</button>

                        </form></div>}
                    {subscribe.isSubscribed && <p>You've logged successfully! Now view <Link to='datapage'>List of employees</Link></p>}
                </div>
            </div>
            <Footer />
        </div>
    )
}


