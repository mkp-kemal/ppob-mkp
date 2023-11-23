import React, { useEffect, useState } from "react";
import '../Assets/css/login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import logoGoogle from '../Assets/img/google.png'
import { useNavigate } from "react-router-dom";

function Login() {
    useEffect(() => {
        let login = localStorage.getItem("token");
        let name = localStorage.getItem("name");
        let loginStatus = localStorage.getItem('loginStatus');
        if (login) {
            navigate('/');
        }
        if (loginStatus) {
            showToastMsgSuccess(loginStatus);
            setTimeout(() => {
                localStorage.clear();
            }, 2000);
        }
    }, []);

    //LOGIN
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        // axios.post('http://localhost/phpdasar/phpcrud/api/login.php', formData)
        axios.post('https://testreactlaravel.000webhostapp.com/backend/login.php', formData)
            .then((response) => response.data)
            .then((response) => {
                setMessage(response[0].result);
                if (response[0].code === 402) {
                    showToastMsg(response[0].result);
                    setLoading(false);
                } else {
                    showToastMsgSuccess(response[0].result);
                    const token = response[0].token;
                    setTimeout(() => {
                        localStorage.setItem('token', token);
                        localStorage.setItem('name', response[0].name);
                        setLoading(false);
                        navigate('/');
                    }, 2000);
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    //=================================TOAST=============================
    // TOAST COMING SOON
    const showToast = () => {
        toast.warn('Fitur ini sedang dalam pengembangan', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    // TOAST ERROR
    const showToastMsg = (msg) => {
        toast.error(msg, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    // TOAST SUKSES
    const showToastMsgSuccess = (msg) => {
        toast.success(msg, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <div>
            <ToastContainer />
            <section className="background-radial-gradient overflow-hidden">
                <div className="container px-0 py-0 px-md-5 text-center text-lg-start my-0">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
                                The best offer <br />
                                <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your business</span>
                            </h1>
                            <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Temporibus, expedita iusto veniam atque, magni tempora mollitia
                                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                                ab ipsum nisi dolorem modi. Quos?
                            </p>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                            <div className="card bg-glass">
                                <div className="card-body px-5 py-5 px-md-5">
                                    <form method="post" onSubmit={handleLogin}>
                                        <div className="row text-center mb-4">
                                            <h3><b>Login</b></h3>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                name="username"
                                                type="text"
                                                id="form3Example3"
                                                className="form-control"
                                                required
                                                onChange={(e) => setUsername(e.target.value)}
                                                value={username}
                                                placeholder="Username" />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                name="password"
                                                type="password"
                                                id="form3Example4"
                                                className="form-control"
                                                required
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                placeholder="Password" />
                                        </div>

                                        <div className="text-center">
                                            {loading ? (
                                                <button type="submit" disabled className="btn btn-primary btn-block mb-4" style={{ width: '100%' }}>
                                                    Loading...
                                                </button>
                                            ) : (
                                                <button type="submit" className="btn btn-primary btn-block mb-4" style={{ width: '100%' }}>
                                                    Login
                                                </button>
                                            )}
                                        </div>

                                        <div className="text-center">
                                            <p>or sign up with:</p>
                                            <button type="button" className="btn btn-floating mx-1 btn btn-outline-dark" style={{ borderRadius: '5px' }} onClick={() => showToast()}>
                                                {/* <i className="fab fa-google"></i> */}
                                                <img src={logoGoogle} width={23} alt="Google" />
                                                <span> Google</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* FOLLOW */}
                        <div className="text-center text-white">
                            <div className="container p-0 pb-0">
                                <section>
                                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>

                                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                                        <i className="fab fa-twitter"></i>
                                    </a>

                                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                                        <i className="fab fa-google"></i>
                                    </a>

                                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                                        <i className="fab fa-instagram"></i>
                                    </a>

                                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>

                                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                                        <i className="fab fa-github"></i>
                                    </a>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;


