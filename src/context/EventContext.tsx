import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AppEvent, HeroBanner } from '../types';
import { supabase } from '../supabase';

interface EventContextType {
  events: AppEvent[];
  addEvent: (event: AppEvent) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  banners: HeroBanner[];
  addBanner: (banner: HeroBanner) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;
  
  // 👇 1. 검색어 저장소 설계도 추가
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}

export const EventContext = createContext<EventContextType>({
  events: [], addEvent: async () => {}, deleteEvent: async () => {},
  banners: [], addBanner: async () => {}, deleteBanner: async () => {},
  
  // 👇 2. 타입 에러를 막기 위한 기본값 추가
  searchKeyword: '', setSearchKeyword: () => {},
});

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  
  // 👇 3. 실제로 검색어를 저장할 공간(State) 생성
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchEvents = async () => {
    const { data } = await supabase.from('events').select('*');
    if (data) setEvents(data as AppEvent[]);
  };

  const fetchBanners = async () => {
    const { data } = await supabase.from('banners').select('*');
    if (data) setBanners(data as HeroBanner[]);
  };

  useEffect(() => {
    fetchEvents();
    fetchBanners();
  }, []);

  const addEvent = async (event: AppEvent) => {
    await supabase.from('events').insert([event]);
    fetchEvents();
  };

  const deleteEvent = async (id: string) => {
    await supabase.from('events').delete().eq('id', id);
    fetchEvents();
  };

  const addBanner = async (banner: HeroBanner) => {
    await supabase.from('banners').insert([banner]);
    fetchBanners();
  };

  const deleteBanner = async (id: string) => {
    await supabase.from('banners').delete().eq('id', id);
    fetchBanners();
  };

  return (
    // 👇 4. 다른 파일에서 꺼내 쓸 수 있도록 value에 추가!
    <EventContext.Provider value={{ 
      events, addEvent, deleteEvent, 
      banners, addBanner, deleteBanner,
      searchKeyword, setSearchKeyword 
    }}>
      {children}
    </EventContext.Provider>
  );
};