import multer from "multer";
import crypto from "crypto"


const storage = multer.diskStorage({
    //saving location
    destination: function(req,res,cb){

    }

},{
    //pick file from this location
    filename: function(req,res,cb){
        
    }
})