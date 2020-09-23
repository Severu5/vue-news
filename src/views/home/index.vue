<template>
  <div class="home_container">
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        round
        size="small"
        to="/search"
      >搜索</van-button>
    </van-nav-bar>
    <van-tabs
      class="channel-tabs"
      v-model="active"
    >
      <van-tab
        v-for="channel in channelList"
        :key="channel.id"
        :title="channel.name"
      >
        <article-list :channel="channel" />
      </van-tab>
      <div
        slot="nav-right"
        class="placeholder"
      ></div>
      <div
        slot="nav-right"
        class="wap-nav-wrap"
        @click="isChannelEditShow = true"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      get-container="body"
      class="channel-edit-popup"
    >
      <channel-edit
        :activeChannelIndex="active"
        :channelList="channelList"
        @close="isChannelEditShow = false"
        @updateActiveChannel="active = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannel } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
import { USER_CHANNELS } from '@/utils/constants'

export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channelList: [],
      isChannelEditShow: false
    }
  },
  created () {
    this.getChannelList()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async getChannelList () {
      if (this.user) {
        const { data } = await getUserChannel()
        this.channelList = [...data.channels]
      } else {
        const localChannels = getItem(USER_CHANNELS)
        if (localChannels) {
          this.channelList = [...localChannels]
        } else {
          const { data } = await getUserChannel()
          this.channelList = [...data.channels]
        }
      }
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  }
}
</script>

<style lang="less" scoped>
.home_container {
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    border: unset;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  .channel-tabs {
    /deep/.van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tabs__line {
      bottom: 20px;
      width: 15px;
      height: 3px;
      background-color: #3296fa;
    }
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    .van-icon {
      font-size: 20px;
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 29px;
      background: url('~@/assets/imgs/border-line.png') no-repeat;
      background-size: contain;
    }
  }
  .placeholder {
    flex-shrink: 0;
    width: 33px;
    height: 43px;
  }
}
.channel-edit-popup {
  height: 100%;
}
</style>
