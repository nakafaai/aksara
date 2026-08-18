import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Die Seitenlage kann bei manchen Menschen das Schnarchen verringern",
      value: false,
    },
    {
      label:
        "In Rückenlage können sich die Atemwege bei manchen Menschen verengen",
      value: false,
    },
    {
      label: "Schnarchen kann andere Ursachen als die Schlafposition haben",
      value: false,
    },
    {
      label:
        "Die Seitenlage beendet garantiert jedes Schnarchen und macht eine ärztliche Abklärung überflüssig",
      value: true,
    },
    {
      label:
        "Schnarchen mit Atempausen, Luftschnappen oder Erstickungsgefühlen sollte ärztlich abgeklärt werden",
      value: false,
    },
  ],
};

export default choices;
