import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

// Date: 2025-11-23
const choices: QuestionChoices = {
  de: [
    {
      label: "WWF",
      value: false,
    },
    {
      label: "WFW",
      value: true,
    },
    {
      label: "WFF",
      value: false,
    },
    {
      label: "FWW",
      value: false,
    },
    {
      label: "FWF",
      value: false,
    },
  ],
  en: [
    {
      label: "TTF",
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
