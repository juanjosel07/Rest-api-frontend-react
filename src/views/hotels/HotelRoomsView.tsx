import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getHotelsById } from '@/services/HotelApi'
import AddRoomsModal from '@/components/rooms/AddRoomsModal'
import RoomList from '@/components/rooms/RoomList'
import EditRoomsData from '@/components/rooms/EditRoomsData'

export default function HotelRoomsView() {
	const navigate = useNavigate()
	const params = useParams()

	const hotelId = +params.hotelId!

	const { data, isLoading, isError } = useQuery({
		queryKey: ['hotel', hotelId],
		queryFn: () => getHotelsById(hotelId),
		retry: false
	})

	console.log(data)

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) return <Navigate to="/404" />

	if (data)
		return (
			<>
				<div className="text-5xl font-black">{data.name}</div>
				<p className="text-sm text-gray-400">
					<span className="font-bold">Total habitaciones:</span>{' '}
					{data.rooms_number}
				</p>
				<p className="text-sm text-gray-400">
					<span className="font-bold">Habitaciones asignadas:</span>{' '}
					{data.total_rooms_assigned}
				</p>
				<nav className="my-5 flex gap-3">
					<button
						type="button"
						className="bg-indigo-400 hover:bg-indigo-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
						onClick={() => navigate(location.pathname + '?newRooms=true')}
					>
						Configurar Habitaciones
					</button>
				</nav>
				<RoomList roomTypes={data.accommodation_room_types} />

				<AddRoomsModal />
				<EditRoomsData />
			</>
		)
}
