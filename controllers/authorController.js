const Author = require('../models/author');

// Create a new author
exports.createAuthor = async (req, res) => {
    const author = new Author({
        name: req.body.name,
        bio: req.body.bio,
        dateOfBirth: req.body.dateOfBirth,
        nationality: req.body.nationality
    });

    try {
        const newAuthor = await author.save();
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Get all authors
exports.getAuthors=async(req,res)=>{
    try{
        const authors=await Author.find();
        res.json(authors);
    }catch(err){
        res.status(500).json({message:err.message})
    }
};

//Get and author bY ID 
exports.getAuthorByID=async(req,res)=>{
    try{
         const author=await Author.getAuthorByID(req.params.id);
         if (!author) return res.status(404).json({ message: 'Author not found' });
         res.json(author);
    }catch(err){
        res.status(500).json({ message: err.message });

    }
}
//Update an author
exports.updateAuthor = async (req, res) => {
    try {
        
    }catch{

    }
}

//Delete an author
exports.delereAuthor=async(req,res)=>{
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).json({ message: 'Author not found' });

        await author.remove();
        res.json({ message: 'Author deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
