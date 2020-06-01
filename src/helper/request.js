import axios from 'axios';
import {Message} from "element-ui";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.withCredentials = true;

export default function request(url,type='GET',data={}) {
    return new Promise((resolve, reject) => {
        const option={
            url,
            method:type
        };
        if(type.toLowerCase()==='get'){
            option.params=data;
        }else{
            option.data=data;
            console.log(option);
        }
        axios(option).then(res=>{
            if(res.data.code===0){
                resolve(res.data);
            }else{
                Message.error(res.data.msg);
                reject(res.data);
            }
        }).catch(()=>{
            Message.error('网络异常');
            reject({msg:'网络异常'})
        })
    })

}
