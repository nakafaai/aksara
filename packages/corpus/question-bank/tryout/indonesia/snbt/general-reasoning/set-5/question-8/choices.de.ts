import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Alle Einwohner von Jakarta haben eine Geburtsurkunde und einen Personalausweis (KTP).",
      value: false,
    },
    {
      label:
        "Alle Einwohner von Jakarta haben eine Geburtsurkunde oder einen Personalausweis (KTP).",
      value: false,
    },
    {
      label:
        "Es gibt Einwohner von Jakarta, die älter als $$17$$ Jahre sind und keine Geburtsurkunde, aber einen Personalausweis (KTP) besitzen.",
      value: false,
    },
    {
      label:
        "Einige Einwohner von Jakarta verfügen über eine Geburtsurkunde und einen Personalausweis (KTP).",
      value: true,
    },
    {
      label:
        "Einige Einwohner von Jakarta haben keine Geburtsurkunde, aber einen Personalausweis (KTP).",
      value: false,
    },
  ],
};

export default choices;
