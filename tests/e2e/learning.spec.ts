import { expect, test } from '@playwright/test';

const lessonRoutes = [
  'social-entertainment-landscape',
  'sugo-product-ecosystem',
  'metrics-virtual-economy',
  'egypt-market-users',
  'language-culture-localization',
  'growth-relationship-retention',
  'creator-room-supply',
  'monetization-risk-controls',
  'trust-safety-regulation',
  'management-data-collaboration',
  'ninety-day-capstone',
];

test('every lesson renders its evidence and daily-sprint contract', async ({ page }) => {
  for (const lessonId of lessonRoutes) {
    await page.goto(`learn/${lessonId}/`);
    await expect(page.locator('main h1')).toBeVisible();

    const ledger = page.locator('[data-evidence-ledger]');
    await expect(ledger).toBeVisible();
    for (const label of ['公开资料已验证', '内部数据待验证', '访谈待交叉验证', '运营假设']) {
      await expect(ledger).toContainText(label);
    }

    await expect(page.locator('table[data-daily-sprint]')).toBeVisible();
    await expect(page.locator('[data-artifact-list]')).toBeVisible();
    await expect(page.locator('[data-artifact-visibility]').first()).toBeVisible();

    const sourceRow = page.locator('[data-source-row]').first();
    await expect(sourceRow).toBeVisible();
    await expect(sourceRow).toContainText(/verified \d{4}-\d{2}-\d{2}/);
    await expect(sourceRow).toContainText(/jurisdiction/i);
    await expect(sourceRow).toContainText(/stability/i);
    await expect(sourceRow).toContainText(/internal validation/i);
  }
});

test.describe('Cairo Signal Atlas design contracts', () => {
  test('uses the exact approved fieldbook tokens', async ({ page }) => {
    await page.goto('./');

    const tokens = await page.locator(':root').evaluate((root) => {
      const styles = getComputedStyle(root);
      const expandHex = (value: string) => value === '#fff' ? '#ffffff' : value;
      return Object.fromEntries([
        ['paper', '--paper'],
        ['sheet', '--sheet'],
        ['ink', '--ink'],
        ['muted', '--muted'],
        ['nile', '--nile'],
        ['sun', '--sun'],
        ['coral', '--coral'],
        ['line', '--line'],
      ].map(([name, property]) => [name, expandHex(styles.getPropertyValue(property).trim().toLowerCase())]));
    });

    expect(tokens).toEqual({
      paper: '#f4f7f5',
      sheet: '#ffffff',
      ink: '#102a43',
      muted: '#536873',
      nile: '#087e8b',
      sun: '#f4b942',
      coral: '#b84a3a',
      line: '#cbd8d9',
    });
  });

  test('identifies the interface as Cairo Signal Atlas', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('body')).toHaveAttribute('data-interface', 'cairo-signal-atlas');
    await expect(page.locator('[data-nile-spine]')).toBeVisible();
  });

  test('renders eleven ordered checkpoints and four review gates', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('[data-nile-spine] [data-checkpoint]')).toHaveCount(11);
    await expect(page.locator('[data-review-gate]')).toHaveCount(4);
    await expect(page.locator('[data-nile-spine]')).toContainText('PUBLIC');
    await expect(page.locator('[data-nile-spine]')).toContainText('INTERVIEW');
    const orders = await page.locator('[data-nile-spine] [data-checkpoint]').evaluateAll((items) => items.map((item) => item.getAttribute('data-order')));
    expect(orders).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);
  });

  test('keeps one page H1 and lesson outcome body copy at least 16px', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('main h1')).toHaveCount(1);
    const fontSize = await page.locator('.route-card .outcome').first().evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
    expect(fontSize).toBeGreaterThanOrEqual(16);
  });

  test('keeps at least 8px between desktop navigation actions', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('./');
    const gap = await page.getByRole('navigation', { name: '主导航' }).evaluate((element) => parseFloat(getComputedStyle(element).columnGap));
    expect(gap).toBeGreaterThanOrEqual(8);
  });

  test('keeps course-card links and buttons at least 44px tall on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('./');
    const heights = await page.locator('.route-card h3 a').evaluateAll((links) => links.map((link) => link.getBoundingClientRect().height));
    expect(Math.min(...heights)).toBeGreaterThanOrEqual(44);
    const targets = page.locator('a.button, button');
    for (const target of await targets.all()) {
      expect(await target.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
    }
  });

  test('keeps focus visible and removes entrance motion when reduced motion is requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./');
    await expect(page.locator('[data-entrance]').first()).toHaveCSS('animation-name', 'none');
    const cta = page.getByRole('link', { name: '开始 Day 1' });
    await cta.focus();
    const outline = await cta.evaluate((element) => {
      const styles = getComputedStyle(element);
      return { width: parseFloat(styles.outlineWidth), style: styles.outlineStyle, color: styles.outlineColor };
    });
    expect(outline.width).toBeGreaterThanOrEqual(3);
    expect(outline.style).not.toBe('none');
    expect(outline.color).not.toBe('rgb(0, 0, 0)');
  });

  test('keeps the evidence desk sticky on desktop and in flow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('./learn/social-entertainment-landscape/');
    await expect(page.locator('[data-evidence-desk]')).toBeVisible();
    await expect(page.locator('[data-evidence-desk]')).toHaveCSS('position', 'sticky');
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator('[data-evidence-desk]')).toHaveCSS('position', 'static');
  });

  test('keeps the home and first lesson within the viewport at required widths', async ({ page }) => {
    for (const width of [375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('./');
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      await page.goto('./learn/social-entertainment-landscape/');
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    }
  });

  test('makes every daily sprint table a named keyboard-focusable local scroller on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    for (const lessonId of lessonRoutes) {
      await page.goto(`./learn/${lessonId}/`);
      const table = page.locator('table[data-daily-sprint]');
      const wrapper = table.locator('xpath=..');
      await expect(wrapper).toHaveAttribute('role', 'region');
      await expect(wrapper).toHaveAttribute('tabindex', '0');
      await expect(wrapper).toHaveAttribute('aria-label', /Day \d+–\d+ 学习冲刺表/);
      expect(await wrapper.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
      expect(await table.evaluate((element) => element.tagName)).toBe('TABLE');
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    }
  });

  test('keeps local progress controls honest when browser storage is unavailable', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { configurable: true, get: () => { throw new Error('blocked'); } });
    });
    await page.goto('./');
    await expect(page.locator('[data-storage-limitation]')).toBeVisible();
    await expect(page.locator('[data-reset-progress]')).toBeDisabled();
  });

  test('keeps local progress controls honest when storage reads are blocked', async ({ page }) => {
    await page.addInitScript(() => {
      Storage.prototype.getItem = () => { throw new DOMException('blocked', 'SecurityError'); };
    });
    await page.goto('./');
    await expect(page.locator('[data-storage-limitation]')).toBeVisible();
    await expect(page.locator('[data-reset-progress]')).toBeDisabled();
  });

  test('reports a failed local progress reset without losing the page', async ({ page }) => {
    await page.goto('./');
    await page.evaluate(() => {
      Storage.prototype.removeItem = () => { throw new DOMException('blocked', 'SecurityError'); };
    });
    page.on('dialog', (dialog) => dialog.accept());
    await page.locator('[data-reset-progress]').click();
    await expect(page.locator('[data-storage-limitation]')).toBeVisible();
  });

  test('keeps mobile navigation and page surfaces within the viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    for (const route of ['./', './roadmap/', './projects/', './resources/', './404.html', './not-a-route/', './learn/social-entertainment-landscape/']) {
      await page.goto(route);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    }
  });

  test('uses the whole quiz label as the mobile touch target', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('./learn/social-entertainment-landscape/');
    for (const label of await page.locator('.quiz-options label').all()) {
      expect(await label.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
    }
  });
});

