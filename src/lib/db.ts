import mongoose from 'mongoose';
const DB_URL =
  'mongodb+srv://ghost:LmQP66LkVnDYH3aV@cluster0.z2mib8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

if (!DB_URL) {
  throw new Error('Please provide DATABASE_URL');
}

class DbService {
  db: any;
  constructor() {
    this.connectToDB();
  }

  connectToDB = async () => {
    let conn = await mongoose.connect(DB_URL);

    if (!conn) {
      conn = await mongoose.connect(DB_URL);
    }
    return (this.db = conn);
  };
}
export default DbService