export const Response = (data: unknown) => ({
  error: 0,
  message: 'success',
  data
})

export const PaginationResponse = (list: unknown[]) => ({
  error: {},
  data: {
    list,
    pagination: {
      total: 31,
      current: 1,
      pageSize: 20
    }
  }
})
