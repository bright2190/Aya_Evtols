export const handleErrors = (err) => {
  let errors = {};
  console.log(err.message, err.code);

  if (err.message.includes('email')) {
    errors.email = 'Duplicate Email';
  }

  if (err.message === 'invalid credentials') {
    return (errors.email = 'Invalid User Credentials.');
  }

  if (err.message === 'user not found') {
    return (errors.email = 'User not found.');
  }

  if (err.message === 'invalid token') {
    return (errors.email = 'Recovery Link expired!');
  }

  if (err.message === 'invalid query') {
    return 'Invalid Query Parameter.';
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
