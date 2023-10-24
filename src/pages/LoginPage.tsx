import React, { useState, useEffect } from 'react';
import '../assets/styles/loginPage.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { fetchLogin } from '../features/login/loginSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks'


export default function LoginPage() {
    const [password, setUserPassword] = useState('');
    const [username, setUserName] = useState('');
    const [userNameClassName, setUsernameClassName] = useState('inputValid');
    const [error, setError] = useState(false);
    const subscribe = useAppSelector((state) => state.login);
    const dispatch = useAppDispatch();

    function getUserName(event: React.FormEvent<HTMLInputElement>) {
        if (!/^[a-zA-Z\s]+$/.test(event.currentTarget.value)) { setUsernameClassName('redBorder'); }
        else {
            setUserName(event.currentTarget.value);
            setUsernameClassName('inputValid')
        }
    }
    function getPassword(event: React.FormEvent<HTMLInputElement>) {
        setUserPassword(event.currentTarget.value);
    }

    function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(fetchLogin({ 'username': username, 'password': password }));
    }

    useEffect(() => {
        if (subscribe.data.error) {
            setError(true);
            setUserName('');
            setUserPassword('');
        }
    }, [subscribe.data.error])

    useEffect(() => {
        if (subscribe.data.message) {
            setError(false);
        }
    }, [subscribe.data.message])


    return (
        <div className='page'>
            <Header />
            <div className='datapage'>

                <h1>Welcome to our company!</h1>
                {!subscribe.isSubscribed && <div >  <h2 className='subscribeHead'> Please, sign in to view our list of employees</h2>
                    {error && <p className='errorMessage'>Your username and/or password is incorrect. Please, try again! </p>}
                    <form className='subscribingForm'>
                        <div className="form-items"> <label htmlFor="name">Enter your username </label>
                            <input id="name" className={userNameClassName} title='Enter your username here' value={username} placeholder='username' type="text" onChange={getUserName} />
                        </div>
                        <div className="form-items"> <label htmlFor="password"> Enter your password </label>
                            <input id="password" className='joinMail' title='Enter your password here' placeholder='password' value={password} type="password" onChange={getPassword} />
                        </div>
                        <button className='subscribeBTN' type='submit' onClick={handleSubscribe} >Sign in</button>

                    </form></div>}
                {subscribe.isSubscribed && <p className='successSubscribe'>You've logged successfully! Now view <Link to='datapage'>List of employees</Link></p>}

            </div>
            <Footer />
        </div>
    )
}

