<template>
  <div class="profile_container">
    <van-cell-group v-if="user" class="profile_info">
      <van-cell class="base_info" :border="false" center>
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo"
        />
        <div class="name" slot="title">{{ currentUser.name }}</div>
        <van-button class="update-btn" size="small" round>编辑资料</van-button>
      </van-cell>
      <van-grid class="data_info" :border="false">
        <van-grid-item class="data_info_item">
          <div class="text_wrap" slot="text">
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data_info_item">
          <div class="text_wrap" slot="text">
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data_info_item">
          <div class="text_wrap" slot="text">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data_info_item">
          <div class="text_wrap" slot="text">
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="not_login" @click="$router.push('/login')">
      <img class="mobile" src="~@/assets/imgs/mobile.png" alt="mobile" />
      <div class="text">登录 / 注册</div>
    </div>
    <van-grid class="nav_grid mb_4" :column-num="2">
      <van-grid-item
        class="nav_grid_item"
        icon-prefix="icon"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="nav_grid_item"
        icon-prefix="icon"
        icon="lishi"
        text="历史"
      />
    </van-grid>
    <van-cell title="消息通知" is-link to />
    <van-cell title="小智同学" class="mb_4" is-link to />
    <van-cell
      v-if="user"
      title="退出登录"
      class="logout_cell"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserSelf } from '@/api/user'

export default {
  name: 'ProfileIndex',
  data () {
    return {
      currentUser: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      const { data } = await getUserSelf()
      this.currentUser = { ...data }
    },
    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗?'
      }).then(() => {
        this.$store.commit('setUser', null)
      }).catch(() => {

      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.profile_container {
  .profile_info {
    background: url('~@/assets/imgs/banner.png') no-repeat;
    background-size: cover;
    .base_info {
      height: 115px;
      box-sizing: border-box;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        margin-right: 11px;
        border: 1px solid #fff;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666;
      }
    }
    .data_info {
      .data_info_item {
        height: 65px;
        color: #fff;
        .text_wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/.van-grid-item__content {
      background-color: unset;
    }
  }

  .not_login {
    height: 180px;
    background: url('~@/assets/imgs/banner.png') no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      margin-top: 5px;
      font-size: 14px;
      color: #fff;
    }
  }

  /deep/ .nav_grid {
    .nav_grid_item {
      height: 70px;
      .icon {
        font-size: 22px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }

  .logout_cell {
    text-align: center;
    color: #d86262;
  }
  .mb_4 {
    margin-bottom: 4px;
  }
}
</style>