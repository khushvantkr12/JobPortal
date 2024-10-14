//agar multer use nhi karenge routes me to hame data undefined milega...
import multer from "multer";

const storage=multer.memoryStorage();
export const singleUpload=multer({storage}).single("file");