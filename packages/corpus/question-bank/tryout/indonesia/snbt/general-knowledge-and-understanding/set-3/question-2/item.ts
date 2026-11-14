import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "conclusion",
  },
  stimulus: "kabin",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Cara atmosfer bumi memanas lebih dekat dengan penjelasan populer tentang panasnya mobil daripada dengan penjelasan yang dipilih banyak fisikawan.",
        },
        {
          correct: true,
          label:
            "Pada menit-menit awal setelah mobil diparkir, sifat kaca menyumbang lebih banyak pemanasan daripada terhalangnya pertukaran udara.",
        },
        {
          correct: false,
          label:
            "Penjelasan populer akan meramalkan bahwa kotak bertutup garam batu menjadi lebih sejuk daripada kotak bertutup kaca.",
        },
        {
          correct: false,
          label:
            "Sifat kaca terhadap inframerah tetap ikut menyumbang pemanasan kabin, meskipun bukan penyumbang yang terbesar.",
        },
        {
          correct: false,
          label:
            "Dasbor yang panas menghangatkan kabin lewat dua jalan, yaitu lewat udara yang menyentuhnya dan lewat inframerah yang sebagian dipancarkan kembali oleh kaca.",
        },
      ],
    },
  },
};

export default item;
