import { useState, useEffect } from "react";
import '../assets/styles/dataPage.css'
import { fetchUsers } from "../features/userData/getUsersSlice";
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import { useAppSelector, useAppDispatch } from '../app/hooks'


export default function DataPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const users = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])
    const location = useLocation();
    console.log(location);

    if (users.fetchStatus === 'success') {
        const nPages = Math.ceil((users.data.results.length) / recordsPerPage);
        return (
            <div className='page'>
                <Header />
                <div className='datapage'>
                    <div className='homepage-cover'>
                        <h2 className='headContent'> List of employees</h2>
                    </div>
                    <div className='table-content'>
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
                                {users.fetchStatus === 'success' && (users.data.results.slice(indexOfFirstRecord,
                                    indexOfLastRecord)).map((user, index) => {
                                        return (
                                            <tr className='tableRowContent' key={index} >

                                                <td> <Link title="Click to edit this record" to={`${user.id}`}>{user.name}</Link></td>
                                                <td>{user.birthday_date}</td>
                                                <td >{user.email}</td>
                                                <td >{user.phone_number}</td>
                                                <td >{user.address}</td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>

                        <Pagination
                            nPages={nPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                    <article>
                        Hello!
                        So, what additional information can be written here but cannot be found in my CV or on my LinkedIn page?..
                        I’m Veronika and here is my task. I don’t know whether you’d like my project but I’m sure that under control of Seniors, Leads and Mentors from your company I’ll be working faster, better and my code will be cleaner)))) I adore coding. I always say Front-end development is exciting for me, because I feel like being an artist who draws a website using HTML/CSS, or a witch who adds functionality to a website through manipulations with "magic" JS tools)))
                        Also, if you find a user in your database whose name was changed into a heavy metal or rock star’s name, be sure it was definitely me while testing PATCH request 😉
                        What about me as a person and my private life? I used to be an Internally Displaced Person twice. And it just made me stronger. My life challenges are like those lemons which I catch and transform into lemonade. And, of course, like all of us in Ukraine, I never surrender 💙💛

                    </article>
                </div>
                <Footer />
            </div>
        )
    }
}