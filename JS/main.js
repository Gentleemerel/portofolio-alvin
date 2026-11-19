// JavaScript portofolio Alvin Syahputra
// Dipasang di ketiga halaman dengan defer


// 1. Daftar keahlian (halaman Beranda)
let skills = [];

const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

async function muatKeahlian() {
  try {
    const response = await fetch("data/keahlian.json");

    if (!response.ok) {
      throw new Error("Data keahlian gagal dimuat");
    }

    skills = await response.json();

    daftarSkill.innerHTML = "";

    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      daftarSkill.appendChild(item);
    });

    if (jumlahSkill) {
      jumlahSkill.textContent =
        `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
    }

  } catch (error) {
    console.error("Error:", error);
    daftarSkill.textContent = "Data keahlian gagal dimuat.";
  }
}

if (daftarSkill) {
  muatKeahlian();
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
let proyek = [];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

async function muatProyek() {
    if (jumlahProyek) {
        jumlahProyek.textContent = "Memuat proyek...";
    }

    try {
        const response = await fetch("data/proyek.json");

        if (!response.ok) {
            throw new Error("Data proyek gagal dimuat");
        }

        proyek = await response.json();

        tampilkanProyek(proyek);

    } catch (error) {
        console.error("Error:", error);

        if (jumlahProyek) {
            jumlahProyek.textContent = "Data proyek gagal dimuat.";
        }
    }
}

function buatKartu(item) {
  return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      <img src="${item.gambar}" alt="${item.alt}" width="280">
      <p>${item.deskripsi}</p>
    </article>
  `;
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
  muatProyek();
  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-html", "HTML");
  pasangFilter("#filter-css", "CSS");
  pasangFilter("#filter-javascript", "JavaScript");
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


// 5. Repositori GitHub terbaru (halaman Proyek)
const username = "alvinsyahputra2345-source";
const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?sort=updated&per_page=6";

const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");

async function ambilRepo() {
    statusRepo.textContent = "Memuat...";

    try {
        const response = await fetch(alamatRepo + pilihan);

        if (!response.ok) {
            throw new Error(`Status ${response.status}`);
        }

        const repos = await response.json();

        repos.forEach((repo) => {
            const item = document.createElement("li");
            const tautan = document.createElement("a");

            tautan.href = repo.html_url;
            tautan.target = "_blank";
            tautan.textContent = repo.name;

            item.appendChild(tautan);
            daftarRepo.appendChild(item);
        });

        statusRepo.textContent =
            `${repos.length} repositori yang terakhir diperbarui:`;

    } catch (error) {
        statusRepo.textContent =
            "Maaf, daftar repositori gagal dimuat. Periksa username atau coba lagi nanti.";

        console.error(error);
    }
}

if (daftarRepo) {
    ambilRepo();
}
