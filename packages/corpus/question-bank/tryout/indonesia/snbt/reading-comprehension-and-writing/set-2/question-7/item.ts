import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "author-purpose",
  },
  stimulus: "jelantah",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menunjukkan bahwa bank sampah kalah bersaing dengan pengumpul keliling sehingga program itu sebaiknya dihentikan",
        },
        {
          correct: false,
          label:
            "menjelaskan bahwa pengumpul keliling berani membayar lebih mahal karena jelantah yang mereka beli dijual lagi sebagai minyak goreng",
        },
        {
          correct: false,
          label:
            "menyarankan agar bank sampah menaikkan imbalan sampai sama dengan harga yang dibayar pengumpul keliling",
        },
        {
          correct: false,
          label:
            "menegaskan bahwa sebagian besar warung sudah menyetor jelantahnya ke bank sampah kelurahan",
        },
        {
          correct: true,
          label:
            "mengakui kekurangan program sebelum menunjukkan risiko di balik harga pengumpul keliling yang lebih tinggi",
        },
      ],
    },
  },
};

export default item;
