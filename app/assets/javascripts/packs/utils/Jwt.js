import jwt_decode from 'jwt-decode';

const decode = p => {
  try {
    const jwtDecode = jwt_decode(p);
    return jwtDecode;
  } catch (error) {
    return false;
  }
};

const Jwt = {
  decode
}

export default Jwt;
