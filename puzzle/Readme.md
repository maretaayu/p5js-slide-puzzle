# Slide Puzzle

## Project

![slide-puzzle](./assets/slide-puzzle.png)

### Panduan Pengerjaan

Di dalam folder Memory Game, kalian akan menemukan dua file penting:
1. index.html
2. sketch.js

File index.html digunakan sebagai user interface, kalian bisa membukanya di browser kalian. Ada banyak cara, salah satunya adalah menggunakan extension Live Preview dari Microsoft di VSCode. Setelah melakukan instalasi, maka kalian bisa klik kanan lalu memilih "Show Preview" yang akan membuka file index.html di browser.

File sketch.js digunakan untuk coding, jadi kalian perlu mengetikkan kode yang diperlukan di sini agar game bisa berjalan dengan baik.

### Description

Pada kode program ini, kamu diberikan beberapa function dengan penamaan yang menggambarkan fungsionalitas mereka, yaitu:

1. `setup` : Function utama ini **membuat _canvas_ dan memanggil function lainnya** untuk mengatur papan permainan.
2. `draw` : Function ini bertugas untuk **menggambar papan permainan** dengan mengisi dan menggambar setiap _tile_.
3. `shuffleBoard` : Function ini **mengacak papan permainan** dengan memindahkan _tile_ secara acak.
4. `mousePressed` : Function ini **dipanggil saat mouse diklik**, bertugas untuk memindahkan _tile_.
5. `moveTile` : Function ini **memindahkan _tile_** dengan memeriksa posisi _tile_ kosong dan _tile_ yang dipilih.
6. `checkBlank` : Function ini **mengecek apakah _tile_ kosong dan _tile_ yang dipilih berada di sebelah** satu sama lain.
7. `swap` : Function ini **menukar posisi dua _tile_** pada papan permainan.

Selain itu, terdapat beberapa variabel global seperti `cols`, `rows`, `w`, `h`, dan `board` yang digunakan untuk menyimpan data permainan.

Berikut adalah penjelasan untuk setiap variabel:

1. `cols` dan `rows`: Ini adalah variabel yang menentukan jumlah kolom dan baris di papan permainan. Dalam hal ini, papan permainan memiliki empat kolom dan baris.

    ```js
    let cols = 4;
    let rows = 4;
    ```

2. `w` dan `h`: Ini adalah variabel yang digunakan untuk menyimpan lebar dan tinggi setiap _tile_ pada papan permainan.

    ```js
    let w, h;
    ```

3. `board`: Ini adalah array yang akan berisi indeks setiap _tile_ yang mewakili papan permainan.

    ```js
    let board = [];
    ```

> NOTE: HARAP DIPERHATIKAN! Gunakan `Math.floor` dan `Math.random` dari JavaScript, sebagai pengganti `floor` atau `random` dari p5js.

#### `setup`

Fungsi `setup` akan digunakan untuk melakukan inisialisasi awal dari papan permainan. Fungsi ini tidak menerima parameter apapun.

Fungsi ini bertugas untuk membuat _canvas_, mengatur lebar dan tinggi setiap _tile_ pada papan permainan, serta mempersiapkan array `board` yang akan digunakan sebagai representasi data dari papan permainan. Selain itu, fungsi ini juga bertugas untuk mengacak posisi _tile_ pada papan permainan dengan memanggil fungsi `shuffleBoard`.

Berikut adalah beberapa hal yang perlu diperhatikan dalam mengimplementasikan fungsi `setup`:

1. Fungsi ini harus mengisi array `board` dengan indeks _tile_, dan satu _tile_ **harus bernilai -1** yang menandakan posisi _tile_ kosong.
2. Lalu jika `board` sudah ada, fungsi ini harus memanggil fungsi `shuffleBoard` untuk mengacak posisi _tile_ pada papan permainan (`board`).

#### `draw`

Fungsi `draw` digunakan untuk menggambar papan permainan dan _tile_-nya. Fungsi ini tidak menerima parameter apapun.

Berikut adalah beberapa hal yang perlu diperhatikan dalam mengimplementasikan fungsi `draw`:

1. Fungsi ini harus menggambar _tile_ pada papan permainan dengan melakukan iterasi terhadap setiap elemen dalam array `board`.
2. Fungsi ini harus menampilkan angka di tengah _tile_ jika nilai _tile_ **tidak sama dengan -1**.

Untuk membantu Anda memahami lebih baik apa yang perlu dilakukan, berikut ini adalah hal yang dapat Anda gunakan sebagai acuan:

-   `draw` harus menggambar papan permainan dengan jumlah _tile_ yang tepat.
-   `draw` harus menampilkan angka di tengah _tile_ jika indeks _tile_ **tidak sama dengan -1**.

#### `shuffleBoard`

Fungsi `shuffleBoard` digunakan untuk mengacak posisi _tile_ pada papan permainan. Fungsi ini menerima satu parameter, yaitu array `arr` yang merepresentasikan papan permainan.

Fungsi ini akan memindahkan _tile_ secara acak untuk menciptakan papan permainan yang telah diacak. Pemindahan _tile_ dilakukan dengan memanggil fungsi `moveTile`.

