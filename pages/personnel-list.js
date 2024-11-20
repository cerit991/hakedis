import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PersonnelList() {
  const [personnelList, setPersonnelList] = useState([]);

  useEffect(() => {
    const fetchPersonnelList = async () => {
      const response = await fetch('/api/personnel');
      const data = await response.json();
      setPersonnelList(Array.isArray(data) ? data : []);
    };
    fetchPersonnelList();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value);
  };

  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Anasayfaya Dön Butonu */}
        <div className="absolute top-4 left-4">
          <Link href="/" className="group flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md group-hover:shadow-lg transition-all duration-200 border border-gray-100">
              <svg 
                className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-200" 
                fill="none" 
                strokeWidth="2" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="text-sm font-medium hidden md:block">Anasayfa</span>
          </Link>
        </div>

        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-mono">
            Personel Listesi
          </h1>
          <p className="text-gray-600 font-mono">
            Toplam Personel Sayısı: {personnelList.length}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {personnelList.map((personnel, index) => {
            const totalDaysWorked = Object.values(personnel.daysWorkedByMonth || {}).reduce((sum, days) => sum + days, 0);
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 font-mono">
                      {personnel.name}
                    </h2>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium font-mono">
                      Puan: {personnel.score}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-gray-600 font-mono">
                      <span>Toplam Çalışma Günü:</span>
                      <span className="font-semibold">{totalDaysWorked} gün</span>
                    </div>

                    <div className="border-t pt-3">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2 font-mono">
                        Aylık Detaylar
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(personnel.earningsByMonth || {}).map(([month, earnings]) => (
                          <div
                            key={month}
                            className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded font-mono"
                          >
                            <div className="flex flex-col">
                              <span className="text-gray-700">{month}</span>
                              <span className="text-gray-500 text-xs">
                                {personnel.daysWorkedByMonth[month]} gün
                              </span>
                            </div>
                            <span className="font-medium text-green-600">
                              {formatCurrency(earnings)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {personnelList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Henüz personel kaydı bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </div>
  );
}