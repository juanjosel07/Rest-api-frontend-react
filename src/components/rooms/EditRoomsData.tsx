import { getRoomTypesById } from '@/services/RoomApi'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import EditRoomsModal from './EditRoomsModal'

export default function EditRoomsData() {
	const params = useParams()

	const hotelId = +params.hotelId!
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const roomTypeId = +queryParams.get('editRooms')!

	const { data, isError } = useQuery({
		queryKey: ['roomType', roomTypeId],
		queryFn: () => getRoomTypesById({ hotelId, roomTypeId }),
		enabled: !!roomTypeId
	})

	if (isError) {
		return <Navigate to="/404" />
	}

	if (!data) return

	return <EditRoomsModal data={data} roomTypeId={roomTypeId} />
}
