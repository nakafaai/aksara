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
  en: [
    {
      label: "The Jakarta government began to implement PSBB on 10 April 2020.",
      value: false,
    },
    {
      label: "PSBB was announced by the Jakarta government on 10 April 2020.",
      value: false,
    },
    {
      label: "PSBB began to be implemented in DKI Jakarta on 10 April 2020.",
      value: true,
    },
    {
      label: "On 10 April 2020, the PSBB rules were announced in DKI Jakarta.",
      value: false,
    },
    {
      label: "Residents of DKI Jakarta began following PSBB on 10 April 2020.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Pemerintah DKI Jakarta mulai memberlakukan PSBB pada 10 April 2020.",
      value: false,
    },
    {
      label: "PSBB diumumkan oleh Pemerintah DKI Jakarta pada 10 April 2020.",
      value: false,
    },
    {
      label: "PSBB mulai diberlakukan di DKI Jakarta pada 10 April 2020.",
      value: true,
    },
    {
      label: "Pada 10 April 2020, aturan PSBB diumumkan di DKI Jakarta.",
      value: false,
    },
    {
      label: "Warga DKI Jakarta mulai mengikuti PSBB pada 10 April 2020.",
      value: false,
    },
  ],
};

export default choices;
