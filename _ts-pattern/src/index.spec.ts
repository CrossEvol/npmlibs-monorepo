import { env } from 'process'
import { EEvent, reducer, State } from './index'

describe('PatternMatching Tests', () => {
  test('reducer condition 1 Tests', () => {
    const result = reducer(
      { status: 'loading', startTime: Date.now() },
      { type: 'success', data: 'OK' },
    )
    expect(result).toStrictEqual({ status: 'success', data: 'OK' })
  })

  test('reducer condition 2 Tests', () => {
    const error = new Error()
    const result = reducer(
      { status: 'loading', startTime: Date.now() },
      { type: 'error', error },
    )
    expect(result).toStrictEqual({ status: 'error', error })
  })

  describe('reducer condition 3 Tests', () => {
    test('1', () => {
      const result1: any = reducer({ status: 'idle' }, { type: 'fetch' })
      expect(result1.status).toBe('loading')
      expect(new Date(result1.startTime).toLocaleString()).toEqual(
        new Date().toLocaleString(),
      )
    })

    test('2', () => {
      const result2: any = reducer(
        { status: 'success', data: 'OK' },
        { type: 'fetch' },
      )
      expect(result2.status).toBe('loading')
      expect(new Date(result2.startTime).toLocaleString()).toEqual(
        new Date().toLocaleString(),
      )
    })

    test('3', () => {
      const result3: any = reducer(
        { status: 'error', error: new Error() },
        { type: 'fetch' },
      )
      expect(result3.status).toBe('loading')
      expect(new Date(result3.startTime).toLocaleString()).toEqual(
        new Date().toLocaleString(),
      )
    })
  })

  test('reducer condition4 Tests', () => {
    const result: any = reducer(
      { status: 'loading', startTime: Date.now() - 10 * 1000 },
      { type: 'cancel' },
    )
    expect(result).toStrictEqual({ status: 'idle' })
  })

  describe('reducer condition5 Tests', () => {
    test('mismatch condition 3', () => {
      const state = { status: 'loading', startTime: Date.now() } as State
      const result: any = reducer(state, { type: 'fetch' })
      expect(result).toStrictEqual(state)
    })

    test('mismatch condition 4', () => {
      const state = { status: 'loading', startTime: Date.now() } as State
      const result: any = reducer(state, { type: 'cancel' })
      expect(result).toStrictEqual(state)
    })

    test('mismatch all conditions', () => {
      const state = { status: 'error', error: new Error() } as State
      const event = { type: 'error', error: new Error() } as EEvent
      const result = reducer(state, event)
      expect(result).toStrictEqual(state)
    })
  })
})
