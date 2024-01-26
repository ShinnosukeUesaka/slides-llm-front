
type TimeLineProps = {
  content: {
    title: string;
    elements: {
      title: string;
      details: string;
      time: string;
    }[]
  };
  visibleContent: {
    title: boolean;
    element_1: boolean;
    element_2: boolean;
    element_3: boolean;
  };
};

export default function TimeLine({ content, visibleContent }: TimeLineProps) {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className={`text-4xl font-bold mb-8 ${visibleContent.title ? 'opacity-100' : 'opacity-0'}`}>{content.title}</h1>
      <div className="flex flex-col items-center justify-center">
        {content.elements.map((event, index) => (
          <div key={index} className={`flex flex-col items-center justify-center !duration-300 ${visibleContent[`element_${index + 1}` as keyof typeof visibleContent] ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center mb-4 transition-opacity">
              {index % 2 === 0 ? (
                <>
                  <div className="bg-white p-4 rounded-lg shadow-md mr-4">
                    <h2 className="font-semibold text-black">{event.title}</h2>
                    <p className="text-black">{event.details}</p>
                  </div>
                  <div className="bg-[#34D399] rounded-full p-3 text-white font-bold">{event.time}</div>
                </>
              ) : (
                <>
                  <div className="bg-[#34D399] rounded-full p-3 text-white font-bold mr-4">{event.time}</div>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="font-semibold text-black">{event.title}</h2>
                    <p className="text-black">{event.details}</p>
                  </div>
                </>
              )}
            </div>
            {index < content.elements.length - 1 && (
              <div className="w-0.5 bg-gray-300 h-6 mb-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
