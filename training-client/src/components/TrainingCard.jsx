import { useState } from 'react';
import { getStartTraining } from "../api/training.api";
import { toast } from "react-hot-toast";
import Button from './Button';
import { Check, HourglassEmpty } from '@mui/icons-material';
import ProgressBar from './ProgressBar';
export default function TrainingCard({ activity }) {
    const [activityObject, setActivityObject] = useState(activity.activity);
    const [userLog, setUserLog] = useState(activity.user_log);

    const handleTrainingButtonClick = async () => {
        const toastId = toast.loading("Training Hard")
        try {
            const { data } = await getStartTraining(activityObject.id);
            const updatedData = data;
            setActivityObject(data.activity);
            setUserLog(data.user_log);
            if (data.user_log.score >= 500) {
                toast.success("Training session finished, you have the Max Score");
            } else {
                toast.success(`Training session finished, your score now is: ${data.user_log.score}`)
            }
            localStorage.setItem('selectedActivity', JSON.stringify(updatedData));
        } catch (error) {
            toast.error(error.response.data.data);
        }
        toast.dismiss(toastId);
    };

    return (
        <div className="bg-reddy-purple rounded text-reddy-white p-4 mx-32 cursor-default transition-shadow duration-200  hover:shadow-2xl">
            <h1 className="text-2xl font-bold text-center">{activityObject.name}</h1>

            <div className="flex justify-end font-bold">

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
            <p className="text-xl text-center m-3">Description: {activityObject.description}</p>

            <div>
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
            <Button onClick={() => window.history.back()} text={
                        "Go Back"
                    } />
                {
                    activityObject.is_active && (
                        
                    <Button onClick={handleTrainingButtonClick} text={
                        !userLog
                            ? "Start Training"
                            : userLog.score < 500
                            ? "Continue Training"
                                : "Train Again"
                    } />
                )
            }
            
            </div>
        </div>
    );
}

