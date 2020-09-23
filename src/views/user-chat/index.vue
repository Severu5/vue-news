<template>
  <div class='user-chat__container'>
    <van-nav-bar
      class="app-nav-bar"
      title="小爱同学"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group class="message-list-wrap">
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
      <van-cell title="?" />
    </van-cell-group>

    <van-cell-group class="chat-footer">
      <van-field
        v-model="message"
        placeholder="请输入"
        :border="false"
      />
      <van-button
        type="primary"
        size="small"
      >发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'user-chat-index',
  data () {
    return {
      message: '',
      socket: null
    }
  },
  created () {
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket
    // 收发消息
    // socket.emit('message', '消息')
    socket.on('message', data => {
      data.photo = 'http://toutiao.meiduo.site/FqHn7ps9v5I8esWXJNKH0asrSwcB'
      this.messages.push(data)
    })
  },
  methods: {},
  components: {}
}
</script>

<style lang="less" scoped>
.user-chat__container {
  .message-list-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
  }
  .chat-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 0 14px;
    .van-button {
      width: 70px;
    }
  }
}
</style>
