import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die PSBB-Regelung trat am 10. April 2020 in DKI Jakarta in Kraft.",
        },
        {
          isCorrect: false,
          label:
            "Die Regierung von Jakarta begann am 10. April 2020 mit der Umsetzung der PSBB-Regelung.",
        },
        {
          isCorrect: false,
          label:
            "Die PSBB-Regelung wurde am 10. April 2020 von der Regierung von Jakarta angekündigt.",
        },
        {
          isCorrect: false,
          label:
            "Am 10. April 2020 wurden die PSBB-Regeln in DKI Jakarta angekündigt.",
        },
        {
          isCorrect: false,
          label:
            "Die Einwohner von DKI Jakarta begannen am 10. April 2020, die PSBB-Regelung zu befolgen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "PSBB began to be implemented in DKI Jakarta on 10 April 2020.",
        },
        {
          isCorrect: false,
          label:
            "The Jakarta government began to implement PSBB on 10 April 2020.",
        },
        {
          isCorrect: false,
          label:
            "PSBB was announced by the Jakarta government on 10 April 2020.",
        },
        {
          isCorrect: false,
          label:
            "On 10 April 2020, the PSBB rules were announced in DKI Jakarta.",
        },
        {
          isCorrect: false,
          label:
            "Residents of DKI Jakarta began following PSBB on 10 April 2020.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "PSBB mulai diberlakukan di DKI Jakarta pada 10 April 2020.",
        },
        {
          isCorrect: false,
          label:
            "Pemerintah DKI Jakarta mulai memberlakukan PSBB pada 10 April 2020.",
        },
        {
          isCorrect: false,
          label:
            "PSBB diumumkan oleh Pemerintah DKI Jakarta pada 10 April 2020.",
        },
        {
          isCorrect: false,
          label: "Pada 10 April 2020, aturan PSBB diumumkan di DKI Jakarta.",
        },
        {
          isCorrect: false,
          label: "Warga DKI Jakarta mulai mengikuti PSBB pada 10 April 2020.",
        },
      ],
    },
  },
};

export default item;
