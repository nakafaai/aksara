import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Nutzenden Nutzenden im Kontext Schirmverleih am Bahnhof gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Alle sämtlichen Nutzenden im Kontext Schirmverleih am Bahnhof gaben Rückmeldungen.",
        },
        {
          isCorrect: true,
          label:
            "Die Nutzenden im untersuchten Kontext (Schirmverleih am Bahnhof) gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Schirmverleih am Bahnhof gaben kurze knappe Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Schirmverleih am Bahnhof gaben erneut wieder Rückmeldungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Users users in this setting (station umbrella lending) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "All of every user in this setting (station umbrella lending) provided comments.",
        },
        {
          isCorrect: true,
          label:
            "Users in this setting (station umbrella lending) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (station umbrella lending) provided brief short comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (station umbrella lending) provided comments again repeatedly.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Para pengguna-pengguna di peminjaman payung stasiun memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Sejumlah para pengguna di peminjaman payung stasiun memberikan komentar.",
        },
        {
          isCorrect: true,
          label:
            "Para pengguna di peminjaman payung stasiun memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Para semua pengguna di peminjaman payung stasiun memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di peminjaman payung stasiun memberikan komentar singkat pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
