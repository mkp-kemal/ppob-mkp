import React, { useEffect, useState } from 'react';

function Device() {
    const [deviceName, setDeviceName] = useState('');

    useEffect(() => {
        // Fungsi untuk mendapatkan informasi nama perangkat
        function getDeviceName() {
            const userAgent = navigator.userAgent;
            let deviceName = 'Perangkat Tidak Diketahui';

            // Identifikasi Desktop
            if (/Win64|WOW64|Win32/.test(userAgent)) {
                deviceName = 'Desktop';
                // Tambahan informasi spesifik untuk Windows (Contoh: Lenovo KHQUP)
                const winInfo = userAgent.match(/Windows NT \d+\.\d+/);
                if (winInfo) {
                    deviceName += ` ${winInfo[0]}`;
                }
            }

            // Identifikasi iPhone
            else if (/iPhone/.test(userAgent)) {
                deviceName = 'iPhone';
            }

            // Identifikasi iPad
            else if (/iPad/.test(userAgent)) {
                deviceName = 'iPad';
            }

            // Identifikasi Android
            else if (/Android/.test(userAgent)) {
                deviceName = 'Android';
                // Tambahan informasi spesifik untuk Android (Contoh: Lenovo KHQUP)
                const androidInfo = userAgent.match(/Android \d+\.\d+(\.\d+)?/);
                if (androidInfo) {
                    deviceName += ` ${androidInfo[0]}`;
                }
            }

            // Identifikasi Tablet Umum
            else if (/Tablet/.test(userAgent)) {
                deviceName = 'Perangkat Tablet';
            }

            // Identifikasi Perangkat Mobile Umum
            else if (/Mobile/.test(userAgent)) {
                deviceName = 'Perangkat Mobile';
            }

            return deviceName;
        }

        // Set nama perangkat saat komponen mount
        setDeviceName(getDeviceName());
    }, []);

    return (
        <div className="ml-4 mt-3 text-secondary" style={{ color: 'black' }}>
            <i class="fas fa-solid fa-mobile"></i>
            <span className="ml-2" style={{ fontWeight: '400' }}>{deviceName}</span>
            {/* <span className="ml-2" style={{ fontWeight: '400' }}> 1 Perangkat</span> */}
        </div>
    );
}

export default Device;
