import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "shorebird-flyway",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Populasi burung pantai yang singgah di muara itu menyusut lebih dari separuh setelah jalan di atas pematang dibuka.",
        },
        {
          correct: false,
          label:
            "Jalan di atas pematang mengurangi mangsa di lumpur sehingga burung yang makan saat surut ikut berkurang.",
        },
        {
          correct: true,
          label:
            "Burung masih makan di lumpur muara, tetapi banyak yang bertengger di tempat lain saat pasang, dan itu dapat menggerus cadangan lemaknya bila tempatnya jauh.",
        },
        {
          correct: false,
          label:
            "Gangguan di pematang tidak merugikan burung karena jumlah burung yang makan saat surut hampir tidak berubah.",
        },
        {
          correct: false,
          label:
            "Hitungan saat pasang turun karena dataran lumpur di muara itu menyusut seperti dataran pasang surut di Laut Kuning.",
        },
      ],
    },
  },
};

export default item;
