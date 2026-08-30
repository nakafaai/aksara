import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "erhöht den Blutdruck" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "senkt den Blutdruck" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "beugt Herz-Kreislauf-Erkrankungen vor" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "beschleunigt die Verdauung" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "beseitigt den Kaliumbedarf des Körpers" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "raises blood pressure" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "lowers blood pressure" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "prevents cardiovascular disease" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "accelerates digestion" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "removes the body's need for potassium" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "meningkatkan tekanan darah" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "menurunkan tekanan darah" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "mencegah penyakit kardiovaskular" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "mempercepat pencernaan" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "menghilangkan kebutuhan tubuh akan kalium" },
          ],
        },
      ],
    },
  },
};

export default item;
