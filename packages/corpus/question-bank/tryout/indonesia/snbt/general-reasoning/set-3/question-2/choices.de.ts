import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Basketball ist das beliebteste Freizeitinteresse",
      value: false,
    },
    {
      label:
        "Insgesamt interessieren sich $$65$$ Schülerinnen und Schüler für Schauspiel",
      value: false,
    },
    {
      label:
        "Die Gesamtzahl der Schülerinnen und Schüler in Klasse $$\\text{XII}$$ beträgt $$306$$",
      value: false,
    },
    {
      label:
        "In Klasse $$\\text{X}$$ interessieren sich die wenigsten Schülerinnen und Schüler für Tanz",
      value: false,
    },
    {
      label:
        "Insgesamt interessieren sich $$160$$ Schülerinnen und Schüler für Malerei",
      value: true,
    },
  ],
};

export default choices;
