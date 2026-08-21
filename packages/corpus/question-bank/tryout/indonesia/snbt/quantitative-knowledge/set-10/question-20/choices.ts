import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$x < y$$",
      value: false,
    },
    {
      label: "$$x > y$$",
      value: true,
    },
    {
      label: "$$x = y$$",
      value: false,
    },
    {
      label: "$$x = -y$$",
      value: false,
    },
    {
      label: "$$x + y = 1$$",
      value: false,
    },
  ],
  en: [
    { label: "$$x < y$$", value: false },
    { label: "$$x > y$$", value: true },
    { label: "$$x = y$$", value: false },
    { label: "$$x = -y$$", value: false },
    { label: "$$x + y = 1$$", value: false },
  ],
  id: [
    { label: "$$x < y$$", value: false },
    { label: "$$x > y$$", value: true },
    { label: "$$x = y$$", value: false },
    { label: "$$x = -y$$", value: false },
    { label: "$$x + y = 1$$", value: false },
  ],
};

export default choices;
