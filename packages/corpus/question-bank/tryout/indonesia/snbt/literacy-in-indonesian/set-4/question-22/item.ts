import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "balai-pustaka",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Komisi yang memilih bacaan untuk rakyat sudah bekerja sebelum nama Balai Pustaka dipakai.",
        },
        {
          column: 2,
          label: "Balai Pustaka hanya menerbitkan buku dalam bahasa Melayu.",
        },
        {
          column: 1,
          label:
            "Naskah yang mengkritik pemerintah kolonial sulit terbit lewat Balai Pustaka.",
        },
        {
          column: 2,
          label:
            'Istilah "bacaan liar" dipakai para penulis pergerakan untuk menyebut karya mereka sendiri.',
        },
        {
          column: 1,
          label:
            "Sebagian karya yang kini dianggap penting dalam sastra Indonesia terbit lewat Balai Pustaka.",
        },
      ],
    },
  },
};

export default item;
