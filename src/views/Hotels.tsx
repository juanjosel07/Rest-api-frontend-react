import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteHotel, getHotels } from '@/services/HotelApi'
import { toast } from 'react-toastify'
export default function Hotels() {
	const { data, isLoading } = useQuery({
		queryKey: ['hotels'],
		queryFn: getHotels
	})

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: deleteHotel,
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: ['hotels'] })
			if (data) toast.success(data.message)
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

	if (isLoading) {
		return <p>Loading...</p>
	}

	console.log(data)

	if (data)
		return (
			<>
				<h1 className="text-4xl font-black text-slate-500">Mis Hoteles</h1>
				<p className="text-2xl font-light text-gray-500 mt-5">
					{' '}
					Administra los diferentes hoteles
				</p>
				<nav className="my-5">
					<Link
						to="/hotels/create"
						className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
					>
						Registrar Hotel
					</Link>
				</nav>

				{data.length ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10  p-6 ">
						{data.map(hotel => (
							<div
								key={hotel.id}
								className="flex  justify-between gap-y-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200"
							>
								<div>
									<Link
										to={`/hotels/${hotel.id}/rooms`}
										className="text-gray-600 cursor-pointer hover:underline text-2xl font-bold"
									>
										{hotel.name}
									</Link>
									<p className="text-sm text-gray-400 mt-2">
										<span className="font-bold">Nit:</span> {hotel.nit}
									</p>
									<p className="text-sm text-gray-400">
										<span className="font-bold">Dirección:</span>{' '}
										{hotel.address}
									</p>
									<p className="text-sm text-gray-400">
										<span className="font-bold">City:</span> {hotel.city}
									</p>
									<p className="text-sm text-gray-400">
										<span className="font-bold">Número de habitaciones:</span>{' '}
										{hotel.rooms_number}
									</p>
									<p className="text-sm text-gray-400">
										<span className="font-bold">Habitaciones asignadas:</span>{' '}
										{hotel.total_rooms_assigned}
									</p>
								</div>
								<div className="flex justify-end gap-x-4">
									<Menu as="div" className="relative">
										<Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
											<span className="sr-only">opciones</span>
											<EllipsisVerticalIcon
												className="h-6 w-6"
												aria-hidden="true"
											/>
										</Menu.Button>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
												<Menu.Item>
													<Link
														to={`/hotels/${hotel.id}/rooms`}
														className="block px-3 py-1 text-sm leading-6 text-gray-900"
													>
														Ver Habitaciones
													</Link>
												</Menu.Item>
												<Menu.Item>
													<Link
														to={`/hotels/${hotel.id}/edit`}
														className="block px-3 py-1 text-sm leading-6 text-gray-900"
													>
														Editar Hotel
													</Link>
												</Menu.Item>
												<Menu.Item>
													<button
														type="button"
														className="block cursor-pointer px-3 py-1 text-sm leading-6 text-red-500"
														onClick={() => mutate(hotel.id)}
													>
														Eliminar Hotel
													</button>
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-2xl font-light text-gray-500 mt-5 text-center">
						No hay hoteles registrados aún {''}
						<Link to="/hotels/create" className="text-indigo-600 font-bold">
							Registrar Hotel
						</Link>
					</p>
				)}
			</>
		)
}
