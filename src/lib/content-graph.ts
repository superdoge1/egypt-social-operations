export interface LessonNode {
  id: string;
  order: number;
  prerequisites: string[];
}

export interface QuizDefinition {
  options: Array<{ value: string }>;
  answers: string[];
}

export function validateLessonGraph(lessons: LessonNode[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const orders = new Set<number>();

  if (lessons.length !== 11) errors.push(`Curriculum must contain exactly 11 lessons; found ${lessons.length}`);

  for (const lesson of lessons) {
    if (ids.has(lesson.id)) errors.push(`Duplicate lesson id: ${lesson.id}`);
    ids.add(lesson.id);
    if (orders.has(lesson.order)) errors.push(`Duplicate lesson order: ${lesson.order}`);
    orders.add(lesson.order);
  }

  if (orders.size !== 11 || Array.from({ length: 11 }, (_, index) => index + 1).some((order) => !orders.has(order))) {
    errors.push('Lesson order must be contiguous from 1 to 11');
  }

  const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));

  for (const lesson of lessons) {
    for (const prerequisite of lesson.prerequisites) {
      if (!ids.has(prerequisite)) {
        errors.push(`Lesson ${lesson.id} references missing prerequisite: ${prerequisite}`);
      } else if ((lessonById.get(prerequisite)?.order ?? 0) >= lesson.order) {
        errors.push(`Lesson ${lesson.id} references later prerequisite: ${prerequisite}`);
      }
    }
  }

  const graph = new Map(lessons.map((lesson) => [lesson.id, lesson.prerequisites]));
  const visited = new Set<string>();
  const active = new Set<string>();

  const visit = (id: string, path: string[]): string[] | null => {
    if (active.has(id)) {
      const cycleStart = path.indexOf(id);
      return [...path.slice(cycleStart), id];
    }
    if (visited.has(id)) return null;

    active.add(id);
    for (const dependency of graph.get(id) ?? []) {
      if (!graph.has(dependency)) continue;
      const cycle = visit(dependency, [...path, id]);
      if (cycle) return cycle;
    }
    active.delete(id);
    visited.add(id);
    return null;
  };

  for (const lesson of lessons) {
    const cycle = visit(lesson.id, []);
    if (cycle) {
      errors.push(`Lesson dependency cycle: ${cycle.join(' -> ')}`);
      break;
    }
  }

  return errors;
}

export function validateQuizCoverage(lessons: LessonNode[], quizzes: Record<string, QuizDefinition>): string[] {
  const errors: string[] = [];
  const lessonIds = new Set(lessons.map((lesson) => lesson.id));

  for (const lesson of lessons) {
    if (!quizzes[lesson.id]) errors.push(`Missing quiz for lesson: ${lesson.id}`);
  }

  for (const [lessonId, quiz] of Object.entries(quizzes)) {
    if (!lessonIds.has(lessonId)) {
      errors.push(`Orphan quiz without lesson: ${lessonId}`);
      continue;
    }

    const optionValues = new Set<string>();
    for (const option of quiz.options) {
      if (optionValues.has(option.value)) errors.push(`Quiz ${lessonId} has duplicate option value: ${option.value}`);
      optionValues.add(option.value);
    }
    if (quiz.answers.length === 0) errors.push(`Quiz ${lessonId} must include at least one answer`);
    for (const answer of quiz.answers) {
      if (!optionValues.has(answer)) errors.push(`Quiz ${lessonId} answer is not an option: ${answer}`);
    }
  }

  return errors;
}
