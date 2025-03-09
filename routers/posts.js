const express = require('express')
const router = express.Router();

// importo il controller
const postsController = require('../controllers/menucontroller');

// rotte per le operazioni CRUD (Index, Show, store, Create, Update e Delete)

// INDEX
router.get('/', postsController.index);

// SHOW
router.get('/:id', postsController.show);


// STORE
router.post('/', postsController.store);


// UPDATE
router.put('/:id', postsController.update);

// DESTROY
router.delete('/:id', postsController.destroy);


// esporto router
module.exports = router;

// console log di prova
console.log('posts.js si avvia correttamente!');

