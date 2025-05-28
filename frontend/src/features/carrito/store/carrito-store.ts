'use client'

import type { ICarritoResumen, ICarritoStore } from '@/features/carrito/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const IMPUESTO_PORCENTAJE = 0.18 // 18% IGV
const ENVIO_GRATIS_MINIMO = 50
const COSTO_ENVIO = 10

export const useCarritoStore = create<ICarritoStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const existingItemId = `${newItem.productoId}-${newItem.varianteId}`
          const existingItem = state.items.find(item => item.id === existingItemId)

          if (existingItem) {
            // Si el item ya existe, actualizar cantidad
            return {
              items: state.items.map(item =>
                item.id === existingItemId
                  ? { ...item, cantidad: Math.min(item.cantidad + newItem.cantidad, item.stock) }
                  : item
              )
            }
          } else {
            // Agregar nuevo item
            const itemWithId = {
              ...newItem,
              id: existingItemId,
              cantidad: Math.min(newItem.cantidad, newItem.stock)
            }
            return {
              items: [...state.items, itemWithId]
            }
          }
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }))
      },

      updateQuantity: (id, cantidad) => {
        if (cantidad <= 0) {
          get().removeItem(id)
          return
        }

        set((state) => ({
          items: state.items.map(item =>
            item.id === id
              ? { ...item, cantidad: Math.min(cantidad, item.stock) }
              : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },

      openCart: () => {
        set({ isOpen: true })
      },

      closeCart: () => {
        set({ isOpen: false })
      },

      getResumen: (): ICarritoResumen => {
        const { items } = get()
        const subtotal = items.reduce((total, item) => total + (item.precio * item.cantidad), 0)
        const impuestos = subtotal * IMPUESTO_PORCENTAJE
        const envio = subtotal >= ENVIO_GRATIS_MINIMO ? 0 : COSTO_ENVIO
        const total = subtotal + impuestos + envio
        const cantidadItems = items.reduce((total, item) => total + item.cantidad, 0)

        return {
          subtotal,
          impuestos,
          envio,
          total,
          cantidadItems
        }
      },

      getItemById: (id) => {
        return get().items.find(item => item.id === id)
      },

      isItemInCart: (productoId, varianteId) => {
        const id = `${productoId}-${varianteId}`
        return get().items.some(item => item.id === id)
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.cantidad, 0)
      }
    }),
    {
      name: 'carrito-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }) // Solo persistir los items, no el estado de UI
    }
  )
)
