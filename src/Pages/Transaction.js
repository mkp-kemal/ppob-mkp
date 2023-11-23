import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { v4 as uuidv4 } from 'uuid';
import { format, parse } from 'date-fns';
// import idLocale from 'date-fns/locale/id';

export function DataTrans() {
    const navigate = useNavigate();
    //ID TRANSAKSI
    const IDTransaction = localStorage.getItem('IDTransaction_DONT_CHANGE');
    const ID = JSON.parse(IDTransaction);

    useEffect(() => {
        navigate(`/detailtransaksi?${ID}`);
    }, []);
}


export function Transaction() {
    useEffect(() => {
        showToast('Jangan tutup halaman ini');
    }, []);

    //ID TRANSAKSI
    const IDTransaction = localStorage.getItem('IDTransaction_DONT_CHANGE');
    const ID = JSON.parse(IDTransaction);

    const token = localStorage.getItem("token")

    const [formvalue, setFormvalue] = useState('');

    const userRowdata = async () => {
        // const getUserdata = await fetch("http://localhost/phpdasar/phpcrud/api/products/order_pulsa.php/" + ID);
        // const resuserdata = await getUserdata.json();
        // axios.get("http://localhost/phpdasar/phpcrud/api/products/order_pulsa.php/" + ID)
        axios.get("https://testreactlaravel.000webhostapp.com/backend/products/order_pulsa.php/" + ID)
            .then((response) => {
                setFormvalue(response.data)
            }).catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        userRowdata();
        const interval = setInterval(() => {
            if (formvalue.status_transaction === 'Proses') {
                userRowdata();
            } else {
                clearInterval(interval);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [formvalue.status_transaction]);



    //FORMAT RUPIAH
    const formatRupiah = (amount) => {
        const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });
        return formatter.format(amount);
    };

    const dataTransactionJSON = localStorage.getItem('dataTransaction_DONT_CHANGE');
    // const token = localStorage.getItem('token');
    const dataTransaction = JSON.parse(dataTransactionJSON);
    const selectedProduct = JSON.parse(dataTransaction.product);
    const phoneNumber = dataTransaction.phoneNumber;

    //AMOUNT
    const amount = formvalue.amount;
    const amountRupiah = formatRupiah(amount);

    //METODE PEMBAYARAN
    const selectedFee = formvalue.fee;
    const selectedFeeRipuah = formatRupiah(selectedFee);
    let x = parseInt(selectedFee) + parseInt(amount);
    let xRupiah = formatRupiah(x);
    const payment_type = formvalue.payment_type;

    //VISIBLE INVISIBLE
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

    // TOAST SUKSES
    const showToastSuccess = (msg) => {
        toast.success(msg, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    //SALIN NOMOR
    const [copied, setCopied] = useState(false);
    const copyNumber = () => {
        // showToastSuccess('Nomor berhasil disalin');
        const numberToCopy = '085323666527';

        // Copy to clipboard
        navigator.clipboard.writeText(numberToCopy)
            .then(() => {
                setCopied(true);
                showToastSuccess('Nomor berhasil disalin');
            })
            .catch(error => {
                console.error('Error copying to clipboard:', error);
                showToast('Gagal menyalin nomor');
            });
    }

    //SALIN NOMINAL
    const [copiedNominal, setCopiedNominal] = useState(false);
    const copyNominal = () => {
        // showToastSuccess('Nomor berhasil disalin');
        const nominalToCopy = x;

        // Copy to clipboard
        navigator.clipboard.writeText(nominalToCopy)
            .then(() => {
                setCopied(true);
                showToastSuccess('Nominal berhasil disalin');
            })
            .catch(error => {
                console.error('Error copying to clipboard:', error);
                showToast('Gagal menyalin nominal');
            });
    }

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

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 5000);
        return () => {
            clearInterval(intervalId); // Membersihkan interval saat komponen tidak lagi digunakan
        };
    }, []);


    //SET STATUS PROSES TRANSAKSI 
    const formattedDateTime = currentDateTime.toLocaleString('id-ID', options);
    const [status, setStatus] = useState('Proses');
    const handleStatus = async () => {
        const formData = new FormData();
        formData.append('status_order', status);
        formData.append('id_order', ID);
        formData.append('confirmation_date', formattedDateTime);
        // const responce = await axios.post("http://localhost/phpdasar/phpcrud/api/products/order_pulsa.php", formData);
        const responce = await axios.post("https://testreactlaravel.000webhostapp.com/backend/products/order_pulsa.php", formData);
        if (responce.data.success) {
            setTimeout(() => {
                // window.location.reload();
                userRowdata();
            }, 2000);
        }
    }

    // KONVERSI TGL
    function convertDateFormat(inputDate) {
        const parts = inputDate.split(' pukul ');
        // console.log(parts);
        if (parts.length === 2) {
            const datePart = parts[0];
            const timePart = parts[1].replace(/\./g, ':');

            // Konversi bulan ke angka
            const months = [
                "Januari", "Februari", "Maret", "April",
                "Mei", "Juni", "Juli", "Agustus",
                "September", "Oktober", "November", "Desember"
            ];
            const monthIndex = months.findIndex(month => datePart.includes(month));
            const month = (monthIndex + 1).toString().padStart(2, '0');

            // Mengonversi ke format yang sesuai dengan JavaScript
            const formattedDate = `2023-${month}-${datePart.substr(0, 2)}T${timePart}`;

            return formattedDate;
        } else {
            console.error("Format tanggal tidak valid.");
            return null; // Mengembalikan null untuk menunjukkan kesalahan
        }
    }

    //EXPIRED DATE STATUS GAGAL
    let formattedDate2 = null;
    const inputDate = formvalue.expired_date;
    if (inputDate) {
        const formattedDate = convertDateFormat(inputDate);
        formattedDate2 = formattedDate;
    } else {
        console.error("expired_date tidak memiliki nilai yang valid");
    }
    const now = format(new Date(), "yyyy-MM-d' T'HH:mm:ss");
    const postExpDate = async () => {
        const formData = new FormData();
        formData.append('expired_date', 'Gagal');
        formData.append('id_order', ID);
        formData.append('note', 'Pesanan expired setelah 2 jam');
        try {
            // const response = await axios.post("http://localhost/phpdasar/phpcrud/api/products/order_pulsa.php", formData);
            const response = await axios.post("https://testreactlaravel.000webhostapp.com/backend/products/order_pulsa.php", formData);

            if (response.data.success) {
                userRowdata();
            } else {
                console.error("Gagal memproses data");
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (formvalue.status_transaction === 'Pending') {
                if (now > formattedDate2) {
                    postExpDate();
                    userRowdata();
                }
                // console.log('test');
            } else {
                clearInterval(interval);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [now]);

    const navigate = useNavigate();
    const toPulsa = () => {
        navigate('/pulsa');
    };
    const toHome = () => {
        navigate('/');
    };

    const [showModal, setShowModal] = useState(false);
    const toHomeNotLogin = () => {
        setShowModal(true);
    };
    const handleSudahClick = () => {
        setShowModal(false);
        navigate('/');
    };

    const [showModalReport, setShowModalReport] = useState(false);
    const [dataForReport, setDataForReport] = useState('');
    const handleClickReport = (data) => {
        setShowModalReport(true);
        setDataForReport(data);
    };
    const handleReport = () => {
        const whatsappLink = `https://wa.me/6285323666527?text=Halo%20admin,%20saya%20${dataForReport.product_name}`;
        window.open(whatsappLink, "_blank");
    }


    const [showModalReportProses, setShowModalReportProses] = useState(false);
    const [dataForReportProses, setDataForReportProses] = useState('');
    const handleClickReportProses = (data) => {
        setShowModalReportProses(true);
        setDataForReportProses(data);
        console.log(showModalReportProses);
    };
    const handleReportProses = () => {
        const whatsappLink = `https://wa.me/6285323666527?text=Halo admin, Produk ${dataForReportProses.product_name} ke nomor ${dataForReportProses.phone_number} dengan kode transaksi: ${dataForReportProses.id} belum di proses, tolong dipercepat yaah`;
        window.open(whatsappLink, "_blank");
        setShowModalReportProses(false);
    }

    const [showModalReportSukses, setShowModalReportSukses] = useState(false);
    const [dataForReportSukses, setDataForReportSukses] = useState('');
    const handleClickReportSukses = (data) => {
        setShowModalReportSukses(true);
        setDataForReportSukses(data);
        console.log(showModalReportSukses);
    };

    const handleReportSukses = () => {
        const whatsappLink = `https://wa.me/6285323666527?text=Halo admin, saya ada masalah pada produk ${dataForReportSukses.product_name}, kode transaksi: ${dataForReportSukses.id}`;
        window.open(whatsappLink, "_blank");
        setShowModalReportSukses(false);
    }



    return (
        <div className="outBodyPulsa">
            <ToastContainer />
            <div className="bodyPulsa">
                <div className="headerPulsa">
                    <nav class="navbar-light bg-info text-white text-center" style={{ padding: '13px', boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.30)', zIndex: '15', background: 'white', position: 'fixed', width: '100%', maxWidth: '450px' }}>
                        {/* <a class="navbar-brand" onClick={() => window.history.back()} style={{ cursor: 'pointer' }}><i style={{ fontSize: '15px' }} className="fas fa-solid fa-arrow-left mr-4"></i></a> */}
                        <a class="navbar-brand" style={{ fontSize: '15px' }}><b>Detail Transaksi</b></a>
                        <i style={{ cursor: 'pointer' }}></i>
                    </nav>

                    <div className="container" style={{ paddingTop: '50px' }}>
                        <div className="mt-4">
                            {/* DETAIL TRANSAKSI */}
                            <div className="wrapping">
                                <div className="text-start d-flex justify-content-between">
                                    <small><b>Informasi Produk</b></small>
                                    {/* <i class="bi bi-plus-circle-fill text-success font-weight-bold"></i> */}
                                    <i style={{ cursor: 'pointer' }} class={`bi ${isContentVisible ? 'bi-dash-circle-fill' : 'bi-plus-circle-fill'} text-success`} onClick={toggleContentVisibility}></i>
                                </div>
                                <hr className="mt-2" />
                                <div style={{ fontSize: '15px' }}>
                                    <div className="mb-2 text-start d-flex justify-content-between">
                                        {/* <small>Nama Produk</small> */}
                                        {formvalue && formvalue.product_name ? (
                                            formvalue.product_name.includes('XL') ? (
                                                <img src="assets/img/provider/XL.png" width={30} className="img-fluid" alt="" />
                                            ) : formvalue.product_name.includes('Telkomsel') ? (
                                                <img src="assets/img/provider/Telkomsel.png" width={90} className="img-fluid" alt="" />
                                            ) : formvalue.product_name.includes('PLN') ? (
                                                <img src="assets/img/pln.png" width={20} className="img-fluid" alt="" />
                                            ) : null
                                        ) : null}

                                        <small>{formvalue.product_name}</small>
                                    </div>
                                    <div className={`content-container ${isContentVisible ? 'visible' : 'hidden'}`}>
                                        {isContentVisible ? (
                                            <>
                                                <div className="mb-2 text-start d-flex justify-content-between">
                                                    <small>Nomor Tujuan</small>
                                                    <small>{formvalue.phone_number}</small>
                                                </div>
                                                <div className="mb-2 text-start d-flex justify-content-between">
                                                    <small>Kode Transaksi</small>
                                                    {/* <small>{transactionCode}</small> */}
                                                    <small>{formvalue.id}</small>
                                                    {/* <small>{transactionCode}</small> */}
                                                </div>
                                                <div className="mb-2 text-start d-flex justify-content-between">
                                                    <small>Harga</small>
                                                    {/* <small>{transactionCode}</small> */}
                                                    <small>{amountRupiah}</small>
                                                    {/* <small>{transactionCode}</small> */}
                                                </div>
                                                <div className="mb-2 text-start d-flex justify-content-between">
                                                    <small>Admin</small>
                                                    {/* <small>{transactionCode}</small> */}
                                                    <small>{selectedFeeRipuah}</small>
                                                    {/* <small>{transactionCode}</small> */}
                                                </div>

                                                {/* {formvalue && formvalue.product_name.includes('PLN') && formvalue.status_transaction === 'Sukses' && (
                                                    <>
                                                        <div className="mb-2 text-start d-flex justify-content-between">
                                                            <small>Serial Number/Token</small>
                                                            <p><b>{formvalue.serial_number_pln}</b></p>
                                                        </div>
                                                    </>
                                                )} */}

                                                {formvalue && formvalue.status_transaction === 'Proses' && (
                                                    <div className="mb-2 text-start d-flex justify-content-between">
                                                        <button className="icon-button btn btn-success" onClick={() => { handleClickReportProses(formvalue) }} >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 258"><defs><linearGradient id="logosWhatsappIcon0" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#1FAF38" /><stop offset="100%" stop-color="#60D669" /></linearGradient><linearGradient id="logosWhatsappIcon1" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#F9F9F9" /><stop offset="100%" stop-color="#FFF" /></linearGradient></defs><path fill="url(#logosWhatsappIcon0)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a122.994 122.994 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004" /><path fill="url(#logosWhatsappIcon1)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416Zm40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513l10.706-39.082Z" /><path fill="#FFF" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561c0 15.67 11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716c-3.186-1.593-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64" /></svg>
                                                            Laporkan
                                                        </button>
                                                    </div>
                                                )}

                                                {formvalue && (formvalue.status_transaction === 'Sukses' || formvalue.status_transaction === 'Gagal') && (
                                                    <div className="mb-2 text-start d-flex justify-content-between">
                                                        <button className="icon-button btn btn-success" onClick={() => { handleClickReportSukses(formvalue) }} >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 258"><defs><linearGradient id="logosWhatsappIcon0" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#1FAF38" /><stop offset="100%" stop-color="#60D669" /></linearGradient><linearGradient id="logosWhatsappIcon1" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#F9F9F9" /><stop offset="100%" stop-color="#FFF" /></linearGradient></defs><path fill="url(#logosWhatsappIcon0)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a122.994 122.994 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004" /><path fill="url(#logosWhatsappIcon1)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416Zm40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513l10.706-39.082Z" /><path fill="#FFF" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561c0 15.67 11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716c-3.186-1.593-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64" /></svg>
                                                            Laporkan
                                                        </button>
                                                    </div>
                                                )}

                                                <hr />
                                                <div style={{ fontWeight: 'bold', color: 'green' }} className="mb-2 text-start d-flex justify-content-between">
                                                    <small>Total Pembayaran</small>
                                                    <small>{xRupiah}</small>
                                                    {/* <small>{transactionCode}</small> */}
                                                </div>
                                                {/* <hr /> */}

                                                <div className="text-start" style={{ borderRadius: '5px', padding: '0px 15px', paddingTop: '15px', paddingBottom: '1px', background: 'rgb(235, 235, 235)' }}>
                                                    <p style={{ fontSize: '13px' }}><b>Catatan</b>: <br />Pembelian {formvalue.product_name} ke nomor {formvalue.phone_number}</p>
                                                </div>
                                            </>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* STATUS TRANSAKSI */}
                            <div className="wrapping mt-2">
                                <div className="text-start d-flex justify-content-between">
                                    {/* <i class="bi bi-plus-circle-fill text-success font-weight-bold"></i> */}
                                    {/* <i style={{ cursor: 'pointer' }} class={`bi ${isContentVisible ? 'bi-dash-circle-fill' : 'bi-plus-circle-fill'} text-success`} onClick={toggleContentVisibility}></i> */}
                                </div>
                                <div className="text-start d-flex justify-content-between">
                                    <small><b>Status Transaksi</b></small>
                                </div>

                                <hr className="mt-2" />
                                <div style={{ fontSize: '15px' }}>
                                    <div className='content-container'>
                                        <div className="mb-2 text-start d-flex justify-content-between">
                                            <small>{formvalue.order_date}</small>
                                            {formvalue.status_transaction === 'Proses' ? (
                                                <div>
                                                    <small className="text-primary"><b>{formvalue.status_transaction}</b></small>
                                                    <span><i class="fa-solid fa-spinner fa-spin-pulse"></i></span>
                                                </div>
                                            ) : formvalue.status_transaction === 'Sukses' ? (
                                                <small className="text-success"><b>{formvalue.status_transaction}</b></small>
                                            ) : formvalue.status_transaction === 'Gagal' ? (
                                                <small className="text-danger"><b>{formvalue.status_transaction}</b></small>
                                            ) : (
                                                <small className="text-primary"><b>{formvalue.status_transaction}</b></small>
                                            )}
                                        </div>

                                        <div className="text-start" style={{ borderRadius: '5px', padding: '0px 15px', paddingTop: '15px', paddingBottom: '1px', background: 'rgb(235, 235, 235)' }}>
                                            {formvalue.status_transaction === 'Proses' ? (
                                                <p style={{ fontSize: '13px' }}><i>*pesananmu sedang dalam proses<br />*laporkan jika proses melebihi 10 menit</i></p>
                                            ) : formvalue.status_transaction === 'Sukses' ? (
                                                <p style={{ fontSize: '13px', color: 'green', fontWeight: 'bold' }}><i>*Pesanan sukses</i></p>
                                            ) : formvalue.status_transaction === 'Gagal' ? (
                                                <p style={{ fontSize: '13px', color: 'red', fontWeight: 'bold' }}><i>*Pesanan gagal<br />**{formvalue.note}</i></p>
                                            ) : (
                                                <p style={{ fontSize: '13px' }}><i>*system sedang menunggu pembayaran</i></p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* METODE PEMBAYARAN */}
                            {formvalue.status_transaction === 'Sukses' || formvalue.status_transaction === 'Gagal' ? (
                                null
                            ) : (
                                <div className="wrapping mt-2">
                                    <div className="text-start d-flex justify-content-between">
                                        <small><b>Metode Pembayaran</b></small>
                                        {/* <i class="bi bi-plus-circle-fill text-success font-weight-bold"></i> */}
                                        {/* <i style={{ cursor: 'pointer' }} class={`bi ${isContentVisible ? 'bi-dash-circle-fill' : 'bi-plus-circle-fill'} text-success`} onClick={toggleContentVisibility}></i> */}
                                    </div>
                                    <hr className="mt-2" />
                                    <div style={{ fontSize: '15px' }}>
                                        <div className='content-container'>
                                            <div className="mb-2 text-start d-flex justify-content-between">
                                                {/* <img src={payment_type} width={70} className="img-fluid" alt="" /> */}
                                                {payment_type ? (
                                                    payment_type.includes('1t3FBX3x') ? (
                                                        <img src="assets/img/dana.png" width={70} className="img-fluid" alt="" />
                                                    ) : payment_type.includes('NFVPYZzM') ? (
                                                        <img src="assets/img/gopay.png" width={70} className="img-fluid" alt="" />
                                                    ) : payment_type.includes('mkp') ? (
                                                        <img src="assets/img/mkp.png" width={70} className="img-fluid" alt="" />
                                                    ) : payment_type.includes('DwXyVXzQ') ? (
                                                        <img src="assets/img/ovo.png" width={70} className="img-fluid" alt="" />
                                                    ) : payment_type.includes('KzrnwjRc') ? (
                                                        <img src="assets/img/mkp.png" width={70} className="img-fluid" alt="" />
                                                    ) : null
                                                ) : null}
                                                <div className="bg-info" style={{ borderRadius: '5px', color: 'white', cursor: 'pointer' }} onClick={copyNumber}>
                                                    <small style={{ margin: '10px', fontSize: '12px' }}>Salin Nomor</small>
                                                </div>
                                            </div>

                                            {payment_type === 'https://i.postimg.cc/KzrnwjRc/Logo-MKP.png' ? (
                                                <div className="mb-2 text-start d-flex justify-content-between">
                                                    <small><b>BAYAR NANTI</b></small>
                                                </div>
                                            ) : payment_type === 'https://i.postimg.cc/NFVPYZzM/Logo-Go-Pay-PNG-1080p-File-Vector69.png' ? (
                                                <div className="mb-2 text-start d-flex justify-content-between">
                                                    <small>KIRIM GOPAY KE<p style={{ fontSize: '20px' }}><b>085323666527</b></p></small>
                                                    <small>A/N <b>MUHAMMAD KEMAL PASHA</b></small>
                                                </div>
                                            ) : payment_type === 'https://i.postimg.cc/1t3FBX3x/Logo-DANA-PNG-1080p-File-Vector69.png' ? (
                                                <div className="mb-2 text-start d-flex justify-content-between">
                                                    <small>KIRIM DANA KE<p style={{ fontSize: '20px' }}><b>085323666527</b></p></small>
                                                    <small>A/N <b>MUHAMMAD KEMAL PASHA</b></small>
                                                </div>
                                            ) : payment_type === 'https://i.postimg.cc/DwXyVXzQ/logo-ovo.png' ? (
                                                <div className="mb-2 text-start d-flex justify-content-between">
                                                    <small>KIRIM OVO KE<p style={{ fontSize: '20px' }}><b>085323666527</b></p></small>
                                                    <small>A/N <b>MUHAMMAD KEMAL PASHA</b></small>
                                                </div>
                                            ) : (
                                                null
                                            )}

                                            <div style={{ fontWeight: 'bold', color: 'green' }} className="text-start d-flex justify-content-between">
                                                <small>Total Pembayaran</small>
                                                <p style={{ fontSize: '18px' }}>{xRupiah}</p>
                                                {/* <small>{transactionCode}</small> */}
                                            </div>

                                            <div className="mb-4">
                                                <div className="bg-info" style={{ borderRadius: '5px', color: 'white', cursor: 'pointer' }} onClick={copyNominal}>
                                                    <small style={{ margin: '10px', fontSize: '12px' }}>Salin Nominal</small>
                                                </div>
                                            </div>


                                            <div className="text-start" style={{ borderRadius: '5px', padding: '0px 15px', paddingTop: '15px', paddingBottom: '1px', background: 'rgb(235, 235, 235)' }}>
                                                {/* <p style={{ fontSize: '13px' }}><b>Info</b>: <br />Lakukan pembayaran sebelum<br /><b>18 Agustus 2023, 23:20:20 WIB</b><br /> atau transaksi akan dibatalkan secara otomatis</p> */}
                                                <p style={{ fontSize: '13px' }}><b>Info</b>: <br />Lakukan pembayaran sebelum<br /><b>{formvalue.expired_date}</b><br /> atau transaksi akan dibatalkan secara otomatis</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* BUTTON */}
                            <div className="mt-4">
                                {formvalue.status_transaction === 'Pending' ? (
                                    <button onClick={handleStatus} style={{ width: '100%', fontSize: '13px', height: '40px' }} className="btn btn-primary">
                                        Konfirmasi Sudah Bayar
                                    </button>
                                ) : formvalue.status_transaction === 'Proses' ? (
                                    <button style={{ width: '100%', fontSize: '13px', height: '40px' }} disabled className="btn btn-info text-white">
                                        Pesananmu Dalam Proses...
                                    </button>
                                ) : formvalue.status_transaction === 'Sukses' ? (
                                    token ? (
                                        <button onClick={toHome} style={{ width: '100%', fontSize: '13px', height: '40px' }} className="btn btn-success text-white">
                                            Lihat Pesanan
                                        </button>
                                    ) : (
                                        <div>
                                            <p style={{ fontSize: '13px' }}><i>Screenshot halaman ini untuk keperluan jika ada masalah pada transaksi</i></p>
                                            <button onClick={toHomeNotLogin} style={{ width: '100%', fontSize: '13px', height: '40px' }} className="btn btn-success text-white">
                                                Beranda
                                            </button>
                                            {/* Modal To Home Not Login User */}
                                            <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <p style={{ fontFamily: 'cursive', fontWeight: 'bold' }} className="modal-title text-danger">Apakah halaman ini sudah di Screenshot?</p>
                                                            <button type="button" className="close" onClick={() => setShowModal(false)}>
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <button onClick={handleSudahClick} className="btn btn-primary" style={{ margin: '2px' }}>Sudah</button>
                                                            <button onClick={() => setShowModal(false)} className="btn btn-secondary" style={{ margin: '2px' }}>Belum</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Latar belakang modal */}
                                            {showModal && <div className="modal-backdrop fade show"></div>}

                                            {/* Modal Report*/}
                                            <div className={`modal ${showModalReport ? 'show' : ''}`} style={{ display: showModalReport ? 'block' : 'none' }}>
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <p style={{ fontFamily: 'cursive', fontWeight: 'bold' }} className="modal-title text-danger">Laporkan via WhatsApp?</p>
                                                            <button type="button" className="close" onClick={() => setShowModalReport(false)}>
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <button onClick={handleReport} className="btn btn-primary" style={{ margin: '2px' }}>Lanjut</button>
                                                            <button onClick={() => setShowModalReport(false)} className="btn btn-secondary" style={{ margin: '2px' }}>Tidak</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Latar belakang modal */}
                                            {showModal && <div className="modal-backdrop fade show"></div>}
                                        </div>
                                    )
                                ) : formvalue.status_transaction === 'Gagal' ? (
                                    <button onClick={toPulsa} style={{ width: '100%', fontSize: '13px', height: '40px' }} className="btn btn-danger text-white">
                                        Beli Lagi
                                    </button>
                                ) : (null)}
                                {/* Modal Report Proses*/}
                                <div className={`modal ${showModalReportProses ? 'show' : ''}`} style={{ display: showModalReportProses ? 'block' : 'none' }}>
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <p style={{ fontFamily: 'cursive', fontWeight: 'bold' }} className="modal-title text-danger">Laporkan via WhatsApp?</p>
                                                <button type="button" className="close" onClick={() => setShowModalReportProses(false)}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <button onClick={handleReportProses} className="btn btn-primary" style={{ margin: '2px' }}>Lanjut</button>
                                                <button onClick={() => setShowModalReportProses(false)} className="btn btn-secondary" style={{ margin: '2px' }}>Tidak</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {showModalReportProses && <div className="modal-backdrop fade show"></div>}

                                {/* Modal Report Sukses*/}
                                <div className={`modal ${showModalReportSukses ? 'show' : ''}`} style={{ display: showModalReportSukses ? 'block' : 'none' }}>
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <p style={{ fontFamily: 'cursive', fontWeight: 'bold' }} className="modal-title text-danger">Laporkan via WhatsApp?</p>
                                                <button type="button" className="close" onClick={() => setShowModalReportSukses(false)}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <button onClick={handleReportSukses} className="btn btn-primary" style={{ margin: '2px' }}>Lanjut</button>
                                                <button onClick={() => setShowModalReportSukses(false)} className="btn btn-secondary" style={{ margin: '2px' }}>Tidak</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {showModalReportProses && <div className="modal-backdrop fade show"></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}