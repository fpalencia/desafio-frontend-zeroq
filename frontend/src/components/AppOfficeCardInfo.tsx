import { FaRegClock, FaRegUser } from "react-icons/fa";


type AppOfficeCardInfoCardProps = {
  name: string
  waiting: number[]
  time: string
  isDisabled?: boolean
  onToggleStatus: () => void;
}

const AppOfficeCardInfo = ({ name, waiting, time, isDisabled, onToggleStatus }: AppOfficeCardInfoCardProps) => {

  const totalWaiting = waiting.reduce((acc, curr) => acc + curr, 0);

  return (
    <div
      className={`flex flex-col h-full rounded-sm overflow-hidden card ${isDisabled ? 'online' : 'offline'}
      ${!isDisabled ? 'bg-gray-300' : 'bg-[#2d4f83]'}`}
      onClick={onToggleStatus}
    >
      <div className="p-6 flex-1">
        <h1 className={`text-2xl font-bold
          ${!isDisabled ? 'text-gray-500' : 'text-white'}`}>
          {name}
        </h1>
      </div>
      <div className={`p-2 flex items-center gap-6
        ${!isDisabled ? 'bg-gray-400' : 'bg-emerald-500'}`}>
        <div className="flex items-center gap-2">
          <FaRegUser className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">{totalWaiting}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaRegClock className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">{time}</span>
        </div>
      </div>
    </div>
  )
}

export default AppOfficeCardInfo