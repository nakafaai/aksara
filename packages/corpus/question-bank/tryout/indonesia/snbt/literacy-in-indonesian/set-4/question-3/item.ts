import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karena kondisi perubahan menghasilkan $$25$$, sedangkan nilai awal $$29$$ dan pembanding $$28$$, panel peneduh yang dipasang selama empat jam siang telah terisolasi sebagai satu-satunya penyebab selama volume air, letak termometer, dan waktu pencatatan dibuat sama.",
        },
        {
          correct: false,
          label:
            "Pengulangan paling informatif sebaiknya mengubah volume air, letak termometer, dan waktu pencatatan bersamaan dengan panel peneduh yang dipasang selama empat jam siang agar gabungan kondisi yang lebih realistis dapat diuji.",
        },
        {
          correct: false,
          label:
            "Keterbatasan bahwa simulasi belum menguji hari berawan atau perubahan kecepatan angin memengaruhi ketelitian angka, tetapi tidak memengaruhi luas penerapan temuan tentang suhu air pada kolam mini.",
        },
        {
          correct: false,
          label:
            "Pengulangan dengan lebih banyak unit dapat mempersempit ketidakpastian, tetapi tidak mungkin mengubah penafsiran awal tentang suhu air pada kolam mini.",
        },
        {
          correct: true,
          label:
            "Pada kondisi yang diuji, panel peneduh yang dipasang selama empat jam siang berkaitan dengan suhu rata-rata $$25$$ derajat Celsius, lebih rendah daripada nilai awal $$29$$ dan pembanding $$28$$ derajat Celsius. Karena simulasi belum menguji hari berawan atau perubahan kecepatan angin, pola itu perlu diuji lagi sebelum diperluas menjadi klaim umum.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
