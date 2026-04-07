import React, { useState, useEffect, useContext } from 'react';
import { Calendar as CalendarIcon, MapPin, Gamepad2, Mic2, Flame, ArrowRight } from 'lucide-react';
import { EventContext } from '../context/EventContext';
import type { AppEvent } from '../types';

const HeroSection: React.FC = () => {
  const { banners } = useContext(EventContext);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) {
    return (
      <div className="w-full h-[55vh] bg-gray-200 mt-20 flex flex-col items-center justify-center border-b-4 border-black text-center px-4">
        <p className="text-2xl font-black text-gray-500">등록된 배너가 없습니다.</p>
        <p className="text-lg font-bold text-gray-400">관리자 페이지에서 배너를 추가해 주세요!</p>
      </div>
    );
  }

  const banner = banners[currentSlide];

  return (
    <div 
      className={`relative w-full py-20 min-h-[50vh] border-b-4 border-black overflow-hidden transition-colors duration-500 mt-20 cursor-pointer group ${banner.bgColor}`}
      onClick={() => { if (banner.linkUrl) window.open(banner.linkUrl, '_blank'); }}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center z-10">
        
        {/* 이미지 대신 텍스트를 화면 한가운데에 아주 크게 배치합니다! */}
        <div className="space-y-8 flex flex-col items-center">
          <div className="inline-block bg-black text-white px-6 py-2 font-black text-xl border-4 border-black transform -rotate-2 brutal-shadow-sm">
            {banner.tag}
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black leading-tight tracking-tighter break-keep" style={{ textShadow: '4px 4px 0 #fff' }}>
            {banner.title}
          </h1>
          
          <p className="text-2xl md:text-3xl text-black font-bold bg-white inline-block px-4 py-2 border-4 border-black transform rotate-1 brutal-shadow-sm">
            {banner.subtitle}
          </p>
          
          <div className="flex items-center gap-4 mt-8 bg-white border-4 border-black px-6 py-3 font-black text-xl lg:text-2xl brutal-shadow-sm group-hover:bg-black group-hover:text-white transition-all">
            <CalendarIcon className="w-8 h-8" strokeWidth={3} />
            <span>{banner.date}</span>
            <ArrowRight className="w-8 h-8 ml-2" strokeWidth={3} />
          </div>
        </div>

      </div>

      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {banners.map((_, idx) => (
            <button 
              key={idx} 
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(idx);
              }} 
              className={`h-4 border-2 border-black transition-all duration-300 brutal-shadow-sm ${idx === currentSlide ? "w-12 bg-black" : "w-4 bg-white hover:bg-gray-200"}`} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const EventCard: React.FC<{ event: AppEvent }> = ({ event }) => {
  const formattedDate = `${event.startDate.slice(5).replace('-','.')} - ${event.endDate.slice(5).replace('-','.')}`;
  
  // 카테고리를 한글로 예쁘게 변환
  const categoryText = event.category === 'subculture' ? '서브컬처' : event.category === 'game' ? '게임' : 'J-POP';
  
  return (
    <div 
      className="group cursor-pointer bg-white border-4 border-black brutal-shadow brutal-shadow-hover transition-all duration-200 flex flex-col h-full overflow-hidden"
      onClick={() => { if (event.linkUrl) window.open(event.linkUrl, '_blank'); }}
    >
      {/* 📸 사진이 빠진 자리를 '컬러 블록'과 '날짜 태그'로 화려하게 채웁니다! */}
      <div className={`relative h-32 md:h-40 ${event.tagColor} border-b-4 border-black p-4 flex flex-col justify-between transition-colors`}>
        <div className="flex justify-between items-start z-10">
          <span className="bg-black text-white px-3 py-1 font-black text-sm md:text-base border-2 border-black transform -rotate-2 brutal-shadow-sm">
            {categoryText}
          </span>
          <div className="bg-white border-2 border-black px-2 py-1 font-black text-black text-xs md:text-sm flex items-center gap-1 brutal-shadow-sm transform rotate-1">
            <CalendarIcon className="w-4 h-4" strokeWidth={3} />
            {formattedDate}
          </div>
        </div>
        {/* 우측 하단에 들어가는 은은한 배경 패턴 장식 */}
        <div className="absolute -bottom-6 -right-4 opacity-20 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500 text-black font-black text-7xl">
          ✦
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        {/* 제목을 더 크고 눈에 띄게! */}
        <h3 className="text-xl md:text-2xl font-black text-black group-hover:text-pink-600 transition-colors leading-snug break-keep">
          {event.title}
        </h3>
        
        <div className="space-y-3 mt-auto">
          <div className="flex items-center gap-2 text-black font-bold bg-gray-100 border-2 border-black px-3 py-2 w-fit group-hover:bg-cyan-100 transition-colors">
            <MapPin className="w-5 h-5" strokeWidth={3} />
            <span className="text-sm md:text-base">{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
};

const Section: React.FC<{ title: string, icon: React.ElementType, data: AppEvent[], titleBg: string }> = ({ title, icon: Icon, data, titleBg }) => {
  if (data.length === 0) return null; 
  return (
    <section className="py-16 relative">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div className="relative inline-block">
          <div className={`absolute inset-0 ${titleBg} border-4 border-black transform translate-x-2 translate-y-2`} />
          <div className="relative bg-white border-4 border-black px-6 py-4 flex items-center gap-3">
            <Icon className="w-8 h-8 text-black" strokeWidth={3} />
            <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">{title}</h2>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map(event => <EventCard key={event.id} event={event} />)}
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  const { events } = useContext(EventContext);

  const subcultureEvents = events.filter(e => e.category === 'subculture');
  const gameEvents = events.filter(e => e.category === 'game');
  const jpopEvents = events.filter(e => e.category === 'jpop');

  return (
    <>
      <HeroSection />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 min-h-[400px]">
        {events.length === 0 && (
          <div className="text-center py-20 border-4 border-dashed border-gray-400">
            <p className="text-2xl font-black text-gray-500 mb-4">앗! 등록된 행사가 없어요.</p>
            <p className="text-lg font-bold text-gray-400">우측 상단 '관리자' 아이콘을 눌러 행사를 추가해 보세요!</p>
          </div>
        )}
        <Section title="이번 주말, 덕력을 채울 시간 🎨" icon={Flame} data={subcultureEvents} titleBg="bg-pink-400" />
        <Section title="오프라인에서 만나는 최애 게임 🎮" icon={Gamepad2} data={gameEvents} titleBg="bg-cyan-400" />
        <Section title="고막을 녹일 J-POP 내한 일정 🎤" icon={Mic2} data={jpopEvents} titleBg="bg-lime-400" />
      </main>
    </>
  );
};

export default HomePage;