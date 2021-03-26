<template>
  <div>
    <Modal
      :styles="{ top: '2vh', width: '50%', paddingLeft: '10px'}"
      v-model="moadlStatus"
      class="seoModifyModal"
    >
      <p slot="header" class="text-center">修改分页</p>
      <Form ref="modalData" :model="modalData" :rules="ruleValidate" :label-position="'top'" hide-required-mark>
        <FormItem label="分页名称" prop="spName">
            <Input v-model="modalData.spName" placeholder="开奖网分页名称"/>
        </FormItem>
        <FormItem label="標題 (title)" prop="title">
            <Input v-model="modalData.title" placeholder="分页标题"/>
        </FormItem>
        <FormItem label="叙述 (description)" prop="bewrite">
            <Input v-model="modalData.bewrite" placeholder="分页叙述"/>
        </FormItem>
        <FormItem label="关键字(keywords)" prop="keywords">
            <Input v-model="modalData.keywords" placeholder="分页关键字"/>
        </FormItem>
        <!-- <FormItem label="head 原始碼(script)" prop="head">
          <Input v-model="modalData.head" type="textarea" :autosize="{minRows: 10}" style="width:100%;" />
        </FormItem> -->
        <FormItem prop="head" class="mb-0">
          <Row slot="label" type="flex" align="middle" :gutter="20">
            <Col><span>head 原始碼(script)</span></Col>
            <Col><Button size="small" type="dashed" @click="handleAdd" icon="md-add">新增</Button></Col>
          </Row>
        </FormItem>
        <FormItem
          v-for="(it, i) in modalData.head"
          :key="i"
          :prop="'head.' + i + '.item'"
          :rules="{required: true, message: `请检查栏位内容`, trigger: 'blur'}">
            <Row :gutter="8">
              <Col span="5">
                <Select v-model="it.class">
                  <Option :value="1" :key="1">引入</Option>
                  <Option :value="2" :key="2">原始码</Option>
                </Select>
              </Col>
              <Col span="15">
                <Input v-model="it.item" type="textarea" :autosize="{minRows: 1}"  />
              </Col>
              <Col span="4">
                <Button type="error" @click="handleRemove(i)">删除</Button>
              </Col>
            </Row>
        </FormItem>
        <FormItem label="html 內容" prop="mega">
            <quill-editor
              ref="editor"
              v-model="modalData.mega"
              :options="editorOption"
            />
        </FormItem>
      </Form>
      <div slot="footer" class="text-center">
        <Button style="margin-right: 20px" @click="moadlStatus = false">取消</Button>
        <Button type="info" @click="handleSubmit('modalData')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  name: "seoModifyModal",
  props: {
    data: {
      type: [Array, Object],
      default: {}
    },
    status: {
      type: Boolean,
      default: false
    },
    spId: {
      type: Number,
      default: 0
    }
  },
  data() {
    const checkHeadData = (rule, value, callback) => {
      console.log(value.length);
      if (value.length < 0) {
        callback(new Error('请检查分页head内容'))
      } else {
        callback()
      }
    }
    const checkMegaData = (rule, value, callback) => {
      console.log(value);
      if (value.length <= 0) {
        callback(new Error('请输入分页mega内容'))
      } else {
        callback()
      }
    }
    return {
      modalData: {
        spId : '',
        spName : '',
        title : '',
        bewrite : '',
        keywords : '',
        head : [{class: 1, item: ""}],
        mega : '',
      },
      ruleValidate: {
        spName: [
            { required: true, message: '请输入分页名称', trigger: 'blur' }
        ],
        title: [
            { required: true, message: '请输入分页标题', trigger: 'blur' }
        ],
        bewrite: [
            { required: true, message: '请输入分页叙述', trigger: 'blur' }
        ],
        keywords: [
            { required: true, message: '请输入分页关键字', trigger: 'blur' }
        ],
        head: [
            { required: true, validator: checkHeadData, trigger: 'blur' }
        ],
        mega: [
            { required: true, validator: checkMegaData, trigger: 'blur' }
        ],
      },
      editorOption: {
        theme: "snow",
        modules: {
          toolbar: {
            container: [                       
              ['bold'],
              ['italic'],
              ['underline'],
              ['strike'],
              ['blockquote'], ['code-block'],
              ['link'],
              ['image'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
            ],
          }
        }
      },
    };
  },
  watch: {
    data (val) {
      for(let key in this.modalData){
        if (key == 'head') {
          if (JSON.parse(val[key]).length) {
            this.modalData[key] = JSON.parse(val[key])
          } else {
            this.modalData[key] = []
          }
        } else {
          this.modalData[key] = val[key]
        }
      }
    },
  },
  computed: {
    ...mapGetters(['getUserLoid']),
    moadlStatus: {
      get () {
        return this.status
      },
      set (val) {
        this.$emit('update:status', val)
      }
    },
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
            this.postSitePagingUpdApi();
          } else {
            this.$Message.error('请检查内容!');
          }
      })
    },
    async postSitePagingUpdApi(){
      try {
        const obj = {
          loid: this.getUserLoid,
          spId: this.spId,
          spName: this.modalData.spName,
          title: this.modalData.title,
          bewrite: this.modalData.bewrite,
          keywords: this.modalData.keywords, 
          head: JSON.stringify(this.modalData.head),
          mega: this.modalData.mega 
        }
        const res = await this.$resources.seoSeting.sitePagingUpd(obj);
        if (res.data.status.code == 1) {
          this.$Notice.success({title: "修改成功"});
          this.moadlStatus = false
        }
      } catch(error) {
        console.error(error);
        this.$Notice.error({title: "网路异常(MPCL1009)"});
      };
    },
    handleAdd () {
      this.modalData.head.push({ class: 1, item: "" });
    },
    handleRemove (index) {
      if (this.modalData.head.length > 0) {
        this.modalData.head.splice(index, 1)
      }
    }
  }
};
</script>
<style lang="scss">
.seoModifyModal {
  .quill-editor {
    background-color: #fff;
    margin-bottom: 20px;
    .ql-toolbar {
      background-color: #ecf0f1;
    }
    .ql-container {
      min-height: 180px;
    }
  }
}
</style>