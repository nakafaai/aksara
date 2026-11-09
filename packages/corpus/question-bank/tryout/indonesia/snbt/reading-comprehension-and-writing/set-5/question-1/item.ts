import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "indigo-batik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sisa pewarna sintetis membuat air sungai berwarna gelap dan berbau.",
        },
        {
          correct: false,
          label: "Kain harus dicelup dan dijemur sampai dua puluh kali.",
        },
        {
          correct: false,
          label: "Wisatawan banyak mencari batik berwarna alami.",
        },
        {
          correct: true,
          label:
            "Pewarnaan dengan daun tom lebih lama, tetapi menguntungkan perajin dan lingkungan.",
        },
        {
          correct: false,
          label: "Sisa air rendaman daun tom dapat dipakai sebagai pupuk.",
        },
      ],
    },
  },
};

export default item;
