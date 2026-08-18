import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "rapid changes.",
      value: false,
    },
    {
      label: "careful treatment.",
      value: false,
    },
    {
      label: "singing loudly.",
      value: false,
    },
    {
      label: "bird calls.",
      value: true,
    },
    {
      label: "gentle washing.",
      value: false,
    },
  ],
  id: [
    {
      label: "perubahan cepat.",
      value: false,
    },
    {
      label: "perawatan cermat.",
      value: false,
    },
    {
      label: "bernyanyi nyaring.",
      value: false,
    },
    {
      label: "kicauan burung.",
      value: true,
    },
    {
      label: "pencucian lembut.",
      value: false,
    },
  ],
};

export default choices;
