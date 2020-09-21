<template>
  <div class="channel-edit">
    <van-cell
      center
      :border="false"
    >
      <div
        slot="title"
        class="channel-title"
      >我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
      >{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in channelList"
        :icon="(isEdit && index !== 0) ? 'clear' : ''"
        :key="channel.id"
        :text="channel.name"
        :class="{active: index === activeChannelIndex}"
        @click="onUserChannelClick(index, channel)"
      />
    </van-grid>
    <van-cell
      center
      :border="false"
    >
      <div
        slot="title"
        class="channel-title"
      >频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="channel in recommendChannelList"
        :key="channel.id"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>
<script>
import { getAllChannelList, updateUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
import { USER_CHANNELS } from '@/utils/constants'

export default {
  name: 'ChannelEdit',
  props: {
    channelList: {
      type: Array,
      required: true
    },
    activeChannelIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      allChannelList: [],
      isEdit: false
    }
  },
  created () {
    this.getAllChannelList()
  },
  computed: {
    ...mapState(['user']),
    recommendChannelList () {
      const list = this.channelList
      return this.allChannelList.filter(channel => !list.find(userChannel => userChannel.id === channel.id))
    }
  },
  methods: {
    async getAllChannelList () {
      const { data } = await getAllChannelList()
      this.allChannelList = [...data.channels]
    },
    async onAdd (channel) {
      this.channelList.push(channel)
      if (this.user) {
        let params = [
          { id: channel.id, seq: this.channelList.length }
        ]
        await updateUserChannel(params)
      } else {
        setItem(USER_CHANNELS, this.channelList)
      }
    },
    onUserChannelClick (index, channel) {
      if (this.isEdit && index !== 0) {
        this.deleteChannel(index, channel)
      } else if (!this.isEdit) {
        this.switchChannel(index)
      }
    },
    async deleteChannel (index, channel) {
      if (index <= this.activeChannelIndex) {
        this.$emit('updateActiveChannel', this.activeChannelIndex - 1)
      }
      this.channelList.splice(index, 1)
      if (this.user) {
        let params = {
          id: channel.id
        }
        await deleteUserChannel(params)
      } else {
        setItem(USER_CHANNELS, this.channelList)
      }
    },
    switchChannel (index) {
      this.$emit('close')
      this.$emit('updateActiveChannel', index)
    }
  }
}
</script>
<style lang="less" scoped>
.channel-edit {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  .van-button {
    padding: 5px 10px;
    font-size: 14px;
  }
  .van-grid-item {
    width: 80px;
    height: 43px;
    /deep/.van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
      }
      .van-icon.van-icon-clear {
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(40%, -40%);
        font-size: 18px;
        color: red;
      }
      .van-grid-item__icon + .van-grid-item__text {
        margin-top: unset;
      }
    }
  }
  .van-grid-item.active {
    /deep/ .van-grid-item__text {
      color: red;
    }
  }
}
</style>