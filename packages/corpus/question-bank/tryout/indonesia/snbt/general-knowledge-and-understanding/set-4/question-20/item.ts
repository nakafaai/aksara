import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Koordinat menunjukkan bahwa salah satu nama ternyata merujuk pada mata air berbeda beberapa kilometer jauhnya.",
        },
        {
          correct: false,
          label:
            "Pengguna yang mencari dengan ketiga nama berhasil menemukan koordinat yang sama tanpa kebingungan tambahan.",
        },
        {
          correct: false,
          label:
            "Sebagian pengguna memerlukan legenda untuk membedakan simbol mata air, walaupun ketiga nama tetap menunjuk koordinat yang sama.",
        },
        {
          correct: false,
          label:
            "Bukti baru dapat mengubah catatan tanpa menghapus riwayat nama sebelumnya.",
        },
        {
          correct: false,
          label: "Nama administrasi ditetapkan sebagai indeks utama.",
        },
      ],
    },
  },
};

export default item;
