import React, { useState, useEffect } from "react";
import '../assets/styles/dataPage.css'
import { fetchUsers } from "../features/userData/getUsersSlice";
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
                                                <td>{user.name}</td>
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
                        Частково я ще з підліткового віку була пов'язана зі сферою IT та вивчала програмування.
                        У 90-ті це були Basic та Pascal, згодом трохи Delphi. Хоча ВНЗ, який я закінчила, авіаційний, -
                        випускаюча кафедра дала можливість вивчати дисципліни IT сфери (основи проектування та створення баз даних).
                        В аспірантурі моя наукова робота була пов'язана з розробкою адаптивного інтерфейсу автоматизованих систем в
                        авіації з використанням засобів СППР. Дисципліни, що я викладала у той час, також зі сфери IT. І, звісно,
                        мені завжди було це цікаво. Front-end development для мене новий та цікавий напрямок, але він гармонійно
                        вписався у мій попередній досвід. Мені подобається верстати сайти, ще більше подобається працювати на JS над
                        їхньою функціональністю. Тож з часом хотілося б розвинутись у напрямку fullstack.
                    </article>
                </div>
                <Footer />
            </div>
        )
    }
}