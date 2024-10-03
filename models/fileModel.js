import mongoose, {Schema} from 'mongoose';

const fileSchema = new mongoose.Schema({
    name: {String, required: true},
  size: {Number, required: true},
  type: {String, required: true},
});

const File = mongoose.model('File', fileSchema);

export default File;