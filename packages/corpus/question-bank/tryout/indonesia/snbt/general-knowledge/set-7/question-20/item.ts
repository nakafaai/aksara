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
          isCorrect: true,
          label:
            "Eine Fassung als Original zu bezeichnen kann Informationen über das Leben der Erzählung in verschiedenen Gemeinschaften ausblenden.",
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
          isCorrect: true,
          label:
            "Calling one version original may erase information about how the story lives in different communities.",
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
          isCorrect: true,
          label:
            "Menyebut satu versi sebagai asli dapat menghapus informasi tentang cara cerita hidup di komunitas berbeda.",
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
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
