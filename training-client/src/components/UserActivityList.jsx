import { useEffect, useState } from "react"
import { getUserActivities } from "../api/training.api"
import Skeleton from "@mui/material/Skeleton";
import UserActivityCard from "./UserActivityCard"

export default function ActivityLeaderboardList() {
    const [activities, setActivities] = useState([])
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedActivity = localStorage.getItem('selectedActivity');
        if (storedActivity) {
            setSelectedActivity(JSON.parse(storedActivity));
            setShowDetail(true);
        }
        const loadTasks = async () => {
            try {
                const res = await getUserActivities();
                setActivities(res.data);
            } catch (error) {
                console.error("Error loading user activities:", error);
            } finally {
                setLoading(false);
            }
        }
        loadTasks();
    }, [])

    const handleViewMore = (activity) => {
        setSelectedActivity(activity);
        setShowDetail(true);
        localStorage.setItem('selectedActivity', JSON.stringify(activity));
    };

    const handleGoBack = () => {
        localStorage.removeItem('selectedActivity');
        setShowDetail(false);
    };

    return (
        <div className="grid grid-cols-1 gap-6">
            <div className='text-2xl p-3 my-5 rounded font-bold text-center bg-reddy-green text-reddy-white cursor-default'>My Progress</div>
            {loading ? (
                <>
                    <Skeleton variant="rectangular" height={200} />
                    <Skeleton variant="rectangular" height={200} />
                    <Skeleton variant="rectangular" height={200} />
                </>
            ) : (
                !showDetail ? (
                    activities.map((item) => (
                        <UserActivityCard
                            key={item.activity.id}
                            activity={item}
                            onViewMore={() => handleViewMore(item)}
                        />
                    ))
                ) : (
                    <UserActivityCard
                        activity={selectedActivity}
                        onGoBack={handleGoBack}
                    />
                )
            )}
        </div>
    )
}
