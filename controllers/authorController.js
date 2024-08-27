const Author = require('../models/Author.model');

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
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).json({ message: 'Author not found' });

        author.name = req.body.name || author.name;
        author.bio = req.body.bio || author.bio;
        author.dateOfBirth = req.body.dateOfBirth || author.dateOfBirth;
        author.nationality = req.body.nationality || author.nationality;

        const updatedAuthor = await author.save();
        res.json(updatedAuthor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


//Delete an author
exports.deleteAuthor=async(req,res)=>{
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).json({ message: 'Author not found' });

        await author.remove();
        res.json({ message: 'Author deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
