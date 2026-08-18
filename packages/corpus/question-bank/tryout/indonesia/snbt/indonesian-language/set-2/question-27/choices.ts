import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    {
      label: "Tersusun dari orang atau unsur yang berasal dari berbagai tempat",
      value: true,
    },
    {
      label: "Memiliki penduduk yang berpengetahuan sangat luas",
      value: false,
    },
    { label: "Berada di wilayah pesisir yang mudah dicapai", value: false },
    {
      label: "Telah berkembang menjadi kota yang sepenuhnya modern",
      value: false,
    },
    { label: "Menutup diri dari pengaruh budaya luar", value: false },
  ],
};

export default choices;
