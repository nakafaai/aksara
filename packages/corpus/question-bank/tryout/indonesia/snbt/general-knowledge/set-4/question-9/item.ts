import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Die Beschwerden über das Signal konzentrierten sich auf einen Marktgang"; der folgende nutzt "Digitale Zahlung ist nachweislich immer schneller und sollte Bargeld auf jedem Markt ersetzen" als Hauptbeleg.',
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Weil einige Nutzer Hindernisse erleben, sollte die digitale Spur trotz ihres Nutzens für andere abgeschafft werden" als endgültigen Schluss fest; der folgende nennt nur den Plan "Im nächsten Test wird das Netz verbessert und werden Einkäufe mit ähnlicher Artikelzahl verglichen".',
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Digitale Zahlung ist nachweislich immer schneller und sollte Bargeld auf jedem Markt ersetzen" fest.',
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Weil einige Nutzer Hindernisse erleben, sollte die digitale Spur trotz ihres Nutzens für andere abgeschafft werden" aus dem Beleg "Die Beschwerden über das Signal konzentrierten sich auf einen Marktgang" ab.',
        },
        {
          isCorrect: true,
          label:
            "Erste Daten führen zu einem Vorschlag; aufgeteilte Daten zeigen seine Grenzen und führen zu einer gemischten Lösung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'The first part advances the claim "Signal complaints were concentrated in one market aisle", and the later part uses "Digital payment is proven always faster and should replace cash in every market" as its main support.',
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "Because some users face barriers, the digital lane should be removed despite benefiting other groups" as a final conclusion; the later part only states the plan "The next test will improve the network and compare purchases with similar item counts".',
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "Digital payment is proven always faster and should replace cash in every market" from the same perspective without adding a test.',
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "Because some users face barriers, the digital lane should be removed despite benefiting other groups" from the evidence "Signal complaints were concentrated in one market aisle".',
        },
        {
          isCorrect: true,
          label:
            "Initial data prompt a policy proposal, then disaggregated data reveal its limits and lead to a mixed decision.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Keluhan sinyal terkonsentrasi pada satu lorong di sisi pasar", lalu bagian kedua memakai "Pembayaran digital terbukti selalu lebih cepat dan harus menggantikan uang tunai di semua pasar" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Karena sebagian pengguna mengalami kendala, jalur digital sebaiknya dihapus meskipun bermanfaat bagi kelompok lain" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Uji berikutnya akan memperbaiki jaringan dan membandingkan jumlah barang yang sebanding".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Pembayaran digital terbukti selalu lebih cepat dan harus menggantikan uang tunai di semua pasar" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Karena sebagian pengguna mengalami kendala, jalur digital sebaiknya dihapus meskipun bermanfaat bagi kelompok lain" dari bukti "Keluhan sinyal terkonsentrasi pada satu lorong di sisi pasar".',
        },
        {
          isCorrect: true,
          label:
            "Data awal memunculkan usulan kebijakan, lalu pemisahan data mengungkap batas usulan dan mengarahkan keputusan campuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
