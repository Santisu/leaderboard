import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { CheckCircle, Cancel, Check, HourglassEmpty } from '@mui/icons-material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ProgressBar from './ProgressBar';
export default function UserActivityCard({ activity, onViewMore, onGoBack }) {
    const activityObject = activity.activity;
    const userLog = activity.user_log;
    const navigate = useNavigate()
    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleTrainingButton = () => {
        navigate(`/training/${activityObject.id}`)
    }

    return (
        <div className="bg-reddy-purple rounded text-reddy-white p-4 cursor-default transition-shadow duration-200  hover:shadow-2xl">
            {
                onViewMore &&
                <>
                    <div>
                        <h1 className="text-2xl font-bold text-center">{activityObject.name}</h1>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                {activityObject.is_active ? (
                                    <>
                                        <CheckCircle className="text-green-500 mr-1" />
                                        <h3>Available</h3>
                                    </>
                                ) : (
                                    <>
                                        <Cancel className="text-red-500 mr-1" />
                                        <h3>Not Available</h3>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center">
                                <p><DateRangeIcon /> {formatDate(activityObject.start_date)} - {formatDate(activityObject.end_date)}</p>
                            </div>
                            <div className="flex items-center font-bold">

                                {userLog ? (
                                    userLog.user_activity.completed ? (
                                        <>
                                            <Check className="text-green-500 mr-1" />
                                            <span>Completed</span>
                                        </>
                                    ) : (
                                        <>
                                            <HourglassEmpty className="text-yellow-500 mr-1" />
                                            <span>In Progress</span>
                                        </>
                                    )
                                ) : (
                                    <span>Not Trained Yet</span>
                                )}

                            </div>
                        </div>

                        <p className="text-xl text-center m-3">Description: {activityObject.description}</p>
                        <div className='mx-4'>
                        <div className="bg-reddy-yellow text-black rounded-lg p-4  transform transition-transform duration-200 hover:scale-110">
                            {userLog ? (<>
                                <ProgressBar score={userLog.score}></ProgressBar>
                            </>
                            ) : (
                                <p className="text-lg font-bold text-center">You haven't trained yet</p>
                            )}
                        </div>
                    </div>
                        <div className='flex justify-center'>
                            <Button onClick={() => onViewMore(activity)} text={"View more"} />
                        </div>
                    </div>
                </>
            }
            {
                onGoBack &&
                <>
                    <h1 className="text-2xl font-bold text-center">{activityObject.name}</h1>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            {activityObject.is_active ? (
                                <>
                                    <CheckCircle className="text-green-500 mr-1" />
                                    <h3>Available</h3>
                                </>
                            ) : (
                                <>
                                    <Cancel className="text-red-500 mr-1" />
                                    <h3>Not Available</h3>
                                </>
                            )}
                        </div>
                        <div className="flex items-center">
                            <p><DateRangeIcon /> {formatDate(activityObject.start_date)} - {formatDate(activityObject.end_date)}</p>
                        </div>
                        <div className="flex items-center font-bold">

                            {userLog ? (
                                userLog.user_activity.completed ? (
                                    <>
                                        <Check className="text-green-500 mr-1" />
                                        <span>Completed</span>
                                    </>
                                ) : (
                                    <>
                                        <HourglassEmpty className="text-yellow-500 mr-1" />
                                        <span>In Progress</span>
                                    </>
                                )
                            ) : (
                                <span>Not Trained Yet</span>
                            )}

                        </div>
                    </div>
                    <p className="text-xl text-center m-3">Description: {activityObject.description}</p>
                    <div className='mx-4'>
                        <div className="bg-reddy-yellow text-black rounded-lg p-4  transform transition-transform duration-200 hover:scale-110">
                            {userLog ? (<>
                                <ProgressBar score={userLog.score}></ProgressBar>
                            </>
                            ) : (
                                <p className="text-lg font-bold text-center">You haven't trained yet</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-4 gap-2">

                        {userLog &&
                            <>
                                <p className="bg-reddy-yellow text-black rounded-lg p-4 ">Last training: {formatDate(userLog.user_activity.updated_at)}</p>
                                {
                                    userLog.user_activity.completed ? <p className="bg-reddy-yellow text-black rounded-lg p-4 ">
                                        Completed on: {formatDate(userLog.ended_at)}</p>
                                        : <> </>
                                }

                            </>
                        }

                    </div>
                    <div className='flex justify-center'>
                        <Button onClick={() => onGoBack()} text={"Go Back"} />
                        <Button onClick={handleTrainingButton} disabled={activityObject.is_active ? false : true} text={"Train"} />

                    </div>
                </>
            }
        </div>

    );
}
