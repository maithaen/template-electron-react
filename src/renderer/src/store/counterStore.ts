import { create } from 'zustand'

type CounterState = {
  count: number
}

type CounterActions = {
  increment: () => void
  decrement: () => void
  reset: () => void
  incrementByAmount: (amount: number) => void
}

type CounterStore = CounterState & CounterActions

export const useCounterStore = create<CounterStore>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementByAmount: (amount: number) => set((state) => ({ count: state.count + amount }))
}))
