import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Harga gabah, GKP (gabah kering panen), di tingkat petani terus mengalami penurunan dari tahun ke tahun",
        },
        {
          isCorrect: false,
          label:
            "Pemerintah terpaksa menaikkan harga pembelian gabah petani dan memberikan bantuan pada petani",
        },
        {
          isCorrect: false,
          label:
            "Pihak terkait harus merevisi Peraturan Presiden Nomor $$63$$ Tahun $$2017$$ tentang Penyaluran Bantuan Sosial secara Nontunai",
        },
        {
          isCorrect: false,
          label:
            "Transaksi penjualan gabah di $$30$$ provinsi selama April $$2019$$ turun $$5{,}37\\%$$ sangat kontras dengan kenaikan harga kebutuhan",
        },
        {
          isCorrect: true,
          label:
            "Melemahnya stabilisasi harga di tingkat petani menggerus daya beli dan kesejahteraan petani",
        },
      ],
    },
  },
};

export default item;
