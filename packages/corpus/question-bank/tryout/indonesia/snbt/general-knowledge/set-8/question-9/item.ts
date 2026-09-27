import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Keterbatasan satu kolom menyingkap hilangnya konteks, lalu metadata dipisahkan untuk memperbaiki pencarian dan atribusi.",
        },
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Salah satu nama dalam buku lama dibuat oleh kurator", lalu bagian kedua memakai "Setiap objek harus ditampilkan tanpa judul utama agar semua nama benar-benar setara" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Nama yang paling sering dikutip pasti merupakan nama yang diberikan pembuat kain" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Hasil pencarian akan menampilkan sumber setiap nama".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Setiap objek harus ditampilkan tanpa judul utama agar semua nama benar-benar setara" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Nama yang paling sering dikutip pasti merupakan nama yang diberikan pembuat kain" dari bukti "Salah satu nama dalam buku lama dibuat oleh kurator".',
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
