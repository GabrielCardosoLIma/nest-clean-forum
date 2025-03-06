import { Module } from "@nestjs/common";
import { JwtEncrypter } from "./jwt-encrypter";
import { BcrypterHasher } from "./bcrypt-hasher";
import { HashComparer } from "@/domain/forum/application/cryptography/hash-comparer";
import { Encrypter } from "@/domain/forum/application/cryptography/encrypter";
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator";

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashComparer,
      useClass: BcrypterHasher,
    },
    {
      provide: HashGenerator,
      useClass: BcrypterHasher,
    },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
