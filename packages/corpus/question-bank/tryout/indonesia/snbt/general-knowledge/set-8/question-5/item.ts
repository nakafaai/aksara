import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Katalog yang dapat ditelusuri perlu menjaga berbagai nama beserta sumbernya agar kemudahan pencarian tidak menghapus atribusi.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola dapat memilih satu nama yang paling mudah dicari dan menghapus sebutan lainnya.",
        },
        {
          isCorrect: true,
          label:
            "Foto tanpa nama pembuat beredar, sedangkan label kurator lebih sering dikutip daripada keterangan keluarga.",
        },
        {
          isCorrect: false,
          label: "Hasil pencarian akan menampilkan sumber setiap nama.",
        },
        {
          isCorrect: false,
          label:
            "Setiap objek harus ditampilkan tanpa judul utama agar semua nama benar-benar setara.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
