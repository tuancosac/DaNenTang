
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  private quizzes = [
    {
      id: 1,
      topic: 'Hệ Mặt Trời',
      question: 'Hành tinh nào gần Mặt Trời nhất?',
      options: [
        'Trái Đất',
        'Sao Kim',
        'Sao Thủy',
        'Sao Hỏa',
      ],
      correctAnswer: 2,
      explanation:
        'Sao Thủy là hành tinh gần Mặt Trời nhất.',
      difficulty: 'easy',
      points: 10,
    },
  ];

  private nextId = 2;

  // GET: Lấy tất cả quiz
  findAll() {
    return this.quizzes;
  }

  // GET: Lấy quiz theo ID
  findOne(id: number) {
    const quiz = this.quizzes.find(
      (item) => item.id === id,
    );

    if (!quiz) {
      throw new NotFoundException(
        `Quiz với ID ${id} không tồn tại`,
      );
    }

    return quiz;
  }

  // POST: Thêm quiz
  create(createQuizDto: CreateQuizDto) {
    const newQuiz = {
      id: this.nextId++,
      ...createQuizDto,
    };

    this.quizzes.push(newQuiz);

    return newQuiz;
  }

  // PUT: Cập nhật quiz
  update(id: number, updateQuizDto: UpdateQuizDto) {
    const quizIndex = this.quizzes.findIndex(
      (item) => item.id === id,
    );

    if (quizIndex === -1) {
      throw new NotFoundException(
        `Quiz với ID ${id} không tồn tại`,
      );
    }

    this.quizzes[quizIndex] = {
      ...this.quizzes[quizIndex],
      ...updateQuizDto,
    };

    return this.quizzes[quizIndex];
  }

  // DELETE: Xóa quiz
  remove(id: number) {
    const quizIndex = this.quizzes.findIndex(
      (item) => item.id === id,
    );

    if (quizIndex === -1) {
      throw new NotFoundException(
        `Quiz với ID ${id} không tồn tại`,
      );
    }

    const deletedQuiz = this.quizzes.splice(
      quizIndex,
      1,
    )[0];

    return {
      message: 'Xóa quiz thành công',
      data: deletedQuiz,
    };
  }
}