import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rata-rata $$0{,}28$$ gram membuktikan bahwa tidak ada air yang keluar dari permukaan bawah setelah diberi lapisan.",
        },
        {
          correct: false,
          label:
            "Selisih antara $$0{,}82$$ dan $$0{,}74$$ gram membuktikan bahwa permukaan atas tidak berperan sama sekali dalam kehilangan air.",
        },
        {
          correct: true,
          label:
            "Nilai $$0{,}28$$ gram mendukung dugaan bahwa pelapisan permukaan bawah mengurangi kehilangan air pada sampel ini, tetapi daun petik dari satu jenis belum mewakili tumbuhan utuh secara umum.",
        },
        {
          correct: false,
          label:
            "Pengacakan daun membuat hasil percobaan dapat diterapkan langsung pada semua spesies dalam setiap kondisi lingkungan.",
        },
        {
          correct: false,
          label:
            "Karena hanya ada delapan daun per kelompok, perbedaan rata-rata tidak boleh digunakan sebagai bukti awal apa pun.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
