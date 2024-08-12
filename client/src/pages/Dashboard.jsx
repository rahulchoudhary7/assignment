import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchBannerData, updateBannerData } from '../services/api';
import LaptopScreenLoader from '../components/LaptopScreenLoader';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const convertToDateTimeLocal = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    const loadBannerData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchBannerData();
        setFormData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadBannerData();
  }, []);

  const formattedDateTimeLocal = convertToDateTimeLocal(
    formData && formData.endtime
  );

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'datetime-local') {
      const [date, time] = value.split('T');
      const isoDate = new Date(`${date}T${time}`).toISOString();
      setFormData({ ...formData, [name]: isoDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateBannerData(formData);
      toast.success('Banner updated successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to update banner. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <LaptopScreenLoader />
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-50 mt-12">
          <main className="flex-grow container mx-auto px-4 py-12">
            <h1 className="text-5xl font-bold mb-10 text-center text-fuchsia-700">
              Dashboard
            </h1>
            <div className="bg-white shadow-lg rounded-xl p-10 max-w-3xl mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isvisible"
                      checked={formData.isvisible}
                      onChange={handleChange}
                      className="form-checkbox h-6 w-6 text-fuchsia-600 rounded focus:ring-fuchsia-500"
                    />
                    <span className="ml-3 text-gray-800 text-lg font-medium">
                      Banner Visibility
                    </span>
                  </label>
                </div>
                <div className="mb-8">
                  <label
                    className="block text-gray-800 text-sm font-semibold mb-3"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="shadow-md focus:ring-fuchsia-500 focus:border-fuchsia-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-lg p-3"
                    rows="4"
                    placeholder="Enter a brief description..."
                  />
                </div>
                <div className="mb-8">
                  <label
                    className="block text-gray-800 text-sm font-semibold mb-3"
                    htmlFor="link"
                  >
                    Link
                  </label>
                  <input
                    type="url"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    className="shadow-md focus:ring-fuchsia-500 focus:border-fuchsia-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-lg p-3"
                    placeholder="https://example.com"
                  />
                </div>
                <div className="mb-8">
                  <label
                    className="block text-gray-800 text-sm font-semibold mb-3"
                    htmlFor="endtime"
                  >
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    id="endtime"
                    name="endtime"
                    value={formattedDateTimeLocal}
                    onChange={handleChange}
                    required
                    className="shadow-md focus:ring-fuchsia-500 focus:border-fuchsia-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-lg p-3"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-fuchsia-600 to-pink-500 hover:from-fuchsia-700 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 transition duration-300 "
                  >
                    Update Banner
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Dashboard;
