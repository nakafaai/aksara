import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "am Montag prüfte das Team Karten zur Reihenfolge brauner und grüner Materialien im Kontext Kompostierworkshop.",
        },
        {
          isCorrect: false,
          label:
            "Am montag prüfte das Team Karten zur Reihenfolge brauner und grüner Materialien im Kontext Kompostierworkshop.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte Das Team Karten zur Reihenfolge brauner und grüner Materialien im Kontext Kompostierworkshop.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag, prüfte das Team Karten zur Reihenfolge brauner und grüner Materialien im Kontext Kompostierworkshop",
        },
        {
          isCorrect: true,
          label:
            "Am Montag prüfte das Team Karten zur Reihenfolge brauner und grüner Materialien im folgenden Kontext: Kompostierworkshop.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "on Monday, the team tested cards showing the order of brown and green materials in this setting (composting workshop).",
        },
        {
          isCorrect: false,
          label:
            "On monday, the team tested cards showing the order of brown and green materials in this setting (composting workshop).",
        },
        {
          isCorrect: false,
          label:
            "On Monday, The team tested cards showing the order of brown and green materials in this setting (composting workshop).",
        },
        {
          isCorrect: false,
          label:
            "On Monday the team tested cards showing the order of brown and green materials in this setting (composting workshop)",
        },
        {
          isCorrect: true,
          label:
            "On Monday, the team tested cards showing the order of brown and green materials in this setting (composting workshop).",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji kartu urutan bahan cokelat dan hijau di lokakarya pembuatan kompos.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji kartu urutan bahan cokelat dan hijau di lokakarya pembuatan kompos.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji kartu urutan bahan cokelat dan hijau di lokakarya pembuatan kompos.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji kartu urutan bahan cokelat dan hijau di lokakarya pembuatan kompos",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji kartu urutan bahan cokelat dan hijau di lokakarya pembuatan kompos.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
