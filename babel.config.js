const aliases = require("./babel.config.aliases");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module-resolver", { root: ["./"], alias: aliases }],
      "react-native-reanimated/plugin",
    ],
  };
};
