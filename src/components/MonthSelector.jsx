import { useMonth } from "../context/MonthContext";

export default function MonthSelector() {
  const { month, year, setMonth, setYear } = useMonth();

  const now = new Date();

  // ⭐ FECHA DE INICIO REAL DE LA APP
  const START_MONTH = 2; // Febrero
  const START_YEAR = 2026;

  const monthsLabels = [
    "Ene","Feb","Mar","Abr","May","Jun",
    "Jul","Ago","Sep","Oct","Nov","Dic"
  ];

  // ⭐ generamos meses dinámicamente
  const options = [];

  let y = START_YEAR;
  let m = START_MONTH - 1;

  while (
    y < now.getFullYear() ||
    (y === now.getFullYear() && m <= now.getMonth())
  ) {
    options.push({
      month: m + 1,
      year: y,
      label: `${monthsLabels[m]} ${y}`,
    });

    m++;

    if (m > 11) {
      m = 0;
      y++;
    }
  }

  return (
    <select
      className="month-selector"
      value={`${month}-${year}`}
      onChange={(e) => {
        const [m, y] = e.target.value.split("-");
        setMonth(Number(m));
        setYear(Number(y));
      }}
    >
      {options.map((opt) => (
        <option
          key={`${opt.month}-${opt.year}`}
          value={`${opt.month}-${opt.year}`}
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
}