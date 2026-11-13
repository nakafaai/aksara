import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "flaw",
  },
  stimulus: "denda",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Angka $$40\\%$$ adalah bagian penunggak di antara pengunjung ruang baca, padahal survei di ruang baca tidak mungkin menjangkau penunggak yang belum kembali ke perpustakaan.",
        },
        {
          correct: false,
          label:
            "Survei terhadap $$300$$ orang terlalu kecil untuk menggambarkan keadaan $$1{.}500$$ anggota yang menunggak denda.",
        },
        {
          correct: false,
          label:
            "Survei tidak menanyakan apakah para penunggak kembali karena dendanya dihapus atau karena menerima pesan pengingat.",
        },
        {
          correct: false,
          label:
            "Kepala perpustakaan seharusnya membagi $$120$$ dengan $$1{.}500$$, sehingga penunggak yang sudah kembali aktif hanya $$8\\%$$.",
        },
        {
          correct: false,
          label:
            "Penunggak yang ikut survei mungkin malu mengaku pernah menunggak denda, sehingga angka $$120$$ terlalu besar.",
        },
      ],
    },
  },
};

export default item;
