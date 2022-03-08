const mongoose = require('mongoose')

const commandeRepasCuisineSchema = new mongoose.Schema({
    service: {
        type: String,
        enum: ['ORL', 'Cardiologie', 'Endocrinologie',
          'Gastroentérologie', 'Neurologie',
          'Urgences', 'Réanimation'],
        required: [true, 'service est obligatoire'],
      },
      meal: {
        type: String,
        enum: ['Petit déjeuner', 'Déjeuner', 'Dîner'],
        required: true,
      },
    /*  status: {
        type: String,
        enum: ['Lancement', 'Préparation', 'Distribution','Servi'],
        default:'Lancement'
      }, */
    quantité: {
        type: Number
    },
    nomF: {
        type: String,
        required: true
    },
    dateLivraison: { 
        type: String
    },
    quantitélivrée: {
        type: String
    },
    validationLivraison: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    });


module.exports = mongoose.model('CommandeRepasCuisine', commandeRepasCuisineSchema)