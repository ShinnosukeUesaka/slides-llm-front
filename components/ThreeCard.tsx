import Image from 'next/image'

type ThreeCardProps = {
  content: {
    title: string;
    elements: {
      title: string;
      details: string;
      image: string;
    }[]
  };
  visibleContent: {
    title: boolean;
    element_1: boolean;
    element_2: boolean;
    element_3: boolean;
  };
  }
  export default function ThreeCard({ content, visibleContent }: ThreeCardProps) {
    return ( 
    <div className="h-full w-full flex flex-col items-center justify-center p-12">
    <h1 className={`text-4xl font-bold mb-4 self-center !duration-300 ${visibleContent.title ? 'opacity-100' : 'opacity-0'}`}>{content.title}</h1>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {content.elements.map((element, index) => (
            <div className={`flex flex-col items-center transition-opacity !duration-300 ${visibleContent[`element_${index + 1}` as keyof typeof visibleContent] ?  'opacity-100' : 'opacity-0'}`} key={index}>
              <Image
                alt="Placeholder"
                className="w-24 h-24 rounded-xl mb-2"
                height="100"
                src={element.image}
                style={{
                  aspectRatio: "100/200",
                  objectFit: "cover",
                }}
                width="200"
              />
              <h2 className="text-2xl font-semibold mb-2">{element.title}</h2>
              <p className="text-base text-gray-600">{element.details}</p>
            </div>
          ))}
          
        </div>
        </div>
    )
  }

  