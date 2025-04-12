import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";

export abstract class AnswerAttachmentsRepository {
  abstract findManyByAnswerId(id: string): Promise<AnswerAttachment[]>;
  abstract deleteManyByAnswerId(id: string): Promise<void>;
}
