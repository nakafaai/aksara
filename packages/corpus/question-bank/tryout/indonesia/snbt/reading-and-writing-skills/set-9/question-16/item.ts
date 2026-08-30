import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Nutzenden im untersuchten Kontext (Musikproberäume) gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden Nutzenden im Kontext Musikproberäume gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Alle sämtlichen Nutzenden im Kontext Musikproberäume gaben Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Musikproberäume gaben kurze knappe Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Musikproberäume gaben erneut wieder Rückmeldungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Users in this setting (music practice rooms) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "Users users in this setting (music practice rooms) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "All of every user in this setting (music practice rooms) provided comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (music practice rooms) provided brief short comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (music practice rooms) provided comments again repeatedly.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Para pengguna di ruang latihan musik memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna-pengguna di ruang latihan musik memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Sejumlah para pengguna di ruang latihan musik memberikan komentar.",
        },
        {
          isCorrect: false,
          label:
            "Para semua pengguna di ruang latihan musik memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di ruang latihan musik memberikan komentar singkat pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
