import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import HotelForm from '@/components/hotels/HotelForm'
import { HotelFormData } from '@/types/index'
import { createHotel } from '@/services/HotelApi'

export default function CreateHotelView() {
	const navigate = useNavigate()

	const initialValues: HotelFormData = {
		name: '',
		address: '',
		city: '',
		nit: '',
		rooms_number: 1
	}

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ defaultValues: initialValues })

	const { mutate } = useMutation({
		mutationFn: createHotel,
		onSuccess: data => {
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

	const handleForm = (formData: HotelFormData) => mutate(formData)
	return (
		<>
			<div className="max-w-3xl mx-auto">
				<h1 className="text-4xl font-black text-slate-500">Registrar Hotel</h1>
				<p className="text-2xl font-light text-gray-500 mt-5">
					Llena el siguiente formulario para registrar
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
						value="Registrar Hotel"
						className=" bg-indigo-600 hover:bg-indigo-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
					/>
				</form>
			</div>
		</>
	)
}
