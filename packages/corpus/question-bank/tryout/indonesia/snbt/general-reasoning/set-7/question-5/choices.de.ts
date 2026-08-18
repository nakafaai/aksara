import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Budi hat in diesem Monat nicht jede planmäßige Trainingseinheit absolviert.",
      value: true,
    },
    { label: "Budi mag keine Radrennen.", value: false },
    { label: "Budi kann niemals ein Radrennen gewinnen.", value: false },
    {
      label: "Budi hat in diesem Monat überhaupt nicht trainiert.",
      value: false,
    },
    {
      label: "Budi ist von allen Langstreckenradrennen ausgeschlossen.",
      value: false,
    },
  ],
};

export default choices;
