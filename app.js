const express= require('express');
const app= express();
const port=3000;

// Liste de tâches (simulée avec un tableau)
 let informations = [];

 //Middleware pour utiliser JSON dans les requetes
 app.use(express.json());

 //Endpoint pour obtenir la liste des taches 
 app.get('/informations',(req, res)=>{
    res.json(informations);
 });

 //Endpoint pour ajouter une tache
 app.post('/informations',(req,res)=>{
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
const liste ={
    nom,
    prenom,
    annee,
};
   informations.push(liste);
    res.status(201).json({ message: 'Informations ajoutée avec succès' });
 });

 // Démarrer le serveur
 app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
    });