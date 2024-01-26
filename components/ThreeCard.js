
export default function ThreeCard({cardTitle, cardOneTitle, cardOneText, cardTwoTitle, cardTwoText, cardThreeTitle, cardThreeText}) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">{cardTitle}</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-200 p-6 rounded-lg">
            <GalleryThumbnailsIcon className="text-gray-400 mx-auto h-20 w-20" />
            <h3 className="mt-8 text-lg leading-6 font-medium text-gray-900">{cardOneTitle}</h3>
            <p className="mt-5 text-base text-gray-500">
              {cardOneText}
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg">
            <GalleryThumbnailsIcon className="text-gray-400 mx-auto h-20 w-20" />
            <h3 className="mt-8 text-lg leading-6 font-medium text-gray-900">{cardTwoTitle}</h3>
            <p className="mt-5 text-base text-gray-500">
              {cardTwoText}
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg">
            <GalleryThumbnailsIcon className="text-gray-400 mx-auto h-20 w-20" />
            <h3 className="mt-8 text-lg leading-6 font-medium text-gray-900">{cardThreeTitle}</h3>
            <p className="mt-5 text-base text-gray-500">
              {cardThreeText}
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  function GalleryThumbnailsIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="14" x="3" y="3" rx="2" />
        <path d="M4 21h1" />
        <path d="M9 21h1" />
        <path d="M14 21h1" />
        <path d="M19 21h1" />
      </svg>
    )
  }


  