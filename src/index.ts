import { url,port,dbuser,dbpas,dbase } from './utils/config'
import app from './app'
import mongoose from 'mongoose'

const URL =`mongodb+srv://${dbuser}:${dbpas}@${dbase}-nqmni.mongodb.net/test?retryWrites=true&w=majority` 

const options = {
  dbName: 'onwash',
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  native_parser: true,
}

mongoose.connect(URL, options)
  .then(() => { console.log('Подключение к  Atlas Cluster удалось!') })
  .catch( (error) => console.error(error) )

app.listen(port, () =>{
  console.info(`Server started on ${url}:${port }`)
})