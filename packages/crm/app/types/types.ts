export interface AppErrorMessage {
  title: string;
  message: string;
}

export interface DefaultLoaderAnswer {
  errorData: AppErrorMessage | null;
  authorized: boolean;
}
