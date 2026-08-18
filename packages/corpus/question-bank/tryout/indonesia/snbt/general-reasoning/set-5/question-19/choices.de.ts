import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Jede Gesellschaft verändert sich, und die Ursachen sozialen Wandels können innerhalb oder außerhalb der Gesellschaft liegen",
      value: true,
    },
    {
      label:
        "Sozialer Wandel wird ausschließlich durch Beziehungen zwischen Einzelpersonen verursacht",
      value: false,
    },
    {
      label: "Kontakt von außen ist die einzige Ursache sozialen Wandels",
      value: false,
    },
    {
      label:
        "Forschende sollten alle Veränderungen untersuchen, ohne zuerst eine zentrale Veränderung zu bestimmen",
      value: false,
    },
    {
      label:
        "Eine Gesellschaft verändert sich nur unter dem Einfluss einer anderen Gesellschaft",
      value: false,
    },
  ],
};

export default choices;
