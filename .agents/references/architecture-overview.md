# Архитектура bkit — Обзор

## Структура проекта

```
bkit-claude-code/
├── .claude-plugin/          # Plugin manifest (plugin.json, marketplace.json)
├── .mcp.json                # MCP server configuration
├── agents/                  # 32 AI агента (11 opus / 19 sonnet / 2 haiku)
├── bkit-system/             # Системная документация (Obsidian vault)
│   ├── philosophy/          # Миссия, принципы, PDCA методология
│   ├── components/          # Обзоры агентов, скиллов, хуков, скриптов
│   ├── scenarios/           # Сценарии использования
│   ├── testing/             # Чек-листы тестирования
│   └── triggers/            # Матрица триггеров, правила приоритетов
├── commands/                # CLI команды (/bkit, output-style-setup)
├── docs/                    # PDCA документация
│   ├── 00-pm/               # PRD документы
│   ├── 01-plan/             # Планы
│   ├── 02-design/           # Дизайн-документы
│   ├── 03-analysis/         # Анализы
│   └── 04-report/           # Отчёты
├── evals/                   # Skill Evals фреймворк (29 определений)
├── hooks/                   # Hook system (hooks.json + startup/)
├── lib/                     # ~620+ функций, 88 модулей
│   ├── audit/               # Audit logger, decision tracer
│   ├── context/             # Living Context System (7 модулей)
│   ├── control/             # Automation controller, trust engine
│   ├── core/                # Базовые модули (config, cache, io, paths)
│   ├── intent/              # Классификация намерений, языки, триггеры
│   ├── pdca/                # PDCA state machine, workflow engine
│   ├── quality/             # Quality gates, metrics, regression guard
│   ├── task/                # Управление задачами
│   ├── team/                # CTO-Led Agent Teams
│   └── ui/                  # CLI dashboard (progress-bar, workflow-map)
├── output-styles/           # 4 стиля вывода (learning, pdca-guide, enterprise, pdca-enterprise)
├── refs/                    # Официальные источники Claude Code
├── scripts/                 # 57 скриптов хуков
├── servers/                 # MCP серверы (bkit-pdca, bkit-analysis)
├── skill-creator/           # Генератор навыков с шаблонами
├── skills/                  # 37 навыков (18 Workflow / 18 Capability / 1 Hybrid)
├── templates/               # Шаблоны PDCA документов + инфраструктура
└── test/                    # 3,175+ тестов
    ├── architecture/        # Тесты архитектуры
    ├── controllable-ai/     # Тесты Controllable AI
    ├── e2e/                 # E2E тесты
    ├── integration/         # Интеграционные тесты
    ├── performance/         # Тесты производительности
    ├── philosophy/          # Тесты философии (automation-first, no-guessing, docs=code)
    ├── regression/          # Регрессионные тесты
    ├── security/            # Тесты безопасности
    ├── unit/                # Юнит-тесты
    └── ux/                  # UX-тесты
```

## State Machine — PDCA переходы

```
[IDLE] → plan → [PLANNING]
[PLANNING] → design → [DESIGNING]
[DESIGNING] → do → [DOING]
[DOING] → check → [CHECKING]
[CHECKING] → act → [ACTING]
[ACTING] → report → [REPORTING]
[REPORTING] → idle → [IDLE]

Дополнительные переходы:
[CHECKING] → iterate → [ACTING] (при matchRate < 90%)
[ACTING] → check → [CHECKING] (повторная проверка)
[ANY] → pause → [PAUSED]
[PAUSED] → resume → [PREVIOUS_STATE]
```

20 переходов, 9 guards для валидации.

## Ключевые конфигурации

### Пороги качества (bkit.config.json)
- Match Rate: 90% (порог соответствия дизайну)
- Code Quality Score: 70
- Critical Issues: 0 (допустимо)
- Convention Compliance: 90%

### Guardrails
- Max PDCA Iterations: 5
- Max Same File Edits: 10
- Max Agent Recursion: 3
- Cooldown: 60 секунд
- Blast Radius Limit: high
- Checkpoint on Phase Transition: true
- Checkpoint on Destructive: true

### Team Configuration
- Max Teammates: 5 (Enterprise), 3 (Dynamic)
- CTO Agent: cto-lead
- Display Mode: in-process
