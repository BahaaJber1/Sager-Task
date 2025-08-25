import { lazy, Suspense } from "react";

import { DroneProvider } from "../context/DroneContext";
import { BrowserRouter, Route, Routes } from "react-router";

import Spinner from "./components/Spinner";
import AppLayout from "./components/AppLayout";
import DronesList from "./features/map/DronesList";

const Map = lazy(() => import("./pages/Map"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route element={<AppLayout />}>
						<Route path="/" element={<Dashboard />} />
						<Route
							path="map"
							element={
								<DroneProvider>
									<Map />
								</DroneProvider>
							}
						>
							<Route index element={<DronesList />} />
							<Route path="previous" element={<DronesList />} />
						</Route>
						<Route path="*" element={<PageNotFound />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
