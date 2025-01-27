import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { listAccommodation, RoomsSetttingsFormData } from '@/types/index'
import ErrorMessage from '../ErrorMessage'
import { useQuery } from '@tanstack/react-query'
import { getRoomTypes } from '@/services/RoomApi'
import { useEffect, useState } from 'react'

type TaskFormProps = {
	errors: FieldErrors<RoomsSetttingsFormData>
	register: UseFormRegister<RoomsSetttingsFormData>
	roomTypeId?: number
	accommodationId?: number
}

export default function RoomsForm({
	errors,
	register,
	roomTypeId,
	accommodationId
}: TaskFormProps) {
	const { data } = useQuery({
		queryKey: ['roomTypes'],
		queryFn: getRoomTypes
	})
	

	useEffect(() => {
		if (roomTypeId) {
			const selectedRoomType = data?.find(
				roomType => roomType.id === +roomTypeId
			)
			if (!selectedRoomType) return
			setAccommodations(selectedRoomType.accommodations)
		}
	}, [data, roomTypeId])

	const [accommodations, setAccommodations] = useState<listAccommodation>([])

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedRoomType = data?.find(
			roomType => roomType.id === +e.target.value
		)
		if (!selectedRoomType) return
		setAccommodations(selectedRoomType.accommodations)
	}

	return (
		<>
			<div className="flex flex-col gap-5">
				<label className="font-normal text-2xl" htmlFor="room_type">
					Tipo de Habitación
				</label>
				<select
					id="room_type"
					className="w-full p-3  border-gray-300 border rounded-lg"
					{...register('room_type_id', {
						required: 'El Tipo de habitacion es obligatorio'
					})}
					onChange={handleChange}
					value={roomTypeId}
				>
					<option value="0">Seleccione un tipo de habitación</option>
					{data?.map(roomType => (
						<option key={roomType.id} value={roomType.id}>
							{roomType.name}
						</option>
					))}
				</select>
				{errors.room_type_id && (
					<ErrorMessage>{errors.room_type_id.message}</ErrorMessage>
				)}
			</div>

			<div className="flex flex-col gap-5">
				<label className="font-normal text-2xl" htmlFor="accommodation">
					Acomodación
				</label>
				<select
					id="accommodation"
					className="w-full p-3  border-gray-300 border rounded-lg"
					{...register('accommodation_id', {
						required: 'la acomodación es obligatoria'
					})}
					value={accommodationId}
				>
					<option value="0">Seleccione una acomodación</option>
					{accommodations?.map(accommodation => (
						<option key={accommodation.id} value={accommodation.id}>
							{accommodation.name}
						</option>
					))}
				</select>
				{errors.accommodation_id && (
					<ErrorMessage>{errors.accommodation_id.message}</ErrorMessage>
				)}
			</div>

			<div className="flex flex-col gap-5">
				<label className="font-normal text-2xl" htmlFor="quantity">
					Cantidad
				</label>
				<input
					id="quantity"
					className="w-full p-3  border-gray-300 border rounded-lg"
					type="number"
					{...register('quantity', {
						required: 'La cantidad es obligatoria'
					})}
				/>
				{errors.quantity && (
					<ErrorMessage>{errors.quantity.message}</ErrorMessage>
				)}
			</div>
		</>
	)
}
