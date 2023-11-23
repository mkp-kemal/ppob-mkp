import React, { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { Product } from "../Components/Products";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";



export function LandingPage() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    // window.location.reload();

    // useEffect(() => {
    //     localStorage.removeItem('dataTransaction_DONT_CHANGE')
    //     localStorage.removeItem('roleTransaction_DONT_CHANGE')
    //     localStorage.removeItem('IDTransaction_DONT_CHANGE')
    //     // localStorage.clear();
    // }, []);

    const pageLogin = () => {
        navigate('/login');
    }

    const toPulsa = () => {
        // window.open('/pulsa', '_blank');
        navigate('/pulsa');
    };
    const toKuota = () => {
        navigate('/kuota');
    };
    const toPln = () => {
        navigate('/plnprabayar');
    };
    const toWallet = () => {
        navigate('/e-wallet');
    };

    const name = localStorage.getItem('name');
    const [formvalue, setFormvalue] = useState([]);
    const historyData = () => {
        const formData = new FormData();
        formData.append('name', name);
        // axios.post('http://localhost/phpdasar/phpcrud/api/users/history_order.php/', formData)
        axios.post('https://testreactlaravel.000webhostapp.com/backend/users/history_order.php/', formData)
            .then((response) => {
                // Pastikan respons adalah array
                if (Array.isArray(response.data)) {
                    // Respons adalah array, Anda dapat menggunakan .map()
                    const idsArray = response.data.map(item => item);
                    setFormvalue(idsArray);
                    // console.log('sukses');
                } else {
                    // Respons bukan array, Anda perlu menangani ini sesuai kebutuhan Anda
                    console.log('Respons bukan array');
                }
            }).catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        historyData();
    }, []);
    // console.log(formvalue);

    const [selectedTransaction, setSelectedTransaction] = useState(null);
    //HISTORY CLICK
    const handleTransactionClick = (transaction) => {
        // console.log('test');
        setSelectedTransaction(transaction);
        $("#historyDetailModal");
        // $('#historyDetailModal').modal('show');
    };
    // console.log(selectedTransaction);

    //FORMAT RUPIAH
    const formatRupiah = (amount) => {
        const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });
        return formatter.format(amount);
    };

    //SET STATUS PROSES TRANSAKSI 
    //DATE
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    const formattedDateTime = currentDateTime.toLocaleString('id-ID', options);
    const [status, setStatus] = useState('Proses');
    const handleStatus = async (idOrder) => {
        const formData = new FormData();
        formData.append('status_order', status);
        formData.append('id_order', idOrder);
        formData.append('confirmation_date', formattedDateTime);
        // const responce = await axios.post("http://localhost/phpdasar/phpcrud/api/products/order_pulsa.php", formData);
        const responce = await axios.post("https://testreactlaravel.000webhostapp.com/backend/products/order_pulsa.php", formData);
        if (responce.data.success) {
            setTimeout(() => {
                // window.location.reload();
                historyData();
            }, 1000);
        }
    }

    return (
        <div>
            {/* NAVBAR */}
            <Navbar />

            {/* HEADER */}
            {token ? (
                null
            ) : (
                <section id="hero" class="d-flex align-items-center" style={{ background: 'linear-gradient(to right, #022a5b, #800080)', color: 'white' }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
                                <h1 data-aos="fade-up">Selamat datang</h1>
                                <h2 data-aos="fade-up" data-aos-delay="400">Layani kebutuhanmu demi kesiapanmu untuk masa yang akan datang</h2>
                                <div data-aos="fade-up" data-aos-delay="800">
                                    <a onClick={pageLogin} class="btn-get-started scrollto">Yu Login!</a>
                                </div>
                            </div>
                            <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left" data-aos-delay="200">
                                <img src="assets/img/header.png" class="img-fluid animated" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* MAIN */}
            <main id="main" style={{ background: 'linear-gradient(to right, #022a5b, #800080)', color: 'white' }}>
                {token ? (
                    <div>
                    </div>
                ) : (
                    <div>
                        {/* <div class="section-title" data-aos="fade-up">
                            <h2>Kerja Sama</h2>
                            <p>Website ini memiliki beberapa fitur canggih, diantaranya:</p>
                        </div> */}
                        <section id="clients" class="clients clients" style={{ background: 'linear-gradient(to right, #022a5b, #800080)', color: 'white' }}>
                            <p style={{ background: '#800080', height: '20px' }} />
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-2 col-md-4 col-6">
                                        <img src="assets/img/jne.png" class="img-fluid" alt="" data-aos="zoom-in" />
                                    </div>

                                    <div class="col-lg-2 col-md-4 col-6">
                                        <img src="assets/img/jnt.png" class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="100" />
                                    </div>

                                    <div class="col-lg-2 col-md-4 col-6">
                                        <img src="assets/img/dana.png" class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="200" />
                                    </div>

                                    <div class="col-lg-2 col-md-4 col-6">
                                        <img src="assets/img/ovo.png" class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="300" />
                                    </div>

                                    <div class="col-lg-2 col-md-4 col-6">
                                        <img src="assets/img/gopay.png" class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="400" />
                                    </div>

                                    {/* <div class="col-lg-2 col-md-4 col-6">
                                        <img src="assets/img/clients/client-6.png" class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="500" />
                                    </div> */}
                                </div>
                            </div>
                            <p style={{ background: '#800080', height: '20px' }} />
                        </section>
                        {/* ======= Services Section ======= */}
                        <section id="services" class="services">
                            <div class="container">

                                <div class="section-title" data-aos="fade-up">
                                    <h2>Ada Fitur Apa Saja?</h2>
                                    <p>Website ini memiliki beberapa fitur canggih, diantaranya:</p>
                                </div>

                                <div class="row">
                                    <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                        <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
                                            <div class="icon"><i class="bi bi-key"></i></div>
                                            <h4 class="title"><a href="#!">Keamanan</a></h4>
                                            <p class="description">Keamanan data adalah hal vital yang harus dijaga, website ini memiliki keamanan enkripsi password dan single user</p>
                                        </div>
                                    </div>

                                    {/* <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                        <div class="icon-box" data-aos="fade-up" data-aos-delay="200">
                                            <div class="icon"><i class="bx bx-file"></i></div>
                                            <h4 class="title"><a href="#!">Sed ut perspiciatis</a></h4>
                                            <p class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                        <div class="icon-box" data-aos="fade-up" data-aos-delay="300">
                                            <div class="icon"><i class="bx bx-tachometer"></i></div>
                                            <h4 class="title"><a href="#!">Magni Dolores</a></h4>
                                            <p class="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                        <div class="icon-box" data-aos="fade-up" data-aos-delay="400">
                                            <div class="icon"><i class="bx bx-world"></i></div>
                                            <h4 class="title"><a href="#!">Nemo Enim</a></h4>
                                            <p class="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
                                        </div>
                                    </div> */}

                                </div>

                            </div>
                        </section>
                        {/* End Services Section */}

                        {/* ======= More Services Section ======= */}
                        {/* <section id="more-services" class="more-services">
                            <div class="container">

                                <div class="row">
                                    <div class="col-md-6 d-flex align-items-stretch">
                                        <div class="card" style={{ backgroundImage: 'url("assets/img/more-services-1.jpg")' }} data-aos="fade-up" data-aos-delay="100">
                                            <div class="card-body">
                                                <h5 class="card-title"><a href="#!">Lobira Duno</a></h5>
                                                <p class="card-text">Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua.</p>
                                                <div class="read-more"><a href="#!"><i class="bi bi-arrow-right"></i> Read More</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                                        <div class="card" style={{ backgroundImage: 'url("assets/img/more-services-2.jpg")' }} data-aos="fade-up" data-aos-delay="200">
                                            <div class="card-body">
                                                <h5 class="card-title"><a href="#!">Limere Radses</a></h5>
                                                <p class="card-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium, totam rem.</p>
                                                <div class="read-more"><a href="#!"><i class="bi bi-arrow-right"></i> Read More</a></div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-md-6 d-flex align-items-stretch mt-4">
                                        <div class="card" style={{ backgroundImage: 'url("assets/img/more-services-3.jpg")' }} data-aos="fade-up" data-aos-delay="100">
                                            <div class="card-body">
                                                <h5 class="card-title"><a href="#!">Nive Lodo</a></h5>
                                                <p class="card-text">Nemo enim ipsam voluptatem quia voluptas sit aut odit aut fugit, sed quia magni dolores.</p>
                                                <div class="read-more"><a href="#!"><i class="bi bi-arrow-right"></i> Read More</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 d-flex align-items-stretch mt-4">
                                        <div class="card" style={{ backgroundImage: 'url("assets/img/more-services-4.jpg")' }} data-aos="fade-up" data-aos-delay="200">
                                            <div class="card-body">
                                                <h5 class="card-title"><a href="#!">Pale Treda</a></h5>
                                                <p class="card-text">Nostrum eum sed et autem dolorum perspiciatis. Magni porro quisquam laudantium voluptatem.</p>
                                                <div class="read-more"><a href="#!"><i class="bi bi-arrow-right"></i> Read More</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section> */}
                        {/* End More Services Section */}
                    </div>
                )}

                {/* ======= Features Section ======= */}
                {/* <section id="features" class="features">
                    <div class="container">
                        <div class="section-title" data-aos="fade-up">
                            <h2>Kategori</h2>
                            <p>Mungkin kamu penasaran, apa saja sih product yang dijual pada website ini</p>
                        </div>

                        <div class="row" data-aos="fade-up" data-aos-delay="300">
                            <div class="col-lg-3 col-md-4">
                                <div class="icon-box">
                                    <i class="ri-store-line" style={{ color: '#ffbb2c' }}></i>
                                    <h3><a href="#!">Pulsa</a></h3>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 mt-4 mt-md-0">
                                <div class="icon-box">
                                    <i class="ri-bar-chart-box-line" style={{ color: '#5578ff' }}></i>
                                    <h3><a href="#!">Kuota Internet</a></h3>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 mt-4 mt-md-0">
                                <div class="icon-box">
                                    <i class="ri-calendar-todo-line" style={{ color: '#e80368' }}></i>
                                    <h3><a href="#!">Token PLN</a></h3>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 mt-4 mt-lg-0">
                                <div class="icon-box">
                                    <i class="ri-paint-brush-line" style={{ color: '#e361ff' }}></i>
                                    <h3><a href="#!">Kuota Nelpon</a></h3>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 mt-4">
                                <div class="icon-box">
                                    <i class="ri-database-2-line" style={{ color: '#47aeff' }}></i>
                                    <h3><a href="#!">Top Up E-Wallet</a></h3>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 mt-4">
                                <div class="icon-box">
                                    <i class="ri-gradienter-line" style={{ color: '#ffa76e' }}></i>
                                    <h3><a href="#!">Tagihan PDAM</a></h3>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 mt-4">
                                <div class="icon-box">
                                    <i class="ri-file-list-3-line" style={{ color: '#11dbcf' }}></i>
                                    <h3><a href="#!">Tagihan WIFI</a></h3>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 mt-4">
                                <div class="icon-box">
                                    <i class="ri-price-tag-2-line" style={{ color: '#4233ff' }}></i>
                                    <h3><a href="#!">BPJS</a></h3>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 mt-4">
                                <div class="icon-box">
                                    <i class="ri-anchor-line" style={{ color: '#b2904f' }}></i>
                                    <h3><a href="#!">Dirada Pack</a></h3>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 mt-4">
                                <div class="icon-box">
                                    <i class="ri-disc-line" style={{ color: '#b20969' }}></i>
                                    <h3><a href="#!">Moton Ideal</a></h3>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 mt-4">
                                <div class="icon-box">
                                    <i class="ri-base-station-line" style={{ color: '#ff5828' }}></i>
                                    <h3><a href="#!">Verdo Park</a></h3>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-4 mt-4">
                                <div class="icon-box">
                                    <i class="ri-fingerprint-line" style={{ color: '#29cc61' }}></i>
                                    <h3><a href="#!">Flavor Nivelanda</a></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                {/* End Features Section */}

                {/* ======= Testimonials Section ======= */}
                {token ? (
                    <div>
                    </div>
                ) : (
                    <section id="testimonials" class="testimonials section-bg">
                        <div class="container">

                            <div class="section-title" data-aos="fade-up">
                                <h2>Testimoni</h2>
                                <p>Apa kata mereka?</p>
                            </div>

                            <div class="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                                <div class="swiper-wrapper">

                                    <div class="swiper-slide">
                                        <div class="testimonial-wrap">
                                            <div class="testimonial-item">
                                                <img src="assets/img/photo.jpg" class="testimonial-img" alt="" />
                                                <h3>Muhammad Kemal Pasha</h3>
                                                <h4>Ceo &amp; Founder</h4>
                                                <p>
                                                    <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                    Website yang bagus, mempermudah kami dalam membeli pulsa dan terjamin keamanannya.
                                                    <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                </p>
                                            </div>
                                        </div>
                                    </div>{/* End testimonial item */}

                                    <div class="swiper-slide">
                                        <div class="testimonial-wrap">
                                            <div class="testimonial-item">
                                                <img src="assets/img/testimonials/testimonials-2.jpg" class="testimonial-img" alt="" />
                                                <h3>Sara Wilsson</h3>
                                                <h4>Designer</h4>
                                                <p>
                                                    <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                    Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.
                                                    <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                </p>
                                            </div>
                                        </div>
                                    </div>{/* End testimonial item */}

                                    <div class="swiper-slide">
                                        <div class="testimonial-wrap">
                                            <div class="testimonial-item">
                                                <img src="assets/img/testimonials/testimonials-3.jpg" class="testimonial-img" alt="" />
                                                <h3>Jena Karlis</h3>
                                                <h4>Store Owner</h4>
                                                <p>
                                                    <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                    Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.
                                                    <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                </p>
                                            </div>
                                        </div>
                                    </div>{/* End testimonial item */}

                                    <div class="swiper-slide">
                                        <div class="testimonial-wrap">
                                            <div class="testimonial-item">
                                                <img src="assets/img/testimonials/testimonials-4.jpg" class="testimonial-img" alt="" />
                                                <h3>Matt Brandon</h3>
                                                <h4>Freelancer</h4>
                                                <p>
                                                    <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                    Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
                                                    <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                </p>
                                            </div>
                                        </div>
                                    </div>{/* End testimonial item */}

                                    <div class="swiper-slide">
                                        <div class="testimonial-wrap">
                                            <div class="testimonial-item">
                                                <img src="assets/img/testimonials/testimonials-5.jpg" class="testimonial-img" alt="" />
                                                <h3>John Larson</h3>
                                                <h4>Entrepreneur</h4>
                                                <p>
                                                    <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                    Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.
                                                    <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                </p>
                                            </div>
                                        </div>
                                    </div>{/* End testimonial item */}

                                </div>
                                <div class="swiper-pagination"></div>
                            </div>

                        </div>
                    </section>
                )}
                {/* End Testimonials Section */}

                {/* ======= Produk Section ======= */}
                {token ? (
                    <Product />
                ) : (
                    <div>
                        {/* ======= Produk Section ======= */}
                        <section id="category" class="portfolio">
                            <div class="container">
                                <div class="section-title" data-aos="fade-up">
                                    <h2>Kategori</h2>
                                    <p>Kamu bisa beli banyak hal</p>
                                </div>

                                <div className="row" data-aos="fade-up" data-aos-delay="200">
                                    <div className="col-lg-12 d-flex justify-content-center">
                                        <div class="container features" id="features">
                                            <div class="row" id="filterCategory" data-aos="fade-up" data-aos-delay="300">
                                                <div class="col-lg-3 col-md-4 mt-4 mt-md-0" onClick={toPulsa}>
                                                    <li class="icon-box">
                                                        <i class="ri-store-line" style={{ color: '#ffbb2c' }}></i>
                                                        <h3><a style={{ cursor: 'pointer' }}>Pulsa</a></h3>
                                                    </li>
                                                </div>
                                                <div class="col-lg-3 col-md-4 mt-4 mt-md-0" onClick={toKuota}>
                                                    <li class="icon-box" >
                                                        <i class="ri-bar-chart-box-line" style={{ color: 'red' }}></i>
                                                        <h3><a style={{ cursor: 'pointer' }}>Kuota Internet</a></h3>
                                                    </li>
                                                </div>
                                                <div class="col-lg-3 col-md-4 mt-4 mt-md-0" onClick={toPln}>
                                                    <li class="icon-box">
                                                        <i class="ri-calendar-todo-line" style={{ color: '#e80368' }}></i>
                                                        <h3><a style={{ cursor: 'pointer' }}>Token PLN</a></h3>
                                                    </li>
                                                </div>
                                                <div class="col-lg-3 col-md-4 mt-4 mt-md-0">
                                                    <li class="icon-box">
                                                        <i class="ri-paint-brush-line" style={{ color: '#e361ff' }}></i>
                                                        <h3><a style={{ cursor: 'pointer' }}>Kuota Nelpon</a></h3>
                                                    </li>
                                                </div>
                                                <div class="col-lg-3 col-md-4 mt-4" onClick={toWallet}>
                                                    <li class="icon-box">
                                                        <i class="ri-database-2-line" style={{ color: '#47aeff' }}></i>
                                                        <h3><a style={{ cursor: 'pointer' }}>Top Up E-Wallet</a></h3>
                                                    </li>
                                                </div>
                                                <div class="col-lg-3 col-md-4 mt-4">
                                                    <li class="icon-box">
                                                        <i class="ri-gradienter-line" style={{ color: '#ffa76e' }}></i>
                                                        <h3><a style={{ cursor: 'pointer' }}>Tagihan PDAM</a></h3>
                                                    </li>
                                                </div>
                                                <div class="col-lg-3 col-md-4 mt-4">
                                                    <li class="icon-box">
                                                        <i class="ri-file-list-3-line" style={{ color: '#11dbcf' }}></i>
                                                        <h3><a style={{ cursor: 'pointer' }}>Tagihan WIFI</a></h3>
                                                    </li>
                                                </div>
                                                <div class="col-lg-3 col-md-4 mt-4">
                                                    <li class="icon-box">
                                                        <i class="ri-price-tag-2-line" style={{ color: '#4233ff' }}></i>
                                                        <h3><a style={{ cursor: 'pointer' }}>BPJS</a></h3>
                                                    </li>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* End Produk Section */}
                    </div>
                )}

                {/* ======= Team Section ======= */}
                {token ? (
                    <section id="category" class="portfolio">
                        <div class="container">
                            <div class="section-title" data-aos="fade-up" data-aos-delay="100">
                                <h2>Histori Order</h2>
                                <p>Bisa dilihat kamu pernah beli apa aja</p>
                                <button onClick={() => { historyData() }} className="btn btn-outline-info mt-2">Refresh</button>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="100">
                                <table class="table table-dark table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Nama Produk</th>
                                            <th scope="col">Tgl Pemesanan</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formvalue.map((item, index) => (
                                            <tr
                                                key={index}
                                                data-toggle="modal"
                                                data-target="#historyDetailModal"
                                                onClick={() => handleTransactionClick(item)}
                                            >
                                                <th scope="row">{index + 1}</th>
                                                <td>{(item.product_name) + ' '}<span style={{ color: 'green' }}>({(item.phone_number)})</span></td>
                                                <td>{item.order_date}</td>
                                                <td>{item.status_transaction}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section id="team" class="team section-bg">
                        <div class="container">

                            <div class="section-title" data-aos="fade-up">
                                <h2>Team</h2>
                                <p>Developer Pengembang Website</p>
                            </div>

                            <div class="row d-flex justify-content-center">
                                <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                                    <div class="member" data-aos="fade-up" data-aos-delay="100">
                                        <div class="member-img">
                                            {/* <img src="https://i.postimg.cc/nrYv60K9/photo.jpg" class="img-fluid" alt="" /> */}
                                            <img src="assets/img/photo2.jpg" class="img-fluid" alt="" />
                                            <div class="social">
                                                {/* <a href="#!"><i class="bi bi-twitter"></i></a>
                                                <a href="#!"><i class="bi bi-facebook"></i></a> */}
                                                <a href="https://www.instagram.com/kemal.mkp" target="_blank"><i class="bi bi-instagram"></i></a>
                                                <a href="https://www.linkedin.com/in/muhammad-kemal-pasha-a97770213" target="_blank"><i class="bi bi-linkedin"></i></a>
                                            </div>
                                        </div>
                                        <div class="member-info">
                                            <h4>Muhammad Kemal Pasha</h4>
                                            <span>Chief Executive Officer</span>
                                        </div>
                                    </div>
                                </div>
                                {/* 
                                <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                                    <div class="member" data-aos="fade-up" data-aos-delay="200">
                                        <div class="member-img">
                                            <img src="assets/img/team/team-2.jpg" class="img-fluid" alt="" />
                                            <div class="social">
                                                <a href="#!"><i class="bi bi-twitter"></i></a>
                                                <a href="#!"><i class="bi bi-facebook"></i></a>
                                                <a href="#!"><i class="bi bi-instagram"></i></a>
                                                <a href="#!"><i class="bi bi-linkedin"></i></a>
                                            </div>
                                        </div>
                                        <div class="member-info">
                                            <h4>Sarah Jhonson</h4>
                                            <span>Product Manager</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                                    <div class="member" data-aos="fade-up" data-aos-delay="300">
                                        <div class="member-img">
                                            <img src="assets/img/team/team-3.jpg" class="img-fluid" alt="" />
                                            <div class="social">
                                                <a href="#!"><i class="bi bi-twitter"></i></a>
                                                <a href="#!"><i class="bi bi-facebook"></i></a>
                                                <a href="#!"><i class="bi bi-instagram"></i></a>
                                                <a href="#!"><i class="bi bi-linkedin"></i></a>
                                            </div>
                                        </div>
                                        <div class="member-info">
                                            <h4>William Anderson</h4>
                                            <span>CTO</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                                    <div class="member" data-aos="fade-up" data-aos-delay="400">
                                        <div class="member-img">
                                            <img src="assets/img/team/team-4.jpg" class="img-fluid" alt="" />
                                            <div class="social">
                                                <a href="#!"><i class="bi bi-twitter"></i></a>
                                                <a href="#!"><i class="bi bi-facebook"></i></a>
                                                <a href="#!"><i class="bi bi-instagram"></i></a>
                                                <a href="#!"><i class="bi bi-linkedin"></i></a>
                                            </div>
                                        </div>
                                        <div class="member-info">
                                            <h4>Amanda Jepson</h4>
                                            <span>Accountant</span>
                                        </div>
                                    </div>
                                </div> */}

                            </div>

                        </div>
                    </section>
                )}
                {/* End Team Section */}
            </main>
            {/* End HEADER */}


            {/* ======= Footer ======= */}
            <footer id="footer">
                <div class="container ">
                    <div class="row d-flex align-items-center">
                        <div class="col-lg-6 text-lg-left text-center">
                            <div class="copyright">
                                &copy; Copyright <strong>MKP</strong>. All Rights Reserved
                            </div>
                            <div class="credits">
                                Designed by <a href="#!">Muhammad Kemal Pasha</a> @BootstrapMade
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <nav class="footer-linksfooter-links text-lg-right text-center pt-2 pt-lg-0" style={{ color: 'white' }}>
                                {token ? (
                                    <a href="#" class="scrollto">Kategori</a>
                                ) : (
                                    <div>
                                        <a href="#" class="scrollto">Home</a> |
                                        <a href="#category" class="scrollto"> Kategori</a>
                                    </div>
                                )}
                                {/* <a href="#!">Privacy Policy</a>
                                <a href="#!">Terms of Use</a> */}
                            </nav>
                        </div>
                    </div>
                </div>
            </footer>{/* End Footer */}

            <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>


            {/* MODAL DETAIL TRANSAKSI */}
            {selectedTransaction && (
                <div
                    className="modal fade"
                    id="historyDetailModal"
                // tabIndex="-1"
                // role="dialog"
                // aria-labelledby="exampleModalLabel"
                // aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                {selectedTransaction.status_transaction === "Sukses" || selectedTransaction.status_transaction === "Pending" ? (
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        <b>Detail Transaksi</b>
                                    </h5>
                                ) : selectedTransaction.status_transaction === "Proses" ? (
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        <b>Transaksi Sedang Diproses...</b>
                                    </h5>
                                ) : selectedTransaction.status_transaction === "Gagal" ? (
                                    <div>
                                        <h5 className="modal-title" id="exampleModalLabel">
                                            <b>Transaksi Gagal, Silahkan coba lagi</b>
                                        </h5>
                                        <small className="text-danger"><i>*{selectedTransaction.note}</i></small>
                                    </div>
                                ) : null}
                                <div className="d-flex flex-row-reverse">
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                    // aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <div className="text-center text-secondary" style={{ fontSize: '16px' }}>
                                        <p>Tipe Pembayaran Pada Transaksi Ini</p>

                                        {selectedTransaction.status_transaction === 'Pending' ? (
                                            <div>
                                                <img className="img-profile mb-3" src={selectedTransaction.payment_type} width={'90px'} />
                                                <p style={{ marginTop: '-10px', marginBottom: '-0px' }}><small><b>0853-2366-6527</b> a/n <b>Muhammad Kemal Pasha</b></small></p>
                                            </div>
                                        ) : selectedTransaction.status_transaction === 'Sukses' || selectedTransaction.status_transaction === 'transfer' ? (
                                            <div>
                                                <img className="img-profile mb-3" src={selectedTransaction.payment_type} width={'90px'} />
                                                <p style={{ color: '#03ad00' }}><i class="fas fa-solid fa-check"></i> Transaksi Berhasil</p>
                                            </div>
                                        ) : selectedTransaction.status_transaction === 'Proses' ? (
                                            <div>
                                                <img className="img-profile mb-3" src={selectedTransaction.payment_type} width={'90px'} />
                                                <p className="text-info"><span><i class="fa-solid fa-spinner fa-spin-pulse"></i></span> Transaksi Diproses</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <img className="img-profile mb-3" src={selectedTransaction.payment_type} width={'90px'} />
                                                <p style={{ color: '#bd0000' }}>❌ Transaksi Gagal</p>
                                            </div>
                                        )}
                                    </div>
                                    {selectedTransaction.status_transaction === 'Sukses' || selectedTransaction.status_transaction === 'Pending' ? (
                                        <div className="text-center text-success">
                                            <h3><b>{formatRupiah(parseInt(selectedTransaction.amount) + parseInt(selectedTransaction.fee))}</b></h3>
                                        </div>
                                    ) : selectedTransaction.status_transaction === 'Gagal' ? (
                                        <div className="text-center  text-danger">
                                            <h3><b>{formatRupiah(parseInt(selectedTransaction.amount) + parseInt(selectedTransaction.fee))}</b></h3>
                                        </div>
                                    ) : (
                                        <div className="text-center text-danger">
                                            <h3><b>{formatRupiah(parseInt(selectedTransaction.amount) + parseInt(selectedTransaction.fee))}</b></h3>
                                        </div>
                                    )}


                                </div>
                                <div className="form-group" style={{ fontSize: '18px' }}>
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row">
                                            {selectedTransaction.product_name.includes('XL') ? (
                                                <span><small><img src="assets/img/provider/xl.png" width={25} className="img-fluid" alt="" /></small></span>
                                            ) : selectedTransaction.product_name.includes('Telkomsel') ? (
                                                <span><small><img src="assets/img/provider/Telkomsel.png" width={65} className="img-fluid" alt="" /></small></span>
                                            ) : selectedTransaction.product_name.includes('PLN') ? (
                                                <span><small><img src="assets/img/pln.png" width={30} className="img-fluid" alt="" /></small></span>
                                            ) : (
                                                null
                                            )}
                                        </div>
                                        <div class="d-flex flex-row-reverse">
                                            {/* <span><small>{(selectedTransaction.recipient)}</small></span> */}
                                            <span><small>{selectedTransaction.product_name}</small></span>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row-reverse">
                                        {/* <span><small>{(selectedTransaction.recipient)}</small></span> */}
                                        <button className="btn-outline-danger btn">Laporkan</button>
                                    </div>
                                    <div class="d-flex flex-row-reverse">
                                        <span><small><hr class="hr hr-blurry" /></small></span>
                                    </div>
                                </div>
                                <div className="form-group divider" style={{ fontSize: '18px' }}>
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row">
                                            <span><small>No. Tujuan: </small></span>
                                        </div>
                                        <div class="d-flex flex-row-reverse">
                                            <span><small>{selectedTransaction.phone_number}</small></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group divider" style={{ fontSize: '18px' }}>
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row">
                                            <span><small>No. Transaksi: </small></span>
                                        </div>
                                        <div class="d-flex flex-row-reverse">
                                            <span><small>{selectedTransaction.id}</small></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group divider" style={{ fontSize: '18px' }}>
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row">
                                            <span><small>Harga: </small></span>
                                        </div>
                                        <div class="d-flex flex-row-reverse">
                                            <span><small><b>{formatRupiah(selectedTransaction.amount)}</b></small></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group divider" style={{ fontSize: '18px' }}>
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row">
                                            <span><small>Biaya Admin: </small></span>
                                        </div>
                                        <div class="d-flex flex-row-reverse">
                                            <span><small><b>{formatRupiah(selectedTransaction.fee)}</b></small></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group divider" style={{ fontSize: '18px' }}>
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row">
                                            <span><small>Waktu Transaksi: </small></span>
                                        </div>
                                        <div class="d-flex flex-row-reverse">
                                            <span><small>{selectedTransaction.order_date}</small></span>
                                        </div>
                                    </div>
                                </div>
                                {selectedTransaction.product_name.includes('PLN') ? (
                                    <div className="form-group divider" style={{ fontSize: '18px' }}>
                                        <div class="d-flex justify-content-between">
                                            <div class="d-flex flex-row">
                                                <span><small><b>Number Token:</b> </small></span>
                                            </div>
                                            <div class="d-flex flex-row-reverse">
                                                <span><small><b><u>{selectedTransaction.serial_number_pln}</u></b></small></span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (null)}
                                <div className="d-flex align-items-center justify-content-center text-secondary text-center bg-body-secondary fill" style={{ marginTop: '10px', padding: '10px', borderRadius: '10px' }}>
                                    {selectedTransaction.status_transaction === 'Pending' ? (
                                        <div>
                                            <p>System sedang menunggu pembayaran</p>
                                            <button onClick={() => handleStatus(selectedTransaction.id)} data-dismiss="modal" className="btn-primary btn text-white">
                                                Konfirmasi Sudah Bayar
                                            </button>
                                        </div>
                                    ) : selectedTransaction.status_transaction === 'Proses' ? (
                                        <div>
                                            <small>Laporkan jika proses melebihi dari 15 menit</small>
                                            {/* <button className="btn-buy btn text-white">
                                                Laporkan
                                            </button> */}
                                        </div>
                                    ) : (
                                        <div>
                                            <small>Resi ini merupakan bukti transaksi yang sah</small>
                                            <button onClick={toPulsa} data-dismiss="modal" className="btn-buy btn text-white">
                                                Beli Lagi
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}