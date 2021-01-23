<template>
  <svg
    class="change-view"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    style="enable-background:new 0 0 512 512;"
    xml:space="preserve"
    :class="{ 'change-view_active' : activeComponent === 'PostGrid' }"
  >

                    <path
                      d="M208,0H16C7.163,0,0,7.163,0,16v192c0,8.837,7.163,16,16,16h192c8.837,0,16-7.163,16-16V16C224,7.163,216.837,0,208,0z
                         M192,192H32V32h160V192z"
                    />
    <path
      d="M496,0H304c-8.837,0-16,7.163-16,16v192c0,8.837,7.163,16,16,16h192c8.837,0,16-7.163,16-16V16
                        C512,7.163,504.837,0,496,0z M480,192H320V32h160V192z"
    />
    <path
      d="M208,288H16c-8.837,0-16,7.163-16,16v192c0,8.837,7.163,16,16,16h192c8.837,0,16-7.163,16-16V304
                        C224,295.163,216.837,288,208,288z M192,480H32V320h160V480z"
    />
    <path
      d="M496,288H304c-8.837,0-16,7.163-16,16v192c0,8.837,7.163,16,16,16h192c8.837,0,16-7.163,16-16V304
                        C512,295.163,504.837,288,496,288z M480,480H320V320h160V480z"
    />

                </svg>
</template>

<script>
    export default {
        name: "svgGrid",
        props: {
            activeComponent: {
                type: String
            }
        }
    }
</script>

<style scoped>

</style>
