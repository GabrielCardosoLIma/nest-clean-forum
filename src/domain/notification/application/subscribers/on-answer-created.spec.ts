import { makeAnswer } from "test/factories/make-answer";
import { OnAnswerCreated } from "./on-answer-created";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryAnswerAttachmentRepository } from "test/repositories/in-memory-answer-attachments-repository";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { InMemoryQuestionAttachmentRepository } from "test/repositories/in-memory-question-attachments-repository";
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from "../use-cases/send-notification";
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository";
import { makeQuestion } from "test/factories/make-question";
import { MockInstance } from "vitest";
import { waitFor } from "test/utils/wait-for";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository";
import { InMemoryAttachmentsRepository } from "test/repositories/in-memory-attachments-repository";

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;
let inMemoryStudentsRepository: InMemoryStudentsRepository;
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;

let sendNotificationExecuteSpy: MockInstance<
  (
    request: SendNotificationUseCaseRequest
  ) => Promise<SendNotificationUseCaseResponse>
>;

describe("On Answer Created", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository();
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository
    );
    inMemoryAnswersAttachmentsRepository =
      new InMemoryAnswerAttachmentRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswersAttachmentsRepository
    );
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository
    );

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository
    );

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute");

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase);
  });

  it("should send a notification when an answer is created", () => {
    const question = makeQuestion();
    const answer = makeAnswer({ questionId: question.id });

    inMemoryQuestionsRepository.create(question);
    inMemoryAnswersRepository.create(answer);

    waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled();
    });
  });
});
