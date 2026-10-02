import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Koordinat menunjukkan bahwa salah satu nama ternyata merujuk pada mata air berbeda beberapa kilometer jauhnya.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna yang mencari dengan ketiga nama berhasil menemukan koordinat yang sama tanpa kebingungan tambahan.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian pengguna memerlukan legenda untuk membedakan simbol mata air, walaupun ketiga nama tetap menunjuk koordinat yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Bukti baru dapat mengubah catatan tanpa menghapus riwayat nama sebelumnya.",
        },
        {
          isCorrect: false,
          label: "Nama administrasi ditetapkan sebagai indeks utama.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
