import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { Root_state, App_dispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => App_dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<Root_state> = useSelector