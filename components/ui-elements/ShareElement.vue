<template>
  <div class="share_block">
    <div class="share_contaoner">
      <div class="share">
        <UiElementsAddIcon icon-name="material-symbols:share" size-width="20" size-heigth="20" />
        <span>Share</span>
      </div>
      <span class="arrow"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.share_block {
  display: grid;
  justify-content: center;
  align-content: start;
}
.share_block .share_contaoner {
  height: 40px;
  width: 105px;
  position: relative;
}
.share_contaoner .share,
.arrow {
  position: absolute;
  box-shadow: 2px 3px 12px rgb(203, 198, 198);
}

.share_contaoner .arrow {
  z-index: -10;
  // background-color: brown;
  height: 30px;
  width: 30px;
  right: -10px;
  top: 6px;
  rotate: calc(45deg);
}
.share_contaoner .share {
  padding: 10px;
  display: flex;
  column-gap: 20px;
  background-color: var(--color-light);
  z-index: 20;
}
</style>
