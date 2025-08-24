import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Map = lazy(() => import("./pages/Map"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Wait</div>}>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="map" element={<Map />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
