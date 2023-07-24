"use client"

import { SelectOption } from '@/types/Select'
import { Coin } from '@/types/coinGecko/Coin'
import { create } from 'zustand'

export interface OwnedCoin extends Coin {
    quantity: number
    change: number
    formattedChange: string
    priceInUSD: number
}
export interface CoinOption extends SelectOption {
    data: Omit<OwnedCoin, "quantity">
}

interface WalletState {
    balance: number
    options: CoinOption[]
    owned: Array<OwnedCoin>
    setOption(options: CoinOption[]): void
    addCrypto(crypto: OwnedCoin): void
    transferInQuantity(id: string, quantity: number): void
    transferOutQuantity(id: string, quantity: number): void
}

export const wallet = create<WalletState>((set, get) => ({
    balance: 32_256.56,
    options: [],
    owned: [],
    setOption: (options: CoinOption[]) => {
        set({ options })
    },
    addCrypto: (crypto: OwnedCoin) => {
        const exist = get().owned.find(c => c.id === crypto.id)
        if (exist) {
            get().transferInQuantity(crypto.id, crypto.quantity)
        } else {
            set(prev => ({ owned: [...prev.owned, crypto] }))
        }
    },
    transferInQuantity: (id: string, quantity: number) => {
        set(prev => ({ owned: prev.owned.map(c => ({ ...c, quantity: c.id === id ? (c.quantity + quantity) : c.quantity })) }))
    },
    transferOutQuantity: (id: string, quantity: number) => {
        const crypto = get().owned.find(c => c.id === id)
        if (!crypto) return;

        if (crypto.quantity - quantity === 0) {
            set(prev => ({ owned: prev.owned.filter(c => c.id !== id) }))
        } else {
            set(prev => ({ owned: prev.owned.map(c => ({ ...c, quantity: c.quantity - quantity })) }))
        }
    },
}))
