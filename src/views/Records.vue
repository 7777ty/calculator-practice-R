<template>
    <div class="contentWrapper">
        <div class="text">
            <p>{{`用户：${this.$route.params.username}，欢迎使用简单计算器后台管理系统！`}}</p>
            <el-button class="calculator" type="primary" @click="toCalculator">使用计算器</el-button>
            <el-button @click="logout">注销</el-button>
        </div>
        <div v-if="records" class="table">
            <table >
                <thead>
                <tr>
                    <td><p>序列号</p></td>
                    <td><p>表达式</p></td>
                    <td><p>结果</p></td>
                    <td><p>更新时间</p></td>
                    <td><p>相关操作</p></td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="record in records" :key="record.id" >

                    <td>{{record.id}}</td>
                    <td>{{record.express}}</td>
                    <td>{{record.result}}</td>
                    <td>{{new Date(record.updateAt).toLocaleDateString()}}</td>
                    <td>
                        <el-button type="primary" @click="updateRecord(record.id)">再次计算</el-button>
                        <el-button type="danger"  @click="deleteRecord(record.id)">删除记录</el-button>
                    </td>
                </tr>
                </tbody>
            </table>
            <section class="pagination">
                <el-pagination
                        layout="prev, pager, next"
                        :total="total"
                        :current-page="page"
                        @current-change="onPageChange">
                </el-pagination>
            </section>
        </div>
    </div>
</template>

<script>
import {Message} from "element-ui";
import calculator from "../api/calculator";

export default {

    data(){
        return{
            records:{},
            total:0,
            page:1
        }
    },
    methods:{
        getRecords(){
            const username=this.$route.params.username;
            calculator.getRecords(username).then((res,rej)=>{
                this.total=res.total;
                console.log(this.total);
                if(this.total!==0){
                    console.log(res);
                    this.records=res.ret;
                }else{
                    Message.info('暂无数据，请使用计算器！')
                }
            });
        },
        onPageChange(newPage){
            console.log(newPage);
            const username=this.$route.params.username;
            calculator.getRecords(username,newPage).then((res,rej)=>{
                this.records=res.ret;
                this.total=res.total;
                this.page=Math.floor(this.total/10);
            });
        },
        logout(){
            this.$router.replace('/')
        },
        deleteRecord(recordID){
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                calculator.deleteRecord(recordID).then((res,rej)=>{
                    if(res){
                        this.$message({
                            type:'success',
                            message: `${res.msg}`
                        });
                    }
                    if(rej){
                        this.$message({
                            message: `${rej.msg}`
                        });
                    }
                    this.$router.go(0)
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        updateRecord(recordID){
            this.$router.replace(`/calculate/${this.$route.params.username}/${recordID}`)
        },
        toCalculator(){
            this.$router.replace(`/calculate/${this.$route.params.username}`)
        }
    },
    created() {
        this.getRecords();

    },

}
</script>

<style lang='scss' scoped>
    @import "~@/assets/styles/reset.scss";
    .contentWrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #73AA63;
    }
    .text{
        display: flex;
        flex-direction: row;
        align-items: center;


        p{
            position: fixed;
            top:20px;
            left: 20px;
            color: #ffffff;
            font-weight: bold;
        }
        .el-button{
            position: fixed;
            right: 20px;
            top:20px;
        }
        .calculator{
            right:80px;
        }
    }
    .table{
        background: #ffffff;
        border-radius: 4px;
        padding: 20px 50px;
    }
    table{
        border:1px solid #d6d6d6;
        min-width: 600px;
        min-height: 400px;
        width:100%;

        thead{
            background: #d6d6d6;
        }
        tr{
            line-height: 10%;
        }
    }
    td{
        margin:0;
        padding:0;
        border: 1px solid #d6d6d6;
        p{
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .el-button{
        padding: 6px 8px;
        font-size: 12px;
    }



</style>
