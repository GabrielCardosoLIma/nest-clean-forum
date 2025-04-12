import { QuestionAttachment } from "../../enterprise/entities/question-attachment";

export abstract class QuestionAttachmentsRepository {
  abstract findManyByQuestionId(id: string): Promise<QuestionAttachment[]>;
  abstract deleteManyByQuestionId(id: string): Promise<void>;
}
