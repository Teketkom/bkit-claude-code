# Каталог агентов ROSSI (32 Agents)

## Агенты уровня Opus (11)

| Агент | Файл | Назначение |
|-------|------|------------|
| `cto-lead` | agents/cto-lead.md | CTO: координация PDCA workflow, архитектурные решения, управление командой |
| `pm-lead` | agents/pm-lead.md | PM Lead: координация PM-команды, 43 фреймворка (pm-skills MIT) |
| `security-architect` | agents/security-architect.md | Безопасность: аудит, пентест, compliance, security review |
| `infra-architect` | agents/infra-architect.md | Инфраструктура: K8s, Terraform, CI/CD, observability |
| `enterprise-expert` | agents/enterprise-expert.md | Enterprise: микросервисы, DDD, масштабирование |
| `gap-detector` | agents/gap-detector.md | Gap-анализ: дизайн vs реализация, matchRate |
| `self-healing` | agents/self-healing.md | Автовосстановление: автоматический fix ошибок |
| `pdca-eval-plan` | agents/pdca-eval-plan.md | PDCA Evaluator: оценка фазы Plan |
| `pdca-eval-design` | agents/pdca-eval-design.md | PDCA Evaluator: оценка фазы Design |
| `pdca-eval-check` | agents/pdca-eval-check.md | PDCA Evaluator: оценка фазы Check |
| `pdca-eval-act` | agents/pdca-eval-act.md | PDCA Evaluator: оценка фазы Act |

## Агенты уровня Sonnet (19)

| Агент | Файл | Назначение |
|-------|------|------------|
| `product-manager` | agents/product-manager.md | PM: фичи, user stories, PRD |
| `frontend-architect` | agents/frontend-architect.md | Frontend: UI/UX, React/Next.js, дизайн-система |
| `bkend-expert` | agents/bkend-expert.md | Backend: API, database, BaaS интеграция |
| `code-analyzer` | agents/code-analyzer.md | Анализ кода: качество, безопасность, performance |
| `qa-strategist` | agents/qa-strategist.md | QA: тест-стратегия, покрытие, automation |
| `qa-monitor` | agents/qa-monitor.md | QA мониторинг: отслеживание качества в runtime |
| `report-generator` | agents/report-generator.md | Генерация отчётов: completion reports, summaries |
| `pdca-iterator` | agents/pdca-iterator.md | PDCA итерации: evaluator-optimizer pattern |
| `design-validator` | agents/design-validator.md | Валидация дизайна: проверка макетов и спецификаций |
| `pipeline-guide` | agents/pipeline-guide.md | Гид по пайплайну: навигация по 9 фазам |
| `starter-guide` | agents/starter-guide.md | Гид для новичков: объяснения, помощь |
| `pm-discovery` | agents/pm-discovery.md | PM Discovery: исследование рынка, конкуренты |
| `pm-research` | agents/pm-research.md | PM Research: глубокий анализ |
| `pm-strategy` | agents/pm-strategy.md | PM Strategy: стратегическое планирование |
| `pm-prd` | agents/pm-prd.md | PM PRD: создание PRD документов |
| `cc-version-researcher` | agents/cc-version-researcher.md | Исследование версий Claude Code |
| `rossi-impact-analyst` | agents/rossi-impact-analyst.md | Анализ влияния изменений |
| `skill-needs-extractor` | agents/skill-needs-extractor.md | Извлечение потребностей в навыках |
| `pdca-eval-do` | agents/pdca-eval-do.md | PDCA Evaluator: оценка фазы Do |

## Агенты уровня Haiku (2)

| Агент | Файл | Назначение |
|-------|------|------------|
| `pdca-eval-pm` | agents/pdca-eval-pm.md | Лёгкая оценка PM фазы |
| (reserved) | — | Зарезервировано для быстрых задач |

## Ключевые параметры агентов (frontmatter)

```yaml
name: agent-name           # Уникальное имя
description: |             # Описание + триггеры на 8+ языках
model: opus/sonnet/haiku   # Модель Claude
effort: high/medium/low    # Уровень усилий
maxTurns: 50               # Максимум шагов
permissionMode: acceptEdits # Режим разрешений
memory: project            # Тип памяти (project/session)
disallowedTools: [...]     # Запрещённые инструменты
tools: [...]               # Доступные инструменты + Task() для субагентов
skills: [...]              # Подключённые навыки
hooks:                     # Хуки (Stop, PreToolUse, PostToolUse)
```
