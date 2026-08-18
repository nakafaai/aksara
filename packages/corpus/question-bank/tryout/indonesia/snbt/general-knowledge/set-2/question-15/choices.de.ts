import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Der **Abstellraum** wurde gestern gereinigt.",
      value: false,
    },
    {
      label: "Die **Zeichnung** wird morgen ausgestellt.",
      value: true,
    },
    {
      label: "Der **Tanz** beginnt mittags.",
      value: false,
    },
    {
      label: "Sie hörte einen **Ruf** von hinten.",
      value: false,
    },
    {
      label: "Die Künstlerin erhielt **Lob** für ihr neues Werk.",
      value: false,
    },
  ],
};

export default choices;
