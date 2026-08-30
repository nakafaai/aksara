import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Nutzenden im untersuchten Kontext (Kompostierworkshop) gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden Nutzenden im Kontext Kompostierworkshop gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Alle sämtlichen Nutzenden im Kontext Kompostierworkshop gaben Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Kompostierworkshop gaben kurze knappe Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Kompostierworkshop gaben erneut wieder Rückmeldungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Users in this setting (composting workshop) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "Users users in this setting (composting workshop) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "All of every user in this setting (composting workshop) provided comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (composting workshop) provided brief short comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (composting workshop) provided comments again repeatedly.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Para pengguna di lokakarya pembuatan kompos memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna-pengguna di lokakarya pembuatan kompos memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Sejumlah para pengguna di lokakarya pembuatan kompos memberikan komentar.",
        },
        {
          isCorrect: false,
          label:
            "Para semua pengguna di lokakarya pembuatan kompos memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di lokakarya pembuatan kompos memberikan komentar singkat pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
