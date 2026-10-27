import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Alokasi anggaran pendidikan meningkat",
        },
        {
          correct: false,
          label:
            "Banyak mahasiswa berprestasi dapat berkuliah di universitas terkemuka dalam negeri",
        },
        {
          correct: true,
          label:
            "Banyak mahasiswa berprestasi terbaik Indonesia dapat berkuliah di universitas terkemuka di luar negeri",
        },
        {
          correct: false,
          label:
            "Beberapa mahasiswa berprestasi terbaik Indonesia dapat berkuliah di universitas terkemuka di luar negeri",
        },
        {
          correct: false,
          label:
            "Sebagian alokasi anggaran pendidikan tidak sepenuhnya terserap",
        },
      ],
    },
  },
};

export default item;
