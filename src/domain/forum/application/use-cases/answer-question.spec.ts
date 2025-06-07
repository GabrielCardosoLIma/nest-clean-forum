import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerAttachmentRepository } from "test/repositories/in-memory-answer-attachments-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository
    );
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to create a answer", async () => {
    const result = await sut.execute({
      questionId: "1",
      authorId: "1",
      content: "Conteúdo da resposta",
      attachmentsIds: ["1", "2"],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems
    ).toHaveLength(2);
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachmentId: new UniqueEntityID("1") }),
        expect.objectContaining({ attachmentId: new UniqueEntityID("2") }),
      ]
    );
  });

  it("should persist attachments when creating a new answer", async () => {
    const result = await sut.execute({
      questionId: "1",
      authorId: "1",
      content: "Conteúdo da resposta",
      attachmentsIds: ["1", "2"],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswerAttachmentRepository.items).toHaveLength(2);
    expect(inMemoryAnswerAttachmentRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityID("1"),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID("1"),
        }),
      ])
    );
  });
});
