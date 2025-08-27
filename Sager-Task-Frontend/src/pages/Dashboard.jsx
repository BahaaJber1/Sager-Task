import { useDrones } from "../context/DronesContext";
import { useState, useEffect } from "react";

function Dashboard() {
	const { uniqueDrones, dronePaths } = useDrones();
	const [stats, setStats] = useState({
		totalDrones: 0,
		greenDrones: 0,
		redDrones: 0,
		averageAltitude: 0,
		totalFlightTime: 0,
	});

	useEffect(() => {
		if (uniqueDrones && dronePaths) {
			const greenCount = uniqueDrones.filter((drone) =>
				drone.properties.registration?.split("-")[1]?.startsWith("B")
			).length;

			const redCount = uniqueDrones.filter(
				(drone) =>
					!drone.properties.registration?.split("-")[1]?.startsWith("B")
			).length;

			const totalAltitude = uniqueDrones.reduce(
				(sum, drone) => sum + (drone.properties.altitude || 0),
				0
			);

			const averageAltitude =
				uniqueDrones.length > 0
					? Math.round(totalAltitude / uniqueDrones.length)
					: 0;

			setStats({
				totalDrones: uniqueDrones.length,
				greenDrones: greenCount,
				redDrones: redCount,
				averageAltitude,
				totalFlightTime: uniqueDrones.length * 60, // Mock flight time
			});
		}
	}, [uniqueDrones, dronePaths]);

	return (
		<div className="p-8 bg-[#111] min-h-screen text-white">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
						Sager Drone Dashboard
					</h1>
					<p className="text-xl text-gray-400">
						Real-time monitoring and analytics for your drone operations
					</p>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
					{/* Total Drones */}
					<div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-blue-200 text-sm font-medium">
									Total Drones
								</p>
								<p className="text-3xl font-bold">{stats.totalDrones}</p>
							</div>
							<div className="text-4xl">🚁</div>
						</div>
					</div>

					{/* Green Drones */}
					<div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-green-200 text-sm font-medium">Authorized</p>
								<p className="text-3xl font-bold">{stats.greenDrones}</p>
							</div>
							<div className="text-4xl">✅</div>
						</div>
					</div>

					{/* Red Drones */}
					<div className="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-xl shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-red-200 text-sm font-medium">Unauthorized</p>
								<p className="text-3xl font-bold">{stats.redDrones}</p>
							</div>
							<div className="text-4xl">⚠️</div>
						</div>
					</div>

					{/* Average Altitude */}
					<div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-xl shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-purple-200 text-sm font-medium">
									Avg Altitude
								</p>
								<p className="text-3xl font-bold">{stats.averageAltitude}m</p>
							</div>
							<div className="text-4xl">📊</div>
						</div>
					</div>
				</div>

				{/* Live Map Preview */}
				<div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg mb-8">
					<h2 className="text-2xl font-bold mb-4 text-center">
						Live Operations Map
					</h2>
					<div className="bg-gray-700 h-64 rounded-lg flex items-center justify-center">
						<div className="text-center">
							<div className="text-6xl mb-4">🗺️</div>
							<p className="text-gray-300 text-lg">
								{stats.totalDrones > 0
									? `${stats.totalDrones} drones currently active`
									: "No drones currently active"}
							</p>
							<p className="text-gray-400 mt-2">
								Click on "Map" in the sidebar to view live drone positions
							</p>
						</div>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 rounded-xl shadow-lg">
						<h3 className="text-xl font-bold mb-3">Quick Actions</h3>
						<ul className="space-y-2 text-indigo-200">
							<li>• View live drone positions on the map</li>
							<li>• Monitor flight paths in real-time</li>
							<li>• Check drone authorization status</li>
							<li>• Track altitude and flight time</li>
						</ul>
					</div>

					<div className="bg-gradient-to-br from-teal-600 to-teal-800 p-6 rounded-xl shadow-lg">
						<h3 className="text-xl font-bold mb-3">System Status</h3>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span>WebSocket Connection</span>
								<span className="bg-green-500 px-2 py-1 rounded text-xs">
									Connected
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span>Map Service</span>
								<span className="bg-green-500 px-2 py-1 rounded text-xs">
									Active
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span>Data Updates</span>
								<span className="bg-green-500 px-2 py-1 rounded text-xs">
									Live
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
