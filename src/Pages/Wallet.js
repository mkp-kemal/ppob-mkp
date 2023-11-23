import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export function Wallet() {
    const [inputValue, setInputValue] = useState("");
    const [KuotaTelkomsel, setShowProductsPln] = useState(false);
    const [selectedOperator, setSelectedOperator] = useState("");
    const navigate = useNavigate();
    const name = localStorage.getItem('name');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [data, setData] = useState([]);
    const dataUsers = () => {
        const users = new FormData();
        users.append('name', name);
        axios.post('http://localhost/phpdasar/phpcrud/api/users/getUsers.php', users)
            // axios.post('https://testreactlaravel.000webhostapp.com/backend/users.php', users)
            .then((response) => {
                setData(response.data.handphone)
            }).catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        // localStorage.removeItem('dataTransaction_DONT_CHANGE')
        // localStorage.removeItem('roleTransaction_DONT_CHANGE')
        // localStorage.removeItem('IDTransaction_DONT_CHANGE')
        // localStorage.clear();
        dataUsers();
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (value.length > 10) {
            console.log('sip');
            setShowProductsPln(true);
            setSelectedOperator('pln');
        }  else {
            setShowProductsPln(false);
            setSelectedOperator("");
        }
    };
    const isInputInvalid = inputValue.length > 13;

    const toCheckout = (item) => {
        setSelectedProduct(item);
        const selectedProductJSON = JSON.stringify(item);
        var dataToStore = {
            product: selectedProductJSON,
            phoneNumber: inputValue
        };
        localStorage.setItem('dataTransaction_DONT_CHANGE', JSON.stringify(dataToStore));
        navigate('/checkoutkuota');
    };

    //MENAMPILKAN PRODUK
    const [productsXl, setProductsXl] = useState([]);
    const getProductxl = () => {
        fetch("http://localhost/phpdasar/phpcrud/api/products/pln.php")
            // fetch("https://testreactlaravel.000webhostapp.com/backend/pulsa_xl.php")
            .then(res => { return res.json() })
            .then(data => { setProductsXl(data) })
            .catch(error => { console.log(error) });
    }
    useEffect(() => {
        // getProduct();
        getProductxl();
    }, []);

    //FORMAT RUPIAH
    const formatRupiah = (amount) => {
        const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });

        return formatter.format(amount);
    };

    const handleBack = () => {
        navigate('/');
    }


    return (
        <div className="outBodyPulsa">
            <div className="bodyPulsa">
                <div className="headerPulsa">
                    <nav class="navbar-light text-center" style={{ padding: '13px', boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.30)', zIndex: '15', background: 'white', position: 'fixed', width: '100%', maxWidth: '450px' }}>
                        <a class="navbar-brand" style={{ fontSize: '15px' }}><b>Top Up E-Wallet</b></a>
                        <img onClick={handleBack} align='left' src="assets/img/back.png" width={20} className="img-fluid" alt="" style={{ cursor: 'pointer' }} />
                    </nav>
                    <div className="container" style={{ paddingTop: '50px' }}>
                        
                        {/* <div className="mt-2" style={{ display: 'none' }}> */}

                        <div>
                            <div>
                            <div className="text-start mt-3">
                                <small><b>E-Wallet</b></small>
                            </div>
                            <div className="otherPulsa mt-2">
                                <div class="row d-flex justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
                                    <hr className="mt-1" style={{ border: 'none' }} />
                                    <div className="card1 col-3 d-flex justify-content-center align-items-center">
                                        <div className="mt-3">
                                            <div>
                                                <img src="assets/img/dana.png" className="img-fluid" alt="" />
                                                {/* <img src="https://i.postimg.cc/1X qNk8RF/paket-darurat-telkomsel.jpg" className="img-fluid" alt="" /> */}
                                            </div>
                                            <div className="text-justify mt-3">
                                                <p style={{ fontSize: '11px' }}>Dana</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card2 col-3 d-flex justify-content-center align-items-center">
                                        <div className="mt-3">
                                            <div>
                                                <img src="assets/img/ovo.png" width={50} className="img-fluid" alt="" />
                                            </div>
                                            <div className="text-justify mt-3">
                                                <p style={{ fontSize: '11px' }}>OVO</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card3 col-3 d-flex justify-content-center align-items-center">
                                        <div className="mt-3">
                                            <div>
                                                <img src="assets/img/gopay.png" width={70} className="img-fluid" alt="" />
                                            </div>
                                            <div className="text-justify mt-3">
                                                <p style={{ fontSize: '11px' }}>Gopay</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card4 col-3 d-flex justify-content-center align-items-center mt-2">
                                        <div className="mt-3">
                                            <div>
                                                <img src="assets/img/provider/axis.png" width={35} className="img-fluid" alt="" />
                                            </div>
                                            <div className="text-justify mt-3">
                                                <p style={{ fontSize: '11px' }}>Pulsa Axis</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card5 col-3 d-flex justify-content-center align-items-center mt-2">
                                        <div className="mt-3">
                                            <div>
                                                <img src="assets/img/provider/3.png" width={25} className="img-fluid" alt="" />
                                            </div>
                                            <div className="text-justify mt-3">
                                                <p style={{ fontSize: '11px' }}>Pulsa Tri</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card6 col-3 d-flex justify-content-center align-items-center mt-2" style={{}}>
                                        <div className="mt-3">
                                            <div>
                                                <img src="assets/img/provider/smartfren.png" className="img-fluid" alt="" />
                                            </div>
                                            <div className="text-justify mt-3">
                                                <p style={{ fontSize: '10px' }}>Pulsa Smartfren</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="mb-4" style={{ border: 'none' }} />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}