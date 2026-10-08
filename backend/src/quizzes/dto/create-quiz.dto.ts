
export class CreateQuizDto {
  topic: string;

  question: string;

  options: string[];

  correctAnswer: number;

  explanation: string;

  difficulty: 'easy' | 'medium' | 'hard';

  points: number;
}