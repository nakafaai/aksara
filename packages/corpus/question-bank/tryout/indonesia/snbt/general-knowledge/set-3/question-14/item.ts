import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Das Team stellte in der neuen Nachricht die Handlung vor die Begründung"; der folgende nutzt "Eine im zweiten Test erfolgreiche Übersetzung kann sicher überall unverändert eingesetzt werden" als Hauptbeleg.',
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Eine Übersetzung muss jedem Ausgangswort folgen, auch wenn Bewohner die Handlung missverstehen" als endgültigen Schluss fest; der folgende nennt nur den Plan "Jede Fassung wird vor dem Einsatz erneut mit Bewohnern getestet".',
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Eine im zweiten Test erfolgreiche Übersetzung kann sicher überall unverändert eingesetzt werden" fest.',
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Eine Übersetzung muss jedem Ausgangswort folgen, auch wenn Bewohner die Handlung missverstehen" aus dem Beleg "Das Team stellte in der neuen Nachricht die Handlung vor die Begründung" ab.',
        },
        {
          isCorrect: true,
          label:
            "Das Scheitern der wörtlichen Fassung führt zur gemeinsamen Überarbeitung; der zweite Test liefert Belege für deren Bewertung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'The first part advances the claim "The team placed the action before the reason in the revised message", and the later part uses "A translation that passes the second test can certainly be used unchanged in every region" as its main support.',
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "A translation must follow every source word even when residents misunderstand the required action" as a final conclusion; the later part only states the plan "Each version will be tested again with residents before use".',
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "A translation that passes the second test can certainly be used unchanged in every region" from the same perspective without adding a test.',
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "A translation must follow every source word even when residents misunderstand the required action" from the evidence "The team placed the action before the reason in the revised message".',
        },
        {
          isCorrect: true,
          label:
            "The literal version's failure motivates co-design, and the second test provides evidence for evaluating the revision.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Tim menempatkan tindakan sebelum alasan dalam susunan pesan baru", lalu bagian kedua memakai "Satu terjemahan yang lulus uji kedua pasti dapat digunakan tanpa perubahan di seluruh daerah" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Terjemahan harus mengikuti setiap kata sumber meskipun warga salah memahami tindakan yang diminta" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Setiap versi akan diuji lagi bersama warga sebelum digunakan".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Satu terjemahan yang lulus uji kedua pasti dapat digunakan tanpa perubahan di seluruh daerah" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Terjemahan harus mengikuti setiap kata sumber meskipun warga salah memahami tindakan yang diminta" dari bukti "Tim menempatkan tindakan sebelum alasan dalam susunan pesan baru".',
        },
        {
          isCorrect: true,
          label:
            "Kegagalan versi harfiah menjadi dasar perancangan bersama, lalu uji kedua menyediakan bukti untuk menilai hasil revisi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
