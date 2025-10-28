import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import zh from "./locales/zh.json";

// Get the first available locale from the device
const locales = Localization.getLocales();
const languageTag = locales[0]?.languageTag?.startsWith("zh") ? "zh" : "en";

i18n.use(initReactI18next).init({
    lng: languageTag,
    fallbackLng: "en",
    resources: {
        en: { translation: en },
        zh: { translation: zh },
    },
    interpolation: { escapeValue: false },
});

export default i18n;

