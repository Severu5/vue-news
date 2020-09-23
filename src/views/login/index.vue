<template>
  <div class="login_container">
    <van-nav-bar
      class="app-nav-bar"
      title="注册/登录"
      left-arrow
      @click-left="$router.push($route.query.redirect || '/')"
    />

    <van-form
      @submit="onLogin"
      @failed="onFailed"
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
    >
      <van-field
        center
        v-model="user.mobile"
        name="mobile"
        icon-prefix="icon"
        left-icon="shouji"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
      />
      <van-field
        center
        v-model="user.code"
        name="code"
        clearable
        icon-prefix="icon"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send_btn"
            size="mini"
            round
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login_btn__wrap">
        <van-button
          class="login_btn"
          type="info"
          block
        >登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13912345678',
        code: '246810'
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        duration: 0,
        message: '登陆中',
        forbidClick: true
      })
      const params = { ...this.user }
      try {
        const { data } = await login(params)
        this.$toast.success('登陆成功')
        this.$store.commit('removeCachePage', 'LayoutIndex')
        this.$store.commit('setUser', data)
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        this.$toast.fail('登陆失败, 手机号或验证码错误')
      }
    },
    onFailed ({ errors }) {
      const { message } = errors[0]
      this.$toast({ message, position: 'top' })
    },
    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        let params = {
          mobile: this.user.mobile
        }
        this.isSendSmsLoading = true
        await sendSms(params)
        this.isCountDownShow = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发送频繁，请稍后再试！'
        } else if (err.name === 'mobile') {
          message = err.message
        }
        this.$toast({ message, position: 'top' })
      }
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  .send_btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    border: none;
    .van-button__text {
      font-size: 11px;
      color: #666;
    }
  }
  .login_btn__wrap {
    padding: 26px 16px;
    .login_btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
