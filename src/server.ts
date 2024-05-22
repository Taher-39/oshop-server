import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import colors from 'colors/safe';
const PORT = config.PORT || 4000; //opsional port 4000 if don't find config.PORT

async function main() {
  try {
    console.log('DB Connect Attemping.');
    const connect = await mongoose.connect(config.DB_URL as string);
    console.log(colors.bgCyan(`MongoDB Connect: ${connect.connection.host}`));
    app.listen(PORT, () => {
      console.log(`App listening on port:${PORT}`);
    });
  } catch (error) {
    console.error('Error connect to MongoDB', error);
  }
}

main().catch((error) => {
  console.log('Error in main function', error);
});
