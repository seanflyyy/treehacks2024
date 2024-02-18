import { configureStore } from '@reduxjs/toolkit'
import detailsReducer from '@/redux/slice/details'

export default configureStore({
  reducer: {
    details: detailsReducer
  }
})