import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { CommentOnAnswerUseCase } from "@/domain/forum/application/use-cases/comment-on-answer";


const CommentOnAnswerBodySchema = z.object({
  content: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(CommentOnAnswerBodySchema);

type CommentOnAnswerBodySchema = z.infer<typeof CommentOnAnswerBodySchema>;

@Controller("/answers/:answerId/comments")
export class CommentOnAnswerController {
  constructor(
    private readonly commentOnAnswerUseCase: CommentOnAnswerUseCase
  ) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CommentOnAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param("answerId") answerId: string
  ) {
    const { content } = body;
    const userId = user.sub;

    const result = await this.commentOnAnswerUseCase.execute({
      content,
      answerId,
      authorId: userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
