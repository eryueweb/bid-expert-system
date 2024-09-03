<template>
  <router-view></router-view>
</template>
<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
html, body {
  height: 100%;
}
#app {
  height: 100%;
}
/* 滚动条整体部分 */
::-webkit-scrollbar {
  width: 6px;
  height: 8px;
  /* background-color: #ebeef500; */
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  /* box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3); */
  background-color: rgba(144, 147, 153, 0.3);
  border-radius: 3px;
  cursor: pointer;
}
/* 滚动条的轨道 */
::-webkit-scrollbar-track{
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  border-radius: 3px;
  background: rgba(255, 255, 255, 0);
}
</style>