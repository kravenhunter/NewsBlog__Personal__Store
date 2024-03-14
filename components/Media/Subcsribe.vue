<template>
  <div class="subscribe">
    <div class="description">
      <h2>Subscribe to our newspaper</h2>
      <p>
        To be updated with all the latest news, offers and special announcements.You can subscribe
        to our new
      </p>
    </div>
    <div class="form">
      <input class="form_input" type="text" placeholder="Your email" />
      <button class="form_btn">Subscribe</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/sizeMixin.scss";
.subscribe {
  background-color: var(--color-grey);

  padding: 20px 45px;
  display: grid;
  row-gap: 30px;
  width: 500px;
  height: 230px;
  & .description {
    display: grid;
    row-gap: 20px;
    justify-content: center;
    & p {
      @include adaptive("font-size", 16, 15, 0);
      font-family: var(--font-italic);
    }
  }
}
.subscribe h2 {
  color: var(--color-violet);
}

.form .form_input {
  background: var(--color-light);
  border: 0px;
  display: flex;
  width: 259px;
}

.subscribe .form {
  display: flex;
  height: 50px;
}
.form .form_btn {
  background-color: var(--color-violet);
  font-size: var(--size-16);
  display: flex;
  padding: 13px 34px 11px 36px;
  justify-content: center;
  align-items: center;
}
</style>
