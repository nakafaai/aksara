import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "fansur",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Berbeda dengan kapur barus, kemenyan dapat diperoleh tanpa membelah batang pohonnya.",
        },
        {
          column: 2,
          label:
            "Temuan di Lobu Tua membuktikan bahwa kapal-kapal dari Barus sudah berlayar langsung ke Tiongkok pada abad ke-11.",
        },
        {
          column: 2,
          label:
            "Ketika Barus berada di bawah pengaruh Kesultanan Aceh, kapur barus sudah harus bersaing dengan kamper buatan pabrik.",
        },
        {
          column: 1,
          label:
            "Kapur yang dipuji dalam sumber-sumber Arab hanya dapat diperoleh dengan mengorbankan pohon yang menghasilkannya.",
        },
      ],
    },
  },
};

export default item;
