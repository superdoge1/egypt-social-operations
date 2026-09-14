import { describe, expect, it } from 'vitest';
import { quizzes } from '../data/quizzes';
import { validateDayCoverage, validateLessonDurations, validateLessonGraph, validateQuizCoverage } from './content-graph';

const rawLessons = import.meta.glob('../content/lessons/*.mdx', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const lessonFiles = Object.keys(rawLessons).map((file) => file.split('/').pop() ?? '').sort();
const sourceFor = (file: string) => rawLessons[`../content/lessons/${file}`] ?? '';

const expectedLessons = [
  { file: '01-social-entertainment-landscape.mdx', id: 'social-entertainment-landscape', phase: '经营基础', order: 1, days: [1, 2], prerequisites: [], artifacts: ['行业地图', '米可产品矩阵', '竞品观察表'] },
  { file: '02-sugo-product-ecosystem.mdx', id: 'sugo-product-ecosystem', phase: '经营基础', order: 2, days: [3, 4, 5], prerequisites: ['social-entertainment-landscape'], artifacts: ['用户旅程', '供需生态图', '待核实问题清单'] },
  { file: '03-metrics-virtual-economy.mdx', id: 'metrics-virtual-economy', phase: '经营基础', order: 3, days: [6, 7, 8], prerequisites: ['sugo-product-ecosystem'], artifacts: ['指标字典', '数据需求单', '经营漏斗'] },
  { file: '04-egypt-market-users.mdx', id: 'egypt-market-users', phase: '埃及市场', order: 4, days: [9, 10, 11], prerequisites: ['metrics-virtual-economy'], artifacts: ['客群假设卡', '市场评分表', '竞品体验记录'] },
  { file: '05-language-culture-localization.mdx', id: 'language-culture-localization', phase: '埃及市场', order: 5, days: [12, 13, 14], prerequisites: ['egypt-market-users'], artifacts: ['三语词卡', '文化日历', '本地化 QA 表'] },
  { file: '06-growth-relationship-retention.mdx', id: 'growth-relationship-retention', phase: '埃及市场', order: 6, days: [15, 16, 17], prerequisites: ['language-culture-localization'], artifacts: ['渠道漏斗', '激活诊断', '增长实验池'] },
  { file: '07-creator-room-supply.mdx', id: 'creator-room-supply', phase: '经营系统', order: 7, days: [18, 19, 20], prerequisites: ['growth-relationship-retention'], artifacts: ['供给运营手册', '房间质检表', '主播分层框架'] },
  { file: '08-monetization-risk-controls.mdx', id: 'monetization-risk-controls', phase: '经营系统', order: 8, days: [21, 22], prerequisites: ['creator-room-supply'], artifacts: ['商业化诊断', '付费护栏', '反作弊信号表'] },
  { file: '09-trust-safety-regulation.mdx', id: 'trust-safety-regulation', phase: '经营系统', order: 9, days: [23, 24, 25], prerequisites: ['monetization-risk-controls'], artifacts: ['风险登记册', '升级矩阵', '事件响应清单'] },
  { file: '10-management-data-collaboration.mdx', id: 'management-data-collaboration', phase: '经营系统', order: 10, days: [26, 27], prerequisites: ['trust-safety-regulation'], artifacts: ['RACI', '周经营会', 'Dashboard 草图', 'SQL/BI 需求说明'] },
  { file: '11-ninety-day-capstone.mdx', id: 'ninety-day-capstone', phase: '90 天交付', order: 11, days: [28, 29, 30], prerequisites: ['management-data-collaboration'], artifacts: ['SUGO 埃及经营基线与 Day 31–90 方案'] },
] as const;

const frontmatterValue = (source: string, field: string) => {
  const match = source.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
  return match?.[1]?.trim() ?? '';
};

const frontmatterNumber = (source: string, field: string) => Number(frontmatterValue(source, field));

describe('Egypt Social Operations curriculum contract', () => {
  it('contains the exact lesson files, identities, phases, orders, and day ranges', () => {
    expect(lessonFiles).toEqual(expectedLessons.map(({ file }) => file));

    for (const expected of expectedLessons) {
      const source = sourceFor(expected.file);
      expect(frontmatterValue(source, 'id')).toBe(expected.id);
      expect(frontmatterValue(source, 'phase')).toBe(expected.phase);
      expect(frontmatterValue(source, 'order')).toBe(String(expected.order));
      expect(frontmatterValue(source, 'days')).toBe(`[${expected.days.join(', ')}]`);
      expect(frontmatterValue(source, 'prerequisites')).toBe(`[${expected.prerequisites.join(', ')}]`);
      for (const artifact of expected.artifacts) expect(source).toContain(`title: ${artifact}`);
    }
  });

  it('covers each manifest day exactly once', () => {
    const dayMatches = expectedLessons.flatMap((expected) => JSON.parse(frontmatterValue(sourceFor(expected.file), 'days')) as number[]);
    expect(dayMatches).toHaveLength(30);
    expect([...dayMatches].sort((a, b) => a - b)).toEqual(Array.from({ length: 30 }, (_, index) => index + 1));
  });

  it('budgets one hour for each declared lesson day', () => {
    const lessons = expectedLessons.map((expected) => ({
      id: expected.id,
      order: expected.order,
      days: [...expected.days],
      estimatedMinutes: frontmatterNumber(sourceFor(expected.file), 'estimatedMinutes'),
      prerequisites: [...expected.prerequisites],
    }));
    expect(validateLessonDurations(lessons)).toEqual([]);
  });

  it('has a valid quiz for each required lesson and no quiz for a removed lesson', () => {
    const lessons = expectedLessons.map(({ id, order, days, prerequisites }) => ({ id, order, days: [...days], prerequisites: [...prerequisites] }));
    expect(lessons).toHaveLength(11);
    expect(Object.keys(quizzes).sort()).toEqual(expectedLessons.map(({ id }) => id).sort());
    expect(validateLessonGraph(lessons)).toEqual([]);
    expect(validateDayCoverage(lessons)).toEqual([]);
    expect(validateQuizCoverage(lessons, quizzes)).toEqual([]);
  });
});
