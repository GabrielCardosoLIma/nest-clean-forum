import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  findManyByAnswerId(id: string): Promise<AnswerAttachment[]> {
    throw new Error("Method not implemented.");
  }

  deleteManyByAnswerId(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
