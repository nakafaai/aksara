import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Informationsschalter im Stadtpark gaben kurze und knappe Rückmeldungen.",
        },
        {
          isCorrect: true,
          label:
            "Die Nutzenden im untersuchten Kontext (Informationsstelle im Stadtpark) gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Informationsschalter im Stadtpark gaben ihre eigenen kurzen Rückmeldungen persönlich ab.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Informationsschalter im Stadtpark gaben kurze Rückmeldungen in knapper Form.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Informationsschalter im Stadtpark gaben kurze Rückmeldungen über ihre Erfahrungen in diesem Kontext.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Users in this setting (city park information desk) provided comments that were brief and concise.",
        },
        {
          isCorrect: true,
          label:
            "Users in this setting (city park information desk) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (city park information desk) provided their own brief comments personally.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (city park information desk) provided brief comments in a short form.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (city park information desk) provided brief comments about their experience in this setting.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengguna pusat informasi taman kota memberikan komentar yang singkat dan ringkas.",
        },
        {
          isCorrect: true,
          label:
            "Pengguna pusat informasi taman kota memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna pusat informasi taman kota memberikan komentar singkat mereka sendiri secara pribadi.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna pusat informasi taman kota memberikan komentar singkat dalam bentuk pendek.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna pusat informasi taman kota memberikan komentar singkat tentang pengalaman mereka di pusat tersebut.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
