import { Adapter } from "escpos";

export type Logger = (data: string) => void;

export default class Console extends Adapter {
  private logger: Logger;
  private numbersPerLine: number;

  // eslint-disable-next-line no-console
  constructor(logger: Logger = console.log, numbersPerLine = 16) {
    super();

    this.logger = logger;
    this.numbersPerLine = numbersPerLine;
  }

  public async open(): Promise<void> {
    return;
  }

  public async write(data: Uint8Array): Promise<void> {
    const regex = new RegExp(`(.{${this.numbersPerLine * 3}})`, "g");
    const dataString = this.toHexString(data);
    this.logger(dataString.replace(/(.{2})/g, "$1 ").replace(regex, "$1\n"));
    return;
  }

  public async close(): Promise<void> {
    return;
  }

  private toHexString(byteArray: Uint8Array) {
    return Array.from(byteArray, (byte) =>
      ("0" + byte.toString(16)).slice(-2)
    ).join("");
  }
}
