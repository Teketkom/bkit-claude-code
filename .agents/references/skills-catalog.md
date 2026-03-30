# Каталог навыков ROSSI (37 Skills)

## Workflow Skills (17) — Постоянные

| Навык | Описание | Команда |
|-------|----------|---------|
| `pdca` | Управление PDCA циклом | `/pdca [action] [feature]` |
| `pdca-batch` | Пакетная обработка PDCA | `/pdca-batch [features]` |
| `rossi-rules` | Базовые правила ROSSI | автоматический |
| `rossi-templates` | Шаблоны документов | `/rossi-templates` |
| `code-review` | Ревью кода | `/code-review` |
| `development-pipeline` | 9-фазный пайплайн | `/pipeline [phase]` |
| `plan-plus` | Расширенное планирование | `/plan-plus [feature]` |
| `pm-discovery` | PM-обнаружение | `/pm-discovery` |
| `cc-version-analysis` | Анализ версий Claude Code | `/cc-version-analysis` |
| `audit` | Аудит логирование | `/audit` |
| `control` | Управление автоматизацией | `/control [level]` |
| `deploy` | Деплой | `/deploy` |
| `rollback` | Откат | `/rollback` |
| `skill-create` | Создание навыков | `/skill-create` |
| `skill-status` | Статус навыков | `/skill-status` |
| `zero-script-qa` | QA без скриптов | `/zero-script-qa` |
| `btw` | BTW интеграция | `/btw` |

## Capability Skills (18) — Проверяются на паритет с моделью

| Навык | Описание | Команда |
|-------|----------|---------|
| `starter` | Начальный уровень (HTML/CSS/JS) | `/starter [action]` |
| `dynamic` | Dynamic уровень (fullstack) | `/dynamic [action]` |
| `enterprise` | Enterprise уровень (microservices) | `/enterprise [action]` |
| `phase-1-schema` | Фаза 1: Схема данных | `/phase-1-schema` |
| `phase-2-convention` | Фаза 2: Соглашения | `/phase-2-convention` |
| `phase-3-mockup` | Фаза 3: UI мокапы | `/phase-3-mockup` |
| `phase-4-api` | Фаза 4: API дизайн | `/phase-4-api` |
| `phase-5-design-system` | Фаза 5: Дизайн-система | `/phase-5-design-system` |
| `phase-6-ui-integration` | Фаза 6: UI интеграция | `/phase-6-ui-integration` |
| `phase-7-seo-security` | Фаза 7: SEO + безопасность | `/phase-7-seo-security` |
| `phase-8-review` | Фаза 8: Code review | `/phase-8-review` |
| `phase-9-deployment` | Фаза 9: Деплой | `/phase-9-deployment` |
| `claude-code-learning` | Обучение Claude Code | `/claude-code-learning` |
| `desktop-app` | Desktop приложение | `/desktop-app` |
| `mobile-app` | Mobile приложение | `/mobile-app` |
| `bkend-auth` | Backend авторизация | `/bkend-auth` |
| `bkend-data` | Backend данные | `/bkend-data` |
| `bkend-storage` | Backend хранилище | `/bkend-storage` |

## Hybrid Skills (1)

| Навык | Описание |
|-------|----------|
| `bkend-quickstart` | Быстрый старт с bkend (Workflow + Capability) |
| `bkend-cookbook` | Рецепты bkend (Workflow + Capability) |

## Классификация Evals

- **Workflow**: Тесты регрессии качества — навыки постоянные
- **Capability**: Тесты паритета — проверяют, может ли модель обойтись без навыка
- **Hybrid**: Оба типа тестов
