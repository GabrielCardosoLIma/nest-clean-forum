import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";

export abstract class AnswerAttachmentsRepository {
  abstract createMany(attachments: AnswerAttachment[]): Promise<void>;
  abstract deleteMany(attachments: AnswerAttachment[]): Promise<void>;
  abstract findManyByAnswerId(id: string): Promise<AnswerAttachment[]>;
  abstract deleteManyByAnswerId(id: string): Promise<void>;
}
