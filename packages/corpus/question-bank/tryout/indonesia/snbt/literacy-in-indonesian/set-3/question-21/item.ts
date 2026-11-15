import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "railway-java",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jalur pertama itu dibangun oleh perusahaan swasta, bukan oleh pemerintah kolonial.",
        },
        {
          correct: false,
          label:
            "Gula, kopi, dan tembakau dari pedalaman Jawa Tengah dijual mahal di pasar Eropa.",
        },
        {
          correct: false,
          label:
            "Pada tahun-tahun pertama, rel itu juga dipakai untuk mengangkut pegawai perusahaan perkebunan ke kantor mereka di Semarang.",
        },
        {
          correct: false,
          label:
            "Kota-kota kecil di sepanjang rel tumbuh lebih cepat daripada kota-kota di Jawa Tengah yang tidak dilalui rel.",
        },
        {
          correct: true,
          label:
            "Pada tahun-tahun pertama, sebagian besar muatan jalur itu adalah penumpang biasa dan barang mereka, bukan hasil perkebunan.",
        },
      ],
    },
  },
};

export default item;
