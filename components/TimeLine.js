
export default function TimeLine({title, subtitle1, des1, time1, subtitle2, des2, time2, subtitle3, des3, time3}) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">{title}</h1>
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-4">
            <div className="bg-white p-4 rounded-lg shadow-md mr-4">
              <h2 className="font-semibold text-black">{subtitle1}</h2>
              <p className="text-black">{des1}</p>
            </div>
            <div className="bg-[#34D399] rounded-full p-3 text-white font-bold">{time1}</div>
          </div>
          <div className="w-0.5 bg-gray-300 h-16 mb-4" />
          <div className="flex items-center mb-4">
            <div className="bg-[#34D399] rounded-full p-3 text-white font-bold mr-4">{time2}</div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="font-semibold text-black">{subtitle2}</h2>
              <p className="text-black">{des2}</p>
            </div>
          </div>
          <div className="w-0.5 bg-gray-300 h-16 mb-4" />
          <div className="flex items-center">
            <div className="bg-white p-4 rounded-lg shadow-md mr-4">
              <h2 className="font-semibold text-black">{subtitle3}</h2>
              <p className="text-black">{des3}</p>
            </div>
            <div className="bg-[#34D399] rounded-full p-3 text-white font-bold">{time3}</div>
          </div>
        </div>
      </div>
    )
  }
  
  