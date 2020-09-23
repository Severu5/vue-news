<template>
  <div class="layout-container">
    <keep-alive>
      <router-view />
    </keep-alive>

    <van-tabbar
      v-model="active"
      route
    >
      <van-tabbar-item
        to="/"
        icon="home-o"
      >首页</van-tabbar-item>
      <van-tabbar-item
        to="/qa"
        icon="comment-o"
      >问答</van-tabbar-item>
      <van-tabbar-item
        to="/video"
        icon="video-o"
      >视频</van-tabbar-item>
      <van-tabbar-item
        to="/profile"
        icon="user-o"
      >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  },
  mounted () {
    this.$store.commit('addCachePage', 'LayoutIndex')
  }
}
</script>
