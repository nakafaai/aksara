import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "explicit-information",
  },
  stimulus: "jamu-label",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "harga jamu dan alamat warung",
        },
        {
          correct: false,
          label: "nama sekolah dan nama warung",
        },
        {
          correct: false,
          label: "cara membuat jamu kunyit asam",
        },
        {
          correct: true,
          label: "daftar bahan, tanggal pembuatan, dan batas waktu minum",
        },
        {
          correct: false,
          label: "nomor telepon dinas koperasi",
        },
      ],
    },
  },
};

export default item;
