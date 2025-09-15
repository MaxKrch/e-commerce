import { AxiosError } from 'axios';

const formateAxiosError = (err: unknown) => {
  if (err instanceof Error) {
    return err;
  }

  if (err instanceof AxiosError) {
    return new Error(err.message);
  }

  return new Error('Unknown Error');
};

export default formateAxiosError;
