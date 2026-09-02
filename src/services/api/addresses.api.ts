import type { Address, CreateAddressPayload } from '../../types/address'
import { apiClient, type ApiResponse } from './client'

export const addressesApi = {
  async list() {
    const res = await apiClient.get<ApiResponse<Address[]>>('/addresses')
    return res.data.data
  },
  async create(payload: CreateAddressPayload) {
    const res = await apiClient.post<ApiResponse<Address>>('/addresses', payload)
    return res.data.data
  },
  async remove(id: string) {
    await apiClient.delete(`/addresses/${id}`)
  },
}
