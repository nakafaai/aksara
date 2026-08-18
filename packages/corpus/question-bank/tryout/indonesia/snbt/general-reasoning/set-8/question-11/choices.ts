import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
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
