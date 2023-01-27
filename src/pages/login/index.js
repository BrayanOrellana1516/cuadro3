import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { useImmer } from 'use-immer';

export default function Login() {
  const router = useRouter();
  const [credenciales, setCredenciales] = useImmer({});
  const usuarios = [
    { user: 'jefe', password: 'Ghostov999' },
    { user: 'admin', password: 'admin' },
  ];

  const toast = useRef(null);

  const login = () => {
    // router.push('/');
    //verificar si
    let acceso = usuarios.find(
      (usuario) => usuario.user === credenciales.user && usuario.password === credenciales.password,
    );
    if (acceso) {
      //guardar en el localstorage
      localStorage.setItem('user', JSON.stringify(acceso));
      router.push('/');
    } else {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Usuario o contraseña incorrectos',
        life: 3000,
      });
    }
  };

  return (
    <>
      <Head>
        <title>SNP :: Sistema Integrado de Planificación e Inversión Pública</title>
      </Head>

      <Toast ref={toast}></Toast>
      <div className="bg-blue-900 flex h-screen grid grid-nogutter surface-200">
        <div className="flex  w-6 ">
          <Image
            src="/dashboard.png"
            alt="hero-1"
            className="md:ml-auto block md:h-screen"
            width={1920}
            height={1147}
            priority="true"
          />{' '}
        </div>
        <div className="flex align-items-center justify-content-center  text-left  p-3">
          <div className="surface-card p-4 shadow-2 border-round w-8 estiloSNP  ">
            <div className="text-center mb-5 estiloSNP ">
              <div className=" text-2xl  mt-1 mb-2">Cuadro de mandos del Almacen Unicomercio</div>
              <div className="estiloSNP">
                <Divider />
              </div>
              <div className="font-medium">Visualización y control de cartera vencida</div>
            </div>
            <>
              <label htmlFor="RUC" className="block text-900 font-medium mb-2">
                Usuario
              </label>
              <InputText
                value={credenciales.user}
                type="text"
                className="w-full mb-3"
                onChange={(e) => setCredenciales({ ...credenciales, user: e.target.value })}
                autoFocus
              />
            </>
            <>
              <label htmlFor="RUC" className="block text-900 font-medium mb-2">
                Contraseña
              </label>
              <InputText
                value={credenciales.password}
                type="password"
                className="w-full mb-3"
                onChange={(e) => setCredenciales({ ...credenciales, password: e.target.value })}
                autoFocus
              />
            </>
            <Button
              label="Iniciar Sesión"
              icon="pi pi-user"
              className="p-button-primary p-button-raised w-full estiloSNP"
              onClick={() => {
                login();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
