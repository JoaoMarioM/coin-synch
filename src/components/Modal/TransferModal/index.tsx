"use client"

import { useEffect } from "react"

import Image from "next/image"
import Button from "../../Button"
import Input from "../../Form/Input"
import Modal from "../../Modal"
import Select from 'react-select'
import { OwnedCoin, wallet } from "@/stores/wallet"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { SelectOptionCoin } from '../Wallet/types'


const TRANSFER_OPTIONS = [
    { label: "Transfer in", value: "in" },
    { label: "Transfer out", value: "out" },
]

const schema = yup.object({
    quantity: yup.number().typeError("Quantity is required!").moreThan(0, "You must add some quantity").required("Quantity is required!"),
    option: yup.object().required(),
}).required();

type FormData = yup.InferType<typeof schema>

const TransferModal = ({ isOpen, setIsOpen, coin }: { coin: OwnedCoin | null, isOpen: boolean, setIsOpen(v: boolean): void }) => {
    const [transferInQuantity, transferOutQuantity] = wallet(state => [state.transferInQuantity, state.transferOutQuantity])

    const { register, setValue, reset, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: "all"
    });

    const onSubmit = async (data: FormData) => {
        switch ((data.option as SelectOptionCoin).value) {
            case "in": {
                transferInQuantity(coin?.id!, data.quantity)
            } break;
            case "out": {
                transferOutQuantity(coin?.id!, data.quantity)
            } break;

            default: break;
        }
        reset()
        setIsOpen(false)
    }

    if (!coin) return <></>

    return (
        <Modal
            header={<h4 className="xl:h4 md:h5 sm:p !font-bold">Tansfer Crypto</h4>}
            isOpen={isOpen}
            onDismiss={() => {
                reset()
                setIsOpen(false)
            }}
        >
            <div className="flex gap-6 items-center justify-center mb-7 pt-7 border-t border-secondary-200">
                <p className="label text-secondary-400">You are transfering</p>
                <div className="flex gap-1 items-center">
                    <Image
                        width={24}
                        height={24}
                        src={coin.image}
                        alt={coin.symbol}
                    />
                    <p>{coin.name} <span className="text-secondary-500">{coin.symbol.toLocaleUpperCase()}</span></p>
                </div>
            </div>

            <Select
                options={TRANSFER_OPTIONS}
                placeholder="Select transfer"
                classNames={{
                    control: () => 'h-12 hover:!border-primary-500 !border-secondary-300 !shadow-none hover:!shadow-select',
                    indicatorSeparator: () => "hidden"
                }}
                onChange={newValue => setValue("option", newValue!, { shouldValidate: true })}
            />

            <Input
                {...register("quantity")}
                variant="sm"
                type='number'
                className='mt-6 input-number_hidden'
                min={1}
                errorText={errors?.quantity?.message}
            />

            <Button
                disabled={!isValid}
                isLoading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className='mt-2 w-full'
            >
                Transfer Crypto
            </Button>
        </Modal>
    )
}

export default TransferModal