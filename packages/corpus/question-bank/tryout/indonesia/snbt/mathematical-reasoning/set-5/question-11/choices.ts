import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$P < Q$$",
      value: false,
    },
    {
      label: "$$P > Q$$",
      value: true,
    },
    {
      label: "$$P = Q$$",
      value: false,
    },
    {
      label: "$$P = 2Q$$",
      value: false,
    },
    {
      label:
        "Die Beziehung zwischen $$P$$ und $$Q$$ lässt sich nicht bestimmen",
      value: false,
    },
  ],
  en: [
    { label: "$$P < Q$$", value: false },
    { label: "$$P > Q$$", value: true },
    { label: "$$P = Q$$", value: false },
    { label: "$$P = 2Q$$", value: false },
    {
      label: "The relationship between $$P$$ and $$Q$$ cannot be determined",
      value: false,
    },
  ],
  id: [
    { label: "$$P < Q$$", value: false },
    { label: "$$P > Q$$", value: true },
    { label: "$$P = Q$$", value: false },
    { label: "$$P = 2Q$$", value: false },
    { label: "Hubungan $$P$$ dan $$Q$$ tidak dapat ditentukan", value: false },
  ],
};

export default choices;
