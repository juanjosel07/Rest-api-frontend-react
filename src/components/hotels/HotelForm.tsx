import { UseFormRegister, FieldErrors } from 'react-hook-form'
import ErrorMessage from "../ErrorMessage"
import { HotelFormData } from 'types'

type HotelFormProps = {
    register: UseFormRegister<HotelFormData>
    errors: FieldErrors<HotelFormData>
}

export default function HotelForm({errors, register} : HotelFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="HotelName" className="text-sm uppercase font-bold">
                    Nombre del hotel
                </label>
                <input
                    id="HotelName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre del Hotel"
                    {...register("name", {
                        required: "El Nombre es obligatorio",
                    })}
                />

                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="address" className="text-sm uppercase font-bold">
                    Dirección del hotel
                </label>
                <input
                    id="address"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Dirección del hotel"
                    {...register("address", {
                        required: "La Dirección es obligatoria",
                    })}
                />

                {errors.address && (
                    <ErrorMessage>{errors.address.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="Ciudad" className="text-sm uppercase font-bold">
                    Ciudad
                </label>
                <input
                    id="Ciudad"
                    className="w-full p-3  border border-gray-200"
                    placeholder="Ciudad"
                    {...register("city", {
                        required: "La Ciudad es obligatoria",
                    })}
                />

                {errors.city && (
                    <ErrorMessage>{errors.city.message}</ErrorMessage>
                )}
            </div>
            <div className="mb-5 space-y-3">
                <label htmlFor="nit" className="text-sm uppercase font-bold">
                    Nit
                </label>
                <input
                    id="nit"
                    className="w-full p-3  border border-gray-200"
                    placeholder="Nit"
                    {...register("nit", {
                        required: "El Nit es obligatorio",
                    })}
                />

                {errors.nit && (
                    <ErrorMessage>{errors.nit.message}</ErrorMessage>
                )}
            </div>
            <div className="mb-5 space-y-3">
                <label htmlFor="rooms_number" className="text-sm uppercase font-bold">
                    Numero de Habitaciones
                </label>
                <input
                    id="rooms_number"
                    type='number'
                    className="w-full p-3  border border-gray-200"
                    placeholder="Nit"
                    {...register("rooms_number", {
                        required: "El numero de habitaciones es obligatorio",
                    })}
                />

                {errors.rooms_number && (
                    <ErrorMessage>{errors.rooms_number.message}</ErrorMessage>
                )}
            </div>
            
        </>
    )
}