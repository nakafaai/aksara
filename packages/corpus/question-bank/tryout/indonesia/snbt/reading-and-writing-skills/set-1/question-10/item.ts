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
              text: "Welche drei Risikotreiber nennt das Sendai-Rahmenwerk?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Welches Land hat das Sendai-Rahmenwerk zuerst angenommen?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Wie viel kostet die Wiederherstellung eines geschädigten Ökosystems?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Wann begann die Umweltdegradation in Indonesien?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Welche Methode zur Wiederherstellung von Ökosystemen ist am wirksamsten?",
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
            {
              kind: "text",
              text: "Which three drivers of risk does the Sendai Framework recognize?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Which country first adopted the Sendai Framework?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "How much does it cost to restore a damaged ecosystem?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "When did environmental degradation begin in Indonesia?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Which ecosystem restoration method is the most effective?",
            },
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
              text: "Apa saja tiga pendorong risiko yang diakui Kerangka Sendai?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Negara mana yang pertama kali mengadopsi Kerangka Sendai?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Berapa biaya untuk memulihkan ekosistem yang rusak?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kapan degradasi lingkungan mulai terjadi di Indonesia?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Metode pemulihan ekosistem mana yang paling efektif?",
            },
          ],
        },
      ],
    },
  },
};

export default item;
