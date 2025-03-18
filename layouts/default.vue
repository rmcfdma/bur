<template>
    <section class="grid grid-template gap">
        <div class="item logo"><layoutTopLogo/></div>
        <div class="item banner"><layoutTopBanner /></div>
        <div class="item nav"><layoutTopMenu /></div>
        <div class="item user"><layoutUserName /></div>
        <!-- <div class="spacer"></div> -->
        <div class="item content"><slot></slot></div>
        <div class="item sidenav"><layoutLeftSidebar /></div>
        <div class="item advert"><layoutRigthSidebar /></div>
        <div class="item footer"><layoutRodape /></div>
    </section>
</template>