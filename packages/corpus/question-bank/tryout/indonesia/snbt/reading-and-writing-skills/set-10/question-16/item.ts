import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Parkbesuchenden gaben kurze Rückmeldungen, die nicht lang waren.",
        },
        {
          isCorrect: true,
          label: "Die Parkbesuchenden gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Parkbesuchenden gaben kurze Rückmeldungen als Personen, die den Park besuchten.",
        },
        {
          isCorrect: false,
          label:
            "Die Parkbesuchenden gaben kurze Rückmeldungen in kurzer Form.",
        },
        {
          isCorrect: false,
          label:
            "Die Parkbesuchenden gaben kurze Rückmeldungen, also Rückmeldungen von geringer Länge.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The park visitors gave brief comments that were not long.",
        },
        {
          isCorrect: true,
          label: "The park visitors gave brief comments.",
        },
        {
          isCorrect: false,
          label:
            "The park visitors gave brief comments as people visiting the park.",
        },
        {
          isCorrect: false,
          label: "The park visitors gave brief comments in a brief form.",
        },
        {
          isCorrect: false,
          label:
            "The park visitors gave brief comments, meaning comments that were short.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengunjung taman memberikan komentar singkat yang tidak panjang.",
        },
        {
          isCorrect: true,
          label: "Pengunjung taman memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung taman memberikan komentar singkat sebagai orang yang mengunjungi taman.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung taman memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung taman memberikan komentar singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
