import { interpret } from 'xstate';
import { fetchMachine } from './something.machine';

export function viteVLibEight(): string {
  return 'vite-v-lib-eight';
}

export function resolvingFetchMachine(cb: (state: any) => void) {
  const service = interpret(fetchMachine)
    .onTransition((state) => {
      cb(state.value);
    })
    .start();

  service.send('FETCH');
  service.send('RESOLVE');
}

export function rejectionFetchMachine(cb: (state: any) => void) {
  const service = interpret(fetchMachine)
    .onTransition((state) => {
      cb(state.value);
    })
    .start();

  service.send('FETCH');
  service.send('REJECT');
  service.send('RETRY');
  service.send('REJECT');
  service.send('RESOLVE');
}
