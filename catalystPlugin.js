const {
  withEntitlementsPlist,
  withXcodeProject,
  IOSConfig,
} = require("expo/config-plugins");

// We modify Expo's Continuous Native Generation for a few custom native features:
// * a custom URL scheme for attachments which should be resolved through the on-disk database
// * enabling macOS Catalyst builds

module.exports = function withOrbitExpoConfigPlugin(config, {developmentTeamID}) {
  config = withXcodeProject(config, async (config) => {
    const xcodeProject = config.modResults;
    // Enable Catalyst builds:
    xcodeProject.addToBuildSettings(
      "DEVELOPMENT_TEAM",
      developmentTeamID,
    );
    xcodeProject.addToBuildSettings("SUPPORTS_MACCATALYST", "YES");
    xcodeProject.addToBuildSettings(
      "SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD",
      "NO",
    );
    xcodeProject.addToBuildSettings("TARGETED_DEVICE_FAMILY", `"1,2,6"`);

    return config;
  });

  // Extra entitlements for Catalyst
  config = withEntitlementsPlist(config, async (config) => {
    config.modResults["com.apple.security.app-sandbox"] = true;
    config.modResults["com.apple.security.network.client"] = true;
    return config;
  });

  return config;
};
