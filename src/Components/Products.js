import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';

export function Product() {
    // function reloadPartialContent() {
    //     $.ajax({
    //         url: 'http://localhost:3000/',
    //         success: function (data) {
    //             // $(window.location.reload());
    //             $('#portfolio').html(data); // Memperbarui konten pada elemen dengan ID "result"
    //         },
    //         error: function () {
    //             alert('Gagal memuat ulang bagian konten.');
    //         }
    //     });
    // }
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     axios.get('http://localhost/phpdasar/phpcrud/api/products.php')
    //     // axios.get('http://localhost/phpdasar/backend/products.php')
    //         // axios.get('https://testreactlaravel.000webhostapp.com/backend/products.php')
    //         .then((response) => {
    //             setProducts(response.data);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []);

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


    return (
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
            {/* End Portfolio Section */}
        </div>
    );
}