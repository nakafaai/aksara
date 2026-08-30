import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Regierung von Jakarta begann am 10. April 2020 mit der Umsetzung der PSBB-Regelung.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die PSBB-Regelung wurde am 10. April 2020 von der Regierung von Jakarta angekündigt.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die PSBB-Regelung trat am 10. April 2020 in DKI Jakarta in Kraft.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Am 10. April 2020 wurden die PSBB-Regeln in DKI Jakarta angekündigt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Einwohner von DKI Jakarta begannen am 10. April 2020, die PSBB-Regelung zu befolgen.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The Jakarta government began to implement PSBB on 10 April 2020.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "PSBB was announced by the Jakarta government on 10 April 2020.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "PSBB began to be implemented in DKI Jakarta on 10 April 2020.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "On 10 April 2020, the PSBB rules were announced in DKI Jakarta.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Residents of DKI Jakarta began following PSBB on 10 April 2020.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pemerintah DKI Jakarta mulai memberlakukan PSBB pada 10 April 2020.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "PSBB diumumkan oleh Pemerintah DKI Jakarta pada 10 April 2020.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "PSBB mulai diberlakukan di DKI Jakarta pada 10 April 2020.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pada 10 April 2020, aturan PSBB diumumkan di DKI Jakarta.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Warga DKI Jakarta mulai mengikuti PSBB pada 10 April 2020.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
