import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

const VersatileCountdownTimer = ({ endtime }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [blinkColon, setBlinkColon] = useState(true);

  function calculateTimeLeft() {
    const now = new Date();
    const endDate = new Date(endtime);
    const difference = +endDate - +now;

    let timeLeft = {};

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      timeLeft = {
        days,
        hours,
        minutes,
        seconds,
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      setBlinkColon((prev) => !prev);
    }, 500);

    return () => clearInterval(timer);
  }, [endtime]);

  const Digit = ({ value }) => (
    <div className="relative w-14 h-20 rounded-md overflow-hidden bg-white/20">
      <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold font-mono text-purple-900">
        {value}
      </div>
    </div>
  );

  const Colon = () => (
    <div
      className={`text-4xl font-bold mx-0.5 ${
        blinkColon ? 'text-purple-900' : 'text-transparent'
      }`}
    >
      :
    </div>
  );

  return (
    <div className="p-6 rounded-xl inline-block bg-white/50">
      <div className="flex items-center justify-center space-x-1 mb-3">
        {timeLeft.days > 0 && (
          <div className="flex flex-col items-center">
            <div className="flex gap-x-1">
              <Digit
                value={timeLeft.days?.toString().padStart(2, '0')[0] || '0'}
              />
              <Digit
                value={timeLeft.days?.toString().padStart(2, '0')[1] || '0'}
              />
            </div>
            <div className="text-sm font-semibold">Days</div>
          </div>
        )}
        {timeLeft.days > 0 && <Colon />}
        <div className="flex flex-col items-center">
          <div className="flex gap-x-1">
            <Digit
              value={timeLeft.hours?.toString().padStart(2, '0')[0] || '0'}
            />
            <Digit
              value={timeLeft.hours?.toString().padStart(2, '0')[1] || '0'}
            />
          </div>
          <div className="text-sm font-semibold">Hours</div>
        </div>
        <Colon />
        <div className="flex flex-col items-center">
          <div className="flex gap-x-1">
            <Digit
              value={timeLeft.minutes?.toString().padStart(2, '0')[0] || '0'}
            />
            <Digit
              value={timeLeft.minutes?.toString().padStart(2, '0')[1] || '0'}
            />
          </div>
          <div className="text-sm font-semibold">Minutes</div>
        </div>
        <Colon />
        <div className="flex flex-col items-center">
          <div className="flex gap-x-1">
            <Digit
              value={timeLeft.seconds?.toString().padStart(2, '0')[0] || '0'}
            />
            <Digit
              value={timeLeft.seconds?.toString().padStart(2, '0')[1] || '0'}
            />
          </div>
          <div className="text-sm font-semibold">Seconds</div>
        </div>
      </div>
      {timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0 && (
          <div className="flex items-center justify-center text-fuchsia-600 animate-pulse">
            <AlertCircle className="mr-1 w-4 h-4" />
            <span className="text-sm font-semibold">Time&apos;s up!</span>
          </div>
        )}
    </div>
  );
};

export default VersatileCountdownTimer;
