const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filesSchema = new Schema({
    
});
const files = mongoose.models.files || mongoose.model('files', filesSchema);
export default files;