import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Beikost wird im Allgemeinen ab einem Alter von etwa $$6$$ Monaten eingeführt.",
      value: false,
    },
    {
      label:
        "Das Stillen kann nach der Einführung von Beikost fortgesetzt werden.",
      value: false,
    },
    {
      label: "Beikost soll ausreichend, sicher und nährstoffreich sein.",
      value: false,
    },
    {
      label:
        "Obst und Gemüse sind Bestandteil einer abwechslungsreichen Beikost.",
      value: false,
    },
    {
      label:
        "Gemüse allein deckt nach dem Alter von $$6$$ Monaten alle benötigten Lebensmittelgruppen ab.",
      value: true,
    },
  ],
};

export default choices;
