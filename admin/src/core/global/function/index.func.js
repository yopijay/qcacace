// Libraries
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

export const api = ({ url, method, data = null }) => {
    const config= {
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'GET, POST'
        },
        data: data
    }

    return axios(config);
}

export const usePost = ({ fetch, onSuccess, onError }) => { return useMutation(fetch, { onSuccess, onError}); }
export const useGet = ({ key, fetch, options, onSuccess, onError }) => { return useQuery(key, () => fetch, { onSuccess, onError, ...options }); }

export const getDate = (date) => {
    const year = date.getFullYear();
    const month = `${ (date.getMonth() + 1) >= 10 ? '' : '0' }${ date.getMonth() + 1 }`;
    const day = `${date.getDate() >= 10 ? '' : '0'}${date.getDate() }`;
    const hr = `${ (date.getHours()) >= 10 ? '' : '0' }${ date.getHours() }`;
    const min = `${ (date.getMinutes()) >= 10 ? '' : '0' }${date.getMinutes() }`;
    const sec = `${ (date.getSeconds()) >= 10 ? '' : '0' }${date.getSeconds() }`;

    return {
        date: `${year}-${month}-${day}T${hr}:${min}:${sec}`,
        formatted: `${date.toLocaleString('default', { month: 'long' })} ${day}, ${year} ${ (date.getHours() % 12) >= 10 ? '' : '0' }${ date.getHours() % 12 }:${min} ${hr > 12 ? 'PM' : 'AM'}`,
        time: `${(hr % 12) || 12}:${min}:${sec}`,
        today: `${year}-${month}-${day}`,
        label: `${hr > 12 ? 'PM' : 'AM'}`
    }
}

export const pad = (num, size) => {
    var s = "0000000" + num;
    return s.substr(s.length-size);
}

export const successToast = (message, duration = 3000, navigate) => {
    return toast.success(message, {
        position: 'bottom-right',
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'colored',
        onClose: () => navigate
    });
}

export const errorToast = (message, duration = 3000, navigate) => {
    return toast.error(message, {
        position: 'bottom-right',
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'colored',
        onClose: () => navigate
    });
} 

export const base64 = (file) => {
    return new Promise((resolve, reject) => {
        const filereader = new FileReader();
        filereader.readAsDataURL(file);

        filereader.onload = () => { resolve(filereader.result); }
        filereader.onerror = (error) => { reject(error); }
    });
}

export const randomizer = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for(let i = 0; i < length; i++) { result += characters.charAt(Math.floor(Math.random() * characters.length)); }
    return (result).toUpperCase();
}