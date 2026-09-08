import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Nutzenden der Proberäume gaben kurze Rückmeldungen, die nicht lang waren.",
        },
        {
          isCorrect: true,
          label: "Die Nutzenden der Proberäume gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden der Proberäume gaben kurze Rückmeldungen als Personen, die die Proberäume nutzten.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden der Proberäume gaben kurze Rückmeldungen in kurzer Form.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden der Proberäume gaben kurze Rückmeldungen, also Rückmeldungen von geringer Länge.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The practice-room users gave brief comments that were not long.",
        },
        {
          isCorrect: true,
          label: "The practice-room users gave brief comments.",
        },
        {
          isCorrect: false,
          label:
            "The practice-room users gave brief comments as people using the practice rooms.",
        },
        {
          isCorrect: false,
          label: "The practice-room users gave brief comments in a brief form.",
        },
        {
          isCorrect: false,
          label:
            "The practice-room users gave brief comments, meaning comments that were short.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar singkat yang tidak panjang.",
        },
        {
          isCorrect: true,
          label: "Pengguna ruang latihan musik memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar singkat sebagai pengguna yang memakai ruang latihan musik.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
