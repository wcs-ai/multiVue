import axios from "axios";

// 响应时间
axios.defaults.timeout = 5000;
// 请求头设置
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";
// 不同的环境可以设置不同的地址。
if (process.env.NODE_ENV === "production") {
    axios.defaults.baseURL = "127.0.0.1:8050";
} else {
    //开发环境
    axios.defaults.baseURL = "/api";
}

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 这里添加加载动画
        if (config.method === "post") {
            config.data = JSON.stringify(config.data);
        }
        return config;
    },
    err => {
        // 加载动画关闭
        console.info("请求错误");
        return Promise.reject(err);
    }
);

// 响应拦截器
axios.interceptors.response.use(
    res => {
        // 关闭动画，一些公共的错误，可以在这里处理。
        if (res.errorCode !== "0") {
            console.info("返回失败", res);
        }
        return Promise.resolve(res.data);
    },
    err => {
        // 关闭动画
        console.info("返回错误");
        return Promise.reject(err);
    }
);
export default axios;