const express = require('express')
const router = express.Router()
const Patient = require('./../models/patient.js')
const fetch=require('node-fetch');

router.get('/new', (req,res) => {
	res.redirect(process.env.dpi_uri+"addPatient/")
    //res.render('patients/new', { patient: new Patient() })
})
           
router.get('/edit', async (req,res) => {
	
	res.redirect(process.env.dpi_uri+"addPatient?"+req._parsedUrl.query)
    /*try{
    const patient = await Patient.findById(req.params.id)
    res.render('patients/edit', { patient: patient })
    }catch(e){
     res.redirect('/liste3/tout')   
    }*/
})

router.get('/:id', async (req,res) => {
    try{
	let patients=await fetch(process.env.dpi_uri+"api/patient/get/"+req.params.id);
	
	patients=await patients.json()
	
	patients=patients.patients
    res.render('patients/show', { patient: patients })
    }catch(e){
        res.redirect('/liste3/tout') //if (article == null) 
    }
})

router.post('/', async (req,res) => {     
    let patient = new Patient({
        nomP: req.body.nomP,
        prenomP: req.body.prenomP,
        ageP: req.body.ageP,
        sexeP: req.body.sexeP,
        CIN : req.body.CIN,
        traitementAnterieur : req.body.traitementAnterieur,
        traitementenCours : req.body.traitementenCours,
        Antecedents_Allergies : req.body.Antecedents_Allergies,
        donnees_physio_bio : req.body.donnees_physio_bio
    })
    try{
    patient = await patient.save()
    res.redirect(`/patients/${patient.id}`)
    }catch(e){
        res.render('patients/new', { patient: patient})
    }
})

router.delete('/:id', async (req,res) => {
    try{
    
    await fetch(process.env.dpi_uri+"api/patient/delete/"+req.params.id,{ method: "Delete" })
    res.redirect('/liste3/tout')
    }catch(e){
    res.redirect('/liste3/tout')
    }
})

router.put('/:id', async (req,res) => {
    let patient = await Patient.findById(req.params.id)
        patient.nomP= req.body.nomP
        patient.prenomP= req.body.prenomP
        patient.ageP= req.body.ageP
        patient.sexeP= req.body.sexeP
        patient.CIN = req.body.CIN
        patient.traitementAnterieur = req.body.traitementAnterieur
        patient.traitementenCours = req.body.traitementenCours
        patient.Antecedents_Allergies = req.body.Antecedents_Allergies
        patient.donnees_physio_bio = req.body.donnees_physio_bio
    try{
    patient = await patient.save()
    res.redirect(`/patients/${patient.id}`)
    }catch(e){
        res.render('patients/edit', { patient: patient})
    }
})

module.exports = router