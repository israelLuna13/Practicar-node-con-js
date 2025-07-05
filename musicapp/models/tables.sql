-- USUARIOS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL
);

-- ARTISTAS
CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(50)
);

-- ÁLBUMES
CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  release_year INT,
  artist_id INT REFERENCES artists(id)
);

-- CANCIONES
CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  duration INT, -- duración en segundos
  album_id INT REFERENCES albums(id)
);

-- PLAYLISTS
CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  user_id INT REFERENCES users(id)
);

-- CANCIONES EN PLAYLIST
CREATE TABLE playlist_songs (
  id SERIAL PRIMARY KEY,
  playlist_id INT REFERENCES playlists(id),
  song_id INT REFERENCES songs(id)
);

-- LIKES
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  song_id INT REFERENCES songs(id)
);

-- HISTORIAL DE REPRODUCCIÓN
CREATE TABLE play_history (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  song_id INT REFERENCES songs(id),
  played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- COMPRAS DE ÁLBUMES
CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  album_id INT REFERENCES albums(id),
  purchase_date DATE DEFAULT CURRENT_DATE
);
-- Artistas
INSERT INTO artists (name, country) VALUES
('Coldplay', 'UK'),
('Shakira', 'Colombia'),
('Adele', 'UK');

-- Álbumes
INSERT INTO albums (title, release_year, artist_id) VALUES
('Parachutes', 2000, 1),
('Laundry Service', 2001, 2),
('25', 2015, 3);

-- Canciones
INSERT INTO songs (title, duration, album_id) VALUES
('Yellow', 260, 1),
('Whenever, Wherever', 215, 2),
('Hello', 300, 3);

-- Usuarios
INSERT INTO users (name, email) VALUES
('Israel', 'israel@mail.com'),
('Hanna', 'hanna@mail.com');

-- Likes
INSERT INTO likes (user_id, song_id) VALUES (1, 1), (1, 2), (2, 3);

-- Endpoints sugeridos (por funcionalidad)
-- Entidad	Método	Ruta	Descripción
-- Canciones	GET	/api/songs	Obtener todas las canciones
-- POST	/api/songs	Crear una canción
-- GET	/api/songs/:id	Obtener una canción específica
-- PUT	/api/songs/:id	Editar canción
-- DELETE	/api/songs/:id	Eliminar canción
-- GET	/api/songs/popular	Canciones con más likes
-- GET	/api/songs/long	Canciones con duración > promedio
-- GET	/api/songs/by-artist/:id	Canciones por artista (JOIN)
-- | Usuarios | GET/POST/etc | /api/users/... | CRUD y relaciones con pedidos/likes |
-- | Playlists | GET/POST/etc | /api/playlists/... | CRUD de playlists, agregar canciones |
-- | Álbumes | GET/POST/etc | /api/albums/... | CRUD, relación con artistas y songs |
-- | Likes | POST/DELETE | /api/likes | Dar/quitar like a una canción |
