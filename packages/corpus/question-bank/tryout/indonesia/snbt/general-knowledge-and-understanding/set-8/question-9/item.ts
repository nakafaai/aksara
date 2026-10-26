import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Keterbatasan satu kolom menyingkap hilangnya konteks, lalu metadata dipisahkan untuk memperbaiki pencarian dan atribusi.",
        },
        {
          correct: false,
          label:
            'Bagian awal mengajukan klaim "Salah satu nama dalam buku lama dibuat oleh kurator", lalu bagian kedua memakai "Setiap objek harus ditampilkan tanpa judul utama agar semua nama benar-benar setara" sebagai dukungan utama.',
        },
        {
          correct: false,
          label:
            'Bagian pertama menetapkan "Nama yang paling sering dikutip pasti merupakan nama yang diberikan pembuat kain" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Hasil pencarian akan menampilkan sumber setiap nama".',
        },
        {
          correct: false,
          label:
            'Kedua bagian mempertahankan klaim "Setiap objek harus ditampilkan tanpa judul utama agar semua nama benar-benar setara" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          correct: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Nama yang paling sering dikutip pasti merupakan nama yang diberikan pembuat kain" dari bukti "Salah satu nama dalam buku lama dibuat oleh kurator".',
        },
      ],
    },
  },
};

export default item;
