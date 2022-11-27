function Error({ statusCode }) {
  return (
    <p>
      {statusCode ? `Error ${statusCode} ocurrido por parte del Servidor` : 'Ocurrio un error por parte del Cliente'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
