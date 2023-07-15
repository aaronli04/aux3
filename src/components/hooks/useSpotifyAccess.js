import { generateId } from '@/utils/random';

function useSpotifyAccess() {
  function splitSpotifyLink(link, state) {
    const urlParams = new URLSearchParams(link.split('?')[1]);
    console.log(urlParams);
  
    if (urlParams.has('error')) {
      const error = urlParams.get('error');
      return error;
    } 

    if (urlParams.has('state')) {
      const stateValue = urlParams.get('state');
      if (stateValue !== state) {
        return 'Incorrect State';
      }
    }

    return null;
  }

  async function generateAuthorizationCode() {
    try {
      const state = generateId(16);
      const scope = 'user-read-playback-state user-modify-playback-state user-read-email';
  
      const authorizeUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
        response_type: 'code',
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
        state: state
      })}`;
  
      window.location.href = authorizeUrl;
      return state;
    } catch (err) {
      return null;
    }
  }

  async function requestAccessToken() {
    const state = await generateAuthorizationCode();
    if (!state) {
    }
  }

  return {
    generateAuthorizationCode: generateAuthorizationCode,
    requestAccessToken: requestAccessToken
  };
}

export default useSpotifyAccess