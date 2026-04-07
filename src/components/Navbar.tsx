import React, { useContext } from 'react'; // 👈 useContext 추가
import { Search, Flower } from 'lucide-react';
import { EventContext } from '../context/EventContext'; // 👈 EventContext 불러오기

interface NavbarProps {
  currentView: 'home' | 'calendar' | 'admin';
  setCurrentView: (view: 'home' | 'calendar' | 'admin') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  // 👇 EventContext에서 검색 관련 함수와 상태 가져오기
  const { searchKeyword, setSearchKeyword } = useContext(EventContext);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          
          {/* Left Area: Logo + Tabs */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* Logo */}
            <div 
              className="relative w-12 h-12 md:w-14 md:h-14 cursor-pointer group flex-shrink-0"
              onClick={() => setCurrentView('home')}
            >
              <div className="absolute inset-0 bg-lime-400 border-4 border-black brutal-shadow-sm transform -rotate-12 group-hover:rotate-0 transition-all z-0"></div>
              <div className="absolute inset-0 bg-cyan-400 border-4 border-black brutal-shadow-sm transform rotate-6 group-hover:rotate-0 transition-all z-10"></div>
              <div className="absolute inset-0 bg-pink-500 border-4 border-black brutal-shadow-sm flex items-center justify-center transform group-hover:scale-110 transition-all z-20">
                <Flower className="w-6 h-6 md:w-8 md:h-8 text-black fill-white" strokeWidth={2.5} />
              </div>
            </div>
            
            {/* View Switcher */}
            <div className="flex space-x-2">
              <button 
                onClick={() => setCurrentView('home')}
                className={`px-3 py-1.5 md:px-5 md:py-2 font-black text-base md:text-xl border-4 border-black transition-all ${currentView === 'home' ? 'bg-black text-white brutal-shadow-sm' : 'bg-white text-black hover:bg-gray-200'}`}
              >
                홈
              </button>
              <button 
                onClick={() => setCurrentView('calendar')}
                className={`px-3 py-1.5 md:px-5 md:py-2 font-black text-base md:text-xl border-4 border-black transition-all ${currentView === 'calendar' ? 'bg-black text-white brutal-shadow-sm' : 'bg-white text-black hover:bg-gray-200'}`}
              >
                캘린더
              </button>
            </div>
          </div>

          {/* Search Area */}
          <div className="flex-1 max-w-2xl mx-2 md:mx-8">
            <div className="relative w-full flex brutal-shadow-sm transition-all hover:translate-x-1 hover:translate-y-1 hover:box-shadow-none">
              <input
                type="text"
                // 👇 보관함의 글자(searchKeyword)를 보여주고, 타자를 치면 보관함에 업데이트(setSearchKeyword) 합니다.
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  // 검색 시작 시 무조건 '홈' 탭으로 이동하게 만듭니다. (검색 결과는 홈에 뜨니까요!)
                  if (e.target.value.trim() !== '') {
                    setCurrentView('home');
                  }
                }}
                className="block w-full pl-4 pr-10 py-2 md:py-3 border-4 border-black border-r-0 rounded-l-none bg-white text-black placeholder-gray-500 font-bold focus:outline-none focus:bg-yellow-50"
                placeholder="찾고 싶은 행사를 검색해봐!"
              />
              
              {/* 입력한 글자가 있을 때만 나타나는 (X) 버튼 추가 */}
              {searchKeyword && (
                <button 
                  type="button" 
                  onClick={() => setSearchKeyword('')}
                  className="absolute right-[50px] md:right-[60px] top-1/2 transform -translate-y-1/2 font-black text-gray-400 hover:text-black z-10 p-2"
                >
                  X
                </button>
              )}
              
              <button className="bg-pink-400 border-4 border-black px-3 md:px-4 flex items-center justify-center hover:bg-pink-500 transition-colors">
                <Search className="h-5 w-5 md:h-6 md:w-6 text-black" strokeWidth={3} />
              </button>
            </div>
          </div>

          <div className="flex items-center flex-shrink-0 w-4 md:w-12"></div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;