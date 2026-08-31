import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Musikproberäume gaben kurze und knappe Rückmeldungen.",
        },
        {
          isCorrect: true,
          label:
            "Die Nutzenden im untersuchten Kontext (Musikproberäume) gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Musikproberäume gaben ihre eigenen kurzen Rückmeldungen persönlich ab.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Musikproberäume gaben kurze Rückmeldungen in knapper Form.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Musikproberäume gaben kurze Rückmeldungen über ihre Erfahrungen in diesem Kontext.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Users in this setting (music practice rooms) provided comments that were brief and concise.",
        },
        {
          isCorrect: true,
          label:
            "Users in this setting (music practice rooms) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (music practice rooms) provided their own brief comments personally.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (music practice rooms) provided brief comments in a short form.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (music practice rooms) provided brief comments about their experience in this setting.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar yang singkat dan ringkas.",
        },
        {
          isCorrect: true,
          label: "Pengguna ruang latihan musik memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar singkat mereka sendiri secara pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar singkat dalam bentuk pendek.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar singkat tentang pengalaman mereka di ruang tersebut.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
