"use client";
import { useEffect, useState } from "react";

const Home = () => {
  const [golongan, setGolongan] = useState<string>("");
  const [jamLembur, setJamLembur] = useState<string>("");
  const [gajiPokok, setGajiPokok] = useState<number>(0);
  const [gajiLemburPersen, setGajiLemburPersen] = useState<number>(0);
  const [totalGajiLembur, setTotalGajiLembur] = useState<number>(0);
  const [totalGaji, setTotalGaji] = useState<number>(0);

  async function hitungGaji() {
    const numJamLembur = Number(jamLembur);

    if (golongan !== "" && jamLembur !== "") {
      // * Cek Gaji Pokok
      if (golongan === "A") {
        setGajiPokok(5000000);
      } else if (golongan === "B") {
        setGajiPokok(6500000);
      } else {
        setGajiPokok(9500000);
      }

      // * Cek Presentase Gaji Lembur
      if (numJamLembur === 1) {
        setGajiLemburPersen(30 / 100);
      } else if (numJamLembur === 2) {
        setGajiLemburPersen(32 / 100);
      }
      if (numJamLembur === 3) {
        setGajiLemburPersen(34 / 100);
      }
      if (numJamLembur === 4) {
        setGajiLemburPersen(36 / 100);
      }
      if (numJamLembur >= 5) {
        setGajiLemburPersen(38 / 100);
      }
    }
    if (jamLembur === "") {
      setGajiLemburPersen(0);
      setTotalGajiLembur(0);
    }
  }

  useEffect(() => {
    hitungGaji();
  }, [golongan, jamLembur]);

  useEffect(() => {
    // * Jumlah Total Gaji
    const gajiLembur = gajiPokok * gajiLemburPersen;
    setTotalGajiLembur(gajiLembur);
    setTotalGaji(gajiPokok + gajiLembur);
  }, [gajiPokok, gajiLemburPersen]);

  const formatIDR = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <main className="flex min-h-screen flex-col items-center py-8 px-4 bg-base-300">
      <h1 className="uppercase font-semibold text-xl mt-10 mb-6">
        Hitung total gaji karyawan
      </h1>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Pilih Golongan</span>
        </div>
        <select
          className="select select-bordered w-full max-w-xs"
          value={golongan}
          onChange={(e) => setGolongan(e.target.value)}
        >
          <option value="" disabled selected>
            Pilih golongan
          </option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </label>
      <label className="form-control w-full max-w-xs mt-4">
        <div className="label">
          <span className="label-text">Masukkan Jam Lembur</span>
        </div>
        <input
          type="text"
          placeholder="Jam lembur"
          className="input input-bordered w-full max-w-xs"
          value={jamLembur}
          onChange={(e) => {
            const value = e.target.value;
            // Remove any non-numeric characters
            const numericValue = value.replace(/\D/g, "");
            setJamLembur(numericValue);
          }}
        />
      </label>

      <label className="form-control w-full max-w-xs mt-8">
        <p className="flex border-b mb-3 pb-2 border-base-content/50">
          Gaji Pokok Rp <span className="ml-auto">{formatIDR(gajiPokok)}</span>
        </p>
        <p className="flex border-b mb-3 pb-2 border-base-content/50">
          Gaji Lembur Rp{" "}
          <span className="ml-auto">
            {formatIDR(Number(totalGajiLembur.toFixed()))}
          </span>
        </p>
        <p className="flex border-b mb-3 pb-2 border-base-content/50">
          Presentase Lembur{" "}
          <span className="ml-auto">{gajiLemburPersen * 100} %</span>
        </p>
        <p className="flex border-b mb-3 pb-2 border-base-content/50">
          Total gaji adalah Rp{" "}
          <span className="ml-auto font-bold">
            {formatIDR(Number(totalGaji.toFixed()))}
          </span>
        </p>
      </label>

      <article className="prose mt-8">
        <h1>Penjelasan:</h1>
        <h3>Pada sebuah perusahaan dengan tiga golongan Karyawan, yaitu:</h3>
        <ul>
          <li>Jika Golongan A: Gaji Rp. 5.000.000</li>
          <li>Jika Golongan B: Gaji Rp. 6.500.000</li>
          <li>Jika Golongan C: Gaji Rp. 9.500.000</li>
        </ul>

        <h3>
          Jika karyawan tersebut lembur, maka mereka dibayar per-Jam dengan
          ketentuan sebagai berikut:
        </h3>
        <ul>
          <li>
            Jika Karyawan lembur 1 Jam maka gaji lemburnya 30% dari Gaji Pokok
          </li>
          <li>
            Jika Karyawan lembur 2 Jam maka gaji lemburnya 32% dari Gaji Pokok
          </li>
          <li>
            Jika Karyawan lembur 3 Jam maka gaji lemburnya 34% dari Gaji Pokok
          </li>
          <li>
            Jika Karyawan lembur 4 Jam maka gaji lemburnya 36% dari Gaji Pokok
          </li>
          <li>
            {
              "Jika Karyawan lembur >= 5 Jam maka gaji lemburnya 38% dari Gaji Pokok"
            }
          </li>
        </ul>
      </article>
    </main>
  );
};

export default Home;
