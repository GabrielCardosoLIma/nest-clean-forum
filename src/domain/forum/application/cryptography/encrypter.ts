export abstract class Encryptor {
  abstract encrypt(payload: Record<string, unknown>): Promise<string>;
}
