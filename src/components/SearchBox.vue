<template>
  <div class="search">
    <form action="" class="inp" @submit.prevent.stop="$emit('searchresult',keywords)">
      <i></i>
      <div>
        <input
          type="text"
          autofocus="autofocus"
          @click.prevent.stop="$emit('search')"
          @input="$emit('inputing', keywords)"
          placeholder="搜索歌曲、歌手、专辑"
          v-model="keywords"
          ref="inputName"
        />
      </div>
      <i @click.stop="empty"></i>
    </form>
  </div>
</template>
<script>
export default {
  props: ["keyword","flag"],
  data() {
    return {
      keywords: "",
    };
  },
  watch: {
    keyword(newvalue) {
      this.keywords = newvalue;
    },
  },
  methods: {
    empty(){
      console.log(23333);
      this.keywords="";
      this.$emit('inputing',this.keywords)
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.flag) {
        this.$refs.inputName.focus()
      }
      
    })
  }
};
</script>

<style lang="less" scoped>
.search {
  .inp {
    position: relative;
    width: 100%;
    height: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    background: #f7f7f7;
    border-radius: 30px;
    & > :nth-child(1) {
      display: inline-block;
      width: 13px;
      height: 13px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
      background-position: 0 0;
      background-size: contain;
      background-repeat: no-repeat;
      position: absolute;
      left: 0;
      top: 9px;
      margin: 0 8px;
      vertical-align: middle;
    }
    & > :nth-child(3) {
      display: inline-block;
      width: 16px;
      height: 16px;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAMAAABGS8AGAAAAkFBMVEUAAAD////////////////n5+fo6Ojp6enm5ubn5+fo6Ojp6enp6enm5ubn5+fm5ubo6Ojn5+fm5ubn5+fn5+fn5+fn5+fn5+fn5+fm5ubm5ubm5ubn5+fn5+fn5+fn5+fm5ubm5ubm5ubm5ubm5ubn5+fm5ubn5+fp6enr6+vt7e34+Pj7+/v9/f3+/v7///8/U3W8AAAAJnRSTlMAAgMFBiAhIykrLFBRXF5mbXd8gImTlJ6pr8LFytLd3+Ts7u/5+5EBoAYAAAJ4SURBVFjDtZnZcqpAEIbHxKMoEiBoCCggLh2N4rz/24V4TFxCz97/bRdfUTPTO2NS9Tw/TvOiqjebuiryNPa9HrPWKMpW8EerLBrZUIdJCajKZGhGfQrmINE8eNLG9sMSFFSGfT3uyxIUtXzRwI5z0FA+VsQ+T7egpe30WYU7WIC2Fv/k3MkaDLSeyLivYKhXsffOwFgzgZ/338FC7+iT7llxWzL2zzOw1MzxvUlucAIO1PHqBmsX4PXgjx8vwIkWj949BUeaPsSzrSvw9j7W5eBM+V1cB4e6ifz9pUvw8uraIThV+JuPS7fg8id3B+BYwQWM1w8fos9x4/xS72D2zyM/HXbdtt3hxI+f2Jf/a6QE4/JvNfsu2745GzFycgZjV3fkKPnC5Ufs+s7ejB0h5xj5h8s5ds7ffh1hB3XCyFfuCfs2asEZZjzwbvKVyw/Yt1mbQVeYcdd0km+4zQ77dtVjHv5Q913kfcPxw7/KYz5okRW54LMYdMiqXIhZChpkZS6kstxxh1LntnmkAHWyOhcKVoE6WZ0LFatBnyznQs02oE1W4MJGBfxAVuG24Bo0yUrc9igqGnAlfW6GR1GoFFcml5dLXNr4uaXiIGTuILEwbFq4tC8K9DZByBOkJpuw2aYmPJnaBPpMlP5tUlMkKFiskulIVGJZpP9SWBRaFCyJsIy1KLGGosLboiici1sF8zI2EDc3xoX3b3ODtWOmrUIobyCNmpubBpKs5aVr0unGCmSDELrRDdmwiW48RjfQY+yNaARJNzQlG/PSDabpRumEw3/DdcVAac1EtGChWwkRLrEI1250i0LC1eblHrFl7JhZy2x9/AVTl5zIy7+EzAAAAABJRU5ErkJggg==);
      background-position: 0 0;
      background-size: contain;
      background-repeat: no-repeat;
      position: absolute;
      right: 0;
      top: 6px;
      margin: 0 8px;
      vertical-align: middle;
    }
    input {
      width: 100%;
      height: 30px;
      border: none;
      outline: none;
      background-color: transparent;
    }
  }
}
</style>