<template>
  <div class="grid-item flexCols">
    <div class="">
      <slot name="icon"></slot>
    </div>
    <div class="details">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.flexCols {
  display: flex;
  flex-direction: row;
}

.grid-item {
  padding: 20px; /* Optional: For padding around the content */
}

.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  margin-top: 10px;
  margin-left: 20px;
  flex: 1;
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }


  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
