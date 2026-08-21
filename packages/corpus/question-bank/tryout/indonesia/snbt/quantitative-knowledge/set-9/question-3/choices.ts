import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$45^\\circ$$",
      value: false,
    },
    {
      label: "$$65^\\circ$$",
      value: false,
    },
    {
      label: "$$70^\\circ$$",
      value: true,
    },
    {
      label: "$$75^\\circ$$",
      value: false,
    },
    {
      label: "$$80^\\circ$$",
      value: false,
    },
  ],
  en: [
    { label: "$$45^\\circ$$", value: false },
    { label: "$$65^\\circ$$", value: false },
    { label: "$$70^\\circ$$", value: true },
    { label: "$$75^\\circ$$", value: false },
    { label: "$$80^\\circ$$", value: false },
  ],
  id: [
    { label: "$$45^\\circ$$", value: false },
    { label: "$$65^\\circ$$", value: false },
    { label: "$$70^\\circ$$", value: true },
    { label: "$$75^\\circ$$", value: false },
    { label: "$$80^\\circ$$", value: false },
  ],
};

export default choices;
