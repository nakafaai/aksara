import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Jeder Bezirk der Stadt muss Hochwasserstatus erhalten.",
      value: false,
    },
    {
      label: "Bezirk X kann keinen Hochwasserstatus erhalten.",
      value: false,
    },
    {
      label:
        "Die registrierten Einwohnerinnen und Einwohner von Bezirk X erhalten eine Evakuierungsanordnung.",
      value: true,
    },
    {
      label: "Alle Menschen in der Stadt müssen die Stadt sofort verlassen.",
      value: false,
    },
    {
      label:
        "Ob die registrierten Einwohnerinnen und Einwohner von Bezirk X eine Evakuierungsanordnung erhalten, lässt sich nicht bestimmen.",
      value: false,
    },
  ],
  en: [
    {
      label: "Every district in the city must enter flood status.",
      value: false,
    },
    {
      label: "District X cannot enter flood status.",
      value: false,
    },
    {
      label: "Registered residents of District X receive an evacuation order.",
      value: true,
    },
    {
      label: "Every person in the city must leave immediately.",
      value: false,
    },
    {
      label:
        "It cannot be determined whether registered residents of District X receive an evacuation order.",
      value: false,
    },
  ],
  id: [
    {
      label: "Setiap distrik di kota pasti berstatus banjir.",
      value: false,
    },
    {
      label: "Distrik X tidak mungkin berstatus banjir.",
      value: false,
    },
    {
      label: "Penduduk Distrik X yang terdaftar menerima perintah evakuasi.",
      value: true,
    },
    {
      label: "Semua warga kota harus segera meninggalkan kota.",
      value: false,
    },
    {
      label:
        "Tidak dapat ditentukan apakah penduduk Distrik X yang terdaftar menerima perintah evakuasi.",
      value: false,
    },
  ],
};

export default choices;
