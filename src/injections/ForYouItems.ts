import { webpack } from "replugged";
import { PluginInjector, SettingValues } from "../index";
import Modules from "../lib/requiredModules";
import { defaultSettings } from "../lib/consts";

export default (): void => {
  const { ForYouItems } = Modules;
  const loader = webpack.getFunctionKeyBySource(ForYouItems, "for-you");
  PluginInjector.before(ForYouItems, loader, (args) => {
    const ids = SettingValues.get("ids", defaultSettings.ids);
    args[0].items = args[0].items.filter(
      (i) => !ids.some(({ userId }) => userId === i?.other_user?.id),
    );
    return args;
  });
};
