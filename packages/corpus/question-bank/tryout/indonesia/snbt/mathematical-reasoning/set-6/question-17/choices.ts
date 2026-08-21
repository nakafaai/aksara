import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$2 : 3$$",
      value: true,
    },
    {
      label: "$$3 : 4$$",
      value: false,
    },
    {
      label: "$$2 : 5$$",
      value: false,
    },
    {
      label: "$$3 : 5$$",
      value: false,
    },
    {
      label: "$$4 : 5$$",
      value: false,
    },
  ],
  en: [
    { label: "$$2 : 3$$", value: true },
    { label: "$$3 : 4$$", value: false },
    { label: "$$2 : 5$$", value: false },
    { label: "$$3 : 5$$", value: false },
    { label: "$$4 : 5$$", value: false },
  ],
  id: [
    { label: "$$2 : 3$$", value: true },
    { label: "$$3 : 4$$", value: false },
    { label: "$$2 : 5$$", value: false },
    { label: "$$3 : 5$$", value: false },
    { label: "$$4 : 5$$", value: false },
  ],
};

export default choices;
