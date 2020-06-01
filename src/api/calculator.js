import request from "@/helper/request";
const URL={
    RESULT:'/calculate',
    CREATE_RECORD:'/create-record',
    GET_RECORDS:'/records',
    GET_DETAILS:'/records/details',
    DELETE:'/records/deleteRecord',
    UPDATE_RECORD:'/update-record'
};

export default {
    getResult(expression){
        return request(URL.RESULT,'POST',expression);
    },
    createRecord({username,expression,result}){
        return request(URL.CREATE_RECORD,'POST',{username,expression,result});
    },
    updateRecord({recordID,expression,result}){
        return request(URL.UPDATE_RECORD,'POST',{recordID,expression,result});
    },
    getRecords(username,page=1){
        return request(URL.GET_RECORDS,'GET',{username,page});
    },
    deleteRecord(recordID){
        return request(URL.DELETE,'POST',{recordID})
    },
    getRecordDetails(recordID){
        return request(URL.GET_DETAILS,'GET',{recordID})
    }
}
