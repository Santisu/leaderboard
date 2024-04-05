import { useEffect, useState } from "react"
import { getLeaderBoardList, getUserActivityById } from "../api/training.api"
import UserActivityCard from "./UserActivityCard"
import LeaderBoardCard from "./LeaderBoardCard"
import { toast } from "react-hot-toast"
import Button from "./Button"
import Skeleton from "@mui/material/Skeleton";

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
                const res = await getLeaderBoardList();
                setActivities(res.data);
            } catch (error) {
                console.error("Error loading leaderboard activities:", error);
                toast.error("Error loading leaderboard activities");
            } finally {
                setLoading(false);
            }
        }
        loadTasks();
    }, [])

    const handleViewMore = async (activityId) => {
        try {
            const res = await getUserActivityById(activityId);
            const updatedActivity = res.data;
            setSelectedActivity(updatedActivity);
            localStorage.setItem('selectedActivity', JSON.stringify(updatedActivity));
            setShowDetail(true);
        } catch (error) {
            toast.error(error.response.data.data);
        }
    };

    const handleGoBack = () => {
        localStorage.removeItem('selectedActivity');
        setShowDetail(false);
    };

    return (
        <div className="grid grid-cols-1 gap-6 cursor-default">
            {!showDetail ? (
                loading ? (
                    <>
                        <Skeleton variant="rectangular" height={200} />
                        <Skeleton variant="rectangular" height={200} />
                        <Skeleton variant="rectangular" height={200} />
                    </>
                ) : (
                    <>
                        <div className='text-2xl p-3 my-5 rounded font-bold text-center bg-reddy-green text-reddy-white '>Leaderboard</div>
                        {activities.map((item) => (
                            <div key={item.activity.id}
                                className="bg-reddy-purple rounded text-reddy-white p-4 transition-shadow duration-200  hover:shadow-2xl">
                                <LeaderBoardCard activity={item} />
                                <div className="flex justify-center">
                                    <Button onClick={() => handleViewMore(item.activity.id)} text={"My Progress"} /></div>
                            </div>
                        ))}
                    </>
                )
            ) : (
                <>
                    <div className='text-2xl p-3 my-5 rounded font-bold text-center bg-reddy-green text-reddy-white cursor-default'>My Progress</div>
                    <UserActivityCard
                        activity={selectedActivity}
                        onGoBack={handleGoBack}
                    />
                </>
            )}
        </div>
    )
}
