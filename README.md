backend/src/
routes/ books.routes.ts, members.routes.ts, loans.routes.ts
controllers/ lisent req, appellent le service, renvoient res
services/ loan.service.ts <- TOUTE la logique métier ici
db/ pool.ts, migrations/001_init.sql, seed.ts
errors.ts class AppError(status, message)
middleware/ errorHandler.ts
app.ts / server.ts
tests/ loan.service.test.ts
