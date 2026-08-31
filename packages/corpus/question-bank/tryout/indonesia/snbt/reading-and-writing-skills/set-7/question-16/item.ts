import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Regenschirmverleih am Bahnhof gaben kurze und knappe Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Regenschirmverleih am Bahnhof gaben ihre eigenen kurzen Rückmeldungen persönlich ab.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Regenschirmverleih am Bahnhof gaben kurze Rückmeldungen in knapper Form.",
        },
        {
          isCorrect: true,
          label:
            "Die Nutzenden im untersuchten Kontext (Schirmverleih am Bahnhof) gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Regenschirmverleih am Bahnhof gaben kurze Rückmeldungen über ihre Erfahrungen in diesem Kontext.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Users in this setting (station umbrella lending) provided comments that were brief and concise.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (station umbrella lending) provided their own brief comments personally.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (station umbrella lending) provided brief comments in a short form.",
        },
        {
          isCorrect: true,
          label:
            "Users in this setting (station umbrella lending) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (station umbrella lending) provided brief comments about their experience in this setting.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengguna layanan peminjaman payung di stasiun memberikan komentar yang singkat dan ringkas.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna layanan peminjaman payung di stasiun memberikan komentar singkat mereka sendiri secara pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna layanan peminjaman payung di stasiun memberikan komentar singkat dalam bentuk pendek.",
        },
        {
          isCorrect: true,
          label:
            "Pengguna layanan peminjaman payung di stasiun memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna layanan peminjaman payung di stasiun memberikan komentar singkat tentang pengalaman mereka dalam layanan tersebut.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
