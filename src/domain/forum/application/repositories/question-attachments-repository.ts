import { QuestionAttachment } from "../../enterprise/entities/question-attachment";

export abstract class QuestionAttachmentsRepository {
  abstract createMany(attachments: QuestionAttachment[]): Promise<void>;

  abstract deleteMany(attachments: QuestionAttachment[]): Promise<void>;

  abstract findManyByQuestionId(id: string): Promise<QuestionAttachment[]>;

  abstract deleteManyByQuestionId(id: string): Promise<void>;
}
