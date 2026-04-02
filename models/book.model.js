const { pgTable, uuid, varchar } = require('drizzle-orm/pg-core');
const { authorsTable}= require('./author.model');

const booksTable = pgTable('books',{
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    author: varchar({ length: 255 }).notNull(),
    authorId: uuid().references(()=>authorsTable.id).notNull()
})

module.exports = { booksTable };