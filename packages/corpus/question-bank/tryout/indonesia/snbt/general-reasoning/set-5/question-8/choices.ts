import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Alle Einwohner von Jakarta haben eine Geburtsurkunde und einen Personalausweis (KTP).",
      value: false,
    },
    {
      label:
        "Alle Einwohner von Jakarta haben eine Geburtsurkunde oder einen Personalausweis (KTP).",
      value: false,
    },
    {
      label:
        "Es gibt Einwohner von Jakarta, die älter als $$17$$ Jahre sind und keine Geburtsurkunde, aber einen Personalausweis (KTP) besitzen.",
      value: false,
    },
    {
      label:
        "Einige Einwohner von Jakarta verfügen über eine Geburtsurkunde und einen Personalausweis (KTP).",
      value: true,
    },
    {
      label:
        "Einige Einwohner von Jakarta haben keine Geburtsurkunde, aber einen Personalausweis (KTP).",
      value: false,
    },
  ],
  en: [
    {
      label: "All Jakarta residents have a birth certificate and ID card (KTP)",
      value: false,
    },
    {
      label: "All Jakarta residents have a birth certificate or ID card (KTP)",
      value: false,
    },
    {
      label:
        "There are Jakarta residents over $$17$$ years old who do not have a birth certificate but have an ID card (KTP)",
      value: false,
    },
    {
      label:
        "Some Jakarta residents have a birth certificate and ID card (KTP)",
      value: true,
    },
    {
      label:
        "Some Jakarta residents do not have a birth certificate but have an ID card (KTP)",
      value: false,
    },
  ],
  id: [
    {
      label: "Semua warga Jakarta memiliki AKTA kelahiran dan KTP",
      value: false,
    },
    {
      label: "Semua warga Jakarta memiliki AKTA kelahiran atau KTP",
      value: false,
    },
    {
      label:
        "Ada warga Jakarta di atas $$17$$ tahun tidak memiliki AKTA kelahiran namun memiliki KTP",
      value: false,
    },
    {
      label: "Sebagian warga Jakarta memiliki AKTA kelahiran dan KTP",
      value: true,
    },
    {
      label:
        "Sebagian warga Jakarta tidak memiliki AKTA kelahiran namun mempunyai KTP",
      value: false,
    },
  ],
};

export default choices;
