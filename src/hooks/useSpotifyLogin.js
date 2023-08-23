import constants from '@/utils/constants';
import { parse } from '@/utils/json';
import { localStorageGet, localStorageRemove, localStorageSet } from '@/utils/localStorage';
import { generateId } from '@/utils/random';
import useUser from './useUser';
import useSpotifyReadUser from './useSpotifyReadUser';

function useSpotifyLogin() {

  const { createUserAccount } = useUser();
  const { readSpotifyUserInfo } = useSpotifyReadUser();

  function generateAuthorizationCode() {
    try {
      const state = generateId(16);
      const scope = constants.SPOTIFY_SCOPES;

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
          'Authorization': constants.SPOTIFY_HEADER_AUTHORIZATION,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}`
      });
      const result = await response.json();
      if (result.error) {
        localStorageRemove('spotify-access-token')
        return null;
      }
      accessToken = result.access_token;
      refreshToken = result.refresh_token;
      scope = result.scope;
      const info = { accessToken, refreshToken, scope };
      localStorageSet('spotify-access-token', JSON.stringify(info));
      const spotifyUserInfo = await readSpotifyUserInfo();
      const spotifyData = {
        ...spotifyUserInfo,
        refresh_token: refreshToken,
        access_token: accessToken
      }
      await createUserAccount(spotifyData);
      return info;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async function refreshAccessToken(refreshToken) {
    if (!refreshToken) { return }
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Authorization': constants.SPOTIFY_HEADER_AUTHORIZATION,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`
      })
      const result = await response.json()
      if (result.error) {
        return;
      }
      return result.access_token;
    } catch (err) {
      console.log(err)
      return null
    }
  }

  return {
    generateAuthorizationCode,
    requestAccessToken,
    refreshAccessToken
  };
}

export default useSpotifyLogin