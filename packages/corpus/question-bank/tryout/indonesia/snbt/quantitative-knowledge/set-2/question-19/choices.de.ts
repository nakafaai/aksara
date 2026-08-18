import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Größe $$P$$ ist größer als Größe $$Q$$",
      value: false,
    },
    {
      label: "Größe $$P$$ ist kleiner als Größe $$Q$$",
      value: true,
    },
    {
      label: "Größe $$P$$ ist gleich Größe $$Q$$",
      value: false,
    },
    {
      label:
        "Die Beziehung zwischen den Größen $$P$$ und $$Q$$ lässt sich nicht bestimmen",
      value: false,
    },
    {
      label:
        "Die bereitgestellten Informationen reichen nicht aus, um sich für eine der drei oben genannten Optionen zu entscheiden",
      value: false,
    },
  ],
};

export default choices;
