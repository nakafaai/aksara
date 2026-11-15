import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "lighthouse-keeper",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jam pemutar baru dicabut besok, dan Wulan mengetik penjelasan Pak Darsa di ponselnya malam itu.",
        },
        {
          correct: false,
          label:
            "Ayahnya dulu berhenti memutar engkol karena batuk-batuk, dan siang itu Pak Darsa masih naik ke ruang lampu.",
        },
        {
          correct: true,
          label:
            "Jam pemutar baru dicabut besok, dan siang itu Pak Darsa masih naik ke ruang lampu untuk memoles lensa.",
        },
        {
          correct: false,
          label:
            "Wulan datang membawa jadwal kerja dalam map plastik, dan malam itu Pak Darsa duduk di ruang bawah bersama Wulan.",
        },
        {
          correct: false,
          label:
            "Siang itu Pak Darsa masih naik ke ruang lampu untuk memoles lensa, dan paginya ia menyerahkan kunci kepada Wulan.",
        },
      ],
    },
  },
};

export default item;
