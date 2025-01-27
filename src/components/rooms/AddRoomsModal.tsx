import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import RoomsForm from './RoomsForm'
import { RoomsSetttingsFormData } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { createRoom } from '@/services/RoomApi'

export default function AddRoomsModal() {
	const navigate = useNavigate()
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const modalRooms = queryParams.get('newRooms')
	const isModalRooms = modalRooms ? true : false

	const initialValues = {
		room_type_id: '',
		accommodation_id: '',
		quantity: 1
	}

	const params = useParams()
	const hotelId = +params.hotelId!

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm({
		defaultValues: initialValues
	})

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: createRoom,
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: ['hotel', hotelId] })
			if (data) toast.success(data.message)
			reset()
			navigate(location.pathname, { replace: true })
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

	const handleCreateRooms = (formData: RoomsSetttingsFormData) => {
		const data = {
			formData,
			hotelId
		}

		mutate(data)
	}

	return (
		<>
			<Transition appear show={isModalRooms} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => navigate(location.pathname, { replace: true })}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/60" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
									<Dialog.Title as="h3" className="font-black text-4xl  my-5">
										Configurar Habitaciones
									</Dialog.Title>

									<p className="text-xl font-bold">
										Llena los campos para configurar las{' '}
										<span className="text-indigo-600">Habitaciones</span> del
										hotel
									</p>

									<form
										className="mt-10 space-y-3"
										onSubmit={handleSubmit(handleCreateRooms)}
										noValidate
									>
										<RoomsForm register={register} errors={errors} />
										<input
											type="submit"
											value="Guardar Rooms"
											className=" bg-indigo-600 hover:bg-indigo-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
										/>{' '}
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}
