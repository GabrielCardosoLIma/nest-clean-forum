import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  findManyByQuestionId(id: string): Promise<QuestionAttachment[]> {
    throw new Error("Method not implemented.");
  }

  deleteManyByQuestionId(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
