import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Lärmprotokoll der Nachbarschaft gaben kurze und knappe Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Lärmprotokoll der Nachbarschaft gaben ihre eigenen kurzen Rückmeldungen persönlich ab.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Lärmprotokoll der Nachbarschaft gaben kurze Rückmeldungen in knapper Form.",
        },
        {
          isCorrect: true,
          label:
            "Die Nutzenden im untersuchten Kontext (Lärmprotokoll im Wohngebiet) gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Lärmprotokoll der Nachbarschaft gaben kurze Rückmeldungen über ihre Erfahrungen in diesem Kontext.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Users in this setting (neighbourhood noise log) provided comments that were brief and concise.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (neighbourhood noise log) provided their own brief comments personally.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (neighbourhood noise log) provided brief comments in a short form.",
        },
        {
          isCorrect: true,
          label:
            "Users in this setting (neighbourhood noise log) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (neighbourhood noise log) provided brief comments about their experience in this setting.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Para pengguna dalam konteks catatan kebisingan lingkungan memberikan komentar yang singkat dan ringkas.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna dalam konteks catatan kebisingan lingkungan memberikan komentar singkat mereka sendiri secara pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna dalam konteks catatan kebisingan lingkungan memberikan komentar singkat dalam bentuk pendek.",
        },
        {
          isCorrect: true,
          label:
            "Para pengguna di pencatatan kebisingan lingkungan memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna dalam konteks catatan kebisingan lingkungan memberikan komentar singkat tentang pengalaman mereka dalam konteks tersebut.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
