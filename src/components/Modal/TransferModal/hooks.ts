import * as yup from "yup";
import { useForm } from 'react-hook-form';

import { wallet } from "@/stores/wallet";

import { yupResolver } from '@hookform/resolvers/yup';

import { SelectOptionCoin } from '../Wallet/types';
import { UseTransferModalProps } from './types';

export const TRANSFER_OPTIONS = [
  { label: "Transfer in", value: "in" },
  { label: "Transfer out", value: "out" },
]

const schema = yup.object({
  quantity: yup.number().typeError("Quantity is required!").moreThan(0, "You must add some quantity").required("Quantity is required!"),
  option: yup.object().required(),
}).required();

type FormData = yup.InferType<typeof schema>

export const useTransferModal = ({coin, setIsOpen}: UseTransferModalProps) => {
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

  return {
    reset,
    onSubmit,
    register,
    setValue,
    handleSubmit,
    errors,
    isValid,
    isSubmitting
  }
}