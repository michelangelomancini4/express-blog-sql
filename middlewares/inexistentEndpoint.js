// Facciamo il controllo
function inexistentEndpoint(req, res, next) {
    //Imposto lo status 404
    res.status(404).json({
        error: "Non Trovato",
        message: "Endpoint inesistente"
    })

}


// Esporto il middleware
module.exports = inexistentEndpoint;
