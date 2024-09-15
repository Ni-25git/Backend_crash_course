const express = require('express');
const MovieModel = require('../models/movieModel');
const movie = express.Router();

movie.get("/allMovies", async (req,res)=>{
    try {
       const movies = await MovieModel.find();
       res.status(201).json({msg:'All movies',movies}) 
    } catch (error) {
        res.status(500).json({msg:error.msg})
    }
});

movie.post("/post", async (req,res)=>{
    try {
        const {name , title , rating , description} = req.body;

        const existingMovie = await MovieModel.findOne({name,title});
        if(existingMovie){
            return res.status(404).json({msg:"This Movie already exists"})
        };

        const newMovie = new MovieModel({name,title,rating, description});
        await newMovie.save();
        res.status(201).json({msg:"Movie posted successfully",newMovie})
    } catch (error) {
        res.status(500).json({msg:error.msg})
    }
});

movie.put("/:movieId", async (req,res)=>{
    try {
        const {movieId} = req.params;
        const {name,title,rating,description} = req.body;

        const updatedMovie = await MovieModel.findByIdAndUpdate(movieId,{name,title,rating,description});
        res.status(201).json({msg:"Movie Updated Successfully", updatedMovie})
    } catch (error) {
        res.status(500).json({msg:error.msg})
    }
});

movie.delete("/:movieId", async (req,res)=>{
    try {
        const {movieId} = req.params;

        const deletedMovie = await MovieModel.findByIdAndDelete(movieId);
        res.status(201).json({msg:"Movie Deleted Successfully", deletedMovie})
    } catch (error) {
        res.status(500).json({msg:error.msg})
    }
});

movie.get('/filterByTitle',async (req,res)=>{
    try {
        const {title} = req.query;
        if(!title){
            return res.status(400).json({ msg: 'Title query parameter is required' });
        };
        const filteredMovie = await MovieModel.find({title: {$regex: title , $options:"i"}});
        res.status(201).json({msg:"Movie filter by title",filteredMovie})
    } catch (error) {
        res.status(500).json({msg:error.msg})
    }
});

movie.get("/filterByRating", async (req,res)=>{
    try {
        const {rating} = req.query;
        if(!rating){
            return res.status(400).json({msg: 'Rating query is required'})
        };
        const filteredMovie = await MovieModel.find({rating : parseFloat(rating)});
        res.status(201).json({msg:"Movie filter by Rating",filteredMovie})
    } catch (error) {
        res.status(500).json({msg:error.msg})
    }
});

movie.get("/searchByName", async (req,res)=>{
    try {
        const {name}= req.query;
        if(!name){
            return res.status(400).json({msg: 'name query is required'})
        }
        const foundMovie = await MovieModel.find({name: {$regex: `^${name}` , $options:"i"}});
        res.status(201).json({msg:"Movie search by name",foundMovie})
    } catch (error) {
        res.status(500).json({msg:error.msg})
    }
});

movie.get("/sortByRating", async (req, res) => {
    try {
        const { sortOrder = 'asc', page = 1, limit = 2 } = req.query;

        const sortOption = sortOrder === 'desc' ? -1 : 1;


        const skip = (page - 1) * limit;

        const sortedMovies = await MovieModel.find()
            .sort({ rating: sortOption })
            .skip(skip)
            .limit(Number(limit));

        const totalMovies = await MovieModel.countDocuments();

        res.status(200).json({
            msg: "Movies sorted by rating",
            sortedMovies,
            totalPages: Math.ceil(totalMovies / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});




module.exports= movie;