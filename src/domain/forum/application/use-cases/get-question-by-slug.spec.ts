import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { makeQuestion } from "test/factories/make-question";
import { InMemoryQuestionAttachmentRepository } from "test/repositories/in-memory-question-attachments-repository";
import { InMemoryAttachmentsRepository } from "test/repositories/in-memory-attachments-repository";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository";
import { makeStudent } from "test/factories/make-student";
import { makeAttachment } from "test/factories/make-attachment";
import { makeQuestionAttachment } from "test/factories/make-question-attachment";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let sut: GetQuestionBySlugUseCase;
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;
let inMemoryStudentsRepository: InMemoryStudentsRepository;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository();
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository();
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository
    );
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to get a question by slug", async () => {
    const student = makeStudent({ name: "John Doe" });

    await inMemoryStudentsRepository.create(student);

    const newQuestion = makeQuestion({
      authorId: student.id,
      slug: Slug.create("example-question"),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const attachment = makeAttachment({
      title: "Some attachment",
    });

    inMemoryAttachmentsRepository.items.push(attachment);

    inMemoryQuestionAttachmentRepository.items.push(
      makeQuestionAttachment({
        attachmentId: attachment.id,
        questionId: newQuestion.id,
      })
    );

    const result = await sut.execute({
      slug: "example-question",
    });

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
        author: "John Doe",
        attachments: [
          expect.objectContaining({
            title: attachment.title,
          }),
        ],
      }),
    });
  });
});
