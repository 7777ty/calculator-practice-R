<template>
    <div class="wrapper">
        <div class="stage"><el-button type="primary" @click="goToBackstage">跳转到后台</el-button></div>
        <div class="result" >
            <div class="history" v-if="historyInput">{{historyInput}}</div>
            <div v-if="result">{{`=${this.result}`}}</div>
            <div v-else>{{currentOutput}}</div>
        </div>
        <div class="numberPad">
            <button @click="onClear">C</button>
            <button @click="onDeleteCount">删除</button>
            <button v-for="item in inputButton" @click="onInputCount" :key="item">{{item}}</button>
            <button @click="onComputed">=</button>
        </div>
    </div>
</template>

<script>
    import calculator from "../api/calculator";
    import {Message} from "element-ui";
    import toRPlish from "../helper/toRPolish";

    const numberString='0123456789';
    const operatorString='+-*/%';
    const numberStack=[];
export default {
    numberString,
    operatorString,
    numberStack,
    data(){
        return{
            inputButton:['%','/','7','8','9','*','4','5','6','-','1','2','3','+','0','.'],
            suffixExpression:'',
            historyInput:'',
            currentOutput:'0',
            result:'',
        }
    },
    methods:{
        onInputCount: function (e) {
            this.result='';
            const input = e.target.textContent;
            const length = this.currentOutput.length;
            if (length === 16) {
                return
            }
            if (this.currentOutput === '0') {
                if (numberString.includes(input)) {
                    this.currentOutput = input;
                } else if (operatorString.includes(input)|| input==='.') {
                    this.currentOutput += input;
                }
                return;
            }
            if(this.currentOutput[length-1]==='0'){
                for(let i=length-1; i>=0;i--){
                    if(operatorString.includes(this.currentOutput[i])&&input!=='.'){
                        return;
                    }
                }
            }
            if(operatorString.includes(this.currentOutput[length-1]) && input==='.'){return;}
            if(this.currentOutput.includes('.') && input==='.'){
                // eslint-disable-next-line no-useless-escape
                if(!(this.currentOutput.slice(this.currentOutput.lastIndexOf('.')).match(/\+[0-9]|\-[0-9]|\*[0-9]|\/[0-9]|\%[0-9]?/))){
                    return;
                }
            }
            if (operatorString.includes(input)){
                if (operatorString.includes(this.currentOutput[length-1])||this.currentOutput.endsWith('.')){
                    return;
                }
            }
            this.currentOutput += input;
        },
        onComputed:function () {
            if(this.currentOutput==='0'){return}
            this.suffixExpression=toRPlish(this.currentOutput);
             const username=this.$route.params.username;
             const recordID=this.$route.params.recordID;
             const expression=this.currentOutput.valueOf();
            calculator.getResult(this.suffixExpression).then((res,rej)=>{
                if(res){
                    this.historyInput=this.currentOutput;
                    this.result=res.result;
                    this.currentOutput=this.result.toString();
                    const result=this.result;
                    if(recordID){
                        calculator.updateRecord({recordID,expression,result}).then((res,rej)=>{
                            Message.success(res.msg);
                        })
                    }else{
                        calculator.createRecord({username,expression,result}).then((res, rej)=>{
                            if(res){
                                Message.success(res.msg);
                            }
                        });
                    }
                }
            }).catch((e)=>{
                this.result=e.result;
                this.currentOutput='0';
                this.historyInput=''
            });

            this.suffixExpression=[];
        },
        onClear:function () {
            this.currentOutput='0';
            this.result='';
            this.historyInput=''
        },
        onDeleteCount:function () {

            if(this.currentOutput.length>1){
                if(this.result){return}
                this.currentOutput=this.currentOutput.substring(0, this.currentOutput.length - 1);
            }else {
                this.currentOutput='0';
                this.historyInput='';
            }

        },
        goToBackstage:function(){
            this.$router.replace(`/records/${this.$route.params.username}`)
        }
    },
    created() {
            calculator.getRecordDetails(this.$route.params.recordID).then((res,rej)=>{
                console.log(res.ret[0]);
                if(res.ret[0]){
                    this.historyInput=res.ret[0].express;
                    this.currentOutput=res.ret[0].result;
                }
            })
    }
}

</script>

<style lang='scss' scoped>
    .wrapper{
        display: flex;
        flex-direction: column;
        margin: 5vh auto;
        background: #000;
        max-width: 500px;
        height: 90vh;
        color: white;
        .result{
            display: flex;
            flex:1;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
            font-size: 32px;
            padding-bottom: 5px;
            border-bottom: 1px solid #333;
            margin: 10px 10px;
            cursor: default;
        }
        .stage{
            position: fixed;
            right: 20px;
            top:10px;
        }
        .numberPad{
            > button{
                width: 25%;
                height: 50px;
                border: 0;
                font-size: 24px;
                background-color: transparent;
                outline: none;
                color: white;
            }
        }
        .history{
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            font-size: 32px;
            padding-bottom: 5px;
        }
    }
    .routerLink{

        position: fixed;
        right:30px;
        top:30px;
    }
</style>
