import { z } from 'zod'

/**Room Types Schema */

export const RoomTypeSchema = z.object({
	id: z.number(),
	name: z.string(),
	accommodations: z.array(
		z.object({
			id: z.number(),
			name: z.string()
		})
	)
})

export const accommodationSchema = z.object({
	id: z.number(),
	name: z.string()
})

export const listAccommodationSchema = z.array(accommodationSchema)

export const listRoomTypesSchema = z.array(RoomTypeSchema)

export type RoomType = z.infer<typeof RoomTypeSchema>
export type listAccommodation = z.infer<typeof listAccommodationSchema>

/** Rooms Schema */

export const RoomSchema = z.object({
	id: z.number(),
	room_type_id: z.string(),
	accommodation_id: z.string(),
	quantity: z.string()
})

export const RoomShemaForm = z.object({
	room_type_id: z.string(),
	accommodation_id: z.string(),
	quantity: z.number()
})

export const AccommodationRoomTypeSchema = z.object({
	id: z.number(),
	quantity: z.number(),
	room_type: z.object({
		id: z.number(),
		name: z.string()
	}),
	accommodation: z.object({
		id: z.number(),
		name: z.string()
	})
})

export type RoomsSetttings = z.infer<typeof RoomSchema>
export type AccommodationRoomType = z.infer<typeof AccommodationRoomTypeSchema>

export type RoomsSetttingsFormData = z.infer<typeof RoomShemaForm>

/** Hotel Schema */
export const hotelSchema = z.object({
	id: z.number(),
	name: z.string(),
	address: z.string(),
	city: z.string(),
	nit: z.string(),
	rooms_number: z.number(),
	total_rooms_assigned: z.number()
})

export const listHotelSchema = z.array(
	hotelSchema.pick({
		id: true,
		name: true,
		address: true,
		city: true,
		nit: true,
		rooms_number: true,
		total_rooms_assigned: true
	})
)

export type Hotel = z.infer<typeof hotelSchema>
export type HotelFormData = Pick<
	Hotel,
	'name' | 'address' | 'city' | 'nit' | 'rooms_number'
>
