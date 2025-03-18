import { BadRequestException, Controller, Get, HttpCode, Query } from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions";
import { QuestionPresenter } from "../presenters/question-presenter";

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPípe = new ZodValidationPipe(pageQueryParamsSchema);

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>;

@Controller("/questions")
export class FetchRecentQuestionsController {
  constructor(
    private readonly fetchRecentQuestionsUseCase: FetchRecentQuestionsUseCase
  ) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Query("page", queryValidationPípe) page: PageQueryParamsSchema
  ) {
    const result = await this.fetchRecentQuestionsUseCase.execute({
      page,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const { questions } = result.value;

    return { questions: questions.map(QuestionPresenter.toHTTP) };
  }
}
