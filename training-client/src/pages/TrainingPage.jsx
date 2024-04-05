import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserActivityById } from "../api/training.api";
import { toast } from 'react-hot-toast';
import TrainingCard from '../components/TrainingCard';
import Skeleton from '@mui/material/Skeleton';

export default function TrainingPage() {
    const { activityId } = useParams();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadActivity = async () => {
            try {
                const {data} = await getUserActivityById(activityId);
                setActivity(data);
            } catch (error) {
                console.error("Error al cargar la actividad:", error);
                toast.error("Error al cargar la actividad");
            } finally {
                setLoading(false);
            }
        };
        loadActivity();
    }, [activityId]);

    return (
        <div className='grid grid-cols-1 gap-6'>
            <h1 className='text-2xl p-3 rounded mx-32 font-bold text-center bg-reddy-green text-reddy-white cursor-default'>Training Time</h1>
            {loading ? (
                <Skeleton variant="rectangular" height={400} />
            ) : (
                <TrainingCard activity={activity} />
            )}
        </div>
    );
}
