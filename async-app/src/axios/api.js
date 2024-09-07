import axios from "axios";

/*
Axios Custom Instance: 기본 설정(예: baseURL, headers 등)을 여러 요청에서 반복하지 않기 위해 사용합니다. 자주 쓰는 설정을 재사용할 때 유용

Interceptors: 요청 전이나 응답 후에 로직(예: 토큰 추가, 오류 처리)을 자동으로 처리하기 위해 사용합니다. 요청이 전송되기 전에 또는 응답을 받기 전에 작업을 중간에 가로채서 처리

간단히 말해, Custom Instance는 설정 반복 방지, Interceptors는 요청/응답 중간 처리에 사용
*/
const api = axios.create({
  baseURL: "http://localhost:4001",
  timeout: 1, // 1ms
});

api.interceptors.request.use((config) => {
  console.log("인터셉스 요청 성공");
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("응답을 받았음");
    return response;
  },
  (error) => {
    console.log("인터셉스 응답을 받지 못했음", error);
    return Promise.reject(error);
  }
);
export default api;
