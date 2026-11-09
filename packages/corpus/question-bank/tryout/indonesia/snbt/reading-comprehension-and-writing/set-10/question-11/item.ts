import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "title",
  },
  stimulus: "larva-monitors",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Musim Hujan di Indonesia",
        },
        {
          correct: true,
          label:
            "Anak-Anak Pemantau Jentik Menekan Demam Berdarah di Kelurahan Cempaka",
        },
        {
          correct: false,
          label: "Bak Mandi dan Vas Bunga",
        },
        {
          correct: false,
          label: "Kartu Pemantauan Jentik",
        },
        {
          correct: false,
          label: "Burung dan Tempat Minumnya",
        },
      ],
    },
  },
};

export default item;
