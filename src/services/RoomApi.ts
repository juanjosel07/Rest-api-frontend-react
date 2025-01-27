import api from '@/lib/axios'
import { isAxiosError } from 'axios'
import {
	AccommodationRoomTypeSchema,
	listRoomTypesSchema,
	RoomsSetttingsFormData
} from '../types'

type RoomResponseType = {
	message: string
}

export async function getRoomTypes() {
	try {
		const {
			data: { roomTypes: data }
		} = await api('/rooms/types')
		const response = listRoomTypesSchema.safeParse(data)
		if (response.success) {
			return response.data
		}

		console.log(response)
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			const responseError =
				error.response.data.errors || error.response.data.error
			throw responseError
		}
	}
}

type RoomApi = {
	formData: RoomsSetttingsFormData
	hotelId: number
	roomTypeId: number
}
export async function createRoom({
	formData,
	hotelId
}: Pick<RoomApi, 'formData' | 'hotelId'>) {
	try {
		const { data } = await api.post<RoomResponseType>(
			`/hotels/${hotelId}/rooms`,
			formData
		)
		console.log(data, 'otris')
		return data
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			const responseError =
				error.response.data.errors || error.response.data.error
			throw responseError
		}
	}
}

export async function getRoomTypesById({
	hotelId,
	roomTypeId
}: Pick<RoomApi, 'hotelId' | 'roomTypeId'>) {
	try {
		const {
			data: { roomType: data }
		} = await api(`/hotels/${hotelId}/rooms/${roomTypeId}`)
		const response = AccommodationRoomTypeSchema.safeParse(data)
		if (response.success) {
			return response.data
		}
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			const responseError =
				error.response.data.errors || error.response.data.error
			throw responseError
		}
	}
}

export async function updateRoom({
	formData,
	hotelId,
	roomTypeId
}: Pick<RoomApi, 'formData' | 'hotelId' | 'roomTypeId'>) {
	try {
		const { data } = await api.put<RoomResponseType>(
			`/hotels/${hotelId}/rooms/${roomTypeId}`,
			formData
		)
		console.log(data, 'holi')
		return data
	} catch (error) {
		console.log(error)
		if (isAxiosError(error) && error.response) {
			const responseError =
				error.response.data.errors || error.response.data.error
			throw responseError
		}
	}
}

export async function deleteRoom({
	hotelId,
	roomTypeId
}: Pick<RoomApi, 'hotelId' | 'roomTypeId'>) {
	try {
		const { data } = await api.delete<RoomResponseType>(
			`/hotels/${hotelId}/rooms/${roomTypeId}`
		)
		return data
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			const responseError =
				error.response.data.errors || error.response.data.error
			throw responseError
		}
	}
}
