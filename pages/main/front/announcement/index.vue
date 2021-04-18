<template>
  <div class="announcement-page">
    <div class="announcement-title page-title">公告資訊</div>
    <quill-editor
      ref="editor"
      v-model="projectContent"
      :options="editorOption"
    />
    <div class="text-center my-2">
      <Button type="primary" @click="announcementSave">設置公告</Button>
    </div>
  </div>
</template>
<script>
export default {
  name: "announcement-page",
  async asyncData ({app, error}) {
    try {
      const res = await app.$api.front.announcement()
      console.log(res);
      return { projectContent:  res.data }
    } catch (err) {
      console.log(err);
      error({ statusCode: 500, message: 'api错误！' })
    }
  },
  data() {
    return {
      // projectContent: "公告資訊",
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
    }
  },
  methods: {
    async announcementSave() {
      try {
        const obj = {
          infor: this.projectContent,
        };
        let res = await this.$api.front.setAnnouncement(obj);
        console.log(res);
      } catch (error) {
        console.log(error);
        this.$Notice.error({ title: `設置錯誤!` });
      }
    },
  }
};
</script>
<style lang="scss">

</style>