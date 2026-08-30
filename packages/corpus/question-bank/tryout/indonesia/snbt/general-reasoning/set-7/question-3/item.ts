import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Am Sensor trat eine Störung auf." }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die planmäßige tägliche Reinigung wurde nicht ausgelassen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Die Warnlampe leuchtete." }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Auf dem Sensor blieben Rückstände zurück." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die planmäßige tägliche Reinigung wurde ausgelassen.",
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
          label: [{ kind: "text", text: "The sensor developed a fault." }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The scheduled daily cleaning was not skipped.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "The warning light turned on." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Residue remained on the sensor." }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The scheduled daily cleaning was skipped." },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Sensor mengalami gangguan." }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Pembersihan harian yang dijadwalkan tidak dilewatkan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Lampu peringatan menyala." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Residu tertinggal pada sensor." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pembersihan harian yang dijadwalkan dilewatkan.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
