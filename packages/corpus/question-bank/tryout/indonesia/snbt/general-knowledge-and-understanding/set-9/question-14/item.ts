import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            'Bagian awal mengajukan klaim "Bagian tengah jembatan diganti besar-besaran pada 1958", lalu bagian kedua memakai "Karena ada beberapa tanggal, tidak ada satu pun fakta tentang riwayat jembatan yang dapat dipastikan" sebagai dukungan utama.',
        },
        {
          correct: false,
          label:
            'Bagian pertama menetapkan "Satu tanggal paling tua selalu paling tepat untuk semua jenis sejarah" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Plakat baru akan menampilkan garis waktu dengan arti setiap tanggal".',
        },
        {
          correct: true,
          label:
            "Temuan beberapa tanggal memunculkan ambiguitas, lalu pembedaan konsep digunakan untuk menyusun label yang lebih tepat.",
        },
        {
          correct: false,
          label:
            'Kedua bagian mempertahankan klaim "Karena ada beberapa tanggal, tidak ada satu pun fakta tentang riwayat jembatan yang dapat dipastikan" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          correct: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Satu tanggal paling tua selalu paling tepat untuk semua jenis sejarah" dari bukti "Bagian tengah jembatan diganti besar-besaran pada 1958".',
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
