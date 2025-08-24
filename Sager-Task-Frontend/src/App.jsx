import { lazy, Suspense } from "react";

import { DroneProvider } from "../context/DroneContext";
import { BrowserRouter, Route, Routes } from "react-router";

import Header from "./components/Header";
import Spinner from "./components/Spinner";

const Map = lazy(() => import("./pages/Map"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route
						path="map"
						element={
							<DroneProvider>
								<Map />
							</DroneProvider>
						}
					/>
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
