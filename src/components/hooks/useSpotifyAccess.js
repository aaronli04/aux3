import React, { useEffect } from "react";
import { generateId } from '@/utils/random'

function useSpotifyAccess() {
  async function generateAuthorizationCode() {
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
  }

  return {
    generateAuthorizationCode: generateAuthorizationCode
  }
}

export default useSpotifyAccess