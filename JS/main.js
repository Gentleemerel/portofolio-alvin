// JavaScript portofolio Alvin Syahputra
// Dipasang di ketiga halaman dengan defer

// 1. Daftar keahlian (halaman Beranda)
const skills = [
  { nama: "HTML", level: "Menengah" },
  { nama: "CSS", level: "Menengah" },
  { nama: "Git dan GitHub", level: "Dasar" },
  { nama: "Desain poster dengan Canva", level: "Mahir" },
];
skills.push({ nama: "JavaScript", level: "Dasar" });

const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

if (daftarSkill) {
  skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = `${skill.nama} (${skill.level})`;
    daftarSkill.appendChild(item);
  });
  if (jumlahSkill) {
    jumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
  }
}


// 2. Tema gelap (semua halaman)

// Ambil tombol tema
const tombolTema = document.querySelector("#tombol-tema");

// Ambil tema yang tersimpan
const temaTersimpan = localStorage.getItem("tema");

// Terapkan tema saat halaman dibuka
if (temaTersimpan === "gelap") {
    document.body.classList.add("gelap");
}

// Atur tulisan tombol
if (tombolTema) {
    tombolTema.textContent = document.body.classList.contains("gelap")
        ? "Mode Terang"
        : "Mode Gelap";

    // Ganti tema ketika tombol ditekan
    tombolTema.addEventListener("click", () => {
        document.body.classList.toggle("gelap");

        // Simpan pilihan tema
        if (document.body.classList.contains("gelap")) {
            localStorage.setItem("tema", "gelap");
            tombolTema.textContent = "Mode Terang";
        } else {
            localStorage.setItem("tema", "terang");
            tombolTema.textContent = "Mode Gelap";
        }
    });
}


// 3. Penghitung karakter pesan (halaman Kontak)
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");
if (kotakPesan && hitungKarakter) {
  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent = `${kotakPesan.value.length}/300 karakter`;
  });
}

// 4. Daftar proyek dan filter (halaman Proyek)
const proyek = [
  {
    judul: "Halaman Profil Pertama",
    kategori: "HTML",
    gambar: "img/proyek-profil.png",
    alt: "Tangkapan layar halaman profil Alvin Syahputra",
    deskripsi: "Halaman web pertama saya, dibuat dengan HTML dasar.",
  },
  {
    judul: "Form Kontak",
    kategori: "HTML",
    gambar: "img/proyek-kontak.png",
    alt: "Tangkapan layar form kontak berisi lima isian",
    deskripsi: "Form dengan label dan validasi bawaan browser.",
  },
  {
    judul: "Tabel Jadwal Belajar",
    kategori: "HTML",
    gambar: "img/proyek-jadwal.png",
    alt: "Tangkapan layar tabel jadwal belajar mandiri",
    deskripsi: "Jadwal belajar mingguan dengan thead dan tbody.",
  },
  {
    judul: "Portofolio Responsif",
    kategori: "CSS",
    gambar: "img/tampilan-responsif.png",
    alt: "Tangkapan layar portofolio di ponsel dan laptop",
    deskripsi: "Rapi di ponsel, tablet, dan laptop dengan Flexbox.",
  },
   {
    judul: "Kalkulator Nilai Rapor",
    kategori: "JavaScript",
    gambar: "img/kalkulator-nilai.png",
    alt: "Tangkapan layar hasil kalkulator nilai di Console",
    deskripsi: "Rata-rata dan predikat nilai dengan fungsi JavaScript.",
  },
  {
    judul: "Lima Soal Logika",
    kategori: "JavaScript",
    gambar: "img/proyek-logika.png",
    alt: "Tangkapan layar hasil uji lima soal logika",
    deskripsi: "Lima fungsi logika yang masing-masing diuji 3 masukan.",
  },
];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item) {
  return `
<article class="kartu">
<span class="label">${item.kategori}</span>
<h3>${item.judul}</h3>
<img src="${item.gambar}" alt="${item.alt}" width="280">
<p>${item.deskripsi}</p>
</article>`;
}

function tampilkanProyek(daftar) {
  if (!daftarProyek) return;
  const semuaKartu = daftar.map((item) => buatKartu(item));
  daftarProyek.innerHTML = semuaKartu.join("");
  if (jumlahProyek) {
    jumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
  }
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);
  if (!tombol) return;

  tombol.addEventListener("click", () => {
    const tombolLama = document.querySelector(".tombol-filter.aktif");
    if (tombolLama) {
      tombolLama.classList.remove("aktif");
    }
    tombol.classList.add("aktif");

    if (kategori === "Semua") {
      tampilkanProyek(proyek);
    } else {
      tampilkanProyek(proyek.filter((item) => item.kategori === kategori));
    }
  });
}

if (daftarProyek) {
  tampilkanProyek(proyek);
  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-HTML", "HTML");
  pasangFilter("#filter-CSS", "CSS");
  pasangFilter("#filter-JavaScript", "JavaScript");
}

// Animasi buka dan tutup menu
document.querySelectorAll(".menu-ponsel").forEach((menu) => {
    const summary = menu.querySelector("summary");

    summary.addEventListener("click", (event) => {
        event.preventDefault();

        if (menu.open) {
            // Tutup menu dengan animasi
            menu.classList.add("menutup");

            setTimeout(() => {
                menu.open = false;
                menu.classList.remove("menutup");
            }, 400);

        } else {
            // Buka menu dengan animasi
            menu.open = true;
            menu.classList.remove("menutup");
        }
    });
});