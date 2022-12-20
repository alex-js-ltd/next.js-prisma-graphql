export const isError = (error: unknown) => {
  if (error instanceof Error) {
    return error
  }

  return new Error('Unknown Error')
}
