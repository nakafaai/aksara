import type { QuestionChoices } from "#corpus/question-bank/choices";

// Date: 2025-11-23
const choices: QuestionChoices = {
  en: [
    {
      label: "T TF",
      value: false,
    },
    {
      label: "TFT",
      value: true,
    },
    {
      label: "TFF",
      value: false,
    },
    {
      label: "FTT",
      value: false,
    },
    {
      label: "FTF",
      value: false,
    },
  ],
  id: [
    {
      label: "BBS",
      value: false,
    },
    {
      label: "BSB",
      value: true,
    },
    {
      label: "BSS",
      value: false,
    },
    {
      label: "SBB",
      value: false,
    },
    {
      label: "SBS",
      value: false,
    },
  ],
};

export default choices;
