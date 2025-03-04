import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";

export interface AnswerAttachmentsRepository {
  findManyByAnswerId(id: string): Promise<AnswerAttachment[]>;
  deleteManyByAnswerId(id: string): Promise<void>;
}
