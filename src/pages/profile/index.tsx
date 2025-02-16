import React from 'react';
import Topbar from "@/components/topbar/topbar";
import Footer from "@/components/footer/footer";

const Profile: React.FC = () => {
    // Example data for heatmap (7x4 weeks of activity)
    const heatmapData = Array(28).fill(0).map(() => Math.floor(Math.random() * 5)); // Random activity levels for 28 days (4 weeks)

    return (
        <>
            <Topbar />
            <div className="bg-gradient-to-b from-white to-teal-100 min-h-screen">
                <div className="flex flex-col items-center pt-12">
                    {/* Profile and Rating Section */}
                    <div className="flex flex-row justify-center w-full max-w-screen-lg">
                        {/* Left Section - Profile Info */}
                        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full mr-12">
                            <div className="flex items-center mb-4">
                                <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                                <div className="ml-4">
                                    <h2 className="text-2xl font-bold text-teal-600">Somil Kumar</h2>
                                    <p className="text-gray-500">Username: <span className="font-semibold text-teal-500">somilkumar</span></p>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="space-y-2">
                                <p><strong>Country:</strong> India</p>
                                <p><strong>Status:</strong> Student</p>
                                <p><strong>Institution:</strong> Thapar Institute of Engineering and Technology Patiala, Punjab</p>
                                <p><strong>AlgoArena Pro Plan:</strong> No Active Plan. <a href="#" className="text-blue-500">View Details</a></p>
                            </div>
                        </div>

                        {/* Right Section - Ratings */}
                        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
                            <h1 className="text-4xl font-bold text-gray-800">0</h1>
                            <p className="text-gray-500">(Div 3)</p>
                            <div className="flex justify-center my-2">
                                {/* Change color to turquoise */}
                                <div className="w-6 h-6 bg-cyan-500 text-white font-bold flex items-center justify-center rounded-md">★</div>
                                <div className="w-6 h-6 bg-cyan-500 text-white font-bold flex items-center justify-center rounded-md ml-2">★</div>
                            </div>
                            <p className="text-blue-600 font-semibold">AlgoArena Rating</p>
                            <p className="text-gray-500">(Highest Rating 0)</p>
                            <div className="flex justify-around mt-4">
                                <div className="text-blue-600">
                                    <p className="text-2xl font-bold">0</p>
                                    <p>Global Rank</p>
                                </div>
                                <div className="border-l-2 border-gray-300"></div>
                                <div className="text-blue-600">
                                    <p className="text-2xl font-bold">0</p>
                                    <p>Country Rank</p>
                                </div>
                                <div className="border-l-2 border-gray-300"></div> {/* Separator for Institute Rank */}
                                <div className="text-blue-600">
                                    <p className="text-2xl font-bold">0</p>
                                    <p>Institute Rank</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Turquoise Line after Profile */}
                    <hr className="w-11/12 border-t-4 border-teal-500 my-4 mx-auto" />


                    {/* Heatmap Section */}
                    <div className="w-full mt-4 flex justify-center">
                        <div className="bg-white shadow-lg rounded-lg p-6 w-2/3">
                            <h2 className="text-2xl font-semibold mb-4 text-teal-600">Activity Heat Map</h2>
                            <hr className="border-t-2 border-teal-500 mb-4" />
                            
                            {/* Heatmap grid */}
                            <div className="grid grid-cols-8 gap-2">
                                <div className="text-right pr-2">Mon</div>
                                {heatmapData.slice(0, 7).map((activityLevel, index) => {
                                    const colorIntensity = ['bg-gray-200', 'bg-green-100', 'bg-green-300', 'bg-green-500', 'bg-green-700'][activityLevel];
                                    return <div key={index} className={`w-8 h-8 ${colorIntensity} rounded-md`} title={`Day ${index + 1}: Activity level ${activityLevel}`} />;
                                })}
                                <div className="text-right pr-2">Wed</div>
                                {heatmapData.slice(7, 14).map((activityLevel, index) => {
                                    const colorIntensity = ['bg-gray-200', 'bg-green-100', 'bg-green-300', 'bg-green-500', 'bg-green-700'][activityLevel];
                                    return <div key={index} className={`w-8 h-8 ${colorIntensity} rounded-md`} title={`Day ${index + 1}: Activity level ${activityLevel}`} />;
                                })}
                                <div className="text-right pr-2">Fri</div>
                                {heatmapData.slice(14, 21).map((activityLevel, index) => {
                                    const colorIntensity = ['bg-gray-200', 'bg-green-100', 'bg-green-300', 'bg-green-500', 'bg-green-700'][activityLevel];
                                    return <div key={index} className={`w-8 h-8 ${colorIntensity} rounded-md`} title={`Day ${index + 1}: Activity level ${activityLevel}`} />;
                                })}
                                <div className="text-right pr-2">Sun</div>
                                {heatmapData.slice(21, 28).map((activityLevel, index) => {
                                    const colorIntensity = ['bg-gray-200', 'bg-green-100', 'bg-green-300', 'bg-green-500', 'bg-green-700'][activityLevel];
                                    return <div key={index} className={`w-8 h-8 ${colorIntensity} rounded-md`} title={`Day ${index + 1}: Activity level ${activityLevel}`} />;
                                })}
                            </div>

                            {/* X-axis (Months) */}
                            <div className="grid grid-cols-8 mt-4">
                                <div></div> {/* empty space to align with heatmap */}
                                <div className="text-center">Apr</div>
                                <div className="text-center">May</div>
                                <div className="text-center">Jun</div>
                                <div className="text-center">Jul</div>
                                <div className="text-center">Aug</div>
                                <div className="text-center">Sep</div>
                                <div className="text-center">Oct</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
