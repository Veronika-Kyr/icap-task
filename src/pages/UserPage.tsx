import { useEffect, useState, createRef } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import '../assets/styles/userPage.css'
import { fetchIdUser } from '../features/userData/fetchIdUser';
import { fetchEdit } from '../features/userData/editUserSlice';
import { IUser } from '../interfaces/user';
import { IUserParams } from '../interfaces/user';


export function UserPage() {
    const user = useAppSelector((state) => state.user);
    const form = createRef<HTMLFormElement>();
    const [formState, setFormState] = useState<IUser>({
        "id": '',
        "name": '',
        "birthday_date": '',
        "email": '',
        "phone_number": '',
        "address": ''
    });
    const [formVisibslity, setFormVisibslity] = useState(false);
    const [clickedSaveBTN, setClickedSaveBTN] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const param: IUserParams = useParams();

    useEffect(() => {
        dispatch(fetchIdUser(param.id as string))
        setFormState(user.onIDdata);
    }, [dispatch, clickedSaveBTN])

    function changeState(value: string, field: string) {
        const clone = { ...formState };
        clone[field as keyof IUser] = value;
        setFormState(clone);
    }

    function submitData(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(fetchEdit(formState));
        form.current?.reset();
        setFormVisibslity(false);
        setClickedSaveBTN(true);
        window.alert('You have saved all the changes successfully');
    }

    function handleName(event: React.FormEvent<HTMLInputElement>) {
        changeState(event.currentTarget.value, 'name')
    }

    function handleBDay(event: React.FormEvent<HTMLInputElement>) {
        changeState(event.currentTarget.value, 'birthday_date')
    }

    function handleEmail(event: React.FormEvent<HTMLInputElement>) {
        changeState(event.currentTarget.value, 'email')
    }

    function handlePhone(event: React.FormEvent<HTMLInputElement>) {
        changeState(event.currentTarget.value, 'phone_number')
    }

    function handleAddress(event: React.FormEvent<HTMLInputElement>) {
        changeState(event.currentTarget.value, 'address')
    }


    if (user.onIDdata && user.fetchStatus !== 'error') {
        return (
            <div className='editUserPage'>
                <div>
                    <p><Link to='/datapage'>List of Employees</Link> </p>
                </div>
                <div className='contentEdit'>
                    <h2 className='head'>Edit information about the User</h2>
                    <button className='editBTN' onClick={() => { setFormVisibslity(true), setClickedSaveBTN(false) }}>🖊 Edit fields</button>

                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Full name</th>
                                <th scope='col'>Date of birth</th>
                                <th scope='col' >Email</th>
                                <th scope='col' >Phone number</th>
                                <th scope='col' >Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='tableRowContent'>

                                <td> {user.onIDdata.name}</td>
                                <td >{user.onIDdata.birthday_date}</td>
                                <td >{user.onIDdata.email}</td>
                                <td >{user.onIDdata.phone_number}</td>
                                <td >{user.onIDdata.address}</td>
                            </tr>
                        </tbody>
                    </table>
                    {formVisibslity && <div>
                        <form className='editForm' onSubmit={submitData} ref={form}>
                            <div className='inputBlock'>
                                <input className='inputEdit' type='text' onChange={handleName} />
                                <input className='inputEdit' type='text' onChange={handleBDay} />
                                <input className='inputEdit' type='text' onChange={handleEmail} />
                                <input className='inputEdit' type='text' onChange={handlePhone} />
                                <input className='inputEdit' type='text' onChange={handleAddress} /></div>
                            <button className='changesBTN' type='submit'>SAVE CHANGES</button>
                        </form>
                    </div>}
                </div>
            </div>
        )
    }
    else { navigate("*") }
}
