import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddPersonnel() {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const personnel = { name, score, daysWorked: 0 };
    const response = await fetch('/api/personnel');
    const personnelList = await response.json();
    const updatedPersonnelList = Array.isArray(personnelList) ? personnelList : [];
    updatedPersonnelList.push(personnel);
    await fetch('/api/personnel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPersonnelList),
    });
    router.push('/personnel-list');
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-mono">
              Personel Ekle
            </h1>
            <p className="text-gray-600 font-mono">
              Yeni personel bilgilerini girerek sisteme ekleyin
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-mono">
                    Personel Adı
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-4 py-2.5"
                      placeholder="Personelin adını giriniz"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-mono">
                    Puan
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      required
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-4 py-2.5"
                      placeholder="Personelin puanını giriniz"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-2">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition duration-200 font-mono"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-mono"
                >
                  Kaydet
                </button>
               
              </div>
            </form>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/personnel-list"
              className="text-sm text-gray-600 hover:text-blue-600 transition duration-200 font-mono"
            >
              Personel listesine geri dön →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}