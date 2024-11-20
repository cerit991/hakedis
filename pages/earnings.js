import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Earnings() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [revenue, setRevenue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [personnelList, setPersonnelList] = useState([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState([]);
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPersonnelList = async () => {
      const response = await fetch('/api/personnel');
      const data = await response.json();
      setPersonnelList(Array.isArray(data) ? data : []);
    };
    fetchPersonnelList();
  }, []);

  const handlePersonnelChange = (e) => {
    const { value, checked } = e.target;
    setSelectedPersonnel((prev) =>
      checked ? [...prev, value] : prev.filter((person) => person !== value)
    );
  };

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedPersonnel(personnelList.map(person => person.name));
    } else {
      setSelectedPersonnel([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      const totalRevenue = revenue * (percentage / 100);
      const selectedPersonnelDetails = personnelList.filter(person => selectedPersonnel.includes(person.name));
      const totalScore = selectedPersonnelDetails.reduce((sum, person) => sum + parseInt(person.score), 0);
      const pointValue = totalRevenue / totalScore;
      const reportData = selectedPersonnelDetails.map((person) => ({
        name: person.name,
        earnings: ((person.score / totalScore) * totalRevenue).toFixed(2),
      }));
      setReport({ data: reportData, totalScore, totalRevenue, pointValue, date: new Date(date).toLocaleString('tr-TR', { month: 'long', year: 'numeric' }) });
      setLoading(false);
    }, 3500);
  };

  const handleDistribute = async () => {
    const updatedPersonnelList = personnelList.map(person => {
      const reportItem = report.data.find(item => item.name === person.name);
      if (reportItem) {
        const earningsByMonth = person.earningsByMonth || {};
        const daysWorkedByMonth = person.daysWorkedByMonth || {};
        earningsByMonth[report.date] = (parseFloat(earningsByMonth[report.date] || 0) + parseFloat(reportItem.earnings)).toFixed(2);
        daysWorkedByMonth[report.date] = (daysWorkedByMonth[report.date] || 0) + 1;
        return { ...person, earningsByMonth, daysWorkedByMonth };
      }
      return person;
    });
    await fetch('/api/personnel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPersonnelList),
    });
    router.push('/personnel-list');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value);
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
            Personel Kazanç Hesaplama
          </h1>
          <p className="text-gray-600 font-mono">
            Hakediş dağıtımı için gerekli bilgileri giriniz
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-mono">Tarih</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-mono">Gelir</label>
                  <input
                    type="number"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    required
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Toplam geliri giriniz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-mono">Dağıtım Yüzdesi (%)</label>
                  <input
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    required
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Dağıtılacak yüzdeyi giriniz"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 font-mono">Personel Seçimi</label>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <label className="flex items-center space-x-2 pb-2 border-b">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedPersonnel.length === personnelList.length}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-medium">Tümünü Seç</span>
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {Array.isArray(personnelList) && personnelList.map((person, index) => (
                      <label key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={person.name}
                          onChange={handlePersonnelChange}
                          checked={selectedPersonnel.includes(person.name)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span>{person.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-mono"
              >
                Rapor Oluştur
              </button>
            </form>
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="text-center space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 font-mono">Hesaplanıyor...</h2>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="animate-pulse h-full bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            ) : report.data && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 font-mono">Kazanç Raporu</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600 font-mono">Dönem</div>
                      <div className="font-medium">{report.date}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600 font-mono">Toplam Puan</div>
                      <div className="font-medium">{report.totalScore}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600 font-mono">Dağıtılacak Tutar</div>
                      <div className="font-medium">{formatCurrency(report.totalRevenue)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600 font-mono">Puan Değeri</div>
                      <div className="font-medium">{formatCurrency(report.pointValue)}</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3 font-mono">Personel Dağılımı</h3>
                    <div className="space-y-2">
                      {report.data.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-green-600 font-medium">{formatCurrency(item.earnings)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleDistribute}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 mt-4 font-mono"
                  >
                    Dağıtımı Tamamla
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}