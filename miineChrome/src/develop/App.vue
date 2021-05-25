<template>
  <div id="app" class="app">
    <el-card class="box-card">
      <el-tabs v-model="activeName" tab-position="left">
        <el-tab-pane
          v-for="(group, groupIndex) in developJSON"
          :key="groupIndex"
          :name="groupIndex.toString()"
          :label="group.title"
        >
          <section class="develop__classify">
            <h3 :id="group.title" class="group__title">
              {{ group.title }}
            </h3>

            <ul class="group__list">
              <li
                v-for="(item, itemId) in group.items"
                :key="itemId"
                class="item"
                :title="item.des"
              >
                <i class="el-icon-circle-close del" @click="del(item)" />
                <a class="item__link" :href="item.url" target="_blank">
                  <span class="item__icon__wrap">
                    <img
                      class="item__icon"
                      :src="item.icon"
                      :alt="item.title"
                    />
                  </span>
                  <h4 class="item__title">{{ item.title }}</h4>
                  <p class="item__desc">{{ item.des }}</p>
                </a>
              </li>
            </ul>
          </section>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ajax from "@fdaciuk/ajax";
import developData from "../config/develop.json";
import { getUrlParam } from "../utils";
import { BASE_URL } from "../config";
export default {
  data() {
    return {
      developJSON: [],
      activeName: "",
      parentList: [],
      childrenList: [],
    };
  },
  beforeCreate() {},
  created() {
    let tabId = getUrlParam("tabIndex");

    if (tabId === "undefined") {
      tabId = "0";
    }

    this.activeName = tabId || "0";
  },
  mounted() {
    this.getNewList();
  },
  methods: {
    getNewList() {
      const host = this;
      var parentList = [];

      console.log(parentList);
      let p1 = new Promise((resolve, reject) => {
        ajax({
          method: "get",
          url: `${BASE_URL}/api/textTable`,
        }).then((response) => {
          resolve(response);
        });
      });

      let p2 = new Promise((resolve, reject) => {
        ajax({
          method: "get",
          url: `${BASE_URL}/api/findcardList`,
        }).then((response) => {
          resolve(response);
        });
      });
      Promise.all([p1, p2])
        .then((result) => {
          console.log(result); //['成功了', 'success']
          this.setList(result[0], result[1]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    gernerateLink(str) {
      return `#${str}`;
    },
    del(item) {
      var host = this;
      ajax({
        method: "post",
        url: `${BASE_URL}/api/del`,
        data: {
          id: item.id,
        },
      }).then((response) => {
        console.log(response);
        if ((response.code = 1)) {
          this.getNewList();
          host.$message({
            showClose: true,
            message: response.message,
            type: "success",
            center: true,
          });
        }
      });
    },
    setList(parentList, childrenList) {
      var mapList = {};
      childrenList.forEach((item) => {
        if (mapList[item.keyname]) {
          mapList[item.keyname].push(item);
        } else {
          mapList[item.keyname] = [item];
        }
      });

      parentList.forEach((it) => {
        it.items = mapList[it.keyname];
      });
      console.log("mapList", mapList);
      console.log(parentList);
      this.developJSON = parentList;
    },
  },
};
</script>

<style>
body {
  overflow: visible;

  height: 100%;
}

.box-card {
  width: 1210px;
  margin: 30px auto;
}

.group__title {
  font-size: 24px;
  font-weight: bold;
  line-height: 50px;

  padding: 0 15px 15px;

  text-align: center;

  border-bottom: 1px solid #ddd;
}

.group__list {
  overflow: hidden;

  width: 1000px;
  margin: 15px auto 0;
}

.item {
  float: left;

  width: 172px;
  margin: 18px;
  padding: 15px 20px;

  cursor: pointer;
  transition: transform 0.2s linear;

  border: 1px solid #e5e5e5;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 2px 0 rgba(170, 170, 170, 0.1);
  position: relative;
}

.item:hover {
  -webkit-transform: translate3d(0, -3px, 0);
  transform: translate3d(0, -3px, 0);

  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
}

.item__icon__wrap {
  display: inline-block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  vertical-align: middle;

  border-radius: 32px;
  background: #eaeaea;
}

.item__icon {
  display: block;

  width: 32px;
  height: 32px;
}

.item__title {
  font-size: 15px;
  font-weight: bolder;
  line-height: 32px;

  display: inline-block;
  overflow: hidden;

  width: 130px;
  margin-left: 3px;

  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: inherit;
}

.item__link {
  display: block;
  overflow: hidden;

  text-decoration: none;

  color: #555;
}

.item__desc {
  font-size: 12px;

  overflow: hidden;

  margin-top: 8px;
  margin-bottom: 4px;
  padding-left: 7px;

  white-space: nowrap;
  text-overflow: ellipsis;

  color: #666;
}
.del {
  position: absolute;
  right: 2px;
  top: 2px;
}
</style>
