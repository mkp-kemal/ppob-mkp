import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { HashRouter  as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import { LandingPage } from './Pages/LandingPage';
// import Protected from './Components/Protected';
import {Checkout, Pulsa} from './Pages/Pulsa';
import { DataTrans, Transaction } from './Pages/Transaction';
import { CheckoutKuota, Kuota } from './Pages/Kuota';
import { PLNPrabayar } from './Pages/PLN';
import { Wallet } from './Pages/Wallet';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<Protected Component={LandingPage} />} /> */}
        <Route path='/' element={<LandingPage />} />

        {/* PULSA */}
        <Route path="/pulsa" element={<Pulsa />} />
        <Route path="/checkoutpulsa" element={<Checkout />} />
        <Route path="/detailtransaksi" element={<Transaction />} />
        <Route path="/getdetailtransaksi" element={<DataTrans />} />

        {/* KUOTA */}
        <Route path="/kuota" element={<Kuota />} />
        <Route path="/checkoutkuota" element={<CheckoutKuota />} />

        {/* PLN */}
        <Route path="/plnprabayar" element={<PLNPrabayar />} />

        {/* WALLET */}
        <Route path="/e-wallet" element={<Wallet />} />

        <Route path="/checkout" element={<CheckoutKuota />} />


      </Routes>
    </Router>
  );
}

export default App;
