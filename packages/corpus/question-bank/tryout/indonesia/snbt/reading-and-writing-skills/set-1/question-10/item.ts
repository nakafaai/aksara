import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Welches Land hat das Sendai-Rahmenwerk zuerst angenommen?",
        },
        {
          isCorrect: false,
          label:
            "Wie viel kostet die Wiederherstellung eines geschädigten Ökosystems?",
        },
        {
          isCorrect: false,
          label: "Wann begann die Umweltdegradation in Indonesien?",
        },
        {
          isCorrect: true,
          label: "Welche drei Risikotreiber nennt das Sendai-Rahmenwerk?",
        },
        {
          isCorrect: false,
          label:
            "Welche Methode zur Wiederherstellung von Ökosystemen ist am wirksamsten?",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Which country first adopted the Sendai Framework?",
        },
        {
          isCorrect: false,
          label: "How much does it cost to restore a damaged ecosystem?",
        },
        {
          isCorrect: false,
          label: "When did environmental degradation begin in Indonesia?",
        },
        {
          isCorrect: true,
          label:
            "Which three drivers of risk does the Sendai Framework recognize?",
        },
        {
          isCorrect: false,
          label: "Which ecosystem restoration method is the most effective?",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Negara mana yang pertama kali mengadopsi Kerangka Sendai?",
        },
        {
          isCorrect: false,
          label: "Berapa biaya untuk memulihkan ekosistem yang rusak?",
        },
        {
          isCorrect: false,
          label: "Kapan degradasi lingkungan mulai terjadi di Indonesia?",
        },
        {
          isCorrect: true,
          label: "Apa saja tiga pendorong risiko yang diakui Kerangka Sendai?",
        },
        {
          isCorrect: false,
          label: "Metode pemulihan ekosistem mana yang paling efektif?",
        },
      ],
    },
  },
};

export default item;
