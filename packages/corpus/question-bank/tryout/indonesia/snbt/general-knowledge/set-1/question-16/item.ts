import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Das Tor blieb nach Sonnenuntergang *geschlossen*.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Hausmeister *schloss* das Tor bei Sonnenuntergang.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Das war der *kälteste* Morgen des Monats." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Besucher *warteten* vor dem Eingang." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Hinweis wurde von allen Besuchern *gelesen*.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "The gate remained *locked* after sunset." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The guard *locked* the gate at sunset." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "It was the *coldest* morning of the month.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Visitors were *waiting* outside the gate." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The notice was *read* by every visitor." },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Kayu-kayu balok itu *terikat* dengan kuat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kakinya *terinjak* saat menonton konser semalam.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Arman menjadi siswa *terbaik* di kelas." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Dia *tertidur* di sofa semalam." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dian menjadi peserta *termuda* dalam acara tersebut.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
