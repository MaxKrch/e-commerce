import { AxiosError } from "axios"

const formateAxiosError = (err: unknown) => {
    if (err instanceof Error) return err
    else if (err instanceof AxiosError) return new Error(AxiosError.name)
    else return new Error('Unknown Error')
}

export default formateAxiosError;