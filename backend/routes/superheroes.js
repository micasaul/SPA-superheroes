const express = require('express')
const router = express.Router()
const Superhero = require('../models/superhero')

// GET superheroes
router.get('/', async (req, res) => {
  try {
    const superheroes = await Superhero.find()
    res.json(superheroes)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los superheroes' })
  }
})

// GET superheroes de Marvel
router.get('/marvel', async (req, res) => {
  try {
    const superheroes = await Superhero.find({ house: 'Marvel' })
    res.json(superheroes)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los superheroes de Marvel' })
  }
})

// GET superheroes de DC
router.get('/dc', async (req, res) => {
  try {
    const superheroes = await Superhero.find({ house: 'DC' })
    res.json(superheroes)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los superheroes de DC' })
  }
})

// GET superheroe por ID
router.get('/:id', async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id)
    if (!superhero) return res.status(404).json({ error: 'superheroe no encontrado' })
    res.json(superhero)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el superheroe' })
  }
})

// POST crear superheroe
router.post('/', async (req, res) => {
  try {
    const superhero = new Superhero(req.body)
    const saved = await superhero.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT actualizar superheroe
router.put('/:id', async (req, res) => {
  try {
    const updated = await Superhero.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updated) return res.status(404).json({ error: 'superheroe no encontrado' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE eliminar superheroe
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Superhero.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'superheroe no encontrado' })
    res.json({ message: 'superheroe eliminado correctamente' })
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el superheroe' })
  }
})

module.exports = router