import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import { fetchBannerData } from '../services/api';
import LaptopScreenLoader from '../components/LaptopScreenLoader';
import { toast } from 'react-toastify';

const Home = () => {
  const [bannerData, setBannerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBannerData = async () => {
      try {
        const data = await fetchBannerData();
        setBannerData(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load banner data');
      } finally {
        setIsLoading(false);
      }
    };
    loadBannerData();
  }, []);

  return (
    <>
      {isLoading ? (
        <LaptopScreenLoader />
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-100">
          <main className="flex-grow w-full">
            {bannerData && bannerData.isvisible ? (
              <div className="w-full">
                <Banner
                  description={bannerData.description}
                  link={bannerData.link}
                  endtime={bannerData.endtime}
                />
              </div>
            ) : (
              <div className="bg-gradient-to-b from-red-500 to-purple-700 text-white py-16 w-full">
                <div className="container mx-auto px-4">
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                      Welcome to Our Platform!
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-center">
                      Check out our latest features and stay tuned for exciting updates.
                    </p>
                    <button className="bg-white text-fuchsia-600 font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="container mx-auto px-4 py-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-fuchsia-900">
                Our Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {['Innovative AI', 'Seamless Integration', '24/7 Support'].map(
                  (feature, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                    >
                      <h3 className="text-xl font-semibold mb-4 text-fuchsia-700">
                        {feature}
                      </h3>
                      <p className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenean euismod bibendum laoreet.
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Home;