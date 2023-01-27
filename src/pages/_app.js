import 'gotham-fonts/css/gotham-rounded.css';
import { useRouter } from 'next/router';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
//core css
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useEffect } from 'react';

import '@styles/globals.css';
import '@styles/styles.css';

//theme
/** @function
 * @name MyApp
 * @description Componente que contiene el layout de la aplicacion
 * @param {React.Component} Component Componente que se renderiza
 * @param {Object} pageProps Propiedades del componente
 **/
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      router.push('/login');
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
