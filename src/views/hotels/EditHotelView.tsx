import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getHotelsById } from '@/services/HotelApi'
import EditHotelForm from '@/components/hotels/editHotelForm'

export default function EditHotelView() {
	const params = useParams()

	const hotelId = +params.hotelId!

	const { data, isLoading, isError } = useQuery({
		queryKey: ['editHotel', hotelId],
		queryFn: () => getHotelsById(hotelId),
		retry: false
	})

	console.log(data)

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) return <Navigate to="/404" />

	if (data) return <EditHotelForm data={data} hotelId={hotelId} />
}
