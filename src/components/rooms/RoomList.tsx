import { AccommodationRoomType } from '@/types/index'
import RoomDetails from './RoomDetails'

type RoomListProps = {
	roomTypes: AccommodationRoomType[]
}
export default function RoomList({ roomTypes }: RoomListProps) {
	if (roomTypes.length === 0)
		return <p className="text-center">No hay habitaciones asignadas</p>
	return (
		<div className="p-2">
			<table className="w-full mt-5 table-auto">
				<thead className="bg-slate-800 text-white">
					<tr>
						<th className="p-2">Cantidad</th>
						<th className="p-2">Tipo Habitación</th>
						<th className="p-2">Acomodación</th>
						<th className="p-2">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{roomTypes.map(roomType => (
						<RoomDetails key={roomType.id} roomType={roomType} />
					))}
				</tbody>
			</table>
		</div>
	)
}