Berikut adalah beberapa hal yang perlu diperhatikan dalam mengimplementasikan fungsi `shuffleBoard`:

1. Fungsi ini harus melakukan iterasi dengan jumlah yang bisa kalian tentukan. Setiap iterasi, fungsi ini akan memilih posisi _tile_ secara acak dan memindahkannya.
2. Pemindahan _tile_ dilakukan dengan memanggil fungsi `moveTile`, dengan posisi (kolom dan baris) _tile_ yang dipilih secara acak dan `arr` sebagai argumen.
3. Fungsi ini harus mengembalikan array `arr` setelah semua _tile_ selesai diacak.

Singkatnya, fungsi `shuffleBoard` harus mengembalikan array yang elemennya tidak berurutan sama sekali dengan array asli. Dengan kata lain, array yang dikembalikan oleh fungsi `shuffleBoard` harus berbeda dari array `arr` aslinya.

#### `mousePressed`

Fungsi `mousePressed` akan dijalankan setiap kali mouse diklik. Fungsi ini tidak menerima parameter apapun.

Fungsi ini bertugas untuk memanggil fungsi `moveTile` dengan posisi _tile_ yang diklik sebagai argumen. Posisi _tile_ yang diklik dapat dihitung dengan membagi posisi mouse saat ini (`mouseX` dan `mouseY`) dengan lebar dan tinggi setiap _tile_, dan membulatkan hasilnya.

Berikut adalah poin yang perlu diperhatikan dalam mengimplementasikan fungsi `mousePressed`:

1. Fungsi ini harus memanggil fungsi `moveTile` setiap kali mouse diklik.
2. Fungsi ini harus menghitung posisi _tile_ yang diklik dan memasukkannya sebagai argumen saat memanggil fungsi `moveTile`.

#### `moveTile`

Fungsi `moveTile` digunakan untuk memindahkan _tile_ yang diklik ke posisi _tile_ kosong jika _tile_ yang diklik berada di sebelah _tile_ kosong.

Fungsi ini menerima tiga parameter, yaitu:

-   posisi kolom dan baris _tile_ yang diklik (`i` dan `j`)
-   array `arrBoard` yang merepresentasikan papan permainan.

Berikut adalah beberapa hal yang perlu diperhatikan dalam mengimplementasikan fungsi `moveTile`:

1. Fungsi ini harus mencari posisi (kolom dan baris) _tile_ kosong dalam array `arrBoard`.
2. Fungsi ini harus memeriksa apakah _tile_ yang diklik berada di sebelah _tile_ kosong dengan memanggil fungsi `checkBlank`.
3. Jika _tile_ yang diklik berada di sebelah _tile_ kosong, fungsi ini harus memindahkan _tile_ tersebut ke posisi _tile_ kosong dengan memanggil fungsi `swap`.

Untuk membantu Anda memahami lebih baik apa yang perlu dilakukan, berikut ini adalah hal yang dapat Anda gunakan sebagai acuan:

-   `moveTile` harus memanggil fungsi `checkBlank` dan `swap` dengan argumen yang benar.
-   `moveTile` hanya boleh memindahkan _tile_ yang berada di sebelah _tile_ kosong.

#### `checkBlank`

Fungsi `checkBlank` digunakan untuk memeriksa apakah _tile_ yang dipilih berada di sebelah _tile_ kosong. Fungsi ini menerima empat parameter, yaitu:

-   posisi kolom dan baris _tile_ yang dipilih (`i` dan `j`)
-   posisi kolom dan baris _tile_ kosong (`x` dan `y`).

Berikut adalah beberapa hal yang perlu diperhatikan dalam mengimplementasikan fungsi `checkBlank`:

1. Fungsi ini harus memeriksa apakah _tile_ yang dipilih berada di sebelah _tile_ kosong. _Tile_ yang dipilih dianggap berada di sebelah _tile_ kosong jika:
    - berada di kolom yang sama dan barisnya berbeda satu
    - atau berada di baris yang sama dan kolomnya berbeda satu.
2. Fungsi ini harus mengembalikan `true` jika _tile_ yang dipilih berada di sebelah _tile_ kosong, dan `false` jika sebaliknya.

#### `swap`

Fungsi `swap` digunakan untuk menukar posisi dua _tile_ pada papan permainan. Fungsi ini menerima tiga parameter, yaitu:

-   indeks dua _tile_ yang akan ditukar posisinya (`i` dan `j`)
-   array `arr` yang merepresentasikan papan permainan.

Berikut adalah beberapa hal yang perlu diperhatikan dalam mengimplementasikan fungsi `swap`:

1. Fungsi ini harus menukar elemen pada array `arr` di posisi `i` dan `j`.
2. Fungsi ini harus mengembalikan array `arr` setelah elemet di posisi `i` dan `j` ditukar.

Secara singkat, fungsi `swap` harus mengembalikan array yang elemen di posisi `i` dan `j` telah ditukar. Misalnya, jika `i` adalah 0 dan `j` adalah 9, maka elemen di posisi 0 dan 9 harus ditukar
