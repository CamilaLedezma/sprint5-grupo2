const path = require('path');
const multer = require('multer')

const storage = multer.diskStorage({
	destination: function (req,file,cb){
        let folder=path.join(__dirname,'../../public/images/product-image')
		cb(null, folder);
	},
	filename: function(req,file,cb){
        const newFilename='product-'+ Date.now() + path.extname(file.originalname);
		cb(null,newFilename);
	}
})
const uploadFile = multer({storage})
module.exports=uploadFile;