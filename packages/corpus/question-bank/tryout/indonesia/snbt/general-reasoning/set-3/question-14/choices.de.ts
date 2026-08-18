import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Jedes Gewürz erreicht seinen höchsten Verkaufswert im November $$2020$$.",
      value: false,
    },
    {
      label:
        "Die Schalottenverkäufe im Januar $$2021$$ werden voraussichtlich $$76$$ Tonnen betragen.",
      value: false,
    },
    {
      label:
        "Der Knoblauchabsatz im Januar $$2021$$ wird $$100$$ Tonnen übersteigen.",
      value: true,
    },
    {
      label:
        "In jedem Monat werden weniger Schalotten als rote Chilischoten verkauft.",
      value: false,
    },
    {
      label:
        "Schalotten sind in jedem Monat allein das Gewürz mit dem niedrigsten Verkaufswert.",
      value: false,
    },
  ],
};

export default choices;
