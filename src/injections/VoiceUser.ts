import { webpack } from "replugged";
import { PluginInjector, SettingValues } from "../index";
import Modules from "../lib/requiredModules";
import { defaultSettings } from "../lib/consts";

export default (): void => {
  const { VoiceUser } = Modules;
  const loader = webpack.getFunctionKeyBySource(VoiceUser, ".listDefault");
  PluginInjector.before(VoiceUser, loader, (args) => {
    const ids = SettingValues.get("ids", defaultSettings.ids);
    if (!Array.isArray(args?.[0]?.children)) return args;
    args[0].children = args?.[0]?.children.map((c) => {
      if (!Array.isArray(c)) return c;
      return c.filter((ic) => !ids.some(({ userId }) => userId === ic.key));
    });
    return args;
  });
};
