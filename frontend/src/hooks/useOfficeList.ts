import { useEffect, useState, useMemo } from 'react';
import { fetchOffices } from '../services/index'
import { Offices } from '../types';

const useOfficeList = () => {
  // Set Time
  const time = 60000;

  // Create State
  const [offices, setOffices] = useState<Offices[]>([]);
  const [oficcesList, setOfficeList] = useState<Offices[]>(offices);
  const [searchTerm, setSearchTerm] = useState('');

  // Create Filter
  const filteredOffices = useMemo(() => {
    return offices.filter(office => 
      office.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [offices, searchTerm]);

  // Create Sort
  const sortedLocations = useMemo(() => {
    return [...filteredOffices].sort((a, b) => {
      return (b.online ? 1 : 0) - (a.online ? 1 : 0);
    });
  }, [filteredOffices]);

  // Create Toggle Status
  const toggleOnlineStatus = (officeId: number) => {
    setOffices(prevOffices => 
      prevOffices.map(office =>
        office.id === officeId ? { ...office, online: !office.online } : office
      )
    );
  };

  // Fetch Data
  useEffect(() => {
    const fetchAndSetOffices = async () => {
      try {
        const data = await fetchOffices();
        if (data?.succes && data.data) {
          setOffices(data.data);
        }
      } catch (error) {
        console.error('Error fetching offices:', error);
      }
    };

    // Fetch Offices
    fetchAndSetOffices();

    // Set Interval
    const interval = setInterval(fetchAndSetOffices, time);
    
    // Clear Interval
    return () => clearInterval(interval);
  }, []);

  return {
    toggleOnlineStatus,
    setOfficeList,
    setSearchTerm,
    setOffices,
    oficcesList,
    sortedLocations,
    offices
  };
}

export default useOfficeList; 