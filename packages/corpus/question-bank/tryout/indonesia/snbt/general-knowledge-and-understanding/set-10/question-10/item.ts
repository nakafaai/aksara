import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Audit kedua menunjukkan catatan yang diperbarui pada setiap tahap dapat melacak batch bermasalah tanpa menarik produk yang tidak terkait.",
        },
        {
          correct: false,
          label:
            "Simulasi lain menunjukkan bahwa kode satu lokasi mempercepat penelusuran, tetapi tidak dapat membedakan dua pemasok yang beroperasi di lokasi yang sama.",
        },
        {
          correct: false,
          label:
            "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap.",
        },
        {
          correct: false,
          label: "Singkong diiris di Desa Rawa dan digoreng di kota.",
        },
        {
          correct: true,
          label:
            "Pada simulasi lanjutan dengan kasus yang sebanding, catatan berlapis dan label satu lokasi menghasilkan cakupan penarikan yang sama persis meskipun semua data telah diperbarui.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
