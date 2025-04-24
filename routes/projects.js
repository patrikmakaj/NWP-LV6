const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// GET /projects - lista projekata
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.render('projects/index', { projects });
});

// GET /projects/new - forma za novi projekt
router.get('/new', (req, res) => {
  res.render('projects/new');
});

// POST /projects - kreiranje projekta
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.redirect('/projects');
});

// GET /projects/:id - detalji
router.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.render('projects/show', { project });
});

router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send('Projekt nije pronađen');
    }
    res.render('projects/show', { project }); 
  } catch (err) {
    next(err);
  }
});

// GET /projects/:id/edit - forma za uređivanje
router.get('/:id/edit', async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.render('projects/edit', { project });
});

// PUT /projects/:id - ažuriranje
router.put('/:id', async (req, res) => {
  await Project.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/projects');
});

// DELETE /projects/:id - brisanje
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/projects');
});

module.exports = router;
