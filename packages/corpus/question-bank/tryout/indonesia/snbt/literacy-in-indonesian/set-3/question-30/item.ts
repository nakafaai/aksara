import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "anchoring-price",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Peserta lelang yang lebih dulu ditanya apakah lukisan itu bernilai lebih atau kurang dari Rp$$50{.}000{.}000$$ menawar lebih tinggi daripada yang ditanya dengan Rp$$5{.}000{.}000$$.",
        },
        {
          correct: false,
          label:
            "Seorang pembeli membayar Rp$$600{.}000$$ untuk jaket setelah temannya yang penjahit menghitung harga bahan dan ongkos jahitnya.",
        },
        {
          correct: false,
          label:
            "Seorang pembeli memilih satu dari dua sepatu yang sama persis karena harganya lebih murah di toko sebelah.",
        },
        {
          correct: true,
          label:
            "Siswa yang mula-mula ditanya apakah tinggi sebuah menara lebih atau kurang dari $$900$$ meter menebak lebih tinggi daripada yang ditanya dengan $$90$$ meter.",
        },
        {
          correct: false,
          label:
            "Seorang penjual menurunkan harga madu setelah melihat struk belanja pembeli dari pasar yang harganya lebih rendah.",
        },
      ],
    },
  },
};

export default item;
