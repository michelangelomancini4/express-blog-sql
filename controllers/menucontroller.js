// importazione menu
const { json } = require('express');
const menu = require('../data/postsarray');

// importo db 
const connection = require('../data/db');

// logica INDEX
function index(req, res) {

    const sql = 'SELECT * FROM posts';

    // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })
};

// logica  SHOW
function show(req, res) {

    const id = parseInt(req.params.id)

    // preparo la query 
    const postSql = 'SELECT * FROM posts WHERE id = ?';

    // Preparo la query per gli ingredienti con dati del presi dal database
    const ingredientsSql = `
    SELECT tags.label
    FROM tags 
    JOIN post_tag  ON tags.id = post_tag.tag_id
    WHERE post_tag.post_id = ?
    `;
    // Eseguo la prima query 

    connection.query(postSql, [id], (err, postResults) => {

        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (postResults.length === 0) return res.status(404).json({ error: 'Post not found' });

        // Recupero il post
        const post = postResults[0];

        // Se è andata bene, eseguo la seconda query per gli ingredienti
        connection.query(ingredientsSql, [id], (err, ingredientsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // Aggiungo gli ingredienti al post
            post.ingredients = ingredientsResults;
            res.json(post);
        });
    });

}

// logica  STORE
function store(req, res) {


    // Creiamo un nuovo id 
    const newId = menu[menu.length - 1].id + 1;

    // Creiamo un nuovo piatto estrapolando i dati di req.body
    const nuovoPiatto = {
        id: newId,
        name: req.body.name,
        image: req.body.image,
        content: req.body.content,
        ingredients: req.body.ingredients
    };

    // Aggiungiamo il nuovo piatto al menu
    menu.push(nuovoPiatto);

    // controlliamo nel terminale
    console.log("menu aggiornato:", menu);

    // Restituiamo lo status corretto e il piatto nuovo
    res.status(201);
    res.json(nuovoPiatto);

}


//  logica UPDATE
function update(req, res) {


    // conversione ID da stringa a numero con parseInt
    const id = parseInt(req.params.id);

    // recupero dati da req.body
    const datiPiatti = req.body;

    // cerchiamo il piatto tramite id
    const piatto = menu.find(piatto => piatto.id === id);

    // Facciamo il controllo
    if (!piatto) {
        //Imposto lo status 404
        res.status(404)
        // Restituisco un JSON con le altre informazioni
        return res.json({
            error: "Non Trovato",
            message: "Piatto non trovato"
        })
    }

    //modifichiamo i dati del piatto
    piatto.name = req.body.name;
    piatto.content = req.body.content;
    piatto.image = req.body.image;
    piatto.ingredients = req.body.ingredients;

    //  stampo in console per controllare che i dati siano aggiornati
    console.log(menu);


    //  ritorniamo il piatto aggiornato
    res.json(piatto);

}

// logica  DESTROY
function destroy(req, res) {

    // conversione ID da stringa a numero con parseInt
    const id = parseInt(req.params.id)

    //Eliminiamo il post dal menu
    connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete pizza' });
        res.sendStatus(204)
    });

}

// esportiamo tutto
module.exports = { index, show, store, update, destroy }


