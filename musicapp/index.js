import express from 'express'
import { pool } from './config/db.js';
import routeSongs from './routes/songsRoute.js'
import routeAlbums from './routes/albumsRoute.js'
import routeArtists from './routes/artistRoute.js'
import routeUsers from './routes/usersRoute.js'
import routePlayLists from './routes/playlistsRoute.js'
import routePlayListsSongs from './routes/playlistSong.js'

const app = express()

//to enable to read data on forms
//config middleware to process the data of the request http
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//database
try {
    const result = await pool.query('SELECT NOW()')
    console.log(`Conection were successfull to ${result.rows[0].now}`);

} catch (error) {
  console.log(`There was issue to try connect to postreSql`);
  console.log(error);
    
}
app.use('/songs',routeSongs)
app.use('/albums',routeAlbums)
app.use('/artists',routeArtists)
app.use('/users',routeUsers)
app.use('/playlists',routePlayLists)
app.use('/playlists-songs',routePlayListsSongs)
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is workin on port ${PORT}`);
})