import { pool } from "./db.js";

const createTables = async()=>{
  try {
      await pool.query(
      `
        CREATE TABLE IF NOT EXISTS  users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL
);

        
        `
    );
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS  artists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(50)
);

        
        `
    );
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS  albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  release_year INT,
  artist_id INT REFERENCES artists(id)
);
        
        `
    );
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS  songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  duration INT, -- duración en segundos
  album_id INT REFERENCES albums(id)
);
        
        `
    );
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS  playlists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  user_id INT REFERENCES users(id)
);
        
        `
    );
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS  playlist_songs (
  id SERIAL PRIMARY KEY,
  playlist_id INT REFERENCES playlists(id),
  song_id INT REFERENCES songs(id)
);
        
        `
    );
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS  likes (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  song_id INT REFERENCES songs(id)
);

        
        `
    );
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS  play_history (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  song_id INT REFERENCES songs(id),
  played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
        `
    );
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS  purchases (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  album_id INT REFERENCES albums(id),
  purchase_date DATE DEFAULT CURRENT_DATE
);
        
        `
    );
  } catch (error) {
      console.log('----------------------------');
        console.log('There was issue create tables');
        console.log(error);
        console.log('----------------------------');
  }
  finally{
    await pool.end()
  }
}

createTables()