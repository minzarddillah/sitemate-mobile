import axios from "axios";

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;
axios.defaults.params = {}
axios.defaults.params['apiKey'] = process.env.EXPO_PUBLIC_API_KEY;

export default axios;