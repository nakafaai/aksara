import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Harga gabah, GKP (gabah kering panen), di tingkat petani terus mengalami penurunan dari tahun ke tahun",
        },
        {
          correct: false,
          label:
            "Pemerintah terpaksa menaikkan harga pembelian gabah petani dan memberikan bantuan pada petani",
        },
        {
          correct: false,
          label:
            "Pihak terkait harus merevisi Peraturan Presiden Nomor $$63$$ Tahun $$2017$$ tentang Penyaluran Bantuan Sosial secara Nontunai",
        },
        {
          correct: false,
          label:
            "Transaksi penjualan gabah di $$30$$ provinsi selama April $$2019$$ turun $$5{,}37\\%$$ sangat kontras dengan kenaikan harga kebutuhan",
        },
        {
          correct: true,
          label:
            "Melemahnya stabilisasi harga di tingkat petani menggerus daya beli dan kesejahteraan petani",
        },
      ],
    },
  },
};

export default item;
