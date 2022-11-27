import { createContext } from 'react';

const FormAutenticacionContext = createContext();
function FormAutenticacionProvider(props) {
 

  return (
    <div>
      <FormAutenticacionContext.Provider>
        {props.children}
      </FormAutenticacionContext.Provider>
    </div>
  );
}
export { FormAutenticacionContext, FormAutenticacionProvider };
