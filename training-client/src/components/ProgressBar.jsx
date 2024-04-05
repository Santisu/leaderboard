import { useEffect, useState } from 'react';

export default function ProgressBar({ score }) {
    const [filledWidth, setFilledWidth] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFilledWidth(prevWidth => {
                const targetWidth = (score / 500) * 100;
                const increment = 1;
                return prevWidth + increment > targetWidth ? targetWidth : prevWidth + increment;
            });
        }, 1);

        return () => clearInterval(intervalId);
    }, [score]);

    return (
        <div className="flex flex-col items-center rounded">
            <div className="w-10/12 h-7 bg-gray-200 rounded-full dark:bg-gray-700 mt-4 relative overflow-hidden">
                <div className={`absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center h-7 text-xs font-bold text-center leading-none rounded-full ${filledWidth === 100 ? 'bg-green-600' : 'bg-indigo-600'}`} style={{ width: `${filledWidth}%`, transition: '1s ' }}>{filledWidth.toFixed(2)}%</div>
            </div>
            <div className="text-xl text-black font-bold text-center mt-2">Score: {score}</div>
        </div>
    );
}
