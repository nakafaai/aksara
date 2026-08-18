import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Basketball ist das beliebteste Hobby",
      value: false,
    },
    {
      label: "Insgesamt interessieren sich $$65$$ Schüler für Schauspiel",
      value: false,
    },
    {
      label: "Die Gesamtzahl in Klasse XII beträgt $$306$$",
      value: false,
    },
    {
      label: "Tanz hat in Klasse X die wenigsten Teilnehmenden",
      value: false,
    },
    {
      label: "Insgesamt interessieren sich $$160$$ Schüler für Malen",
      value: true,
    },
  ],
};

export default choices;
