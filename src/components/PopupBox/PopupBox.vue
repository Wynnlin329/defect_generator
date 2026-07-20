<script lang="ts" setup></script>

<template>
  <div class="dropdown">
    <img class="icon item" src="./popupbox_icon.png" />
    <button
      class="btn dropdown-toggle item"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    />
    <div class="dropdown-menu">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  width: 40px;
  height: 40px;
  position: relative;
}

.dropdown-toggle {
  opacity: 0;
  pointer-events: auto;
}

.item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.dropdown-menu {
  padding: 10px;
  background: #020202;
  opacity: 0;
  transform: scale(0.9);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.dropdown-menu.show {
  opacity: 1;
  transform: scale(1);
}

.icon {
  width: 80%;
  height: 80%;
}
</style>

<style scoped>
.dropdown-menu > button {
  width: 100%;
  text-align: left;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 0px;
  background: #020202;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
}

.dropdown-menu > :hover {
  border-radius: none;
  background: #0152ec;
  color: white;
}
</style>
