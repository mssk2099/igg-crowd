<template>

  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <div class="user-layout-lang">
        <select-lang class="select-lang-trigger" />
      </div>
      <div class="user-layout-content">
        <div class="top">
          <div class="header">
            <a href="/">
              <img src="~@/assets/icons/logo.svg" class="logo" alt="logo">
              <span class="title">Ant Design</span>
            </a>
          </div>
          <div class="desc">
            {{ $t('layouts.userLayout.title') }}
          </div>
        </div>

        <router-view />

        <div class="footer">
          <div class="links">
            <a href="_self">帮助</a>
            <a href="_self">隐私</a>
            <a href="_self">条款</a>
          </div>
          <div class="copyright">
            Copyright &copy; 2018 vueComponent
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deviceMixin } from '@/store/device-mixin'
import SelectLang from '@/components/SelectLang'

export default {
  name: 'UserLayout',
  components: {
    SelectLang
  },
  mixins: [deviceMixin],
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        width: 98%;
        max-width: 368px;
      }
    }
  }

  .container {
    //padding: 50px 0 84px;
    position: relative;
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/icons/background.svg) no-repeat 50%;
    background-size: 100%;

    .user-layout-lang {
      width: 100%;
      height: 40px;
      line-height: 44px;
      text-align: right;

      .select-lang-trigger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 24px;
        padding: 12px;
        font-size: 18px;
        vertical-align: middle;
        cursor: pointer;
      }
    }

    .user-layout-content {
      padding: 32px 0 24px;

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            margin-top: -10px;
            margin-left: -12px;
            line-height: 1;
            vertical-align: middle;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            margin-right: 16px;
            vertical-align: top;
            border-style: none;
          }

          .title {
            position: relative;
            top: 2px;
            color: rgba(0, 0, 0, 0.85);
            font-weight: 600;
            font-size: 33px;
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          }
        }

        .desc {
          margin-top: 12px;
          margin-bottom: 40px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }

      .main {
        width: 368px;
        min-width: 260px;
        margin: 0 auto;
      }

      .footer {
        bottom: 0;
        // position: absolute;
        width: 100%;
        margin: 48px 0 24px;
        padding: 0 16px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;

          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;

            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }

        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }

    a {
      text-decoration: none;
    }
  }
}
</style>
