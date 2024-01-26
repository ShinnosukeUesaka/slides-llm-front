export interface IntroSlideProps {
  content: {
    title: string;
    sub_title: string;
    image: string;
  };
  visibleContent: {
    title: boolean;
    sub_title: boolean;
    image: boolean;
  };
}

export default function IntroSlide({
  content,
  visibleContent,
}: IntroSlideProps) {
  return (
    <section className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-2">
      <div className="w-1/2 h-full flex items-center justify-center transition-opacity !duration-300" style={{ opacity: visibleContent.image ? 1 : 0}}>
        <img
          alt="Profile Picture"
          className="w-full h-auto rounded-full object-cover"
          height="500"
          src={content.image}
          style={{
            aspectRatio: "500/500",
            objectFit: "cover",
          }}
          width="500"
        />
      </div>
      <div className="w-1/2 h-full flex flex-col items-center justify-center space-y-4">
        <h1
          className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 transition-opacity !duration-300"
          style={{ opacity: visibleContent.title ? 1 : 0 }}
        >
          {content.title}
        </h1>
        <p
          className="text-xl text-center text-gray-600 dark:text-gray-400 transition-opacity !duration-300"
          style={{ opacity: visibleContent.sub_title ? 1 : 0 }}
        >
          {content.sub_title}
        </p>
      </div>
    </section>
  );
}
