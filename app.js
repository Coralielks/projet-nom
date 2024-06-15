const express= require('express');
const mongoose = require('mongoose');
const app= express();
const port=3000;

//Connexion à MongoDB
 mongoose.connect('mongodb://localhost/informations', { useNewUrlParser: true, useUnifiedTopology: true });

 // Schéma MongoDB pour les tâches
     const listeSchema = new mongoose.Schema({
   nom: String,
   prenom: String,
   annee: String
   });

   // Modèle MongoDB basé sur le schéma
   const liste = mongoose.model('liste', listeSchema);



 //Middleware pour utiliser JSON dans les requetes
 app.use(express.json());

 // Endpoint pour obtenir la liste des tâches
 app.get('/informations', async (req, res) => {
   try {
   const informations = await liste.find();
   res.json(informations);
   } catch (err) {
   res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
   }
});

 //Endpoint pour ajouter une tache
 app.post('/informations',async (req,res)=>{
    const {nom,prenom,annee}=req.body;
    if(!nom)  
    {
       return res.status(400).json({error:'Veuillez entrer  le nom'});
    }
    if(!prenom)  
        {
           return res.status(400).json({error:'Veuillez entrer le prenom'});
        }

        if(!annee)  
            {
               return res.status(400).json({error:'Veuillez entrer votre année de naissance'});
            }
/*const liste ={
    nom,
    prenom,
    annee,
}*/
try {
   const newliste = new liste({ nom, prenom, annee });
   await newliste.save();
   res.status(201).json({ message: 'informations ajoutée avec succès' });
   } catch (err) {
   res.status(500).json({ error: 'Erreur lors de l\'ajout des informations' });
   }
   });
  

 // Démarrer le serveur
 app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
    });