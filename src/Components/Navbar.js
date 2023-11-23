import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function Navbar() {

    let token = localStorage.getItem("token");
    const navigate = useNavigate();

    const name = localStorage.getItem('name');

    // useEffect(() => {
    //     axios.post('http://localhost/phpdasar/backend/user.php')
    //         .then((response) => {
    //             setUser(response.data);
    //             setLoading(false)
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             setLoading(false); // Set loading ke false jika terjadi kesalahan
    //         });
    // }, [])

    const handleLogout = () => {

        const formData = new FormData();
        formData.append('token', token);

        // axios.post('http://localhost/phpdasar/phpcrud/api/logout.php', formData)
        axios.post('https://testreactlaravel.000webhostapp.com/backend/logout.php', formData)
            .then((response) => response.data)
            .then((response) => {
                if (response[0].code === 404) {
                    navigate('/');
                } else {
                    localStorage.removeItem('token');
                    localStorage.setItem('loginStatus', 'Berhasil Logout');
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.log(error);
                // Tangani kesalahan jika gagal mengupdate status_session
            });
        // localStorage.removeItem('token');
        // localStorage.setItem("loginStatus", "Berhasil Logout");
        // navigate('/login');
    }

    const pageLogin = () => {
        navigate('/login');
    }

    return (
        <div>
            {token ? (
                <header id="header" className="fixed-top d-flex align-items-center" style={{ height: '60px' }}>
                    <div className="container d-flex align-items-center justify-content-between">

                    <div className="logo">
                            <h1><a href="/landing"><img src="assets/img/online.png" width={30}></img> MKP</a></h1>
                        </div>

                        <nav id="navbar" className="navbar">
                            <ul>
                                <li><a className="nav-link scrollto" href="#">Kategori</a></li>
                                {/* <li><a className="nav-link scrollto " href="#portfolio">Produk</a></li> */}
                                <li><a className="nav-link" style={{ cursor: 'pointer' }}>Bantuan</a></li>

                                <li className="dropdown">
                                    <a href="#"><span><b>{name}</b></span>
                                        <i className="bi bi-chevron-down"></i>
                                    </a>
                                    <ul>
                                        <li><a href="#">Profile</a></li>
                                        {/* <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                                        <ul>
                                            <li><a href="#">Deep Drop Down 1</a></li>
                                            <li><a href="#">Deep Drop Down 2</a></li>
                                            <li><a href="#">Deep Drop Down 3</a></li>
                                            <li><a href="#">Deep Drop Down 4</a></li>
                                            <li><a href="#">Deep Drop Down 5</a></li>
                                        </ul>
                                    </li> */}
                                        <li><a href="#">Pengaturan</a></li>
                                        <li style={{ cursor: 'pointer', color: 'white' }}>
                                            <hr class="hr hr-blurry" />
                                            <a onClick={handleLogout}>Keluar</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <i className="bi bi-list mobile-nav-toggle"></i>
                        </nav>
                    </div>
                </header>
            ) : (
                <header id="header" className="fixed-top d-flex align-items-center" style={{ height: '60px' }}>
                    <div className="container d-flex align-items-center justify-content-between">
                        <div className="logo">
                            {/* <h1><a href="/landing"><img src="https://i.postimg.cc/5tcn9DK2/Pngtree-circle-clipart-green-circle-5553152.png" width={30}></img> MKP</a></h1> */}
                            <h1><a href="/landing"><img src="assets/img/online.png" width={30}></img> MKP</a></h1>
                        </div>
                        <nav id="navbar" className="navbar">
                            <ul>
                                <li><a className="nav-link scrollto" href="#">Home</a></li>
                                <li><a className="nav-link scrollto" href="#services">Fitur</a></li>
                                <li><a className="nav-link scrollto " href="#category">Kategori</a></li>
                                <li><a className="nav-link scrollto" href="#team">Team</a></li>

                                {token ? (
                                    <li className="nav-item dropdown no-arrow">
                                        <a href="#"><span><b>{name}</b></span>
                                            <i className="bi bi-chevron-down"></i>
                                        </a>
                                        <ul>
                                            <li><a href="#">Profile</a></li>
                                            {/* <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                                        <ul>
                                            <li><a href="#">Deep Drop Down 1</a></li>
                                            <li><a href="#">Deep Drop Down 2</a></li>
                                            <li><a href="#">Deep Drop Down 3</a></li>
                                            <li><a href="#">Deep Drop Down 4</a></li>
                                            <li><a href="#">Deep Drop Down 5</a></li>
                                        </ul>
                                    </li> */}
                                            <li><a href="#">Pengaturan</a></li>
                                            <li style={{ cursor: 'pointer' }}>
                                                <hr class="hr hr-blurry" />
                                                <a onClick={handleLogout}>Keluar</a>
                                            </li>
                                        </ul>
                                    </li>
                                ) : (
                                    <li><a onClick={pageLogin} className="getstarted" style={{ cursor: 'pointer' }}>Login</a></li>
                                )}
                            </ul>
                            <i className="bi bi-list mobile-nav-toggle"></i>
                        </nav>

                    </div>
                </header>
            )}
        </div>
    );
}