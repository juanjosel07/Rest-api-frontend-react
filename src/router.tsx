import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/layout'
import Hotels from './views/Hotels'
import CreateHotelView from './views/hotels/CreateHotelView'
import EditHotelView from './views/hotels/EditHotelView'
import HotelRoomsView from './views/hotels/HotelRoomsView'

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" index element={<Hotels />} />
					<Route path="/hotels/create" element={<CreateHotelView />} />
					<Route path="/hotels/:hotelId/rooms" element={<HotelRoomsView />} />
					<Route path="/hotels/:hotelId/edit" element={<EditHotelView />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
