# Рефакторинг проекта lesson-4-mongodb под CQRS

Отчёт по проделанной работе. Обновлять по мере движения.

## Задача

Привести Express-проект к Command Query Separation / CQRS. Работа идёт по модулям:
сначала `user`, потом `blogs`, `posts`.

## Целевая архитектура

Внутри модуля — четыре слоя:

```
api/             HTTP. Валидация формы, matchedData, статус-коды. Без бизнес-логики.
domain/          Бизнес-правила. Знает про bcrypt, не знает про Mongo.
infrastructure/  Работа с базой. Два независимых репозитория.
dto/             Контракты: input (форма), db (документ), read (проекция), output (ответ).
```

Ключевая идея: команда и запрос — два независимых пути, они не пересекаются.

```
POST /users                        GET /users
  api/handler                        api/handler
      ↓                                  ↓
  domain/userCommandService         domain/userQueryService
      ↓                                  ↓
  userRepository                    usersQueryRepository
      ↓                                  ↓
  write-стор: users                  read-стор: user-view
      │ ↑
      └────── change stream ─────────────┘
```

Change stream — единственное место, где write-сторона «знает» про read-сторону, и то
односторонне: только читает события write.

## Общий аудит (начало работы)

Соответствие CQS — примерно 30–35%.

**Что уже было правильно:**

| Элемент | Файл |
|---|---|
| Два подключения к БД | `src/db/mongo.write.db.ts`, `src/db/mongo.read.db.ts` |
| Разные write/read модели | `src/user/dto/users-write-dto.ts`, `users-read-dto.ts` |
| Проекция через change stream | `src/db/change-streams/start-user-change-stream.ts` |
| Отдельная read-коллекция | `mongo.read.db.ts:5` (`user-view`) |

**Нарушения CQS:**

1. `blogs` и `posts` — чтение и запись в одном репозитории (`blogs.repository.ts`, `posts.repository.ts`).
2. Запросы идут в write-БД (`blogs.repository.ts:22`, `posts.repository.ts:19`) — физического разделения нет.
3. Одна модель и на вход команды, и на выход запроса.
4. Команды выполняют запросы: `update-blog-by-id.handler.ts:20-34`, `createNewPostForBlog.ts:14-17`.
5. `userRepository.delete` возвращал захардкоженный `true`.
6. Слой команд обойдён: `testing/handlers/delete-full-data.ts:8-9` вызывает репозитории напрямую.

## Что сделано (модуль `user`)

### Шаг 0 — сборка и единообразие имён

**Исправлено:**
- `user/infrastructure/user.repository.ts` — убраны TS2355, TS2314, проект снова компилируется.
- `findMany` перенесён из `user.repository` в `usersQueryRepository` — чтение в командном репозитории было нарушением CQS.
- Единообразие имени времени: `createAt` → `createdAt` в `users-write-dto.ts`, `users-read-dto.ts`,
  `users-output-dto.ts`, `start-user-change-stream.ts:18`. Причина: change stream читал
  `fullDocument.createdAt` из документа, где поле называлось `createAt`, и получал `undefined`.
  Имя `createdAt` закреплено контрактом Swagger.
- Попутно найден и исправлен баг: `query-pagination-sorting.validation-middleware.ts:8`
  содержал `DEFAULT_SORT_BY = 'createAt'`. В блогах и постах такого поля нет — дефолтная сортировка
  списков молча не работала. Теперь `createdAt`.

### Шаг 1 — write-сторона: сервис

**Принятые решения:**

- Хеширование пароля и `createdAt` живут в сервисе, а не в репозитории. Обеспечивают: правило
  «пароль не хранится в открытом виде» — бизнес-правило; репозиторий про правила не знает и делает
  только `insertOne`; при смене хранилища репозиторий меняется целиком, а логика остаётся.
- Соль не переиспользуется: `bcryptService.generateHash` вызывает `genSalt(10)` внутри, своя соль
  на каждый пароль. На курсе рекомендована именно генерация соли.
- `user.service.ts` переименован в `userCommandService.ts` — чтобы позже добавить симметричный
  `userQueryService`.

**Создано:**
- `src/auth/dapters/bcrypt.service.ts` — `generateHash`, `checkPassword`.
- `src/user/dto/user-db-dto.ts` — `usersDbDTO` (login, passwordHash, email, createdAt). Поле называется
  `passwordHash`, а не `password`: имя типа должно говорить правду о том, что реально лежит в БД.
