import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Protokoll zeigt Hindernisse; anschließend sollen Verfahrensänderungen sie verringern und die Repräsentation prüfen.",
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Fast alle ersten Redebeiträge kamen aus den drei nächstgelegenen Vierteln"; der folgende nutzt "Eine Beratung ist nur gültig, wenn jeder Vorschlag angenommen wird" als Hauptbeleg.',
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Wegen der offenen Einladung müssen Herkunft und Abwesenheitsgründe nicht geprüft werden" als endgültigen Schluss fest; der folgende nennt nur den Plan "Die endgültige Entscheidung wird Auswahl, Einwände und Einfluss der Beiträge festhalten".',
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Eine Beratung ist nur gültig, wenn jeder Vorschlag angenommen wird" fest.',
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Wegen der offenen Einladung müssen Herkunft und Abwesenheitsgründe nicht geprüft werden" aus dem Beleg "Fast alle ersten Redebeiträge kamen aus den drei nächstgelegenen Vierteln" ab.',
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The meeting record reveals barriers, and procedural changes are then designed to reduce them and test representation.",
        },
        {
          isCorrect: false,
          label:
            'The first part advances the claim "Nearly every initial speaker came from the three nearest neighbourhoods", and the later part uses "A consultation is valid only if every resident proposal is ultimately accepted" as its main support.',
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "Because the invitation was open, participant origins and reasons for absence need not be examined" as a final conclusion; the later part only states the plan "The final decision will record the choice, objections, and the influence of contributions".',
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "A consultation is valid only if every resident proposal is ultimately accepted" from the same perspective without adding a test.',
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "Because the invitation was open, participant origins and reasons for absence need not be examined" from the evidence "Nearly every initial speaker came from the three nearest neighbourhoods".',
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Catatan rapat mengungkap hambatan, lalu perubahan prosedur dirancang untuk mengurangi hambatan dan menguji keterwakilan.",
        },
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Hampir seluruh pembicara pertama berasal dari tiga rukun tetangga terdekat", lalu bagian kedua memakai "Musyawarah hanya sah jika setiap usulan warga akhirnya diterima" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Karena undangan terbuka, asal peserta dan alasan ketidakhadiran tidak perlu diperiksa" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Keputusan akhir akan mencatat pilihan, keberatan, dan pengaruh masukan".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Musyawarah hanya sah jika setiap usulan warga akhirnya diterima" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Karena undangan terbuka, asal peserta dan alasan ketidakhadiran tidak perlu diperiksa" dari bukti "Hampir seluruh pembicara pertama berasal dari tiga rukun tetangga terdekat".',
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
