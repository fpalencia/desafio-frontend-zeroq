import { FaSearch } from "react-icons/fa";

type AppSearchInputProps = {
  onSearch: (term: string) => void;
}

const AppSearchInput = ({ onSearch }: AppSearchInputProps) => {
  return (
    <div className="bg-[#2d4f83] p-2 w-full">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex w-full lg:w-96 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="search"
            placeholder="Buscar sucursal"
            onChange={(e) => onSearch(e.target.value)}
            className="w-full py-2 pl-10 pr-4 bg-white rounded-[4px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>
    </div>
  )
}

export default AppSearchInput