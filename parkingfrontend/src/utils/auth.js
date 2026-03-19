export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

const decodeJwtPayload = (token) => {
  if (!token) {
    return null;
  }

  try {
    const [, payload] = token.split('.');

    if (!payload) {
      return null;
    }

    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = atob(normalizedPayload);

    return JSON.parse(decodedPayload);
  } catch {
    return null;
  }
};

const getFirstDefinedValue = (source, keys) => {
  if (!source) {
    return null;
  }

  for (const key of keys) {
    const value = source[key];

    if (value !== undefined && value !== null && value !== '') {
      return value;
    }
  }

  return null;
};

const buildUserProfile = (userData = {}, fallbackData = {}) => {
  const token = userData.token || getToken();
  const claims = decodeJwtPayload(token);

  return {
    token,
    role:
      getFirstDefinedValue(userData, ['role']) ||
      getFirstDefinedValue(claims, [
        'role',
        'roles',
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
      ]) ||
      fallbackData.role ||
      null,
    name:
      getFirstDefinedValue(userData, ['name', 'userName', 'username']) ||
      getFirstDefinedValue(claims, [
        'name',
        'unique_name',
        'username',
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
      ]) ||
      fallbackData.username ||
      null,
    userId:
      getFirstDefinedValue(userData, ['userId', 'id']) ||
      getFirstDefinedValue(claims, [
        'userId',
        'id',
        'sub',
        'nameid',
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
      ]) ||
      null,
    email:
      getFirstDefinedValue(userData, ['email', 'emailAddress']) ||
      getFirstDefinedValue(claims, [
        'email',
        'emails',
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
      ]) ||
      null,
    phone:
      getFirstDefinedValue(userData, ['phone', 'phoneNumber', 'mobile']) ||
      getFirstDefinedValue(claims, ['phone', 'phone_number']) ||
      null,
    address:
      getFirstDefinedValue(userData, ['address', 'location']) ||
      getFirstDefinedValue(claims, ['address']) ||
      null,
    raw: userData,
    claims,
  };
};

export const saveUserData = (userData, fallbackData = {}) => {
  const normalizedProfile = buildUserProfile(userData, fallbackData);
  localStorage.setItem('userData', JSON.stringify(normalizedProfile));
};

export const getUserData = () => {
  const data = localStorage.getItem('userData');

  if (!data) {
    return buildUserProfile();
  }

  try {
    return buildUserProfile(JSON.parse(data));
  } catch {
    return buildUserProfile();
  }
};

export const removeUserData = () => {
  localStorage.removeItem('userData');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};
