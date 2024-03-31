import { match, P } from 'ts-pattern'

export type State =
  | { status: 'idle' }
  | { status: 'loading'; startTime: number }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error }

export type EEvent =
  | { type: 'fetch' }
  | { type: 'success'; data: string }
  | { type: 'error'; error: Error }
  | { type: 'cancel' }

export const reducer = (state: State, event: EEvent) =>
  match([state, event])
    .returnType<State>()
    .with([{ status: 'loading' }, { type: 'success' }], ([_, event]) => ({
      status: 'success',
      data: event.data,
    })) // condition 1
    .with(
      [{ status: 'loading' }, { type: 'error', error: P.select() }],
      (error) => ({ status: 'error', error }),
    ) // condition 2
    .with([{ status: P.not('loading') }, { type: 'fetch' }], () => ({
      status: 'loading',
      startTime: Date.now(),
    })) // condition 3
    .with(
      [
        {
          status: 'loading',
          startTime: P.when((t) => t + 2000 < Date.now()),
        },
        { type: 'cancel' },
      ],
      () => ({ status: 'idle' }),
    ) // condition 4
    .with(P._, () => state) // condition 5
    .exhaustive()
