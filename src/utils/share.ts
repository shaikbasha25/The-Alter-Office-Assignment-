export async function shareContent(title: string, text: string, url: string) {
  if (!navigator.share) {
    throw new Error('Web Share API not supported');
  }

  try {
    await navigator.share({
      title,
      text,
      url,
    });
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      throw error;
    }
  }
}