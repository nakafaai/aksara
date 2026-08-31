import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Kompostierworkshop gaben kurze und knappe Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Kompostierworkshop gaben ihre eigenen kurzen Rückmeldungen persönlich ab.",
        },
        {
          isCorrect: true,
          label:
            "Die Nutzenden im untersuchten Kontext (Kompostierworkshop) gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Kompostierworkshop gaben kurze Rückmeldungen in knapper Form.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Kompostierworkshop gaben kurze Rückmeldungen über ihre Erfahrungen in diesem Kontext.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Users in this setting (composting workshop) provided comments that were brief and concise.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (composting workshop) provided their own brief comments personally.",
        },
        {
          isCorrect: true,
          label:
            "Users in this setting (composting workshop) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (composting workshop) provided brief comments in a short form.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (composting workshop) provided brief comments about their experience in this setting.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Para pengguna dalam konteks lokakarya pembuatan kompos memberikan komentar yang singkat dan ringkas.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna dalam konteks lokakarya pembuatan kompos memberikan komentar singkat mereka sendiri secara pribadi.",
        },
        {
          isCorrect: true,
          label:
            "Para pengguna di lokakarya pembuatan kompos memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna dalam konteks lokakarya pembuatan kompos memberikan komentar singkat dalam bentuk pendek.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna dalam konteks lokakarya pembuatan kompos memberikan komentar singkat tentang pengalaman mereka dalam konteks tersebut.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
