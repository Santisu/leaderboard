import { CheckCircle, Cancel } from '@mui/icons-material';


export default function LeaderBoardCard({ activity }) {
    const activityItem = activity.activity
    const topUsers = activity.top_users

    return (
        <div >
            <h2 className="text-2xl font-bold text-center">{activityItem.name}</h2>
            <h3 className="text-xl text-center my-2">{activityItem.description}</h3>
            <div className="flex ">
                {activityItem.is_active ? (
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
            {
                topUsers.length !== 0 ?
                    <table className="mx-auto w-1/2 bg-reddy-yellow rounded text-black transform transition-transform  duration-200 hover:scale-105">
                        <thead className='text-center text-xl'>
                            <tr>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {
                                topUsers.map((item) => (
                                    <tr key={item.user_activity.user.id} 
                                    className='text-xl transition-colors hover:bg-reddy-yellow-200'>
                                        <td>{item.user_activity.user.username}</td>
                                        <td>{item.score}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> :
                    <div className=' text-black text-center text-3xl p-3 rounded   bg-reddy-yellow mx-auto w-1/2'>
                        No one has trained this activity yet.</div>
            }
        </div>
    )
}
