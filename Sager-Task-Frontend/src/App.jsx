import { lazy, Suspense } from "react";

import { DroneProvider } from "./context/DroneContext";
import { BrowserRouter, Route, Routes } from "react-router";

import Spinner from "./components/Spinner";
import AppLayout from "./components/AppLayout";

const Map = lazy(() => import("./pages/Map"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
	return (
		<BrowserRouter>
			<DroneProvider>
				<Suspense fallback={<Spinner />}>
					<Routes>
						<Route element={<AppLayout />}>
							<Route path="/" element={<Dashboard />} />
							<Route path="/map/:serial/:lat/:lng" element={<Map />} />
							<Route path="map" element={<Map />} />
							<Route path="*" element={<PageNotFound />} />
						</Route>
					</Routes>
				</Suspense>
			</DroneProvider>
		</BrowserRouter>
	);
}

export default App;
