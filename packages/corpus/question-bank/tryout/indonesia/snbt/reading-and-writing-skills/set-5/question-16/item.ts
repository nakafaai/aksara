import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Nutzenden im untersuchten Kontext (Aufnahmestudio der Schule) gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext schulisches Tonstudio gaben kurze und knappe Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext schulisches Tonstudio gaben ihre eigenen kurzen Rückmeldungen persönlich ab.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext schulisches Tonstudio gaben kurze Rückmeldungen in knapper Form.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext schulisches Tonstudio gaben kurze Rückmeldungen über ihre Erfahrungen in diesem Kontext.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Users in this setting (school recording studio) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (school recording studio) provided comments that were brief and concise.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (school recording studio) provided their own brief comments personally.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (school recording studio) provided brief comments in a short form.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (school recording studio) provided brief comments about their experience in this setting.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Para pengguna di studio rekaman sekolah memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna dalam konteks studio rekaman sekolah memberikan komentar yang singkat dan ringkas.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna dalam konteks studio rekaman sekolah memberikan komentar singkat mereka sendiri secara pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna dalam konteks studio rekaman sekolah memberikan komentar singkat dalam bentuk pendek.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna dalam konteks studio rekaman sekolah memberikan komentar singkat tentang pengalaman mereka dalam konteks tersebut.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
