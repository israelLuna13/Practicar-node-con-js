
export const successResponse = ({message = "Operación exitosa",data = [],valoration = true,log = null}) => ({
  result: true,
  valoration,
  message,
  log,
  data,
});

export const errorResponse = ({
  message = "Ocurrió un error",
  log = null,
  data = [],
}) => ({
  result: false,
  valoration: false,
  message,
  log,
  data,
});
