<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from './bus'
export default {
  name: 'Sidebar',
  data () {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-s-home',
          index: 'index',
          title: '首页'
        },
        {
          icon: 'el-icon-menu',
          index: '2',
          title: '菜单管理',
          subs: [
            {
              index: 'addMenu',
              title: '添加菜单'
            },
            {
              index: 'listMenu',
              title: '' +
                '菜单列表'
            }
          ]
        },
        {
          icon: 'el-icon-s-tools',
          index: 'spec',
          title: '规格管理',
          subs: [
            {
              index: 'addSpec',
              title: '添加规格'
            },
            {
              index: 'listSpec',
              title: '规格列表'
            }
          ]
        },
        {
          icon: 'el-icon-s-cooperation',
          index: 'SPU',
          title: 'SPU管理',
          subs: [
            {
              index: 'addSpu',
              title: '添加SPU'
            },
            {
              index: 'listSpu',
              title: 'SPU列表'
            }
          ]
        },
        {
          icon: 'el-icon-s-flag',
          index: 'SKU',
          title: 'SKU管理',
          subs: [
            {
              index: 'addSku',
              title: '添加SKU'
            },
            {
              index: 'listSku',
              title: 'SKU列表'
            }
          ]
        },
        {
          icon: 'el-icon-menu',
          index: 'order',
          title: '订单管理',
          subs: [
            {
              index: 'sendOrder',
              title: '等待发货'
            },
            {
              index: 'successOrder',
              title: '已经签收'
            },
            {
              index: 'ingOrder',
              title: '运送中'
            }
          ]
        },
        {
          icon: 'el-icon-picture',
          index: 'Banner',
          title: 'Banner管理',
          subs: [
            {
              index: 'addBanner',
              title: '添加Banner'
            },
            {
              index: 'listBanner',
              title: 'banner列表'
            }
          ]
        },
        {
          icon: 'el-icon-menu',
          index: 'BodyBanner',
          title: '六宫格管理',
          subs: [
            {
              index: 'addBodyBanner',
              title: '添加六宫格'
            },
            {
              index: 'listBodyBanner',
              title: '六宫格列表'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
      bus.$emit('collapse-content', msg)
    })
  }
}
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
