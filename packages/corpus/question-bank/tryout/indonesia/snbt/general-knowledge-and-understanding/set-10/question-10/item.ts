import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Audit kedua menunjukkan catatan yang diperbarui pada setiap tahap dapat melacak batch bermasalah tanpa menarik produk yang tidak terkait.",
        },
        {
          isCorrect: false,
          label:
            "Simulasi lain menunjukkan bahwa kode satu lokasi mempercepat penelusuran, tetapi tidak dapat membedakan dua pemasok yang beroperasi di lokasi yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap.",
        },
        {
          isCorrect: false,
          label: "Singkong diiris di Desa Rawa dan digoreng di kota.",
        },
        {
          isCorrect: true,
          label:
            "Pada simulasi lanjutan dengan kasus yang sebanding, catatan berlapis dan label satu lokasi menghasilkan cakupan penarikan yang sama persis meskipun semua data telah diperbarui.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
