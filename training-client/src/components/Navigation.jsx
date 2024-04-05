import { Link } from "react-router-dom";

export default function Navigation() {
    const handleLinkClick = () => {
        localStorage.removeItem('selectedActivity');
    };

    return (
        <div className="flex justify-between fixed top-0 left-0 w-full z-50 p-8 text-xl font-bold bg-reddy-cream">
            <div className="flex gap-3">
                <Link to="/main" onClick={handleLinkClick}>
                    <div className="p-3 rounded bg-reddy-green text-reddy-white hover:bg-reddy-green-200">Training Platform</div>
                </Link>
                <Link to="/main" onClick={handleLinkClick}>
                    <div className="p-3 rounded bg-reddy-green text-reddy-white hover:bg-reddy-green-200">Leaderboard</div>
                </Link>
            </div>
            <div className="flex gap-3">
                <Link to="/user" onClick={handleLinkClick}>
                    <div className="p-3 rounded bg-reddy-green text-reddy-white hover:bg-reddy-green-200">
                        Mi Profile
                    </div>
                </Link>
            </div>
        </div>
    );
}
