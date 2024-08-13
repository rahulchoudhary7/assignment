import CountdownTimer from './CountdownTimer';

const Banner = ({ description, link, endtime }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-600 to-purple-700 w-full px-4">
      <div className="max-w-3xl w-full">
        <div className="flex items-center justify-center bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-full mb-6 sm:mb-12">
          <span className="text-white font-medium text-xs sm:text-sm md:text-base">
            ⏱️ Limited Time Offer
          </span>
        </div>

        <h1 className="text-white text-center text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 tracking-tight">
          {description}
        </h1>

        <p className="text-gray-300 text-center text-sm sm:text-base md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12">
          Don't miss out on this exclusive opportunity. Act now and take
          advantage of our special offer before it's too late.
        </p>

        <div className="flex flex-col justify-center items-center space-y-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg md:text-xl hover:from-fuchsia-600 hover:to-indigo-600 transition-colors"
          >
          
            Learn More
          </a>
          <CountdownTimer endtime={endtime} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
