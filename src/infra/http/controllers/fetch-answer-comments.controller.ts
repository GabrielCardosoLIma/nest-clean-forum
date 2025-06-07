import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
} from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { CommentPresenter } from "../presenters/comment-presenter";
import { FetchAnswerCommentsUseCase } from "@/domain/forum/application/use-cases/fetch-answer-comments";
import { CommentWithAuthorPresenter } from "../presenters/comment-with-author-presenter";

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPípe = new ZodValidationPipe(pageQueryParamsSchema);

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>;

@Controller("/answers/:answerId/comments")
export class FetchAnswerCommentsController {
  constructor(
    private readonly fetchAnswerCommentsUseCase: FetchAnswerCommentsUseCase
  ) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Query("page", queryValidationPípe) page: PageQueryParamsSchema,
    @Param("answerId") answerId: string
  ) {
    const result = await this.fetchAnswerCommentsUseCase.execute({
      page,
      answerId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const comments = result.value.comments;

    return { comments: comments.map(CommentWithAuthorPresenter.toHTTP) };
  }
}
