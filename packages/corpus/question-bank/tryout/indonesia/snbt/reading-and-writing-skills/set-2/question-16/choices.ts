import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "sogar.",
      value: false,
    },
    {
      label: "und.",
      value: false,
    },
    {
      label: "dass.",
      value: true,
    },
    {
      label: "wann.",
      value: false,
    },
    {
      label: "falls.",
      value: false,
    },
  ],
  en: [
    {
      label: "even.",
      value: false,
    },
    {
      label: "and.",
      value: false,
    },
    {
      label: "that.",
      value: true,
    },
    {
      label: "when.",
      value: false,
    },
    {
      label: "if.",
      value: false,
    },
  ],
  id: [
    {
      label: "bahkan.",
      value: false,
    },
    {
      label: "dan.",
      value: false,
    },
    {
      label: "bahwa.",
      value: true,
    },
    {
      label: "ketika.",
      value: false,
    },
    {
      label: "jika.",
      value: false,
    },
  ],
};

export default choices;
