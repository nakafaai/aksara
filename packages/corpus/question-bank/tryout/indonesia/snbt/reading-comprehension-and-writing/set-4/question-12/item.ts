import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "punctuation",
  },
  stimulus: "peron",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Agar buku-buku tetap tersusun rapi, rak-rak itu dirawat bergiliran oleh: mahasiswa, pensiunan guru, dan pedagang kios di peron.",
        },
        {
          correct: false,
          label:
            "Agar buku-buku tetap tersusun rapi, rak-rak itu dirawat bergiliran oleh mahasiswa, pensiunan, guru, dan pedagang kios di peron.",
        },
        {
          correct: true,
          label:
            "Agar buku-buku tetap tersusun rapi, rak-rak itu dirawat bergiliran oleh mahasiswa, pensiunan guru, dan pedagang kios di peron.",
        },
        {
          correct: false,
          label:
            "Agar buku-buku tetap tersusun rapi rak-rak itu dirawat bergiliran oleh mahasiswa, pensiunan guru, dan pedagang kios di peron.",
        },
        {
          correct: false,
          label:
            "Agar buku-buku tetap tersusun rapi, rak-rak itu dirawat bergiliran oleh mahasiswa, pensiunan, guru dan pedagang kios di peron.",
        },
      ],
    },
  },
};

export default item;
