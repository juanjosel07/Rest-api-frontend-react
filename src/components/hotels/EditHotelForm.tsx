import { Link, useNavigate } from 'react-router-dom'
import HotelForm from './HotelForm'
import { HotelFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateHotel } from '@/services/HotelApi'
import { toast } from 'react-toastify'

type EditHotelForm = {
	data: HotelFormData
	hotelId: number
}

export default function EditHotelForm({ data, hotelId }: EditHotelForm) {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			name: data.name,
			address: data.address,
			city: data.city,
			nit: data.nit,
			rooms_number: data.rooms_number
		}
	})

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: updateHotel,
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: ['hotels'] })
			queryClient.invalidateQueries({ queryKey: ['editHotel', hotelId] })
			if (data) toast.success(data.message)
			navigate('/')
		},
		onError: (error: { [key: string]: string[] } | string) => {
			if (typeof error === 'object') {
				Object.values(error).forEach(errorMessages => {
					errorMessages.forEach(message => {
						toast.error(message)
					})
				})
			} else if (typeof error === 'string') {
				toast.error(error)
			}
		}
	})

	const handleForm = (formData: HotelFormData) => {
		const data = {
			formData,
			hotelId
		}
		mutate(data)
	}

	return (
		<>
			<div className="max-w-3xl mx-auto">
				<h1 className="text-4xl font-black text-slate-500">Editar Hotel</h1>
				<p className="text-2xl font-light text-gray-500 mt-5">
					Llena el siguiente formulario para Editar el Hotel
				</p>
				<nav className="my-5">
					<Link
						to="/"
						className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
					>
						Volver a mis hoteles
					</Link>
				</nav>
				<form
					className="mt-10 bg-white shadow-lg p-10 rounded-lg"
					onSubmit={handleSubmit(handleForm)}
					noValidate
				>
					<HotelForm register={register} errors={errors} />
					<input
						type="submit"
						value="Guardar Cambios"
						className=" bg-indigo-600 hover:bg-indigo-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
					/>
				</form>
			</div>
		</>
	)
}
