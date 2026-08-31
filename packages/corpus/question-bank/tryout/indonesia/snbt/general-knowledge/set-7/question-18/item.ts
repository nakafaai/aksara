import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Jede Änderung einer Bearbeitung schadet zwangsläufig der Tradition.",
        },
        {
          isCorrect: false,
          label:
            "Weil die Fassungen verschieden sind, muss die Gruppe weder Quellen noch Änderungen erklären.",
        },
        {
          isCorrect: false,
          label:
            "Das gefundene schriftliche Stück wurde in den 1970er-Jahren veröffentlicht.",
        },
        {
          isCorrect: false,
          label:
            "Die Gruppe wird Quellen und dramaturgische Änderungen im Programm nennen.",
        },
        {
          isCorrect: true,
          label:
            "Treue zur Tradition kann durch einen transparenten Prozess entstehen, nicht nur durch gleiche Wörter.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Every change in an adaptation necessarily damages tradition.",
        },
        {
          isCorrect: false,
          label:
            "Because versions differ, the group need not explain any source or change.",
        },
        {
          isCorrect: false,
          label:
            "The written script that was found was published in the 1970s.",
        },
        {
          isCorrect: false,
          label:
            "The group will identify sources and dramatic changes in the programme notes.",
        },
        {
          isCorrect: true,
          label:
            "Faithfulness to tradition can be expressed through transparency of process, not only verbal sameness.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Setiap perubahan dalam adaptasi pasti merusak tradisi.",
        },
        {
          isCorrect: false,
          label:
            "Karena versi berbeda, kelompok tidak perlu menjelaskan sumber atau perubahan apa pun.",
        },
        {
          isCorrect: false,
          label: "Naskah tertulis yang ditemukan diterbitkan pada 1970-an.",
        },
        {
          isCorrect: false,
          label:
            "Kelompok akan mencantumkan sumber dan perubahan dramatik dalam catatan program.",
        },
        {
          isCorrect: true,
          label:
            "Kesetiaan terhadap tradisi dapat diwujudkan melalui keterbukaan proses, bukan hanya kesamaan kata.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
