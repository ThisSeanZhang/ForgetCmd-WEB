<template>
  <el-card class="box-card" shadow="hover">
    <!-- <div>
      <el-tag @click="isOpen = !isOpen"
        :type="item.action === 0 ? 'success' : (item.action === 1 ? 'info' : 'danger')"
      >{{item.key}}</el-tag>
      <span></span>
    </div> -->
    <!-- 动作为创建 -->
    <div v-if="item.action === 0" >
      <div @click="isOpen = !isOpen" class="panel-head">
        <div v-if="item.type ==='options'" class="head-title">
          <el-row class="row-aligned" v-if="valueIsObj" :gutter="20">
            <el-col :span="6">
              <el-tag type="success" >{{splitExhibitKey}}</el-tag>
            </el-col>
            <el-col :span="2">
              <span style="margin: 0px 10px;" >{{item.value.briefName}}</span>
            </el-col>
            <el-col :span="16">
              <span style="margin: 0px 10px;" >{{item.value.description}}</span>
            </el-col>
          </el-row>
          <el-row class="row-aligned" v-else :gutter="20">
            <el-col :span="8">
              <el-tag type="success" >{{splitExhibitKey}}</el-tag>
            </el-col>
            <el-col :span="16"><span >{{item.value}}</span></el-col>
          </el-row>
        </div>
        <div v-if="item.type ==='params'" class="head-title">
          <el-row class="row-aligned" v-if="valueIsObj" :gutter="20">
            <el-col :span="8">
              <el-tag type="success" >{{splitExhibitKey}}</el-tag>
            </el-col>
            <el-col :span="16">
              <span style="margin: 0px 10px;" >{{item.value.description}}</span>
            </el-col>
          </el-row>
          <el-row class="row-aligned" v-else :gutter="20">
            <el-col :span="8">
              <el-tag type="success" >{{splitExhibitKey}}</el-tag>
            </el-col>
            <el-col :span="16"><span >{{item.value}}</span></el-col>
          </el-row>
        </div>
        <span class="head-arrow">
          <i v-if="valueIsObj" :class="isOpen ? 'el-icon-arrow-down' : 'el-icon-arrow-left'"></i>
        </span>
      </div>
      <div v-if="isObj(item.value)">
        <el-collapse-transition >
          <div v-if="item.type === 'options'" class="transition-box" v-show="isOpen" >
            <div class="item" v-for="(value, key) in item.value.description" :key="key">
              {{key}}: {{value}}
            </div>
            <div class="item">类型：{{getype(item.value.type)}}</div>
            <div class="item" v-if="isEnum">
              ENUM 备选值：
              <el-tag style="margin: 0 5px;"
                v-for="item in item.value.rules" :key="item" effect="plain">
                {{ item }}
              </el-tag>
            </div>
            <!-- {{item.value}} -->
          </div>
          <div v-if="item.type === 'params'" class="transition-box" v-show="isOpen">
            <div class="item" v-for="(value, key) in item.value.description" :key="key">
              {{key}}: {{value}}
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
    <!-- 动作为修改 -->
    <div v-else-if="item.action === 1" class="value">
      <div class="head-title">
        <el-row class="row-aligned" :gutter="20">
          <el-col :span="8">
            <el-tag type='info'>{{splitExhibitKey}}:</el-tag>
          </el-col>
          <el-col :span="8">
            <span>{{item.oValue}}</span>
          </el-col>
          <el-col :span="1">=></el-col>
          <el-col :span="7">
            <span>{{item.value}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 动作为删除 -->
    <div v-else-if="item.action === 2" class="value">
      <div @click="isOpen = !isOpen" class="panel-head">
        <div v-if="item.type === 'options'" class="head-title">
          <el-row class="row-aligned" v-if="valueIsObj" :gutter="20">
            <el-col :span="6">
              <el-tag type="danger" >{{splitExhibitKey}}</el-tag>
            </el-col>
            <el-col :span="2">
              <span style="margin: 0px 10px;" >{{item.oValue.briefName}}</span>
            </el-col>
            <el-col :span="16">
              <span style="margin: 0px 10px;" >{{item.oValue.description}}</span>
            </el-col>
          </el-row>
          <el-row class="row-aligned" v-else :gutter="20">
            <el-col :span="8">
              <el-tag type="danger" >{{splitExhibitKey}}</el-tag>
            </el-col>
            <el-col :span="16"><span >{{item.oValue}}</span></el-col>
          </el-row>
        </div>
        <div v-else-if="item.type === 'params'" class="head-title">
          <el-row class="row-aligned" v-if="valueIsObj" :gutter="20">
            <el-col :span="6">
              <el-tag type="danger" >{{splitExhibitKey}}</el-tag>
            </el-col>
            <el-col :span="2">
              <span style="margin: 0px 10px;" >{{item.oValue.briefName}}</span>
            </el-col>
            <el-col :span="16">
              <span style="margin: 0px 10px;" >{{item.oValue.description}}</span>
            </el-col>
          </el-row>
          <el-row class="row-aligned" v-else :gutter="20">
            <el-col :span="8">
              <el-tag type="danger" >{{splitExhibitKey}}</el-tag>
            </el-col>
            <el-col :span="16"><span >{{item.oValue}}</span></el-col>
          </el-row>
        </div>
        <span class="head-arrow">
          <i v-if="valueIsObj" :class="isOpen ? 'el-icon-arrow-down' : 'el-icon-arrow-left'"></i>
        </span>
      </div>
      <div v-if="isObj(item.oValue)">
        <el-collapse-transition>
          <div v-if="item.type === 'options'" class="transition-box" v-show="isOpen">
            <div class="item" v-for="(oValue, key) in item.oValue.description" :key="key">
              {{key}}: {{oValue}}
            </div>
            <div class="item">类型：{{getype(item.oValue.type)}}</div>
            <div class="item" v-if="isEnum">
              ENUM 备选值：
              <el-tag style="margin: 0 5px;"
                v-for="item in item.oValue.rules" :key="item" effect="plain">
                {{ item }}
              </el-tag>
            </div>
            <!-- {{item.oValue}} -->
          </div>
          <div v-if="item.type === 'params'" class="transition-box" v-show="isOpen">
            <div class="item" v-for="(oValue, key) in item.oValue.description" :key="key">
              {{key}}: {{oValue}}
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </el-card>
</template>
<script>
import CommitItem from '../../entities/CommitItem';
import CommandOption from '../../entities/CommandOption';

export default {
  name: 'item-exhibit',
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    item: {
      type: CommitItem,
      default: () => new CommitItem({}),
    },
  },
  computed: {
    isEnum() {
      return CommandOption.TYPE.ENUM === (
        this.item.action === 2 ? this.item.oValue.type : this.item.value.type);
    },
    cardClass() {
      return 'box-card delete';
    },
    valueIsObj() {
      if (this.item.action === 1) return false;
      if (this.item.type === 'base') return false;
      if (String(this.item.key).includes('.')) return false;
      return true;
    },
    splitExhibitKey() {
      if (this.item.type === 'base') return this.item.key;
      const keys = String(this.item.key).split('.');
      if (keys.length >= 2) {
        // TODO need lang map translate
        let mainKey = keys.shift();
        if (this.item.type === 'params') mainKey = `参数${mainKey} : `;
        return `${mainKey} ${keys.join('.')}`;
      }
      if (this.item.type === 'params') return `参数${this.item.key + 1}: `;
      return this.item.key;
    },
  },
  methods: {
    isObj(value) {
      const type = Object.prototype.toString.call(value);
      if (type === '[object String]') {
        try {
          const obj = JSON.parse(value);
          return Object.prototype.toString.call(obj) === '[object Object]';
        } catch {
          return false;
        }
      }
      return type === '[object Object]';
    },
    getype(type) {
      return Object.keys(CommandOption.TYPE).filter(key => CommandOption.TYPE[key] === type)[0] || 'UNKNOW';
      // return CommandOption.TYPE.filter((_, value) => type === value).map(key => key);
    },
  },
  created() {
  },
};
</script>
<style lang="scss" scoped>
.box-card{
  margin: 5px;
}
.value{
  display: inline;
}
.base-block{
  background-color: #5e7c86;
}
.option-block{
  background-color: #429aa0;
}
.param-block{
  background-color: #7cb458;
}
.transition-box {
  // height: 100px;
  // border-radius: 4px;
  // box-sizing: border-box;
  // margin-right: 20px;
  .item {
    padding: 5px 0px;
  }
}
// .modify{
  //
  // background-color: #f0f9eb;
  // background-color: #f0f9eb;
// }
.create {
//  background-color: #f4f4f5;
  background-color: #d9f6c9;;
}
.delete {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}

// 以下是确定需要的
.panel-head{
  display: flex;
}
.head-title{
  flex: 1;
}
.head-arrow{
  padding: 5px 0px;
}
.row-aligned{
  display: flex;
  align-items: center;
}
</style>
