import Vue from 'vue'
Vue.mixin({
    data(){
        return{
            checkedNode:{}
        }
    },
    methods:{
        handleNodeClick(data,node,comp){
            this.checkedNode=node;
        }
    }
})
