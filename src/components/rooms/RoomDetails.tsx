import { deleteRoom } from '@/services/RoomApi'
import { AccommodationRoomType } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function RoomDetails({
	roomType
}: {
	roomType: AccommodationRoomType
}) {
	const navigate = useNavigate()

	const params = useParams()

	const hotelId = +params.hotelId!
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: deleteRoom,
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: ['hotel', hotelId] })
			if (data) toast.success(data.message)
			navigate(location.pathname, { replace: true })
		},
		onError: (error: { [key: string]: string[] } | string) => {
			if (typeof error === 'object') {
				Object.values(error).forEach(errorMessages => {
					errorMessages.forEach(message => {
						toast.error(message)
					})
				})
			} else {
				toast.error(error)
			}
		}
	})

	return (
		<tr className="border-b ">
			<td className="p-3 text-lg text-center text-gray-800">
				{roomType.quantity}
			</td>
			<td className="p-3 text-lg text-center text-gray-800">
				{roomType.room_type.name}{' '}
			</td>
			<td className="p-3 text-lg text-center text-gray-800">
				{roomType.accommodation.name}
			</td>
			<td className="p-3 text-lg text-center text-gray-800 ">
				<div className="flex gap-2 items-center">
					<button
						className="bg-indigo-600 cursor-pointer text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
						onClick={() =>
							navigate(location.pathname + `?editRooms=${roomType.id}`)
						}
					>
						Editar
					</button>
					<button
						onClick={() => mutate({ hotelId, roomTypeId: roomType.id })}
						className="bg-red-600 cursor-pointer text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
					>
						Eliminar
					</button>
				</div>
			</td>
		</tr>
	)
}
