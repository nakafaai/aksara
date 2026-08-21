import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$A = B$$ dann $$E = F$$",
      value: false,
    },
    {
      label: "$$A = B$$ oder $$E = F$$",
      value: false,
    },
    {
      label: "$$A \\neq B$$ und $$E = F$$",
      value: false,
    },
    {
      label: "$$E \\neq F$$ oder $$A \\neq B$$",
      value: false,
    },
    {
      label: "$$A = B$$ oder $$E \\neq F$$",
      value: true,
    },
  ],
  en: [
    { label: "$$A = B$$ then $$E = F$$", value: false },
    { label: "$$A = B$$ or $$E = F$$", value: false },
    { label: "$$A \\neq B$$ and $$E = F$$", value: false },
    { label: "$$E \\neq F$$ or $$A \\neq B$$", value: false },
    { label: "$$A = B$$ or $$E \\neq F$$", value: true },
  ],
  id: [
    { label: "$$A = B$$ maka $$E = F$$", value: false },
    { label: "$$A = B$$ atau $$E = F$$", value: false },
    { label: "$$A \\neq B$$ dan $$E = F$$", value: false },
    { label: "$$E \\neq F$$ atau $$A \\neq B$$", value: false },
    { label: "$$A = B$$ atau $$E \\neq F$$", value: true },
  ],
};

export default choices;
