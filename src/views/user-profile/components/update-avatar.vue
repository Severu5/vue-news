<template>
  <div class='update-avatar__container'>
    <img
      ref="image"
      :src="image"
      alt=""
    >
    <van-nav-bar
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close-edit')"
      @click-right="onCofrim"
    />
  </div>
</template>

<script>
import { updateUserAvatar } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'update-avatar',
  props: {
    file: {
      type: File,
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },
    async onCofrim () {
      this.$toast.loading({
        message: '修改中',
        forbidClick: true
      })
      const params = new FormData()
      const file = await this.getCroppedCanvas()
      params.append('photo', file)
      const { data } = await updateUserAvatar(params)
      const { photo } = data
      this.$emit('update-img', photo)
      this.$emit('close-edit')
      this.$toast.success('修改成功')
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.update-avatar__container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #000;
  img {
    display: block;
    max-width: 100%;
  }
  .van-nav-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
  }
}
</style>
