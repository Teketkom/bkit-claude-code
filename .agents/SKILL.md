---
name: rossi-cto-agent-kit
description: >-
  AI-Native Development OS для Claude Code на основе PDCA-методологии.
  Управление полным циклом разработки: планирование, дизайн, реализация, анализ, отчётность.
  CTO-Led Agent Teams (32 агента), 37 навыков, workflow engine, controllable AI (L0-L4),
  quality gates, audit logging, self-healing, MCP серверы.
  Мультиязычная поддержка: EN, KO, JA, ZH, ES, FR, DE, IT, RU.
  Используй при работе с проектами на базе ROSSI, PDCA-процессами,
  управлении командами агентов, code review, архитектурных решениях.
  Триггеры: ROSSI, pdca, plan, design, analyze, report, team, CTO, pipeline,
  качество кода, архитектура, ревью, планирование, проектирование, анализ, отчёт.
license: Apache-2.0
compatibility: Claude Code v2.1.78+, Node.js v18+
metadata:
  author: Концерн РОССИ (ЗАО РОССИ) / Dmitriy Shalimov (adaptation)
  version: '2.0.8'
  repository: https://github.com/rossi-dev/rossi-cto-agent-kit
  languages: en, ko, ja, zh, es, fr, de, it, ru
---

# ROSSI CTO Agent Kit — AI Native Development OS

> PDCA methodology + CTO-Led Agent Teams + AI coding assistant mastery for AI-native development

## Когда использовать этот навык

Используй этот навык когда:
- Начинаешь новый проект и нужен структурированный workflow разработки
- Работаешь с PDCA-циклом (Plan → Design → Do → Check → Act)
- Нужна координация команды AI-агентов (CTO-Led Agent Teams)
- Проводишь code review, gap-анализ или архитектурные решения
- Требуется автоматизированная документация и отчётность
- Управляешь 9-фазным пайплайном разработки (от схемы до деплоя)
- Работаешь с проектами уровней Starter / Dynamic / Enterprise

## Основные принципы (Core Philosophies)

| Принцип | Описание | Реализация |
|---------|----------|------------|
| **Automation First** | Claude автоматически применяет PDCA даже без команд | `rossi-rules` skill + PreToolUse hooks |
| **No Guessing** | Не уверен — проверь docs → Нет в docs — спроси пользователя | Design-first workflow, `gap-detector` agent |
| **Docs = Code** | Сначала дизайн, потом реализация (синхронизация design-implementation) | PDCA workflow + `/pdca analyze` |

## Четыре принципа Controllable AI (v2.0.0)

| Принцип | Описание |
|---------|----------|
| **Safe Defaults** | L2 Semi-Auto по умолчанию, полная автоматизация не запускается сразу |
| **Progressive Trust** | Доверие зарабатывается через track record (Trust Score 0-100) |
| **Full Visibility** | Каждое решение AI прослеживается через audit log |
| **Always Interruptible** | Пользователь может приостановить AI в любой момент |

## Архитектура Context Engineering

ROSSI реализует Context Engineering через три взаимосвязанных слоя:

| Слой | Компоненты | Назначение |
|------|------------|------------|
| **Domain Knowledge** | 37 Skills | Структурированные экспертные знания |
| **Behavioral Rules** | 32 Agents | Ролевые ограничения с выбором модели (opus/sonnet/haiku) |
| **State Management** | ~620+ Functions | PDCA state machine, workflow engine, audit, quality gates |

### 6-слойная система хуков

```
Layer 1: hooks.json (Global)     → SessionStart, UserPromptSubmit, PreCompact, PostCompact, PreToolUse, PostToolUse, Stop, StopFailure (18 events)
Layer 2: Skill Frontmatter       → Domain-specific hooks
Layer 3: Agent Frontmatter       → Task-specific hooks with constraints
Layer 4: Description Triggers    → Semantic matching in 9 languages (включая RU)
Layer 5: Scripts (21 modules)    → Node.js execution logic
Layer 6: Plugin Data Backup      → ${CLAUDE_PLUGIN_DATA} persistent state
```

## PDCA Workflow — Инструкции

### Команды PDCA

| Команда | Описание | Пример |
|---------|----------|--------|
| `/pdca pm [feature]` | PM-анализ (pre-Plan) | `/pdca pm user-auth` |
| `/pdca plan [feature]` | Создать Plan-документ | `/pdca plan user-auth` |
| `/pdca design [feature]` | Создать Design-документ | `/pdca design user-auth` |
| `/pdca do [feature]` | Фаза реализации | `/pdca do user-auth` |
| `/pdca analyze [feature]` | Gap-анализ (Check) | `/pdca analyze user-auth` |
| `/pdca iterate [feature]` | Автоматическая итерация (Act) | `/pdca iterate user-auth` |
| `/pdca report [feature]` | Генерация отчёта | `/pdca report user-auth` |
| `/pdca status` | Статус текущей фичи | `/pdca status` |
| `/pdca next` | Следующий шаг | `/pdca next` |
| `/pdca team [feature]` | CTO-Led Agent Team | `/pdca team user-auth` |

