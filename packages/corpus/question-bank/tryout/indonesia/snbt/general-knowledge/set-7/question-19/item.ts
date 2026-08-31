import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Änderungen können vertretbar sein, wenn Herkunft und Gründe offenliegen und Quellenvielfalt nicht verborgen wird.",
        },
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
            "Eine verantwortliche Bearbeitung darf die Form ändern, wenn Quellen, Änderungen und Vielfalt nachvollziehbar bleiben.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Changes can be acceptable when their origins and reasons are open and source diversity is not concealed.",
        },
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
            "A responsible adaptation may change a story's form while keeping its sources, changes, and diversity traceable.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Perubahan dapat diterima jika asal dan alasannya terbuka serta keragaman sumber tidak disembunyikan.",
        },
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
            "Adaptasi yang bertanggung jawab dapat mengubah bentuk cerita selama sumber, perubahan, dan keragamannya tetap dapat ditelusuri.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
