interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly succesCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}
  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      this.succesCallback();
      return true;
    } catch (error) {
      this.errorCallback(`Error: ${url} -> ${error}`);
      return false;
    }
  }
}
