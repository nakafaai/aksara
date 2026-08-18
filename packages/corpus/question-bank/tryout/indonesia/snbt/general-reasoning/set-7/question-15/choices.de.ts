import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Alle $$120$$ Tomatensetzlinge überlebten den ersten Monat.",
      value: false,
    },
    {
      label: "Alle $$96$$ überlebenden Setzlinge bildeten neue Blätter.",
      value: false,
    },
    {
      label:
        "Der Bericht bewies, dass die überlebenden Setzlinge krankheitsfrei waren.",
      value: false,
    },
    {
      label: "$$72$$ der überlebenden Setzlinge bildeten neue Blätter.",
      value: true,
    },
    {
      label: "Die überlebenden Setzlinge trugen mehr Früchte als die übrigen.",
      value: false,
    },
  ],
};

export default choices;
