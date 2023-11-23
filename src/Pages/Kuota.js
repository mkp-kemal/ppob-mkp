import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export function Kuota() {
    const [inputValue, setInputValue] = useState("");
    const [showProductsKuotaTelkomsel, setShowProductsKuotaTelkomsel] = useState(false);
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

        if (value.includes("0853") || value.includes("0823")) {
            setShowProductsKuotaTelkomsel(true);
            setSelectedOperator(null);
        } else if (value.includes("089")) {
            setShowProductsKuotaTelkomsel(true);
            setSelectedOperator("xl");
        } else {
            setShowProductsKuotaTelkomsel(false);
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
    const [products, setProducts] = useState([]);
    const [productsXl, setProductsXl] = useState([]);
    const getProduct = () => {
        // fetch("http://localhost/phpdasar/phpcrud/api/products/pulsa_telkomsel.php")
        fetch("https://testreactlaravel.000webhostapp.com/backend/products/pulsa_telkomsel.php")
            .then(res => { return res.json() })
            .then(data => { setProducts(data) })
            .catch(error => { console.log(error) });
    }
    const getProductxl = () => {
        // fetch("http://localhost/phpdasar/phpcrud/api/products/kuota/kuota_xl.php")
        fetch("https://testreactlaravel.000webhostapp.com/backend/products/kuota/kuota_xl.php")
            .then(res => { return res.json() })
            .then(data => { setProductsXl(data) })
            .catch(error => { console.log(error) });
    }
    useEffect(() => {
        getProduct();
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
                        <a class="navbar-brand" style={{ fontSize: '15px' }}><b>Isi Kuota Internet</b></a>
                        <img onClick={handleBack} align='left' src="assets/img/back.png" width={20} className="img-fluid" alt="" style={{ cursor: 'pointer' }} />
                    </nav>
                    <div className="container" style={{ paddingTop: '50px' }}>
                        <div className="mt-3" style={{ padding: '15px', borderRadius: '6px', backgroundColor: 'white' }}>
                            <div className="text-start">
                                <label style={{ fontSize: '11px' }}>Nomor Handphone</label>
                                {name ? (
                                    <input
                                        style={{ fontSize: '13px' }}
                                        className={isInputInvalid ? 'numberHandphone invalid' : 'numberHandphone'}
                                        type="number"
                                        placeholder={data}
                                        value={inputValue}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <input
                                        style={{ fontSize: '13px' }}
                                        className={isInputInvalid ? 'numberHandphone invalid' : 'numberHandphone'}
                                        type="number"
                                        placeholder='08xxx'
                                        value={inputValue}
                                        onChange={handleInputChange}
                                    />
                                )}
                                {isInputInvalid ? (
                                    <small className="text-danger"><i>*nomor handphone max 13 digit</i></small>
                                ) : (
                                    <div>
                                        {/* TELKOMSEL */}
                                        {showProductsKuotaTelkomsel && selectedOperator === null && (
                                            <div className="mt-4">
                                                <div className="wrapping">
                                                    <div className="text-start d-flex justify-content-between">
                                                        <small><b>Produk Belum Tersedia</b></small>
                                                        <img src="assets/img/provider/Telkomsel.png" width={65} className="img-fluid" alt="" />
                                                    </div>
                                                    <hr className="mt-2" />
                                                </div>
                                            </div>
                                        )}

                                        {/* XL */}
                                        {showProductsKuotaTelkomsel && selectedOperator === 'xl' && (
                                            <div className="mt-4">
                                                <div className="wrapping">
                                                    <div className="text-start d-flex justify-content-between">
                                                        <small><b>Pilih Nominal:</b></small>
                                                        <img src="https://i.postimg.cc/vZQGYWBv/pngegg-1.png" width={25} className="img-fluid" alt="" />
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
                                                                        <p className="card-text" style={{ fontSize: '12px', color: 'gray' }}>
                                                                            Ket: {item.information.split('-').map((part, index) => (
                                                                                <span key={index}>
                                                                                    {index > 0 && "-"}
                                                                                    {part.includes("Aktif") ? (
                                                                                        <strong className="text-info">{part.trim()}</strong>
                                                                                    ) : (
                                                                                        part.trim()
                                                                                    )}
                                                                                    <br />
                                                                                </span>
                                                                            ))}
                                                                        </p>
                                                                        <button onClick={() => toCheckout(item)} style={{ width: '100%' }} className="btn btn-success">Beli</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <hr style={{ marginTop: '-1px', border: 'none' }} />
                            </div>
                        </div>
                        {/* <div className="mt-2" style={{ display: 'none' }}> */}



                        <div>
                            <div className="text-start mt-3">
                                <small><b>Beli Kuota Lainnya</b></small>
                            </div>
                            <div className="otherPulsa mt-2">
                                <div class="row d-flex justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
                                    <hr className="mt-1" style={{ border: 'none' }} />
                                    <div className="card1 col-3 d-flex justify-content-center align-items-center" >
                                        <div className="mt-3">
                                            <div>
                                                <img src="assets/img/provider/Telkomsel.png" className="img-fluid" alt="" />
                                                {/* <img src="https://i.postimg.cc/1X qNk8RF/paket-darurat-telkomsel.jpg" className="img-fluid" alt="" /> */}
                                            </div>
                                            <div className="text-justify mt-3">
                                                <p style={{ fontSize: '10px' }}>Kuota Telkomsel</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card2 col-3 d-flex justify-content-center align-items-center">
                                        <div className="mt-3">
                                            <div>
                                                <img src="assets/img/provider/im3.png" width={40} className="img-fluid" alt="" />
                                            </div>
                                            <div className="text-justify mt-3">
                                                <p style={{ fontSize: '11px' }}>Kuota IM3</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card3 col-3 d-flex justify-content-center align-items-center">
                                        <div className="mt-3">
                                            <div>
                                                <img src="assets/img/provider/xl.png" width={30} className="img-fluid" alt="" />
                                            </div>
                                            <div className="text-justify mt-3">
                                                <p style={{ fontSize: '11px' }}>Kuota XL</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card4 col-3 d-flex justify-content-center align-items-center mt-2">
                                        <div className="mt-3">
                                            <div>
                                                <img src="assets/img/provider/axis.png" width={35} className="img-fluid" alt="" />
                                            </div>
                                            <div className="text-justify mt-3">
                                                <p style={{ fontSize: '11px' }}>Kuota Axis</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card5 col-3 d-flex justify-content-center align-items-center mt-2">
                                        <div className="mt-3">
                                            <div>
                                                <img src="assets/img/provider/3.png" width={25} className="img-fluid" alt="" />
                                            </div>
                                            <div className="text-justify mt-3">
                                                <p style={{ fontSize: '11px' }}>Kuota Tri</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card6 col-3 d-flex justify-content-center align-items-center mt-2" style={{}}>
                                        <div className="mt-3">
                                            <div>
                                                <img src="assets/img/provider/smartfren.png" className="img-fluid" alt="" />
                                            </div>
                                            <div className="text-justify mt-3">
                                                <p style={{ fontSize: '10px' }}>Kuota Smartfren</p>
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
    );
}

export function CheckoutKuota() {
    const token = localStorage.getItem('token');

    // DATA TRANSAKSI
    const dataTransactionJSON = localStorage.getItem('dataTransaction_DONT_CHANGE');
    const dataTransaction = JSON.parse(dataTransactionJSON);
    const selectedProduct = JSON.parse(dataTransaction.product);
    const phoneNumber = dataTransaction.phoneNumber;
    const navigate = useNavigate();

    //FORMAT RUPIAH
    const formatRupiah = (amount) => {
        const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });

        return formatter.format(amount);
    };

    let amount = formatRupiah(parseInt(selectedProduct.amount));
    let admin = formatRupiah(0);
    let getAdmin = 0;
    let payment_img = '';

    const [isContentVisible, setContentVisible] = useState(true);
    const toggleContentVisibility = () => {
        setContentVisible(!isContentVisible);
    };

    // TOAST PILIH METODE PEMBAYARAN
    const showToast = (msg) => {
        toast.warn(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    // METODE PEMBAYARAN
    const [selectedPayment, setSelectedPayment] = useState(null);
    let isTruePay = false;
    if (selectedPayment === "option1") {
        let biayaAdmin = 0;
        let x = parseInt(selectedProduct.amount) + biayaAdmin;
        amount = formatRupiah(x);
        admin = formatRupiah(biayaAdmin);
        isTruePay = true;
        getAdmin = biayaAdmin;

        const img = "https://i.postimg.cc/1t3FBX3x/Logo-DANA-PNG-1080p-File-Vector69.png";
        payment_img = img;
        // console.log(payment_img);

    } else if (selectedPayment === "option2") {
        let biayaAdmin = 1000;
        let x = parseInt(selectedProduct.amount) + biayaAdmin;
        amount = formatRupiah(x);
        admin = formatRupiah(biayaAdmin);
        isTruePay = true;
        getAdmin = biayaAdmin;

        const img = 'https://i.postimg.cc/NFVPYZzM/Logo-Go-Pay-PNG-1080p-File-Vector69.png';
        payment_img = img;

    } else if (selectedPayment === "option3") {
        // Handle payment for option 3
        // console.log('ovo');
        let biayaAdmin = 2000;
        let x = parseInt(selectedProduct.amount) + biayaAdmin;
        amount = formatRupiah(x);
        admin = formatRupiah(biayaAdmin);
        isTruePay = true;
        getAdmin = biayaAdmin;


        const img = 'https://i.postimg.cc/DwXyVXzQ/logo-ovo.png';
        payment_img = img;

    } else if (selectedPayment === "option4") {
        if (!token) {
            showToast('Kamu harus login untuk metode Bayar Nanti');
        } else {
            isTruePay = true;
            let biayaAdmin = 500;
            let x = parseInt(selectedProduct.amount) + biayaAdmin;
            amount = formatRupiah(x);
            admin = formatRupiah(biayaAdmin);
            getAdmin = biayaAdmin;

            const img = 'https://i.postimg.cc/KzrnwjRc/Logo-MKP.png';
            payment_img = img;

        }
    } else {
        isTruePay = false;
        let biayaAdmin = null;
        admin = biayaAdmin;
        getAdmin = biayaAdmin;
        const img = JSON.stringify('null');
    };

    //DATE
    const code = uuidv4();
    const current = new Date();
    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const day = current.getDate();
    const month = monthNames[current.getMonth()];
    const year = current.getFullYear();
    const hours = current.getHours();
    const minutes = current.getMinutes();
    const seconds = current.getSeconds();
    const formattedDate = `${day} ${month} ${year} pukul ${hours}.${minutes}.${seconds}`;
    const date = formattedDate;


    localStorage.setItem('IDTransaction_DONT_CHANGE', JSON.stringify(code));
    const idTransaction = JSON.parse(localStorage.getItem('IDTransaction_DONT_CHANGE'));

    // Tambah 2 jam
    // Tambah 2 jam
    const tanggalObjek = new Date(current); // Salin objek tanggal asli
    tanggalObjek.setHours(tanggalObjek.getHours() + 2);
    const expPayDate = tanggalObjek.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    console.log(selectedProduct.code);

    const handlePay = () => {
        // Melakukan request POST ke server PHP
        const formData = new FormData();
        formData.append('id_transaction', idTransaction);
        formData.append('phone_number', phoneNumber);
        formData.append('code_pulsa', selectedProduct.code);
        formData.append('name', selectedProduct.name);
        formData.append('fee', getAdmin);
        formData.append('amount', selectedProduct.amount);
        formData.append('date', date);
        formData.append('payment', payment_img);
        formData.append('expired_date', expPayDate);
        formData.append('status_transaction', 'Pending');
        formData.append('note', '-');
        formData.append('confirmation_date', '-');
        const name = localStorage.getItem('name');

        if (name) {
            formData.append('name_user', name);
            // axios.post('http://localhost/phpdasar/phpcrud/api/products/data.php', formData)
            axios.post('https://testreactlaravel.000webhostapp.com/backend/products/data.php', formData)
                .then(response => {
                    if (response.data) {
                        console.log('Data berhasil dikirim ke PHP');
                    } else {
                        console.error('Error while sending data to PHP:', response.data.error);
                    }
                })
                .catch(error => {
                    console.error('Error while sending data to PHP:', error);
                });
            navigate('/getdetailtransaksi');
        } else {
            // axios.post('http://localhost/phpdasar/phpcrud/api/products/data.php', formData)
            axios.post('https://testreactlaravel.000webhostapp.com/backend/products/data.php', formData)
                .then(response => {
                    if (response.data) {
                        // Jika berhasil, Anda dapat melakukan apa yang diperlukan di sini
                        console.log('Data berhasil dikirim ke PHP');
                    } else {
                        console.error('Error while sending data to PHP:', response.data.error);
                    }
                })
                .catch(error => {
                    console.error('Error while sending data to PHP:', error);
                });
            navigate('/getdetailtransaksi');
        }
    };

    return (
        <div className="outBodyPulsa">
            <ToastContainer />
            <div className="bodyPulsa">
                <div className="headerPulsa">
                    <nav class="navbar-light text-center d-flex justify-content-between" style={{ padding: '13px', boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.30)', zIndex: '15', background: 'white', position: 'fixed', width: '100%', maxWidth: '450px' }}>
                        <a class="navbar-brand" onClick={() => window.history.back()} style={{ cursor: 'pointer' }}><i style={{ fontSize: '15px' }} className="fas fa-solid fa-arrow-left mr-4"></i></a>
                        <a class="navbar-brand" style={{ fontSize: '15px' }}><b>Checkout</b></a>
                        <i style={{ cursor: 'pointer' }} class="bi bi-patch-question-fill"></i>
                    </nav>

                    {/* DETAIL TRANSAKSI */}
                    <div className="container" style={{ paddingTop: '50px' }}>
                        <div className="mt-4">
                            <div className="wrapping">
                                <div className="text-start d-flex justify-content-between">
                                    <small><b>Detail Transaksi</b></small>
                                    {/* <i class="bi bi-plus-circle-fill text-success font-weight-bold"></i> */}
                                    <i style={{ cursor: 'pointer' }} class={`bi ${isContentVisible ? 'bi-dash-circle-fill' : 'bi-plus-circle-fill'} text-success`} onClick={toggleContentVisibility}></i>
                                </div>
                                <hr className="mt-2" />
                                <div style={{ fontSize: '15px' }}>
                                    <div className={`content-container ${isContentVisible ? 'visible' : 'hidden'}`}>
                                        {isContentVisible ? (
                                            <>
                                                <div className="mb-2 text-start d-flex justify-content-between">
                                                    <small>Nama Produk</small>
                                                    <small>{selectedProduct.name}</small>
                                                </div>
                                                <div className="mb-2 text-start d-flex justify-content-between">
                                                    <small>Nomor Tujuan</small>
                                                    <small>{phoneNumber}</small>
                                                </div>
                                                <div className="mb-2 text-start d-flex justify-content-between">
                                                    <small>Harga</small>
                                                    <small>{formatRupiah(selectedProduct.amount)}</small>
                                                </div>
                                                <div className="mb-2 text-start d-flex justify-content-between">
                                                    <small>Admin</small>
                                                    {admin === formatRupiah(0) ? (
                                                        <small><s>Rp 1.500</s> <b className="text-success">Gratis !</b></small>
                                                    ) : (
                                                        <small>{admin}</small>
                                                    )}
                                                </div>
                                                <hr />
                                            </>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                    <div className="mb-2 text-start d-flex justify-content-between">
                                        <small>Total Pembayaran</small>
                                        <small style={{ fontSize: '17px' }}><b className="text-danger">{amount}</b></small>
                                    </div>
                                </div>
                                <div class="row">

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* METODE PEMBAYARAN */}
                    <div className="container" style={{ paddingBottom: '150px' }}>
                        <div>
                            <div className="wrapping">
                                <div className="text-start d-flex justify-content-between">
                                    <small><b>Pilih Metode Pembayaran</b></small>
                                    {/* <i class="bi bi-plus-circle-fill text-success font-weight-bold"></i> */}
                                    {/* <i style={{ cursor: 'pointer' }} class="bi bi-dash-circle-fill text-success"></i> */}
                                </div>
                                <hr className="mt-2" />
                                <div style={{ fontSize: '15px' }}>
                                    {/* DANA */}
                                    <div className="mb-2">
                                        <div className="row text-start">
                                            <label class="form-check-label" for="exampleRadios1">
                                                <div className="row">
                                                    <div className="col">
                                                        <img src="assets/img/dana.png" width={60} className="img-fluid" alt="" />
                                                    </div>
                                                    <div className="col-7">
                                                        <small><b>Dana</b></small>
                                                    </div>
                                                    <div className="col-2">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" onChange={() => setSelectedPayment('option1')} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <hr className="mt-2" />
                                    {/* GOPAY */}
                                    <div className="mb-2">
                                        <div className="row text-start">
                                            <label class="form-check-label" for="exampleRadios2">
                                                <div className="row">
                                                    <div className="col">
                                                        <img src="assets/img/gopay.png" width={60} className="img-fluid" alt="" />
                                                    </div>
                                                    <div className="col-7">
                                                        <small><b>Gopay</b></small>
                                                    </div>
                                                    <div className="col-2">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" onChange={() => setSelectedPayment('option2')} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <hr className="mt-2" />
                                    {/* OVO */}
                                    <div className="mb-2">
                                        <div className="row text-start">
                                            <label class="form-check-label" for="exampleRadios3">
                                                <div className="row">
                                                    <div className="col">
                                                        <img src="assets/img/ovo.png" width={60} className="img-fluid" alt="" />
                                                    </div>
                                                    <div className="col-7">
                                                        <small><b>OVO</b></small>
                                                    </div>
                                                    <div className="col-2">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" onChange={() => setSelectedPayment('option3')} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <hr className="mt-2" />
                                </div>
                                <div className="mt-4 text-start d-flex justify-content-between">
                                    <small><b>Metode Cicilan</b></small>
                                </div>
                                <hr className="mt-2" />
                                <div style={{ fontSize: '15px' }}>
                                    {/* CICIL */}
                                    <div className="mb-2">
                                        <div className="row text-start">
                                            <label class="form-check-label" for="exampleRadios4">
                                                <div className="row">
                                                    <div className="col">
                                                        <img src="assets/img/mkp.png" width={40} className="img-fluid" alt="" />
                                                    </div>
                                                    <div className="col-7">
                                                        <small><b>Bayar Nanti</b></small>
                                                        {token ? (
                                                            null
                                                        ) : (
                                                            <p className="text-danger" style={{ fontSize: '10px' }}><i>*Login dulu untuk bisa pakai metode ini</i></p>
                                                        )}
                                                    </div>
                                                    <div className="col-2">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" onChange={() => setSelectedPayment('option4')} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    {/* <hr className="mt-2" /> */}
                                </div>

                            </div>
                        </div>
                    </div>

                    <nav class="bottom-nav navbar-light" style={{ padding: '13px', boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.30)', zIndex: '15', background: 'white', width: '100%', maxWidth: '450px' }}>
                        <div className="text-start d-flex justify-content-between">
                            <small><b>Total Pembayaran</b></small>
                            <small><b className="text-danger">{amount}</b></small>
                        </div>
                        <hr />
                        {isTruePay ? (
                            <button onClick={handlePay} style={{ width: '100%', fontSize: '13px', height: '50px' }} class="btn btn-danger">Bayar Sekarang</button>
                        ) : (
                            <button disabled style={{ width: '100%', fontSize: '13px', height: '50px' }} class="btn btn-secondary">Pilih Metode Pembayaran</button>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    );
}
