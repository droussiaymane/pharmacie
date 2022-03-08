const express = require('express')
const router = express.Router()
const FournMeal = require('../models/fournMeal.js')

router.get('/new', (req,res) => {
    res.render('fournMeals/new', { fournMeal: new FournMeal() })
})

router.get('/edit/:id', async (req,res) => {
    try{
    const fournMeal = await FournMeal.findById(req.params.id)
    res.render('fournMeals/edit', { fournMeal: fournMeal })
    }catch(e){
     res.redirect('/listeFr/tout')   
    }
})

router.get('/:id', async (req,res) => {
    try{
    const fournMeal = await FournMeal.findById(req.params.id)
    res.render('fournMeals/show', { fournMeal: fournMeal })
    }catch(e){
        res.redirect('/listeFr/tout') //if (article == null) 
    }
})
//nomF prénom adresse  companie émail numéro
 
router.post('/', async (req,res) => {
    let fournMeal = new FournMeal({  
        nomF: req.body.nomF,
        prénom : req.body.prénom,
        adresse: req.body.adresse,
        companie: req.body.companie,
        émail: req.body.émail,
        numéro: req.body.numéro
    })
    try{
    fournMeal = await fournMeal.save()
    res.redirect(`/fournMeals/${fournMeal.id}`)
    }catch(e){
        res.render('fournMeals/new', { fournMeal: fournMeal})
    }
})

router.delete('/:id', async (req,res) => {
    try{
    await FournMeal.findByIdAndDelete(req.params.id)
    res.redirect('/listeFr/tout')
    }catch(e){
    res.redirect('/listeFr/tout')
    }
})

router.put('/:id', async (req,res) => {
    let fournMeal = await FournMeal.findById(req.params.id)
        fournMeal.nomF = req.body.nomF
        fournMeal.prénom = req.body.prénom
        fournMeal.adresse = req.body.adresse
        fournMeal.companie = req.body.companie
        fournMeal.émail = req.body.émail
        fournMeal.numéro = req.body.numéro
        
    try{
    fournMeal = await fournMeal.save()
    res.redirect(`/fournMeals/${fournMeal.id}`)
    }catch(e){
        res.render('fournMeals/edit', { fournMeal: fournMeal})
    }
})

module.exports = router