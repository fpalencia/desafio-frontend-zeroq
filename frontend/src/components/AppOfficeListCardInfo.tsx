import { useEffect } from 'react'
import { calculateAverageElapsed, formatTime } from '../helpers'
import useOfficeList from '../hooks/useOfficeList';
import AppOfficeCardInfo from './AppOfficeCardInfo'
import AppSearchInput from './AppSearchInput'

const AppListCardInfo = () => {

  const { offices, sortedLocations, toggleOnlineStatus, setOfficeList, setSearchTerm } = useOfficeList();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    setOfficeList(offices);
  }, [offices, setOfficeList]);

  return (
    <>
      <AppSearchInput onSearch={handleSearch} />
      <div className="container max-w-screen-xl mx-auto py-6">
        {sortedLocations.length === 0 ? (
          <div className="text-center text-white text-xl py-10">
            Sucursal no encontrada
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-3 md:px-2 lg:px-0 cursor-pointer">
            {sortedLocations.map((location, index) => (
              <AppOfficeCardInfo
                key={index}
                name={location.name}
                waiting={location.lines.map(line => line.waiting)}
                time={formatTime(calculateAverageElapsed(location.lines))}
                isDisabled={location.online}
                onToggleStatus={() => toggleOnlineStatus(location.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default AppListCardInfo