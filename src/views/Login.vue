<template>
    <div class="Wrapper">
        <div class="login">
            <div class="title">登录页</div>
            <div class="username">
                <span>帐号：</span>
                <el-input v-model.trim="username" placeholder="请输入帐号" clearable></el-input>
            </div>
            <div class="password">
                <span>密码：</span>
                <el-input v-model.trim="password" placeholder="请输入密码" clearable show-password></el-input>
            </div>
            <el-button type="success" @click="toLogin(username,password)">登陆帐号</el-button>
            <div class="toSignUp"><router-link to="/sign-up">还没有帐号？点击注册</router-link></div>
        </div>
    </div>

</template>

<script>
    import {Message} from "element-ui";
    import auth from "@/api/auth";

    export default {
        data(){
            return{
                username:'',
                password:''
        }
        },
        methods:{
            toLogin(username,password){
                if (!username){
                    Message.error('帐号不可为空！');
                    return;
                }else if(!password){
                    Message.error('密码不可为空！');
                    return;
                }
                auth.login({username,password}).then((res,rej)=>{
                    if(res){
                        this.$router.replace(`/records/${username}`)
                    }
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
    .Wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #73AA63;
    }
    .login{
        display: flex;
        background: #ffffff;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-width: 500px;
        min-height: 300px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    img{
        width: 100px;
        align-self: flex-start;

    }
    .username,.password{
        display: flex;
        flex-direction: row;
        white-space: nowrap;
        align-items: center;
        margin-bottom: 20px;
    }
    .title{
        font-size: 30px;
        font-weight: bold;
        color:#73AA63 ;
        margin-bottom: 20px;
    }
    .toSignUp{
        margin-top: 20px;
        color: grey;
        :hover{
            color:#73AA63 ;
        }
    }

</style>
