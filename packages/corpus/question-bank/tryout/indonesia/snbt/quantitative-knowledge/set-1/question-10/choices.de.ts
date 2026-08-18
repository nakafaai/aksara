import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Größe $$P$$ ist größer als $$Q$$",
      value: false,
    },
    {
      label: "Größe $$P$$ ist kleiner als $$Q$$",
      value: true,
    },
    {
      label: "Größe $$P$$ ist gleich $$Q$$",
      value: false,
    },
    {
      label:
        "Die Informationen reichen nicht aus, um den Zusammenhang festzustellen",
      value: false,
    },
    {
      label: "Beide Größen sind nicht definiert",
      value: false,
    },
  ],
};

export default choices;