### Правила автоприменения PDCA

| Тип запроса | Поведение |
|-------------|-----------|
| Новая фича | Проверь `docs/02-design/` → Сначала дизайн если отсутствует |
| Баг-фикс | Сравни код + дизайн → Исправь |
| Рефакторинг | Текущий анализ → План → Обнови дизайн → Выполни |
| Реализация завершена | Предложи Gap-анализ |

### Пути документов PDCA

| Тип | Путь |
|-----|------|
| Plan | `docs/01-plan/features/{feature}.plan.md` |
| Design | `docs/02-design/features/{feature}.design.md` |
| Analysis | `docs/03-analysis/{feature}.analysis.md` |
| Report | `docs/04-report/features/{feature}.report.md` |

## Уровни проектов (Auto-Detection)

### Enterprise (2+ условий)
- `infra/terraform/` папка
- `infra/k8s/` или `kubernetes/` папка
- `services/` папка (2+ сервисов)
- `turbo.json` или `pnpm-workspace.yaml`
- `docker-compose.yml`
- `.github/workflows/` (CI/CD)

### Dynamic (1+ условий)
- bkend-настройки в `.mcp.json`
- API routes или серверные компоненты
- Наличие ORM или database-конфигурации

### Starter
- Простая HTML/CSS/JS структура
- Нет серверной логики

## Agent Teams

### Ключевые агенты (32 агента)

| Агент | Модель | Роль |
|-------|--------|------|
| `cto-lead` | opus | CTO: координация команды, архитектурные решения |
| `product-manager` | sonnet | PM: фичи, PRD, пользовательские истории |
| `pm-lead` | opus | PM Lead: координация PM-команды (43 фреймворка) |
| `security-architect` | opus | Безопасность: аудит, пентест, compliance |
| `infra-architect` | opus | Инфраструктура: K8s, Terraform, CI/CD |
| `frontend-architect` | sonnet | Frontend: UI/UX, дизайн-система |
| `bkend-expert` | sonnet | Backend: API, база данных, BaaS |
| `enterprise-expert` | opus | Enterprise: микросервисы, масштабирование |
| `code-analyzer` | sonnet | Анализ кода: качество, безопасность, ревью |
| `gap-detector` | opus | Gap-анализ: дизайн vs реализация |
| `qa-strategist` | sonnet | QA: тест-стратегия, покрытие |
| `report-generator` | sonnet | Генерация отчётов |
| `self-healing` | opus | Автоматическое восстановление после ошибок |
| `pdca-iterator` | sonnet | PDCA-итерации (Evaluator-Optimizer) |

### Оркестрация команд

| Уровень | PDCA-фаза | Паттерн |
|---------|-----------|---------|
| Dynamic | plan/design/act | leader |
| Dynamic | do | swarm |
| Dynamic | check | council |
| Enterprise | plan | leader |
| Enterprise | design/check | council |
| Enterprise | do | swarm |
| Enterprise | act | watchdog |

## 9-Stage Development Pipeline

| Фаза | Навык | Описание |
|------|-------|----------|
| 1 | `phase-1-schema` | Дизайн схемы данных |
| 2 | `phase-2-convention` | Соглашения по коду |
| 3 | `phase-3-mockup` | UI мокапы |
| 4 | `phase-4-api` | API дизайн |
| 5 | `phase-5-design-system` | Дизайн-система |
| 6 | `phase-6-ui-integration` | UI интеграция |
| 7 | `phase-7-seo-security` | SEO и безопасность |
| 8 | `phase-8-review` | Ревью кода |
| 9 | `phase-9-deployment` | Деплой |

## Automation Levels (L0-L4)

| Уровень | Название | Описание |
|---------|----------|----------|
| L0 | Manual | Всё вручную |
| L1 | Suggested | AI предлагает, человек решает |
| L2 | Semi-Auto | AI выполняет рутину, ключевые решения за человеком (по умолчанию) |
| L3 | Auto | AI автоматически, человек наблюдает |
| L4 | Full Auto | Полная автоматизация с checkpoint-обзорами |

## Quality Gates

Система контроля качества включает 7 стадий:

1. **Pre-Write** — проверка перед записью файла
2. **Post-Write** — валидация после записи
3. **Pre-Bash** — безопасность команд
4. **Post-Bash** — проверка результатов
5. **Phase Transition** — контроль перехода между фазами
6. **Destructive Detection** — 8 правил обнаружения деструктивных операций
7. **Blast Radius** — оценка зоны поражения изменений

