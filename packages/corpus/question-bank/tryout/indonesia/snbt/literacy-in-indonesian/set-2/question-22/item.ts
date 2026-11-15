import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "botanic-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "menanam padi varietas provinsi lain di lahan uji untuk melihat apakah padi itu tumbuh baik sebelum dibagikan kepada petani",
        },
        {
          correct: false,
          label:
            "menyimpan biji ratusan jenis tumbuhan langka dalam ruang pendingin agar dapat ditanam kembali jika jenis itu punah di alam",
        },
        {
          correct: false,
          label:
            "mengeringkan dan memberi label pada daun dan bunga tumbuhan hutan untuk dipelajari ciri-cirinya oleh peneliti",
        },
        {
          correct: false,
          label:
            "memindahkan anggrek yang hampir punah dari hutan yang akan dibuka ke sebuah taman di kota agar tetap hidup dan berbunga",
        },
        {
          correct: false,
          label:
            "membuka taman kota yang rindang agar warga punya tempat beristirahat dan berolahraga",
        },
      ],
    },
  },
};

export default item;
