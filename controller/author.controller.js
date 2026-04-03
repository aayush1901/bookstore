const {db} = require('../db');
const { authorsTable } = require('../models/index');
const { eq } = require('drizzle-orm');

exports.getAllAuthors= async function(req,res){
    const authors = await db.select().from(authorsTable);
    return res.json(authors);
}

exports.getAuthorsById = async function(req,res){
    const id = req.params.id;
    const [author] = await db.select().from(authorsTable)
    .where(table => eq(table.id,id))

    if(!author){
        return res.status(404).json({message:`no author with id ${id} found`});
    }
  return res.json(author);
}

exports.createAuthor = async function(req,res){
    const {name,email} = req.body;
   

    if(!name || !email){
        return res.status(400).json({message:"name and email are required"})
    }
    try{
    const result= await db.insert(authorsTable)
    .values({name:name,email:email})
    .returning({id:authorsTable.id});
    return res.status(201).json({message:"author created successfully", id:result[0].id});
    }catch(error)
    {
        console.error("DB Error:", error);
        return res.status(500).json({message:"Database insertion failed"});
    }
}

exports.deleteAuthor = async function(req,res){
    const id = req.params.id;
    await db.delete(authorsTable).where(eq(authorsTable.id, id))
    
    return res.json({message:"author deleted successfully"});
}