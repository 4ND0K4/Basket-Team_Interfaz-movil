import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { Player } from '../models/Player';

// Ruta a la colección en Realtime Database
const dbPath = '/players';

// Obtener todos los jugadores desde Realtime Database en tiempo real
export const getPlayers = async (lastKey: string | null = null, limit: number = 10): Promise<Player[]> => {
  let query = database().ref(dbPath).orderByKey().limitToFirst(limit);
  if (lastKey) {
    query = database().ref(dbPath).orderByKey().startAt(lastKey).limitToFirst(limit);
  }

  const snapshot = await query.once('value');
  const players: Player[] = [];
  snapshot.forEach(childSnapshot => {
    const player = childSnapshot.val();
    player.id = childSnapshot.key;
    players.push(player);
    return undefined;
  });
  return players;
};

// Obtener un jugador por ID
export const getPlayerById = async (id: string): Promise<Player | null> => {
  const snapshot = await database().ref(`${dbPath}/${id}`).once('value');
  return snapshot.exists() ? { id: snapshot.key, ...snapshot.val() } : null;
};

// Subir archivo a Firebase Storage y retornar la URL de descarga
const uploadFile = async (file: any, path: string): Promise<string> => {
  const fileRef = storage().ref(path);
  await fileRef.putFile(file.uri);
  return await fileRef.getDownloadURL();
};

// Agregar un nuevo jugador con archivos de imagen y video
export const addPlayer = async (player: Player, imageFile: any, videoFile: any): Promise<void> => {
    // Subir archivos de imagen y video y obtener URLs
    if (imageFile) {
      const imageUrl = await uploadFile(imageFile, `images/${player.nombre}-${Date.now()}`);
      player.img = imageUrl;
    }
    if (videoFile) {
      const videoUrl = await uploadFile(videoFile, `videos/${player.nombre}-${Date.now()}`);
      player.video = videoUrl;
    }
    
    // Agregar jugador a la base de datos
    const newPlayerRef = database().ref(dbPath).push();
    player.id = newPlayerRef.key || ''; // Asignar ID único generado
    await newPlayerRef.set(player); // Guardar jugador en la base de datos
  };

// Actualizar un jugador existente con archivos de imagen y video opcionales
export const updatePlayer = async (
  id: string, 
  player: Player, 
  imageFile?: any, 
  videoFile?: any
): Promise<void> => {
  // Subir nuevo archivo de imagen si se proporciona
  if (imageFile) {
    const imageUrl = await uploadFile(imageFile, `images/${player.nombre}-${Date.now()}`);
    player.img = imageUrl; // Actualizar URL de imagen
  }

  // Subir nuevo archivo de video si se proporciona
  if (videoFile) {
    const videoUrl = await uploadFile(videoFile, `videos/${player.nombre}-${Date.now()}`);
    player.video = videoUrl; // Actualizar URL de video
  }

  // Actualizar los datos del jugador en la base de datos
  await database().ref(`${dbPath}/${id}`).update(player);
};


// Eliminar un jugador por ID
export const deletePlayer = async (id: string): Promise<void> => {
  await database().ref(`${dbPath}/${id}`).remove(); // Elimina el jugador de la base de datos
};