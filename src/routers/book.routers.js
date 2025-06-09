// *---------------------- template ---------------------- *\\

//?_________  Imports _________\\ 
const {Router} = require('express');                        
const router = Router();


//?_________  rutas y metodos _________\\ 
const bookCtrl = require('../controller/book.controller'); 

router.get('/usuario/', bookCtrl.getBooks);
router.get('/usuario/', bookCtrl.getBook);
router.post('/usuario', bookCtrl.postBook);
router.put('/usuario', bookCtrl.putBook);
router.delete('/usuario', bookCtrl.deleteBook);

//?_________  Exports _________\\ 
module.exports = router;