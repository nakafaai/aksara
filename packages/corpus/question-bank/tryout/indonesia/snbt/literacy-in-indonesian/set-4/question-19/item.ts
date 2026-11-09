import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "regional-language",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Teks 2 menolak semua bentuk pelajaran bahasa daerah di sekolah.",
        },
        {
          column: 1,
          label:
            "Teks 1 menyebut kebiasaan orang tua sebagai penyebab berkurangnya penutur muda.",
        },
        {
          column: 1,
          label:
            "Menurut Teks 2, murid di kelasnya berbicara dalam sembilan bahasa yang berbeda di rumah.",
        },
        {
          column: 2,
          label:
            "Teks 1 mengusulkan agar pelajaran bahasa daerah hanya diberikan di SMA.",
        },
      ],
    },
  },
};

export default item;
