import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Die Regierung von Jakarta begann am 10. April 2020 mit der Umsetzung der PSBB-Regelung.",
      value: false,
    },
    {
      label:
        "Die PSBB-Regelung wurde am 10. April 2020 von der Regierung von Jakarta angekündigt.",
      value: false,
    },
    {
      label:
        "Die PSBB-Regelung trat am 10. April 2020 in DKI Jakarta in Kraft.",
      value: true,
    },
    {
      label:
        "Am 10. April 2020 wurden die PSBB-Regeln in DKI Jakarta angekündigt.",
      value: false,
    },
    {
      label:
        "Die Einwohner von DKI Jakarta begannen am 10. April 2020, die PSBB-Regelung zu befolgen.",
      value: false,
    },
  ],
};

export default choices;
