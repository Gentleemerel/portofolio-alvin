// 1. Total harga
const hargaNasi = 12000;
const hargaEsTeh = 4000;

// Daftar harga sesuai menu.json
const daftarHarga = {
    nasiGoreng: 12000,
    nasiKebuli: 15000,
    nasiPecel: 8000,
    esTeh: 12000,
    kopi: 5000,
    esJeruk: 6000
};

// Nama menu sesuai menu.json
const namaMenu = {
    nasiGoreng: "Nasi Goreng",
    nasiKebuli: "Nasi Kebuli",
    nasiPecel: "Nasi Pecel",
    esTeh: "Es Teh",
    kopi: "Kopi",
    esJeruk: "Es Jeruk"
};

function hitungTotal(jumlahNasi, jumlahEsTeh) {
    return (jumlahNasi * hargaNasi) + (jumlahEsTeh * hargaEsTeh);
}

console.log("Soal Praktik Kasir Kantin");
console.log("Hitung Total Harga");
console.log(hitungTotal(4, 6));

// 2. Hitung kembalian
function keteranganKembalian(totalHarga, uangBayar) {
    if (uangBayar < totalHarga) { // uang bayar kurang
        return `Uang bayar kurang Rp ${totalHarga - uangBayar} dari total Rp ${totalHarga}`;
    } else if (uangBayar === totalHarga) { // uang bayar pas
        return `Uang bayar pas (${totalHarga - uangBayar} kembalian) dari total Rp ${uangBayar}`; 
    } else { // uang bayar lebih
        return `Uang lebih, kembali Rp ${uangBayar - totalHarga} dari total Rp ${totalHarga}`;
    }
}

console.log("Hitung kembalian");
console.log(keteranganKembalian(20000, 20000));
console.log(keteranganKembalian(32000, 40000));
console.log(keteranganKembalian(52000, 50000));

// 2. MENAMPILKAN DAFTAR MENU
console.log(`
🍛 DAFTAR MAKANAN
1. Nasi Goreng : Rp12.000
2. Ayam Geprek : Rp15.000
3. Bakso       : Rp10.000
4. Mie Goreng  : Rp10.000

🥤 DAFTAR MINUMAN
1. Es Teh      : Rp4.000
2. Es Jeruk    : Rp5.000
3. Es Cokelat  : Rp6.000
4. Air Mineral : Rp3.000
`);


// 3. FUNGSI HITUNG TOTAL
// Sesuai soal modul

// Fungsi tambahan untuk menghitung semua menu
function hitungTotalMenu(pesanan) {
    let total = 0;

    for (const menu in pesanan) {
        if (daftarHarga[menu] !== undefined) {
            total += pesanan[menu] * daftarHarga[menu];
        }
    }

    return total;
};

// 4. ARROW FUNCTION HITUNG KEMBALIAN
// Sesuai soal modul
const hitungKembalian = (bayar, total) => {
    return bayar - total;
};

// 5. FUNGSI CEK PEMBAYARAN
// Menggunakan if, else if, dan else
function cekPembayaran(bayar, total) {

    if (bayar < total) {

        return `Uang kurang Rp${Math.abs(
            hitungKembalian(bayar, total)
        ).toLocaleString("id-ID")}`;

    } else if (bayar === total) {

        return "Uang pas";

    } else {

        return `Kembalian Rp${hitungKembalian(
            bayar, total
        ).toLocaleString("id-ID")}`;

    }

}


// 6. FUNGSI CETAK STRUK
function cetakStruk(nama, pesanan, bayar) {

    const total = hitungTotalMenu(pesanan);

    console.log(`
========== STRUK KASIR ==========
🏫 KANTIN SMKN 1 Pasuruan
👤 Pembeli: ${nama}

DAFTAR PESANAN:
`);

    for (const menu in pesanan) {

        const jumlah = pesanan[menu];

        if (jumlah > 0) {

            const subtotal = jumlah * daftarHarga[menu];

            console.log(
                `${namaMenu[menu]} x${jumlah} = Rp${subtotal.toLocaleString("id-ID")}`
            );

        }

    }

    console.log(`
---------------------------------
💰 Total       : Rp${total.toLocaleString("id-ID")}
💵 Uang Bayar  : Rp${bayar.toLocaleString("id-ID")}
📢 ${cekPembayaran(bayar, total)}
=================================
    `);

}


// 7. CONTOH TRANSAKSI TIGA PEMBELI

// PEMBELI 1: UANG KURANG
const pesanan1 = {
    nasiGoreng: 1,
    kopi: 1
};

cetakStruk("Pembeli 1", pesanan1, 10000);


// PEMBELI 2: UANG PAS
const pesanan2 = {
    nasiPecel: 1,
    esJeruk: 1
};

cetakStruk("Pembeli 2", pesanan2, 14000);


// PEMBELI 3: UANG BERLEBIH
const pesanan3 = {
    nasiKebuli: 1,
    esTeh: 1
};

cetakStruk("Pembeli 3", pesanan3, 30000);


let menu = [];

const daftarMenu = document.querySelector("#daftar-menu");
const jumlahMenu = document.querySelector("#jumlah-menu");

async function muatMenu() {
    if (jumlahMenu) {
        jumlahMenu.textContent = "Memuat menu...";
    }

    try {
        const response = await fetch("../data/menu.json");

        if (!response.ok) {
            throw new Error("Data menu gagal dimuat");
        }

        const data = await response.json();

        menu = data;

        console.log("Data menu berhasil dimuat:", menu);

        tampilkanMenu(menu);

    } catch (error) {
        console.error("Error:", error);

        if (jumlahMenu) {
            jumlahMenu.textContent =
                "Maaf, daftar menu belum dapat ditampilkan.";
        }
    }
}

function buatKartu(item) {
    return `
        <article class="kartu">
            <span class="label">${item.kategori}</span>
            <h3>${item.nama}</h3>
            <h4>${item.harga}</h4>
            <p>${item.deskripsi}</p>
        </article>
    `;
}

function tampilkanMenu(daftar) {
    if (!daftarMenu) return;

    daftarMenu.innerHTML = daftar
        .map((item) => buatKartu(item))
        .join("");

    if (jumlahMenu) {
        jumlahMenu.textContent =
            `Menampilkan ${daftar.length} dari ${menu.length} menu`;
    }
}

function pasangFilter(idTombol, kategori) {
    const tombol = document.querySelector(idTombol);

    if (!tombol) return;

    tombol.addEventListener("click", () => {

        document.querySelectorAll(".tombol-filter").forEach((btn) => {
            btn.classList.remove("aktif");
        });

        tombol.classList.add("aktif");

        if (kategori === "Semua") {
            tampilkanMenu(menu);
        } else {
            const hasilFilter = menu.filter((item) =>
                item.kategori.trim().toLowerCase() === kategori
            );

            tampilkanMenu(hasilFilter);
        }
    });
}

if (daftarMenu) {
    pasangFilter("#filter-semua", "Semua");
    pasangFilter("#filter-makanan", "makanan");
    pasangFilter("#filter-minuman", "minuman");

    muatMenu();
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
