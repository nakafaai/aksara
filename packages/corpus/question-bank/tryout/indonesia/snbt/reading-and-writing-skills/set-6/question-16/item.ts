import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Nutzenden Nutzenden im Kontext Lärmprotokoll im Wohngebiet gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: true,
          label:
            "Die Nutzenden im untersuchten Kontext (Lärmprotokoll im Wohngebiet) gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Alle sämtlichen Nutzenden im Kontext Lärmprotokoll im Wohngebiet gaben Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Lärmprotokoll im Wohngebiet gaben kurze knappe Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Lärmprotokoll im Wohngebiet gaben erneut wieder Rückmeldungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Users users in this setting (neighbourhood noise log) provided brief comments.",
        },
        {
          isCorrect: true,
          label:
            "Users in this setting (neighbourhood noise log) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "All of every user in this setting (neighbourhood noise log) provided comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (neighbourhood noise log) provided brief short comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (neighbourhood noise log) provided comments again repeatedly.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Para pengguna-pengguna di pencatatan kebisingan lingkungan memberikan komentar singkat.",
        },
        {
          isCorrect: true,
          label:
            "Para pengguna di pencatatan kebisingan lingkungan memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Sejumlah para pengguna di pencatatan kebisingan lingkungan memberikan komentar.",
        },
        {
          isCorrect: false,
          label:
            "Para semua pengguna di pencatatan kebisingan lingkungan memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di pencatatan kebisingan lingkungan memberikan komentar singkat pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
