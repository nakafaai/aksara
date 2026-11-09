import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "mobile-library",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia ingin menghafal seluruh isi buku itu untuk mengikuti lomba di sekolahnya.",
        },
        {
          correct: false,
          label:
            "Buku-buku lain di kotak Wulan sudah selesai ia baca semuanya.",
        },
        {
          correct: false,
          label:
            "Wulan melarang anak-anak meminjam buku selain buku bergambar.",
        },
        {
          correct: true,
          label:
            "Ia belum lancar membaca dan menutupinya dengan buku yang gambarnya ia kenal.",
        },
        {
          correct: false,
          label: "Ia ingin menjadi nelayan yang mencari ikan paus.",
        },
      ],
    },
  },
};

export default item;
