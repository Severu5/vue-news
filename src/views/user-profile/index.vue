<template>
  <div class='userProfileIndex__container'>
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input
      hidden
      type="file"
      accept="image/*"
      ref="file"
      @change="onFileChange"
    >
    <van-cell
      title="头像"
      is-link
      center
      @click="$refs.file.click()"
    >
      <van-image
        round
        width="30"
        height="30"
        fit="cover"
        :src="user.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isEditNameShow = true"
    />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isEditGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isEditBirthShow = true"
    />
    <!-- 修改昵称 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updateName
        v-if="isEditNameShow"
        v-model="user.name"
        @close-edit="isEditNameShow = false"
      />
    </van-popup>
    <!-- 修改性别 -->
    <van-popup
      v-model="isEditGenderShow"
      position="bottom"
    >
      <updateGender
        v-if="isEditGenderShow"
        v-model="user.gender"
        @close-edit="isEditGenderShow = false"
      />
    </van-popup>
    <!-- 修改生日 -->
    <van-popup
      v-model="isEditBirthShow"
      position="bottom"
    >
      <updateBirth
        v-if="isEditBirthShow"
        v-model="user.birthday"
        @close-edit="isEditBirthShow = false"
      />
    </van-popup>
    <!-- 修改头像 -->
    <van-popup
      v-model="isEditPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updateAvatar
        v-if="isEditPhotoShow"
        :file="previewImage"
        @update-img="user.photo = $event"
        @close-edit="isEditPhotoShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name'
import updateGender from './components/update-gender'
import updateBirth from './components/update-birth'
import updateAvatar from './components/update-avatar'
export default {
  name: 'userProfileIndex',
  data () {
    return {
      user: {},
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBirthShow: false,
      isEditPhotoShow: false,
      previewImage: null
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      const { data } = await getUserProfile()
      this.user = { ...data }
    },
    onFileChange () {
      this.isEditPhotoShow = true
      this.previewImage = this.$refs.file.files[0]
      this.$refs.file.value = ''
    }
  },
  components: {
    updateName,
    updateGender,
    updateBirth,
    updateAvatar
  }
}
</script>

<style lang="less" scoped>
.userProfileIndex__container {
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
