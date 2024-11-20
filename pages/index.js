import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto p-8">
        <div className="text-center space-y-6 mb-16">
          <div className="relative">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 font-mono relative z-10 animate-fade-in">
              Hakediş Hesaplama
            </h1>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          </div>
          <p className="text-gray-600 text-xl font-mono tracking-wide">
            Personel hakediş ve kazanç hesaplamalarını yapın
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link href="/add-personnel" className="group perspective">
            <div className="h-full bg-white rounded-2xl shadow-lg transition-all duration-500 transform group-hover:shadow-2xl group-hover:scale-105 border border-gray-100">
              <div className="relative p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative flex flex-col items-center space-y-6">
                  <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg transform transition-transform duration-500 group-hover:rotate-12">
                    <span className="text-3xl font-bold text-white">+</span>
                  </div>
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-semibold text-gray-800 font-mono">Personel Ekle</h2>
                    <p className="text-gray-600 text-sm font-mono leading-relaxed">
                      Yeni personel kaydı oluşturun ve bilgilerini yönetin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/personnel-list" className="group perspective">
            <div className="h-full bg-white rounded-2xl shadow-lg transition-all duration-500 transform group-hover:shadow-2xl group-hover:scale-105 border border-gray-100">
              <div className="relative p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative flex flex-col items-center space-y-6">
                  <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-lg transform transition-transform duration-500 group-hover:rotate-12">
                    <span className="text-3xl font-bold text-white">#</span>
                  </div>
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-semibold text-gray-800 font-mono">Personel Listesi</h2>
                    <p className="text-gray-600 text-sm font-mono leading-relaxed">
                      Tüm personelleri görüntüleyin ve yönetin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/earnings" className="group perspective">
            <div className="h-full bg-white rounded-2xl shadow-lg transition-all duration-500 transform group-hover:shadow-2xl group-hover:scale-105 border border-gray-100">
              <div className="relative p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative flex flex-col items-center space-y-6">
                  <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg transform transition-transform duration-500 group-hover:rotate-12">
                    <span className="text-3xl font-bold text-white">₺</span>
                  </div>
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-semibold text-gray-800 font-mono">Kazanç Hesapla</h2>
                    <p className="text-gray-600 text-sm font-mono leading-relaxed">
                      Personel hakediş ve kazanç hesaplamalarını yapın
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <style jsx global>{`
          .perspective {
            perspective: 1000px;
          }
        `}</style>
      </div>
    </div>
  );
}