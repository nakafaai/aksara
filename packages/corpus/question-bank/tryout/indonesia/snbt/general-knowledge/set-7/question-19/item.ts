import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Änderungen können vertretbar sein, wenn Herkunft und Gründe offenliegen, Quellenvielfalt sichtbar bleibt und die Aufführung stimmig ist.",
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
            "Eine Aufführung muss nur danach bewertet werden, wie genau ihre Wörter einem ausgewählten schriftlichen Stück entsprechen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Changes can be acceptable when their origins and reasons are open, source diversity remains visible, and the performance remains coherent.",
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
            "A performance need only be judged by how closely its words match one selected written script.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Perubahan dapat diterima jika asal dan alasannya terbuka, keragaman sumber terlihat, dan pertunjukan tetap utuh.",
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
            "Kualitas pertunjukan cukup dinilai dari kemiripan kata-katanya dengan satu naskah tertulis yang dipilih.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
