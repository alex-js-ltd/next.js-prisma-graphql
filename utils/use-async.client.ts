import { useReducer, useCallback } from 'react'

type AsyncState<DataType> =
  | {
      status: 'idle'
      data?: null
      error?: null
      promise?: null
    }
  | {
      status: 'pending'
      data?: null
      error?: null
      promise: Promise<DataType>
    }
  | {
      status: 'resolved'
      data: DataType
      error: null
      promise: null
    }
  | {
      status: 'rejected'
      data: null
      error: Error
      promise: null
    }

type AsyncAction<DataType> =
  | { type: 'reset' }
  | { type: 'pending'; promise: Promise<DataType> }
  | { type: 'resolved'; data: DataType; promise: Promise<DataType> }
  | { type: 'rejected'; error: Error; promise: Promise<DataType> }

function asyncReducer<DataType>(
  state: AsyncState<DataType>,
  action: AsyncAction<DataType>,
): AsyncState<DataType> {
  switch (action.type) {
    case 'pending': {
      return {
        status: 'pending',
        data: null,
        error: null,
        promise: action.promise,
      }
    }
    case 'resolved': {
      if (action.promise !== state.promise) return state
      return {
        status: 'resolved',
        data: action.data,
        error: null,
        promise: null,
      }
    }
    case 'rejected': {
      if (action.promise !== state.promise) return state
      return {
        status: 'rejected',
        data: null,
        error: action.error,
        promise: null,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAsync<DataType>() {
  const [state, dispatch] = useReducer<
    React.Reducer<AsyncState<DataType>, AsyncAction<DataType>>
  >(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
  })

  const { data, error, status } = state

  const run = useCallback((promise: Promise<DataType>) => {
    dispatch({ type: 'pending', promise })
    promise.then(
      data => {
        console.log('data', data)
        dispatch({ type: 'resolved', data, promise })
      },
      error => {
        dispatch({ type: 'rejected', error, promise })
      },
    )
  }, [])

  return {
    error,
    status,
    data,
    run,

    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',
  }
}

export { useAsync }
