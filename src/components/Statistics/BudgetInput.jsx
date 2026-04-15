import { categories } from "../../data/categories";

function BudgetInput({ setBudget2025, setBudget2026 }) {

  const handleChange = (year, category, sub, value) => {

    const setter = year === 2025 ? setBudget2025 : setBudget2026;

    setter(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [sub]: Number(value)
      }
    }));

  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl">

      <h2 className="text-xl font-semibold mb-6">
        Budget Input
      </h2>

      {categories.map(cat => (

        <div key={cat.name} className="mb-6">

          <h3 className="text-lg font-semibold mb-2">
            {cat.name}
          </h3>

          {cat.subcategories.map(sub => (

            <div
              key={sub}
              className="grid grid-cols-3 gap-4 mb-2"
            >

              <span>{sub}</span>

              <input
                type="number"
                placeholder="2025"
                className="p-2 rounded bg-slate-700"
                onChange={(e) =>
                  handleChange(
                    2025,
                    cat.name,
                    sub,
                    e.target.value
                  )
                }
              />

              <input
                type="number"
                placeholder="2026"
                className="p-2 rounded bg-slate-700"
                onChange={(e) =>
                  handleChange(
                    2026,
                    cat.name,
                    sub,
                    e.target.value
                  )
                }
              />

            </div>

          ))}

        </div>

      ))}

    </div>
  );
}

export default BudgetInput;