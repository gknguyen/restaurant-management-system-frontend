import { Color } from '@material-ui/lab/Alert';
import { render } from '@testing-library/react';
import React from 'react';
import SnackbarAlert from '../commons/snackBarAlert';
import Logout from '../components/views/login/logout';
import moment, { utc } from 'moment-timezone';
import { CURRENT_TIEMZONE } from './constants';

export function showSnackBarAlert(duration: number, severty: Color, message: string) {
  render(<SnackbarAlert duration={duration} severty={severty} message={message} />);
}

export function logout() {
  render(<Logout />);
}

export function trimText(text: string, max: number) {
  if (text) {
    if (text.length > max) return text.substring(0, max) + '...';
    else return text;
  }
}

export function trimDate(date: Date, max: number) {
  const dateString = date.toString();
  if (dateString) {
    if (dateString.length > max) return dateString.substring(0, max) + '...';
    else {
      date = new Date(dateString);
      const localDate: any = date.toLocaleDateString();
      return localDate;
    }
  }
}

export function bytesToSize(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function convertDateTime(theDateTime: string | Date, format = 'YYYY/MM/DD HH:mm:ss') {
  if (theDateTime) return moment.tz(utc(theDateTime), CURRENT_TIEMZONE).format(format);
  else return null;
}

export function formatPrice(price: number | string) {
  if (typeof price === 'number') {
    const formatedPrice = String(price).replace(/(.)(?=(\d{3})+$)/g, '$1,');
    return formatedPrice;
  } else return price;
}
