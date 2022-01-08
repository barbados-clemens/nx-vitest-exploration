import { createMachine, assign } from 'xstate';

interface Context {
  retries: number;
}

export const fetchMachine = createMachine<Context>({
  id: 'fetch',
  initial: 'idle',
  context: {
    retries: 0,
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading',
      },
    },
    loading: {
      on: {
        RESOLVE: 'success',
        REJECT: 'failure',
      },
    },
    success: {
      type: 'final',
    },
    failure: {
      on: {
        RETRY: {
          target: 'loading',
          actions: assign({
            retries: (context, event) => context.retries + 1,
          }),
        },
      },
    },
  },
});
