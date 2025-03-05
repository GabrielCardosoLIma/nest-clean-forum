import { Controller, Get, HttpCode, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/infra/auth/jwt-auth.guard";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions";

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPípe = new ZodValidationPipe(pageQueryParamsSchema);

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>;

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(
    private readonly fetchRecentQuestionsUseCase: FetchRecentQuestionsUseCase
  ) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Query("page", queryValidationPípe) page: PageQueryParamsSchema
  ) {
    const questions = await this.fetchRecentQuestionsUseCase.execute({
      page,
    });

    return { questions };
  }
}
