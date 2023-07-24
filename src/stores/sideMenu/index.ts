"use client"

import { create } from 'zustand'
import { SideMenuState } from './types'

export const sideMenu = create<SideMenuState>((set) => ({
    isOpen: false,
    toggleMenu: () => {
        set(prev => ({ isOpen: !prev.isOpen }))
    },
}));
