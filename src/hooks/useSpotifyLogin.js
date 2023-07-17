import { parse } from '@/utils/json';
import { generateId } from '@/utils/random';

function useSpotifyLogin() {

  function checkLinkForError(link) {
    const urlParams = new URLSearchParams(link.split('?')[1]);

    if (urlParams.has('error')) {
      const error = urlParams.get('error');
      return error;
    }

    return null;
  }

  function processValidLink(link) {
    const urlParams = new URLSearchParams(link.split('?')[1])
    let code, state;

    if (urlParams.has('code')) {
      code = urlParams.get('code');
    }

    if (urlParams.has('state')) {
      state = urlParams.get('state')
    }

    if (!code || !state) {
      return null;
    }

    return {code: code, state: state}
  }

  function generateAuthorizationCode() {
    try {
      const state = generateId(16);
      const scope = 'user-read-playback-state user-modify-playback-state user-read-email playlist-modify-public';

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

  async function requestAccessToken(info) {
    const authCode = info.code;
    const authState = info.state;
    let accessToken, refreshToken, scope;
    if (!authState) { return null; }
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}`
      });
      const result = await response.json();
      if (result.error) {
        localStorage.removeItem('spotify-access-token')
        return null;
      }
      accessToken = result.access_token;
      refreshToken = result.refresh_token;
      scope = result.scope;
      const info = { accessToken, refreshToken, scope };
      localStorage.setItem('spotify-access-token', JSON.stringify(info));
      return info;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async function refreshAccessToken() {
    const access = parse(localStorage.getItem('spotify-access-token'));
    const refreshToken = access.refreshToken;
    let newToken;
    if (!refreshToken) { return }
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`
      })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.error) {
          return;
        }
        newToken = result.access_token;
      })

      localStorage.setItem('spotify-refresh-token', newToken);
      return newToken
    } catch (err) {
      console.log(err)
      return null
    }
  }


  return {
    checkLinkForError: checkLinkForError,
    processValidLink: processValidLink,
    generateAuthorizationCode: generateAuthorizationCode,
    requestAccessToken: requestAccessToken,
    refreshAccessToken: refreshAccessToken
  };
}

export default useSpotifyLogin