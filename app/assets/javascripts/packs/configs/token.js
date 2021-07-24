import { cookies } from 'configs'
import { Jwt } from 'utils'

const checkTokenExpire = () => {
  try {
    const accessToken = cookies.getAccessToken() || null;
    if (!accessToken) return false;

    const decode = Jwt.decode(accessToken);
    if (!decode) return false;

    const expiredAt = decode.exp * 1000;
    const now = new Date().getTime();

    if (expiredAt > now) return accessToken;
    return false;
  } catch (error) {
    return false;
  }
};

const token = {
  checkTokenExpire
}

export default token;
