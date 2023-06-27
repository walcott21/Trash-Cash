import axios from 'axios'

const baseHttpRequest = axios.create({
  baseURL: "http://localhost:8000/",
})

baseHttpRequest.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token")
  if (token!== null){
    config.headers.Authorization = `bearer ${token}`
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


const getData = (url: string) => baseHttpRequest.get(url).then(res => res.data)
const postData = (url: string, data: any) => baseHttpRequest.post(url = url, data).then(res => res.data)
const postFormData = (url: string, data: FormData) => baseHttpRequest.post(url = url, data).then(res => res.data)
const deleteData = (url: string,) => baseHttpRequest.delete(url = url).then(res => res.data)
const updateData = (url: string, data: any) => baseHttpRequest.patch(url = url, data).then(res => res.data)


export { getData, postFormData, postData, deleteData, updateData }