test('learning interface keeps its responsive contract', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');

  await expect(page.locator('body')).toHaveAttribute('data-interface', 'cairo-signal-atlas');
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

  const primaryCta = page.getByRole('link', { name: '开始 Day 1' });
  await expect(primaryCta).toBeVisible();
  expect(await primaryCta.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);

  const navigationLinks = page.getByRole('navigation', { name: '主导航' }).getByRole('link');
  await expect(navigationLinks).toHaveCount(4);
  for (const link of await navigationLinks.all()) {
    expect(await link.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
  }

  await expect(page.locator('[data-entrance]').first()).toHaveCSS('animation-name', 'none');
  const percentage = page.locator('[data-progress-percentage]');
  await expect(percentage).toHaveText('0%');

  await primaryCta.click();
  await expect(page.locator('[data-lesson-controls]')).toHaveAttribute('data-ready', 'true');
  await page.getByRole('button', { name: '标记本节完成' }).click();
  await page.getByRole('link', { name: 'Egypt Social Operations 首页' }).click();
  await expect(percentage).toHaveText('9%');
});

test('learner completes a lesson and keeps progress after reload', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: '先看清。 再跑可靠。' })).toBeVisible();
  await page.getByRole('link', { name: '开始 Day 1' }).click();
  await expect(page.getByRole('heading', { name: '看懂社交娱乐：从类别到 MICO WORLD' })).toBeVisible();
  await expect(page.locator('[data-lesson-controls]')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('[data-note-warning]')).toContainText('公司机密、账号凭据、个人数据或可识别个案');

  await page.getByLabel('学习笔记 仅保存在这台设备').fill('先写目标和验收，再选择技术栈。');
  await page.getByLabel('公开产品表面、内部数据、访谈和运营假设').check();
  await page.getByRole('button', { name: '检查答案' }).click();
  await expect(page.getByText('正确。把证据分层带进下一次 Egypt 运营复盘。')).toBeVisible();
  await page.getByRole('button', { name: '标记本节完成' }).click();
  await page.reload();

  await expect(page.getByRole('button', { name: '已完成 · 点击撤销' })).toBeVisible();
  await expect(page.getByLabel('学习笔记 仅保存在这台设备')).toHaveValue('先写目标和验收，再选择技术栈。');
  await page.evaluate(() => {
    Storage.prototype.setItem = () => { throw new DOMException('full', 'QuotaExceededError'); };
  });
  await page.getByRole('button', { name: '已完成 · 点击撤销' }).click();
  await expect(page.getByText('浏览器未能保存；本页关闭后会丢失')).toBeVisible();
});

test('base-path navigation and final project route work', async ({ page }) => {
  await page.goto('./roadmap/');
  await expect(page).toHaveURL(/\/egypt-social-operations\/roadmap\/$/);
  await page.getByRole('link', { name: /交付 SUGO 埃及 Day 31–90 经营方案/ }).first().click();
  await expect(page).toHaveURL(/\/egypt-social-operations\/learn\/ninety-day-capstone\/$/);
  await expect(page.getByRole('heading', { name: '交付 SUGO 埃及 Day 31–90 经营方案' })).toBeVisible();
});

test('unknown route shows a directed 404', async ({ page }) => {
  await page.goto('./not-a-route/');
  await expect(page.getByText('ROUTE NOT FOUND · 404')).toBeVisible();
  await expect(page.getByRole('link', { name: '返回学习路线' })).toBeVisible();
});
