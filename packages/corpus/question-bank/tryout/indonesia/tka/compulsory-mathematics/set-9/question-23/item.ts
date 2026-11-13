import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "saudara",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jika $$4$$ siswa baru yang masing-masing mempunyai $$3$$ saudara kandung bergabung ke kelas itu, rata-rata banyak saudara kandung seluruh siswa naik dan rata-rata banyak saudara kandung siswa yang bukan anak tunggal juga naik.",
        },
        {
          column: 1,
          label:
            "Berapa pun banyak siswa baru yang masing-masing mempunyai $$3$$ saudara kandung bergabung ke kelas itu, rata-rata banyak saudara kandung seluruh siswa tetap kurang dari $$3$$.",
        },
        {
          column: 2,
          label:
            "Jika setiap siswa yang tercatat mempunyai $$5$$ saudara kandung ternyata hanya mempunyai $$4$$ saudara kandung, rata-rata banyak saudara kandung seluruh siswa turun lebih dari $$0{,}25$$.",
        },
      ],
    },
  },
};

export default item;
