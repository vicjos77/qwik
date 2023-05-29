import { component$, Slot,  useStyles$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonProvider } from '~/context';

import Navbar from '~/components/shared/Navbar/navbar';

import styles from './styles.css?inline';
export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});


export default component$(() => {
  useStyles$(styles);
  
  return (
    <PokemonProvider>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>

    </PokemonProvider>
  );
});
