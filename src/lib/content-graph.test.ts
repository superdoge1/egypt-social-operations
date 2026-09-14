import { describe, expect, it } from 'vitest';
import { validateDayCoverage, validateLessonGraph, validateQuizCoverage } from './content-graph';

const lesson = (id: string, order: number, prerequisites: string[] = []) => ({ id, order, prerequisites });
const curriculum = () => Array.from({ length: 11 }, (_, index) => lesson(`lesson-${index + 1}`, index + 1, index === 0 ? [] : [`lesson-${index}`]));
const quiz = (options = [{ value: 'correct', label: 'Correct' }, { value: 'other', label: 'Other' }], answers = ['correct']) => ({
  prompt: 'Question',
  options,
  answers,
  explanation: 'Explanation',
});

describe('validateLessonGraph', () => {
  it('accepts exactly eleven sequential lessons with earlier prerequisites', () => {
    expect(validateLessonGraph(curriculum())).toEqual([]);
  });

  it('reports duplicate ids, duplicate orders, gaps, and missing prerequisites', () => {
    const lessons = curriculum();
    lessons[1] = lesson('lesson-1', 1);
    lessons[2] = lesson('lesson-3', 4, ['review']);

    expect(validateLessonGraph(lessons)).toEqual(expect.arrayContaining([
      'Duplicate lesson id: lesson-1',
      'Duplicate lesson order: 1',
      'Lesson order must be contiguous from 1 to 11',
      'Lesson lesson-3 references missing prerequisite: review',
    ]));
  });

  it('reports later prerequisites and dependency cycles', () => {
    const lessons = curriculum();
    lessons[0] = lesson('lesson-1', 1, ['lesson-2']);
    lessons[1] = lesson('lesson-2', 2, ['lesson-1']);

    expect(validateLessonGraph(lessons)).toEqual(expect.arrayContaining([
      'Lesson lesson-1 references later prerequisite: lesson-2',
      'Lesson dependency cycle: lesson-1 -> lesson-2 -> lesson-1',
    ]));
  });

  it('reports a curriculum whose lesson count is not eleven', () => {
    expect(validateLessonGraph(curriculum().slice(0, 10))).toContain('Curriculum must contain exactly 11 lessons; found 10');
  });
});

describe('validateQuizCoverage', () => {
  it('accepts one valid quiz for every lesson', () => {
    const lessons = curriculum();
    const quizzes = Object.fromEntries(lessons.map(({ id }) => [id, quiz()]));

    expect(validateQuizCoverage(lessons, quizzes)).toEqual([]);
  });

  it('reports missing and orphan quizzes', () => {
    const lessons = curriculum();
    const quizzes = Object.fromEntries(lessons.slice(1).map(({ id }) => [id, quiz()]));
    quizzes.orphan = quiz();

    expect(validateQuizCoverage(lessons, quizzes)).toEqual([
      'Missing quiz for lesson: lesson-1',
      'Orphan quiz without lesson: orphan',
    ]);
  });

  it('reports duplicate option values, empty answers, and answers outside the options', () => {
    const lessons = curriculum();
    const quizzes = Object.fromEntries(lessons.map(({ id }) => [id, quiz()]));
    quizzes['lesson-1'] = quiz([{ value: 'same', label: 'One' }, { value: 'same', label: 'Two' }], []);
    quizzes['lesson-2'] = quiz(undefined, ['missing']);

    expect(validateQuizCoverage(lessons, quizzes)).toEqual([
      'Quiz lesson-1 has duplicate option value: same',
      'Quiz lesson-1 must include at least one answer',
      'Quiz lesson-2 answer is not an option: missing',
    ]);
  });
});

describe('validateDayCoverage', () => {
  it('accepts a complete non-overlapping thirty-day sprint plan', () => {
    const lengths = [2, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3];
    const plan = Array.from({ length: 11 }, (_, index) => ({
      ...lesson(`lesson-${index + 1}`, index + 1),
      days: Array.from({ length: lengths[index] }, (_, dayIndex) => dayIndex + 1),
    }));
    let day = 1;
    for (const item of plan) {
      const length = item.days.length;
      item.days = Array.from({ length }, () => day++);
    }
    expect(validateDayCoverage(plan)).toEqual([]);
  });

  it('reports duplicate, missing, and undeclared sprint days', () => {
    expect(validateDayCoverage([
      { ...lesson('one', 1), days: [1, 2] },
      { ...lesson('two', 2), days: [2, 31] },
      { ...lesson('three', 3), days: [] },
    ])).toEqual(expect.arrayContaining([
      'Sprint day appears more than once: 2',
      'Lesson two has sprint day outside 1 to 30: 31',
      'Lesson three must declare at least one sprint day',
      'Sprint days must cover 1 to 30 exactly; missing: 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30',
      'Sprint day coverage must contain exactly 30 days; found 2',
    ]));
  });
});
