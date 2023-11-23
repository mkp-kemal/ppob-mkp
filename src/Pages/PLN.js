import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export function PLNPrabayar() {
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
        // axios.post('http://localhost/phpdasar/phpcrud/api/users/getUsers.php', users)
            axios.post('https://testreactlaravel.000webhostapp.com/backend/users/getUsers.php', users)
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
        } else {
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
        // fetch("http://localhost/phpdasar/phpcrud/api/products/pln.php")
            fetch("https://testreactlaravel.000webhostapp.com/backend/products/pln.php")
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
                        <a class="navbar-brand" style={{ fontSize: '15px' }}><b>PLN Prabayar</b></a>
                        <img onClick={handleBack} align='left' src="assets/img/back.png" width={20} className="img-fluid" alt="" style={{ cursor: 'pointer' }} />
                    </nav>
                    <div className="container" style={{ paddingTop: '50px' }}>
                        <div className="mt-3" style={{ padding: '15px', borderRadius: '6px', backgroundColor: 'white' }}>
                            <div className="text-start">
                                <label style={{ fontSize: '11px' }}>Nomor PLN</label>
                                <input
                                    style={{ fontSize: '13px' }}
                                    className={isInputInvalid ? 'numberHandphone invalid' : 'numberHandphone'}
                                    type="number"
                                    placeholder='32xxx'
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                                {isInputInvalid ? (
                                    <small className="text-danger"><i>*nomor PLN max 13 digit</i></small>
                                ) : (
                                    <div>
                                        {/* XL */}
                                        <div className="mt-4">
                                            <div className="wrapping">
                                                <div className="text-start d-flex justify-content-between">
                                                    <small><b>Pilih Produk:</b></small>
                                                    <img src="assets/img/pln2.jpg" width={50} className="img-fluid" alt="" />
                                                </div>
                                                <hr className="mt-2" />
                                                <div class="row">
                                                    {productsXl.map((item) => (
                                                        <div class="col-6 mt-2">
                                                            <div class="card">
                                                                <div class="card-body" style={{ textAlign: 'left' }}>
                                                                    {/* <h5 class="card-title">Special title treatment</h5> */}
                                                                    <small style={{ fontSize: '12px', fontWeight: 'bold', color: 'gray' }}>{item.name}</small>
                                                                    <hr style={{ marginTop: '5px' }} />
                                                                    <small className="card-text" style={{ fontSize: '12px', color: 'gray' }}>Harga</small>
                                                                    <p className="card-text" style={{ fontSize: '17px', color: 'rgb(255, 96, 96)', fontFamily: 'inherit' }}><b>{formatRupiah(item.amount)}</b></p>
                                                                    {/* <p className="card-text" style={{ fontSize: '12px', color: 'gray' }}>Ket: {item.information}</p> */}
                                                                    {KuotaTelkomsel && selectedOperator === 'pln' ? (
                                                                        <button onClick={() => toCheckout(item)} style={{ width: '100%' }} className="btn btn-success">Beli</button>
                                                                    ) : (
                                                                        <div>
                                                                            <p className="text-warning" style={{ fontSize: '12px' }}><i>Isi nomor PLN dulu untuk <b>beli</b></i></p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <hr style={{ marginTop: '-1px', border: 'none' }} />
                            </div>
                        </div>
                        {/* <div className="mt-2" style={{ display: 'none' }}> */}

                        <div className="text-start mt-3">
                            <small><b>Produk PLN</b></small>
                        </div>
                        <div className="otherPulsa mt-2">
                            <div class="row d-flex justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
                                <hr className="mt-1" style={{ border: 'none' }} />
                                <div className="card1 col-3 d-flex justify-content-center align-items-center" >
                                    <div className="mt-3">
                                        <div>
                                            <img src="assets/img/pln.png" className="img-fluid" alt="" width={90} />
                                            {/* <img src="https://i.postimg.cc/1X qNk8RF/paket-darurat-telkomsel.jpg" className="img-fluid" alt="" /> */}
                                        </div>
                                        <div className="text-justify mt-3">
                                            <p style={{ fontSize: '10px' }}>Pascabayar</p>
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
    );
}