- `src/user/domain/userCommandService.ts` — `create(inputDTO: usersInput)` собирает `usersDbDTO` и вызывает репозиторий.

**Удалено:**
- `src/user/dto/users-write-dto.ts` — дубль `usersDbDTO`, причём описывавший документ неверно
  (поле `password` при фактическом хеше). Поправлены `mongo.write.db.ts:3,13` и
  `start-user-change-stream.ts:3,5` на `usersDbDTO`. Поле `_id` не нужно описывать руками:
  драйвер даёт `WithId<T>` для документов, уже лежащих в коллекции.

## Текущее состояние кода (модуль `user`)

| Файл | Состояние |
|---|---|
| `user/dto/user-db-dto.ts` | готов |
| `user/dto/users-read-dto.ts` | готов (тип read-проекции) |
| `user/dto/users-output-dto.ts` | готов (`createdAt: string`) |
| `user/dto/users-input-dto.ts` | готов (тело POST) |
| `user/validation/users-input-dto.validation.ts` | готов (login, password, email) |
| `user/domain/user.command.service.ts` | `create` готов |
| `user/infrastructure/user.repository.ts` | `create` готов, `delete` — заглушка |
| `user/infrastructure/user.query.repository.ts` | заглушки |
| `user/api/routers/mapers/map-to-user-output.ts` | готов |
| `user/api/routers/user.router.ts` | готов |
| `user/api/routers/handlers/create-user.handler.ts` | готов, POST работает |
| `user/api/routers/handlers/get-user-list.handler.ts` | пуст |
| `user/api/routers/handlers/delete-user-by-id.handler.ts` | пуст |

## Протестировано

- `npm run watch` + `npm run dev` (в среде без `pnpm`, есть `npm`)
- `POST /users` с `{login, password, email}` → `201` и тело `{id, login, email, createdAt}`
- Документ появляется в `read-model.user-view` — change stream работает
- `core/settings/settings.ts:5` — опечатка `BD_READ_NAME` исправлена, read-стор поднимается

## Что делать дальше

**Шаг 3 — read-сторона (GET /users):**
- `usersQueryRepository` перевести на `userReadCollection`, отдавать `userReadDTO` с плоским `id: string`
- доделать ветки `update` / `delete` в `start-user-change-stream.ts:22-28`
- создать `userQueryService` — симметричный `userCommandService`
- `get-user-list.handler.ts` — пагинация, сортировка, фильтрация по login/email, ответ `PaginationResult<userReadDTO>`
- `user.router.ts` GET — добавить валидацию пагинации/сортировки (как в blogs)

**Шаг 4 — `delete`:**
- `userRepository.delete` не должен возвращать захардкоженный `true`, считать из `deletedCount`
- не делать `findById` перед удалением (команда не читает)
- `delete-user-by-id.handler.ts` — `matchedData` по `:id`, вызов `userCommandService.delete`, 204

## Известные баги вне модуля `user`

Файл `.env` содержит `DB_READ_NAME`, а код читает другое имя — read-стор не поднимется:

```
core/settings/settings.ts:5   DB_READ_NAME: process.env.BD_READ_NAME
```

Ещё:

- `index.ts:15-16` — один `MONGO_URL` на оба подключения. Для урока достаточно (один кластер, две базы),
  менять только если появится реальная реплика.
- `mongo.write.db.ts:25` — `startUserChangeStream()` вызывается до `writeClient.connect()` на строке 28.
  Если события не приходят, проверить `.resume()` на ChangeStream: он `Readable`, одного `.on('change')`
  может не хватить.
- `posts.service.ts:38` — `updateById` принимает `PostViewModel` вместо `PostCreateUpdateDTO`.
- `createNewPostForBlog.ts:17` — передаёт `req.body` в обход валидации.

## План на остальные модули

1. `blogs` — эталон вертикального среза: `blogCommandRepository` (write) + `blogQueryRepository` (read),
   отдельные write/view модели, change stream, `blogsCommandService` + `blogsQueryService`.
2. `posts` — повторить паттерн.
3. `delete-full-data.ts` — перевести на command-сервисы, сейчас вызывает репозитории напрямую.