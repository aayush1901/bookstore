const { db } = require('../db');
const { booksTable } = require('../models/index');
const { eq,ilike } = require('drizzle-orm');
const {sql} = require('drizzle-orm');

exports.getAllBooks= async function(req, res){

    const search = req.query.search;
    console.log(search);
    if(search){
        
        const books = await db.select().from(booksTable)
        .where(sql `to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`);
        return res.json(books);
    }
    const books = await db.select().from(booksTable);
    return res.json(books);
}

exports.getBookById = async function(req,res){
    const id = req.params.id;
    const [ book ]= await db.select().from(booksTable)
    .where(table => eq(table.id,id)).limit(2);

    if(!book){
        return res.status(404).json({message : `Book with ${id} not found`});
    }
    return res.json(book);
}

exports.createBook = async function(req, res) {
    try {
        
        const { title, author, authorId } = req.body;

        
        if (!title || title === "") {
            return res.status(400).json({ message: "title is required" });
        }

        
        const result = await db.insert(booksTable)
            .values({ 
                title: title, 
                author: author, 
                authorId: authorId 
            })
            .returning({ id: booksTable.id });

        // 3. result is an array like [{ id: "uuid-here" }]
        // We must use result[0].id
        return res.status(201).json({ 
            message: "created book successfully", 
            id: result[0].id 
        });

    } catch (error) {
        console.error("DB Error:", error);
        return res.status(500).json({ 
            message: "Database insertion failed", 
            error: error.message 
        });
    }
};

exports.deleteBookbyId = async function(req,res){
    const id = await req.params.id;

    await db.delete(booksTable).where(eq(booksTable.id, id));
    return res.status(200).json({message:"deleted successfully"});
}
