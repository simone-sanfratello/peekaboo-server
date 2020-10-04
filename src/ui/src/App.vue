<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app mini-variant>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/cache">
          <v-list-item-action>
            <v-icon>mdi-database</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cache</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/dataset">
          <v-list-item-action>
            <v-icon>mdi-animation</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dataset</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!--
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>@todo Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        -->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <img class="icon ml-2 mr-2" src="@/assets/img/icon.png" />
      <v-toolbar-title>peekaboo-server</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-title class="fix-select">
        <server-mode></server-mode>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-title class="fix-select">
        <server-dataset></server-dataset>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-title>
        <monitor></monitor>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row>
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <!--
    <v-footer color="indigo" app>
        <span class="white--text">@todo link to github repo</span>
    </v-footer>
    -->
  </v-app>
</template>

<script>
import Monitor from "./components/organisms/Monitor";
import ServerMode from "./components/organisms/ServerMode";
import ServerDataset from "./components/organisms/ServerDataset";

export default {
  name: "App",

  components: {
    Monitor,
    ServerMode,
    ServerDataset,
  },

  props: {
    source: String,
  },

  data: () => ({
    drawer: false,
  }),

  created: function () {
    this.$store.dispatch("history/connect");
  },

  mounted: function() {
    window.onscroll = () => {
      const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.$store.dispatch("history/list");
      }
    };    
  }
};
</script>

<style>
.fix-select {
  padding-top: 28px;
}
.icon {
  max-height: 100%;
  width: auto;
}
</style>