import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Katalog yang dapat ditelusuri perlu menjaga berbagai nama beserta sumbernya agar kemudahan pencarian tidak menghapus atribusi.",
        },
        {
          correct: false,
          label:
            "Pengelola dapat memilih satu nama yang paling mudah dicari dan menghapus sebutan lainnya.",
        },
        {
          correct: true,
          label:
            "Foto tanpa nama pembuat beredar, sedangkan label kurator lebih sering dikutip daripada keterangan keluarga.",
        },
        {
          correct: false,
          label: "Hasil pencarian akan menampilkan sumber setiap nama.",
        },
        {
          correct: false,
          label:
            "Setiap objek harus ditampilkan tanpa judul utama agar semua nama benar-benar setara.",
        },
      ],
    },
  },
};

export default item;
