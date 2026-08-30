import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Nutzenden Nutzenden im Kontext Büchertauschmarkt gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Alle sämtlichen Nutzenden im Kontext Büchertauschmarkt gaben Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Büchertauschmarkt gaben kurze knappe Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Büchertauschmarkt gaben erneut wieder Rückmeldungen.",
        },
        {
          isCorrect: true,
          label:
            "Die Nutzenden im untersuchten Kontext (Büchertauschmarkt) gaben kurze Rückmeldungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Users users in this setting (book exchange market) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "All of every user in this setting (book exchange market) provided comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (book exchange market) provided brief short comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (book exchange market) provided comments again repeatedly.",
        },
        {
          isCorrect: true,
          label:
            "Users in this setting (book exchange market) provided brief comments.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Para pengguna-pengguna di pasar tukar buku memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Sejumlah para pengguna di pasar tukar buku memberikan komentar.",
        },
        {
          isCorrect: false,
          label:
            "Para semua pengguna di pasar tukar buku memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di pasar tukar buku memberikan komentar singkat pendek.",
        },
        {
          isCorrect: true,
          label:
            "Para pengguna di pasar tukar buku memberikan komentar singkat.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
