import api from '@/lib/axios'
import { isAxiosError } from 'axios'
import { Hotel, HotelFormData, listHotelSchema } from '@/types/index'

type HotelResponseType = {
	message: string
}
export async function createHotel(formData: HotelFormData) {
	try {
		const { data } = await api.post<HotelResponseType>('/hotels', formData)
		return data
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			const responseError =
				error.response.data.errors || error.response.data.error
			throw responseError
		}
	}
}
export async function getHotels() {
	try {
		const {
			data: { hotels: data }
		} = await api('/hotels')
		const response = listHotelSchema.safeParse(data)
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
export async function getHotelsById(id: Hotel['id']) {
	try {
		const {
			data: { hotel: data }
		} = await api(`/hotels/${id}`)
		return data
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			const responseError =
				error.response.data.errors || error.response.data.error
			throw responseError
		}
	}
}
export async function updateHotel({
	formData,
	hotelId
}: {
	formData: HotelFormData
	hotelId: Hotel['id']
}) {
	try {
		const { data } = await api.put<HotelResponseType>(
			`/hotels/${hotelId}`,
			formData
		)
		return data
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			const responseError =
				error.response.data.errors || error.response.data.error
			throw responseError
		}
	}
	return
}

export async function deleteHotel(hotelId: Hotel['id']) {
	try {
		const { data } = await api.delete<HotelResponseType>(`/hotels/${hotelId}`)
		return data
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			const responseError =
				error.response.data.errors || error.response.data.error
			throw responseError
		}
	}
}
