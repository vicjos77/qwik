import { component$, Slot,  useStyles$ } from '@builder.io/qwik';


import styles from './styles.css?inline';
import { PokemonProvider } from '~/context';
import Navbar from '~/components/shared/Navbar/navbar';



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