## Permissions

| Операция | Правило |
|----------|---------|
| Write/Edit/Read | allow |
| Bash | allow |
| `rm -rf *` | deny |
| `rm -r *` | ask |
| `git push --force` | deny |
| `git reset --hard` | ask |

## MCP Серверы

| Сервер | Описание |
|--------|----------|
| `rossi-pdca` | PDCA state machine, workflow management |
| `rossi-analysis` | Code analysis, metrics, quality gates |

## Конфигурация (rossi.config.json)

Основные секции конфигурации:
- `pdca` — пути документов, пороги, автоитерации
- `triggers` — неявные триггеры, порог уверенности
- `pipeline` — автопереход между фазами
- `automation` — уровень автоматизации, trust score
- `guardrails` — loop breaker, blast radius, checkpoints
- `quality` — метрики, пороги, regression guard
- `team` — CTO agent, max teammates, оркестрация

## Skill Evals — Управление качеством навыков

| Классификация | Количество | Назначение |
|--------------|:----------:|------------|
| Workflow | 17 | Автоматизация процессов (PDCA, pipelines) — постоянные |
| Capability | 18 | Расширение способностей модели — проверяются на паритет |
| Hybrid | 1 | Обе категории |

Запуск:
```bash
# Бенчмарк всех 29 навыков
node evals/runner.js --benchmark

# A/B тест между моделями
node evals/ab-tester.js --skill pdca --modelA claude-sonnet-4-6 --modelB claude-opus-4-6

# Тест паритета модели
node evals/ab-tester.js --parity phase-3-mockup --model claude-opus-4-6
```

## Мультиязычная поддержка (включая русский)

ROSSI v2.0.8 поддерживает 9 языков: EN, KO, JA, ZH, ES, FR, DE, IT, RU.

### Русский язык (RU) — расширенная поддержка

Этот SKILL добавляет полную поддержку русского языка для триггеров агентов:

| Агент | Триггеры (RU) |
|-------|---------------|
| `gap-detector` | проверить, верификация, сравнить, валидация, правильно?, это ок? |
| `pdca-iterator` | улучшить, итерация, исправить, автоисправление, оптимизировать |
| `code-analyzer` | анализировать, качество, безопасность, ревью кода, есть проблемы? |
| `report-generator` | отчёт, резюме, статус, что сделали?, прогресс |
| `starter-guide` | помощь, новичок, впервые, как сделать, объясни, не понимаю |
| `cto-lead` | команда, лид, CTO, режим команды, координация |
| `pm-lead` | PM-анализ, продуктовая аналитика, PRD, управление продуктом |
| `bkend-expert` | бэкенд, база данных, авторизация, загрузка файлов, REST API |
| `security-architect` | безопасность, аудит, пентест, уязвимости, compliance |
| `infra-architect` | инфраструктура, Kubernetes, Terraform, CI/CD, деплой |

## Быстрый старт

1. Убедись что установлен Claude Code v2.1.78+
2. Установи плагин: `/plugin enable ROSSI`
3. Начни новый проект: `/pdca plan my-feature`
4. Запусти CTO Team: `/pdca team my-feature`
5. Проверь статус: `/pdca status`

## Ссылки на базу знаний

- [README](https://github.com/rossi-dev/rossi-cto-agent-kit/blob/main/README.md)
- [AI-Native Development](https://github.com/rossi-dev/rossi-cto-agent-kit/blob/main/AI-NATIVE-DEVELOPMENT.md)
- [Customization Guide](https://github.com/rossi-dev/rossi-cto-agent-kit/blob/main/CUSTOMIZATION-GUIDE.md)
- [CHANGELOG](https://github.com/rossi-dev/rossi-cto-agent-kit/blob/main/CHANGELOG.md)
- [Context Engineering](https://github.com/rossi-dev/rossi-cto-agent-kit/blob/main/rossi-system/philosophy/context-engineering.md)
- [Core Mission](https://github.com/rossi-dev/rossi-cto-agent-kit/blob/main/rossi-system/philosophy/core-mission.md)
- [PDCA Methodology](https://github.com/rossi-dev/rossi-cto-agent-kit/blob/main/rossi-system/philosophy/pdca-methodology.md)
- [Trigger Matrix](https://github.com/rossi-dev/rossi-cto-agent-kit/blob/main/rossi-system/triggers/trigger-matrix.md)
- [Skills Overview](https://github.com/rossi-dev/rossi-cto-agent-kit/blob/main/rossi-system/components/skills/_skills-overview.md)
- [Agents Overview](https://github.com/rossi-dev/rossi-cto-agent-kit/blob/main/rossi-system/components/agents/_agents-overview.md)
