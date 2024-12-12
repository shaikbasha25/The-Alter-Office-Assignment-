import { MediaItem } from '../types';
import { storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { STORAGE_PATHS } from './constants';

export async function uploadMedia(file: File): Promise<MediaItem> {
  const isVideo = file.type.startsWith('video/');
  const storageRef = ref(storage, `${STORAGE_PATHS.POSTS}/${Date.now()}_${file.name}`);
  
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return {
    type: isVideo ? 'video' : 'image',
    url,
  };
}