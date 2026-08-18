import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "removing the word *Regarding* at the beginning of the sentence.",
      value: true,
    },
    {
      label: "replacing *provide* with *provides*.",
      value: false,
    },
    {
      label: "removing the word *also*.",
      value: false,
    },
    {
      label: "replacing *benchmark* with *estimate*.",
      value: false,
    },
    {
      label: "adding the word *the* before *current*.",
      value: false,
    },
  ],
  id: [
    {
      label: "menghilangkan kata *mengenai* pada awal kalimat.",
      value: true,
    },
    {
      label: "mengganti *menyediakan* dengan *disediakan*.",
      value: false,
    },
    {
      label: "menghilangkan kata *juga*.",
      value: false,
    },
    {
      label: "mengganti *tolok ukur* dengan *perkiraan*.",
      value: false,
    },
    {
      label: "menambahkan kata *yang* sebelum *terkini*.",
      value: false,
    },
  ],
};

export default choices;
