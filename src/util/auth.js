import Cookies from 'js-cookie'

export const setCookie = (key, value) => {
  Cookies.set(key, value)
  if(getCookie(key)) {
    return true;
  }
  return false;
}

export const removeCookie = key => {
  Cookies.remove(key)
  if(getCookie(key)) {
    return false;
  }
  return true;
}

export const getCookie = key => {
  return Cookies.get(key)
}
