import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "paraphrase",
  },
  stimulus: "shorebird-flyway",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Lebih dari separuh dataran pasang surut Laut Kuning yang ada pada 1980-an telah hilang pada akhir 2000-an.",
        },
        {
          column: 1,
          label:
            "Angka $$28\\%$$ dan $$65\\%$$ dapat sama-sama benar karena keduanya menghitung kehilangan dalam kurun waktu yang berbeda.",
        },
        {
          column: 1,
          label:
            "Burung yang tidak pernah singgah di pesisir Indonesia tetap dapat dirugikan oleh hilangnya dataran lumpur di Laut Kuning.",
        },
        {
          column: 2,
          label:
            "Penulis menolak anggapan pegiat karena dataran lumpur yang tersisa terlalu sempit untuk didarati burung yang pindah.",
        },
      ],
    },
  },
};

export default item;
